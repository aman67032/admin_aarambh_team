const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const prince = await Student.findOne({ name: /PRINCE YADAV/i });
    if (prince) {
      console.log(`\nPreparing to send welcome email to Prince Yadav (${prince.email})...`);
      
      const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Email template not found at: ${templatePath}`);
      }
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Fetch cohort leader (I1 Cohort Leader)
      const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: prince.cohort });
      const clName = cohortLeader ? cohortLeader.name : 'N/A';
      const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
      const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

      // Parse greeting name
      const rawFirstName = prince.name.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
      const greetingName = prince.region === 'South' ? prince.name : firstName;

      const parsedBody = templateContent
        .replace(/\{\{name\}\}/g, prince.name)
        .replace(/\{\{firstName\}\}/g, greetingName)
        .replace(/\{\{applicationNo\}\}/g, prince.applicationNo)
        .replace(/\{\{course\}\}/g, prince.course)
        .replace(/\{\{cohort\}\}/g, prince.cohort)
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
        to: prince.email,
        subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
        body: parsedBody,
        cc: clEmail || undefined,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (result.success) {
        console.log(`[SUCCESS] Welcome email successfully sent/resent to Prince Yadav!`);
        // Mark mailReceived as true in case it wasn't
        prince.mailReceived = true;
        await prince.save();
      } else if (result.queued) {
        console.log(`[QUEUED] Welcome email queued for Prince Yadav (rate limit reached).`);
      } else {
        console.log(`[ERROR] Failed to send email: ${result.error}`);
      }

    } else {
      console.log('[ERROR] Prince Yadav not found in database.');
    }

  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
