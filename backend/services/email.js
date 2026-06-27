const nodemailer = require('nodemailer');
const EmailLog = require('../models/EmailLog');
const User = require('../models/User');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports (like 587)
    auth: {
      user: process.env.SMTP_USER || 'amanpratapsingh@jklu.edu.in',
      pass: process.env.SMTP_PASS || 'fdgnghhzqjycjvxt'
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
};

/**
 * Check if the email rate limits have been reached.
 * Limits: 50 per hour, 300 per day.
 * @returns {Object} - { allowed: boolean, reason: string, hourlyCount: number, dailyCount: number }
 */
async function checkRateLimit() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const hourlyCount = await EmailLog.countDocuments({
    status: 'sent',
    sentAt: { $gte: oneHourAgo }
  });

  const dailyCount = await EmailLog.countDocuments({
    status: 'sent',
    sentAt: { $gte: startOfToday }
  });

  const hourlyLimit = parseInt(process.env.EMAIL_LIMIT_HOURLY || '50');
  const dailyLimit = parseInt(process.env.EMAIL_LIMIT_DAILY || '300');

  if (hourlyCount >= hourlyLimit) {
    return { allowed: false, reason: `Hourly limit reached (${hourlyCount}/${hourlyLimit}).`, hourlyCount, dailyCount };
  }

  if (dailyCount >= dailyLimit) {
    return { allowed: false, reason: `Daily limit reached (${dailyCount}/${dailyLimit}).`, hourlyCount, dailyCount };
  }

  return { allowed: true, hourlyCount, dailyCount };
}

/**
 * Send a single email (with rate checking)
 * @param {Object} emailOptions - { to, subject, body, cc, bcc, attachments }
 * @returns {Promise<Object>} - Status of send
 */
async function sendEmail({ to, subject, body, cc, bcc, attachments }) {
  const rateLimitStatus = await checkRateLimit();
  if (!rateLimitStatus.allowed) {
    // Save as pending in queue
    const log = new EmailLog({
      to,
      subject,
      body,
      cc,
      bcc,
      status: 'pending',
      errorMessage: rateLimitStatus.reason
    });
    await log.save();
    return { success: false, queued: true, error: rateLimitStatus.reason };
  }

  const transporter = createTransporter();

  // Prepare BCC list
  const defaultBcc = process.env.DEFAULT_BCC || 'deepaksogani@jklu.edu.in';
  const defaultBccList = defaultBcc.split(',').map(email => email.trim()).filter(Boolean);
  let bccList = [];
  if (bcc) {
    bccList = bcc.split(',').map(email => email.trim()).filter(Boolean);
  }
  const mergedBccList = Array.from(new Set([...bccList, ...defaultBccList]));
  const finalBcc = mergedBccList.join(', ');

  const mailOptions = {
    from: process.env.SMTP_USER || 'amanpratapsingh@jklu.edu.in',
    to,
    subject,
    html: body,
    cc,
    bcc: finalBcc,
    attachments
  };

  const log = new EmailLog({
    to,
    subject,
    body,
    cc,
    bcc: finalBcc,
    status: 'pending'
  });
  await log.save();

  try {
    const info = await transporter.sendMail(mailOptions);
    
    log.status = 'sent';
    log.sentAt = new Date();
    await log.save();

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP sending error:', error);
    log.status = 'failed';
    log.errorMessage = error.message;
    await log.save();

    return { success: false, error: error.message };
  }
}

/**
 * Process pending/queued emails within rate limits
 */
async function processQueue() {
  const rateLimitStatus = await checkRateLimit();
  if (!rateLimitStatus.allowed) {
    console.log('Queue processing skipped: rate limits already hit.', rateLimitStatus.reason);
    return;
  }

  const hourlyLimit = parseInt(process.env.EMAIL_LIMIT_HOURLY || '50');
  const dailyLimit = parseInt(process.env.EMAIL_LIMIT_DAILY || '300');
  
  const remainingHourly = hourlyLimit - rateLimitStatus.hourlyCount;
  const remainingDaily = dailyLimit - rateLimitStatus.dailyCount;
  const maxToSendNow = Math.min(remainingHourly, remainingDaily);

  if (maxToSendNow <= 0) return;

  const pendingEmails = await EmailLog.find({ status: 'pending' })
    .sort({ createdAt: 1 })
    .limit(maxToSendNow);

  console.log(`Processing ${pendingEmails.length} queued emails...`);

  for (const email of pendingEmails) {
    try {
      const result = await sendEmail({
        to: email.to,
        subject: email.subject,
        body: email.body,
        cc: email.cc,
        bcc: email.bcc
      });
      // Delete or update the original pending email since sendEmail creates/updates its logs
      await EmailLog.findByIdAndDelete(email._id);
      
      if (!result.success) {
        console.log(`Failed sending queued email to ${email.to}: ${result.error}`);
        // If hit rate limits during processing, stop
        if (result.error && result.error.includes('limit reached')) {
          break;
        }
      }
    } catch (err) {
      console.error(`Error processing email ${email._id}:`, err);
    }
  }
}

module.exports = {
  sendEmail,
  checkRateLimit,
  processQueue
};
