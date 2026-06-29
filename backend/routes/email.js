const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendEmail, checkRateLimit } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');
const EmailLog = require('../models/EmailLog');
const { requireAuth, requireRole } = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB maximum file size
});

// POST /api/email/send-trial
// Send a test mail to verification address (Super Admin)
router.post('/send-trial', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { testEmail } = req.body;
    const recipient = testEmail || req.user.email;

    const result = await sendEmail({
      to: recipient,
      subject: 'Aarambh 2026 Portal - SMTP Server Trial Mail',
      body: `<h3>SMTP Server Check Successful</h3>
             <p>This is a trial email sent from the Aarambh 2026 Team Portal to verify Outlook SMTP server settings.</p>
             <p>Sent at: ${new Date().toLocaleString()}</p>`
    });

    if (result.success) {
      res.json({ success: true, message: `Trial email sent successfully to ${recipient}.` });
    } else {
      res.status(500).json({ error: `Failed to send trial email: ${result.error}` });
    }

  } catch (error) {
    console.error('Send trial error:', error);
    res.status(500).json({ error: 'Server error during trial mail send: ' + error.message });
  }
});

// POST /api/email/send-test-bulk
// Send a custom test bulk email campaign with optional attachment and custom CC/BCC
router.post('/send-test-bulk', requireAuth, requireRole('super_admin'), (req, res, next) => {
  upload.single('attachment')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Attachment file size exceeds the 4MB limit.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Upload error: ' + err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { toEmails, subject, body, ccEmails, bccEmails } = req.body;

    if (!toEmails || !subject || !body) {
      return res.status(400).json({ error: 'Recipient emails, subject, and body are required.' });
    }

    const recipients = toEmails.split(',').map(email => email.trim()).filter(Boolean);
    if (recipients.length === 0) {
      return res.status(400).json({ error: 'No valid recipient emails provided.' });
    }

    let attachment = null;
    if (req.file) {
      attachment = {
        filename: req.file.originalname,
        content: req.file.buffer
      };
    }

    let sentCount = 0;
    let failedCount = 0;
    const errors = [];

    for (const recipient of recipients) {
      const result = await sendEmail({
        to: recipient,
        subject,
        body,
        cc: ccEmails || undefined,
        bcc: bccEmails || undefined,
        attachments: attachment ? [attachment] : undefined
      });

      if (result.success) {
        sentCount++;
      } else {
        failedCount++;
        errors.push({ email: recipient, error: result.error });
      }
    }

    res.json({
      success: true,
      message: `Test campaign sent. Successful: ${sentCount}, Failed: ${failedCount}.`,
      sentCount,
      failedCount,
      errors
    });

  } catch (error) {
    console.error('Send test bulk error:', error);
    res.status(500).json({ error: 'Server error during test bulk send: ' + error.message });
  }
});

// GET /api/email/rate-status
// Check remaining quota (hourly and daily limits)
router.get('/rate-status', requireAuth, async (req, res) => {
  try {
    const status = await checkRateLimit();
    res.json({
      success: true,
      allowed: status.allowed,
      reason: status.reason || null,
      hourlyCount: status.hourlyCount,
      hourlyLimit: parseInt(process.env.EMAIL_LIMIT_HOURLY || '50'),
      dailyCount: status.dailyCount,
      dailyLimit: parseInt(process.env.EMAIL_LIMIT_DAILY || '300')
    });
  } catch (error) {
    console.error('Rate status error:', error);
    res.status(500).json({ error: 'Failed to retrieve email rate status.' });
  }
});

