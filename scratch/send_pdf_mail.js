const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables from backend/.env
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const timelinePdfPath = path.join(__dirname, '../AARAMBH 2026-Timeline.pdf');
const aarambhPdfPath = path.join(__dirname, '../Aarambh.pdf');

// Verify SMTP environment variables
const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  console.error("Error: SMTP_USER and SMTP_PASS must be configured in backend/.env!");
  process.exit(1);
}

// List of recipients: All OHs + extra emails
const recipients = [
  'vedikaagrawal@jklu.edu.in',
  'amanpratapsingh@jklu.edu.in',
  'vaishnavishukla@jklu.edu.in',
  'tanikgupta@jklu.edu.in',
  'ambikadalmia@jklu.edu.in',
  'deepak.sogani@jklu.edu.in',
  'anushka.pathak@jklu.edu.in'
];

console.log("=== PDF TRIAL EMAIL CAMPAIGN ===");
console.log(`SMTP User:     ${smtpUser}`);
console.log(`Recipients:    ${recipients.join(', ')}`);
console.log(`Subject:       Hello`);
console.log(`Body:          Trial`);
console.log(`Attachment 1:  AARAMBH 2026-Timeline.pdf (exists: ${fs.existsSync(timelinePdfPath)})`);
console.log(`Attachment 2:  Aarambh.pdf (exists: ${fs.existsSync(aarambhPdfPath)})`);
console.log("================================\n");

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

async function sendTrialPdfCampaign() {
  console.log(`Sending trial emails with PDF attachments to ${recipients.length} recipients...`);
  
  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    console.log(`[${i + 1}/${recipients.length}] Sending to ${recipient}...`);

    const mailOptions = {
      from: smtpUser,
      to: recipient,
      subject: 'Hello',
      html: '<p>Trial</p>',
      attachments: [
        {
          filename: 'AARAMBH 2026-Timeline.pdf',
          path: timelinePdfPath
        },
        {
          filename: 'Aarambh.pdf',
          path: aarambhPdfPath
        }
      ]
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Sent! Message ID: ${info.messageId}`);
    } catch (error) {
      console.error(`   ❌ Failed to send to ${recipient}:`, error.message);
    }
  }

  console.log("\n=== CAMPAIGN COMPLETED ===");
}

sendTrialPdfCampaign();
