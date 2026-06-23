const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables from backend/.env
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const emailsPath = path.join(__dirname, 'prepared_emails.json');
const csvPath = path.join(__dirname, '../test.csv');

// Check if prepared emails exist
if (!fs.existsSync(emailsPath)) {
  console.error("Error: prepared_emails.json not found. Run prepare_bulk_mail.js first!");
  process.exit(1);
}

const preparedEmails = JSON.parse(fs.readFileSync(emailsPath, 'utf8'));

// Verify SMTP environment variables
const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  console.error("Error: SMTP_USER and SMTP_PASS must be configured in backend/.env!");
  process.exit(1);
}

console.log("=== BULK MAIL CAMPAIGN SUMMARY ===");
console.log(`SMTP User:         ${smtpUser}`);
console.log(`SMTP Host:         ${smtpHost}:${smtpPort}`);
console.log(`Total Recipient:   ${preparedEmails.length} Volunteers`);
console.log(`CC Address:        amanpratapsingh@jklu.edu.in`);
console.log(`BCC Address:       deepaksogani@jklu.edu.in (default)`);
console.log(`Attachment:        test.csv (exists: ${fs.existsSync(csvPath)})`);
console.log(`Rate Limit:        20 emails/minute (1 email every 3 seconds)`);
console.log("===================================\n");

const args = process.argv.slice(2);
const isRun = args.includes('--run');

if (!isRun) {
  console.log("DRY RUN ACTIVE. No emails will be sent.");
  console.log("To run the campaign and send the emails, execute the script with the --run flag:");
  console.log("node scratch/send_bulk_mail.js --run");
  process.exit(0);
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendBulkCampaign() {
  console.log(`\nSTARTING EMAIL CAMPAIGN: Sending ${preparedEmails.length} emails...`);
  
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < preparedEmails.length; i++) {
    const email = preparedEmails[i];
    console.log(`[${i + 1}/${preparedEmails.length}] Sending to ${email.name} <${email.email}>...`);

    const mailOptions = {
      from: smtpUser,
      to: email.email,
      cc: email.cc,
      bcc: 'deepaksogani@jklu.edu.in', // Default BCC
      subject: email.subject,
      html: email.body,
      attachments: [
        {
          filename: 'test.csv',
          path: csvPath
        }
      ]
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Sent! Message ID: ${info.messageId}`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed to send to ${email.email}:`, error.message);
      failCount++;
    }

    // Rate limit: 20 emails/minute = 1 email every 3 seconds.
    // Don't wait after the last email.
    if (i < preparedEmails.length - 1) {
      console.log("   Waiting 3 seconds (rate limit: 20 emails/min)...");
      await sleep(3000);
    }
  }

  console.log(`\n=== CAMPAIGN COMPLETE ===`);
  console.log(`Successfully sent: ${successCount}`);
  console.log(`Failed:            ${failCount}`);
  console.log(`==========================`);
}

sendBulkCampaign();
