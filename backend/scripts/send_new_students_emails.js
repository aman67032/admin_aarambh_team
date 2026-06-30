const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');
const EmailLog = require('../models/EmailLog');

async function main() {
  const isLive = process.argv.includes('--live');

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

    // 2. Fetch all cohort leaders
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const cohortLeadersMap = {};
    cohortLeaders.forEach(leader => {
      if (leader.cohort) {
        cohortLeadersMap[leader.cohort] = leader;
      }
    });

    // 3. Find already sent / pending email recipients
    const successfulLogs = await EmailLog.find({ status: { $in: ['sent', 'pending'] } }, 'to').lean();
    const sentEmails = new Set(successfulLogs.map(log => log.to ? log.to.toLowerCase().trim() : ''));

    // 4. Find all students and filter for unsent
    const allStudents = await Student.find({});
    const newStudents = allStudents.filter(student => {
      const studentEmail = student.email ? student.email.toLowerCase().trim() : '';
      return !sentEmails.has(studentEmail);
    });

    console.log(`\n=== Verification Status ===`);
    console.log(`Total students in DB: ${allStudents.length}`);
    console.log(`Already emailed: ${allStudents.length - newStudents.length}`);
    console.log(`New/Unsent students: ${newStudents.length}`);
    console.log(`===========================\n`);

    if (newStudents.length === 0) {
      console.log('No new students to email. Exiting.');
      return;
    }

    if (!isLive) {
      console.log('DRY RUN: Showing details of the new students to receive emails:');
      newStudents.forEach((student, idx) => {
        const cohortLeader = cohortLeadersMap[student.cohort];
        const clName = cohortLeader ? cohortLeader.name : 'N/A';
        console.log(`  ${idx + 1}. [${student.cohort}] ${student.name} (${student.email}) | CL: ${clName}`);
      });
      console.log('\nTo actually trigger the emails, run the command with the --live flag:');
      console.log('  node scripts/send_new_students_emails.js --live\n');
      return;
    }

    console.log(`STARTING LIVE EMAIL CAMPAIGN FOR ${newStudents.length} NEW STUDENTS...\n`);

    let sentCount = 0;
    let queuedCount = 0;
    let failedCount = 0;

    for (const student of newStudents) {
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
    console.log(`=========================\n`);

  } catch (error) {
    console.error('Campaign error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
