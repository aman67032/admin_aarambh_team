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

    // 1. Fix Gaurav Soni details
    const gaurav = await Student.findOne({ name: /GAURAV SONI/i });
    if (gaurav) {
      console.log('\n--- Current Gaurav Soni Document ---');
      console.log(gaurav);

      gaurav.mobile = '`+91-9660286818';
      gaurav.email = 'gauravgssoni63@gmail.com';
      gaurav.fatherName = 'SHANKAR SONI';
      gaurav.city = 'JAIPUR';
      gaurav.district = 'JAIPUR';
      gaurav.state = 'RAJASTHAN';

      await gaurav.save();
      console.log('[SUCCESS] Updated Gaurav Soni\'s details!');

      // Send welcome email to Gaurav Soni
      console.log(`Sending welcome email to Gaurav Soni (gauravgssoni63@gmail.com)...`);
      const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
      if (fs.existsSync(templatePath)) {
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: gaurav.cohort });
        const clName = cohortLeader ? cohortLeader.name : 'N/A';
        const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
        const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

        const rawFirstName = gaurav.name.trim().split(' ')[0];
        const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
        const greetingName = gaurav.region === 'South' ? gaurav.name : firstName;

        const parsedBody = templateContent
          .replace(/\{\{name\}\}/g, gaurav.name)
          .replace(/\{\{firstName\}\}/g, greetingName)
          .replace(/\{\{applicationNo\}\}/g, gaurav.applicationNo)
          .replace(/\{\{course\}\}/g, gaurav.course)
          .replace(/\{\{cohort\}\}/g, gaurav.cohort)
          .replace(/\{\{cohortLeaderName\}\}/g, clName)
          .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
          .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

        const attachments = [];
        const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
        if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
          attachments.push({ filename: 'banner.jpg', path: bannerPath, cid: 'bannerImage' });
        }
        const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
        if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
          attachments.push({ filename: 'registration_qr.png', path: qrPath, cid: 'registrationQr' });
        }
        const attachmentDir = path.join(__dirname, '../../admin_aarambh/public/Email Attachment');
        if (fs.existsSync(attachmentDir)) {
          fs.readdirSync(attachmentDir).forEach(file => {
            const fp = path.join(attachmentDir, file);
            if (fs.statSync(fp).isFile()) attachments.push({ filename: file, path: fp });
          });
        }

        const result = await sendEmail({
          to: 'gauravgssoni63@gmail.com',
          subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
          body: parsedBody,
          cc: clEmail || undefined,
          attachments: attachments.length > 0 ? attachments : undefined
        });

        if (result.success) {
          console.log(`[SUCCESS] Welcome email sent to Gaurav Soni!`);
        } else {
          console.log(`[ERROR] Failed to send email to Gaurav Soni: ${result.error}`);
        }
      }
    } else {
      console.log('[ERROR] Gaurav Soni not found in database.');
    }

    // 2. Verify and potentially fix Ashwary Sharma's email
    const ashwary = await Student.findOne({ name: /ASHWARY SHARMA/i });
    if (ashwary) {
      console.log('\n--- Current Ashwary Sharma Document ---');
      console.log(ashwary);

      const targetEmail = 'ramkumarsharmar02283@gmail.com';
      if (ashwary.email !== targetEmail) {
        console.log(`Updating Ashwary's email from ${ashwary.email} to ${targetEmail}...`);
        ashwary.email = targetEmail;
        await ashwary.save();

        // Send welcome email to Ashwary
        console.log(`Sending welcome email to Ashwary Sharma (${targetEmail})...`);
        const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
        if (fs.existsSync(templatePath)) {
          const templateContent = fs.readFileSync(templatePath, 'utf8');
          const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: ashwary.cohort });
          const clName = cohortLeader ? cohortLeader.name : 'N/A';
          const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
          const clEmail = cohortLeader ? cohortLeader.email : 'N/A';

          const rawFirstName = ashwary.name.trim().split(' ')[0];
          const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
          const greetingName = ashwary.region === 'South' ? ashwary.name : firstName;

          const parsedBody = templateContent
            .replace(/\{\{name\}\}/g, ashwary.name)
            .replace(/\{\{firstName\}\}/g, greetingName)
            .replace(/\{\{applicationNo\}\}/g, ashwary.applicationNo)
            .replace(/\{\{course\}\}/g, ashwary.course)
            .replace(/\{\{cohort\}\}/g, ashwary.cohort)
            .replace(/\{\{cohortLeaderName\}\}/g, clName)
            .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
            .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

          const attachments = [];
          const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
          if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
            attachments.push({ filename: 'banner.jpg', path: bannerPath, cid: 'bannerImage' });
          }
          const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
          if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
            attachments.push({ filename: 'registration_qr.png', path: qrPath, cid: 'registrationQr' });
          }
          const attachmentDir = path.join(__dirname, '../../admin_aarambh/public/Email Attachment');
          if (fs.existsSync(attachmentDir)) {
            fs.readdirSync(attachmentDir).forEach(file => {
              const fp = path.join(attachmentDir, file);
              if (fs.statSync(fp).isFile()) attachments.push({ filename: file, path: fp });
            });
          }

          const result = await sendEmail({
            to: targetEmail,
            subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
            body: parsedBody,
            cc: clEmail || undefined,
            attachments: attachments.length > 0 ? attachments : undefined
          });

          if (result.success) {
            console.log(`[SUCCESS] Welcome email sent to Ashwary Sharma!`);
          } else {
            console.log(`[ERROR] Failed to send email to Ashwary Sharma: ${result.error}`);
          }
        }
      } else {
        console.log(`[INFO] Ashwary's email is already set to the correct one: ${targetEmail}`);
      }
    } else {
      console.log('[ERROR] Ashwary Sharma not found in database.');
    }

  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
