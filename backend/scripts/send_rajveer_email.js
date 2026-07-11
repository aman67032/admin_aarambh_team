const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

const TARGET_APP_NO = "JKLU/B.TECH/2026/2809";

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // 1. Read email template
    const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at: ${templatePath}`);
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // 2. Fetch student
    const student = await Student.findOne({ applicationNo: TARGET_APP_NO });
    if (!student) {
      console.log(`Student with Application Number ${TARGET_APP_NO} not found in database.`);
      return;
    }

    // 3. Fetch cohort leader for A1
    const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: student.cohort });
    const clName = cohortLeader ? cohortLeader.name : 'N/A';
    const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
    const clEmail = cohortLeader ? cohortLeader.email : 'N/A';
    const ccEmail = cohortLeader ? cohortLeader.email : '';

    console.log(`\n=== Student Details ===`);
    console.log(`Name: ${student.name}`);
    console.log(`Email: ${student.email}`);
    console.log(`Cohort: ${student.cohort}`);
    console.log(`Cohort Leader: ${clName} (${clEmail})`);
    console.log(`=======================\n`);

    // Parse template variables
    const rawFirstName = student.name.trim().split(' ')[0];
    const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
    
    let parsedBody = templateContent
      .replace(/\{\{name\}\}/g, student.name)
      .replace(/\{\{firstName\}\}/g, firstName)
      .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
      .replace(/\{\{course\}\}/g, student.course)
      .replace(/\{\{cohort\}\}/g, student.cohort)
      .replace(/\{\{cohortLeaderName\}\}/g, clName)
      .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
      .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

    // Build attachments
    const attachments = [];
    
    // Banner
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

    console.log(`Sending live email to: ${student.name} (${student.email}) CC: ${ccEmail}...`);

    const result = await sendEmail({
      to: student.email,
      subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
      body: parsedBody,
      cc: ccEmail || undefined,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    if (result.success) {
      console.log(`-> SUCCESS! Welcome email sent.`);
      student.mailReceived = true;
      await student.save();
    } else if (result.queued) {
      console.log(`-> QUEUED (Rate limit reached)`);
    } else {
      console.log(`-> FAILED: ${result.error}`);
    }

  } catch (error) {
    console.error('Email campaign error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