// POST /api/email/send-bulk
// Send template-based emails to selected students
router.post('/send-bulk', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { studentIds, subject, bodyTemplate, bcc } = req.body;

    if (!subject || !bodyTemplate) {
      return res.status(400).json({ error: 'Subject and Body Template are required.' });
    }

    // Query students
    let query = {};
    if (studentIds && Array.isArray(studentIds) && studentIds.length > 0) {
      query = { _id: { $in: studentIds } };
    }

    const students = await Student.find(query);
    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found to email.' });
    }

    // Retrieve all cohort leaders to map to students quickly
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const cohortLeadersMap = {};
    cohortLeaders.forEach(leader => {
      if (leader.cohort) {
        cohortLeadersMap[leader.cohort] = leader;
      }
    });

    let sentCount = 0;
    let queuedCount = 0;
    let failedCount = 0;
    const errors = [];

    for (const student of students) {
      const cohortLeader = cohortLeadersMap[student.cohort];
      const ccEmail = cohortLeader ? cohortLeader.email : '';
      const clName = cohortLeader ? cohortLeader.name : 'N/A';
      const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
      const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

      // Parse template variables
      const rawFirstName = student.name.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
      const greetingName = student.region === 'South' ? student.name : firstName;
      let parsedBody = bodyTemplate
        .replace(/\{\{name\}\}/g, student.name)
        .replace(/\{\{firstName\}\}/g, greetingName)
        .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
        .replace(/\{\{course\}\}/g, student.course)
        .replace(/\{\{cohort\}\}/g, student.cohort)
        .replace(/\{\{cohortLeaderName\}\}/g, clName)
        .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
        .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

      // Check for inline banner image attachment
      const attachments = [];
      if (parsedBody.includes('cid:bannerImage')) {
        attachments.push({
          filename: 'banner.jpg',
          path: require('path').join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg'),
          cid: 'bannerImage'
        });
      }

      // Add permanent attachments from public/Email Attachment/
      const fs = require('fs');
      const path = require('path');
      const attachmentDir = path.join(__dirname, '../../admin_aarambh/public/Email Attachment');
      if (fs.existsSync(attachmentDir)) {
        const files = fs.readdirSync(attachmentDir);
        files.forEach(file => {
          const filePath = path.join(attachmentDir, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            attachments.push({
              filename: file,
              path: filePath
            });
          }
        });
      }

      // Attempt sending
      const result = await sendEmail({
        to: student.email,
        subject: subject,
        body: parsedBody,
        cc: ccEmail,
        bcc: bcc,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (result.success) {
        sentCount++;
      } else if (result.queued) {
        queuedCount++;
      } else {
        failedCount++;
        errors.push({ student: student.name, email: student.email, error: result.error });
      }
    }

    res.json({
      success: true,
      message: `Bulk email processing complete. Sent: ${sentCount}, Queued: ${queuedCount}, Failed: ${failedCount}.`,
      sentCount,
      queuedCount,
      failedCount,
      errors
    });

  } catch (error) {
    console.error('Send bulk error:', error);
    res.status(500).json({ error: 'Server error during bulk email sending: ' + error.message });
  }
});

// GET /api/email/students
// Retrieve all students with their email delivery status
router.get('/students', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const students = await Student.find({}, 'name applicationNo email course cohort').lean();
    const logs = await EmailLog.find({}, 'to status errorMessage sentAt').sort({ createdAt: -1 }).lean();
    
    // Map email to its most recent log
    const latestLogMap = {};
    logs.forEach(log => {
      if (log.to) {
        const emailKey = log.to.toLowerCase().trim();
        if (!latestLogMap[emailKey]) {
          latestLogMap[emailKey] = log;
        }
      }
    });
    
    const studentsWithStatus = students.map(student => {
      const emailKey = student.email ? student.email.toLowerCase().trim() : '';
      const log = emailKey ? latestLogMap[emailKey] : null;
      return {
        ...student,
        emailStatus: log ? log.status : 'not_sent',
        emailError: log ? log.errorMessage : null,
        emailSentAt: log ? (log.sentAt || log.createdAt) : null
      };
    });
    
    res.json(studentsWithStatus);
  } catch (error) {
    console.error('Fetch email students error:', error);
    res.status(500).json({ error: 'Failed to retrieve student email statuses: ' + error.message });
  }
});

// GET /api/email/logs
// Retrieve recent email logs
router.get('/logs', requireAuth, async (req, res) => {
  try {
    const logs = await EmailLog.find({})
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    console.error('Fetch logs error:', error);
    res.status(500).json({ error: 'Failed to retrieve email logs.' });
  }
});

module.exports = router;
