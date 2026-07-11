const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

const TARGET_APP_NOS = new Set([
  "JKLU/B.TECH/2026/1376",
  "JKLU/B.TECH/2026/1665",
  "JKLU/B.TECH/2026/2033",
  "JKLU/B.TECH/2026/2595",
  "JKLU/BBA/2026/0364",
  "JKLU/B.TECH/2026/2334",
  "JKLU/B.TECH/2026/2795",
  "JKLU/B.DES./2026/0728"
].map(app => app.toUpperCase().trim()));

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

    // 2. Fetch cohort leaders map
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const cohortLeadersMap = {};
    cohortLeaders.forEach(leader => {
      if (leader.cohort) {
        cohortLeadersMap[leader.cohort] = leader;
      }
    });

    // 3. Find students
    const allStudents = await Student.find({});
    const studentsToEmail = allStudents.filter(student => {
      const app = student.applicationNo ? student.applicationNo.toUpperCase().trim() : '';
      return TARGET_APP_NOS.has(app);
    });

    console.log(`\n=== Verification Status ===`);
    console.log(`Total students to email: ${studentsToEmail.length}`);
    console.log('===========================\n');

    if (studentsToEmail.length === 0) {
      console.log('No matching students found in database. Exiting.');
      return;
    }

    console.log(`STARTING LIVE EMAIL CAMPAIGN FOR 8 NEW STUDENTS...\n`);

    let sentCount = 0;
    let queuedCount = 0;
    let failedCount = 0;

    for (const student of studentsToEmail) {
      const cohortLeader = cohortLeadersMap[student.cohort];
      const ccEmail = cohortLeader ? cohortLeader.email : '';
      const clName = cohortLeader ? cohortLeader.name : 'N/A';
      const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
      const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

      // Parse template variables
      const rawFirstName = student.name.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
      const greetingName = student.region === 'South' ? student.name : firstName;
      
      let parsedBody = templateContent
        .replace(/\{\{name\}\}/g, student.name)
        .replace(/\{\{firstName\}\}/g, greetingName)
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

      console.log(`Sending email to: ${student.name} (${student.email}) CC: ${ccEmail}...`);

      const result = await sendEmail({
        to: student.email,
        subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
        body: parsedBody,
        cc: ccEmail || undefined,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (result.success) {
        sentCount++;
        console.log(`  -> SUCCESS!`);
        student.mailReceived = true;
        await student.save();
      } else if (result.queued) {
        queuedCount++;
        console.log(`  -> QUEUED (Rate limit reached)`);
      } else {
        failedCount++;
        console.log(`  -> FAILED: ${result.error}`);
      }
    }

    console.log(`\n=== Campaign Finished ===`);
    console.log(`Total Sent: ${sentCount}`);
    console.log(`Total Queued: ${queuedCount}`);
    console.log(`Total Failed: ${failedCount}`);
    console.log('=========================\n');

  } catch (error) {
    console.error('Campaign error:', error);
  } finally {
    await mongoose.connect(process.env.MONGODB_URI); // Make sure it's closed correctly
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
