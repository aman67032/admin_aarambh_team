const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

async function sendWelcomeEmail(student) {
  const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template not found at: ${templatePath}`);
  }
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  // Fetch cohort leader
  const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: student.cohort });
  const clName = cohortLeader ? cohortLeader.name : 'N/A';
  const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
  const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

  // Parse greeting name
  const rawFirstName = student.name.trim().split(' ')[0];
  const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
  const greetingName = student.region === 'South' ? student.name : firstName;

  const parsedBody = templateContent
    .replace(/\{\{name\}\}/g, student.name)
    .replace(/\{\{firstName\}\}/g, greetingName)
    .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
    .replace(/\{\{course\}\}/g, student.course)
    .replace(/\{\{cohort\}\}/g, student.cohort)
    .replace(/\{\{cohortLeaderName\}\}/g, clName)
    .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
    .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

  const attachments = [];
  
  // Compiles Banner
  const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
  if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
    attachments.push({
      filename: 'banner.jpg',
      path: bannerPath,
      cid: 'bannerImage'
    });
  }

  // QR Code
  const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
  if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
    attachments.push({
      filename: 'registration_qr.png',
      path: qrPath,
      cid: 'registrationQr'
    });
  }

  // Permanent Attachments
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

  const result = await sendEmail({
    to: student.email,
    subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
    body: parsedBody,
    cc: clEmail || undefined,
    attachments: attachments.length > 0 ? attachments : undefined
  });

  if (result.success) {
    console.log(`[SUCCESS] Welcome email successfully sent to ${student.name}!`);
    student.mailReceived = true;
    await student.save();
  } else if (result.queued) {
    console.log(`[QUEUED] Welcome email queued for ${student.name} (rate limit reached).`);
    student.mailReceived = true;
    await student.save();
  } else {
    console.log(`[ERROR] Failed to send email to ${student.name}: ${result.error}`);
  }
}

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // 1. Update & Send to Chakshu Jain
    const chakshu = await Student.findOne({ name: /CHAKSHU JAIN/i });
    if (chakshu) {
      const oldEmail = chakshu.email;
      chakshu.email = 'jainchakshu7303@gmail.com';
      await chakshu.save();
      console.log(`[SUCCESS] Updated Chakshu Jain email: ${oldEmail} -> ${chakshu.email}`);
      await sendWelcomeEmail(chakshu);
    } else {
      console.log('[ERROR] Chakshu Jain not found in database.');
    }

    // 2. Update & Send to Nitin Sharma
    const nitin = await Student.findOne({ name: /NITIN SHARMA/i });
    if (nitin) {
      const oldEmail = nitin.email;
      const oldMobile = nitin.mobile;
      nitin.email = 'nitinsharmanl54@gmail.com';
      nitin.mobile = '`+91-8107210750';
      await nitin.save();
      console.log(`[SUCCESS] Updated Nitin Sharma: Email: ${oldEmail} -> ${nitin.email} | Mobile: ${oldMobile} -> ${nitin.mobile}`);
      await sendWelcomeEmail(nitin);
    } else {
      console.log('[ERROR] Nitin Sharma not found in database.');
    }

  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
