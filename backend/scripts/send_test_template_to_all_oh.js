const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function sendBulkTest() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // Read the email template
    const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Retrieve a sample student and cohort leader for replacements
    const student = await Student.findOne({}) || {
      name: 'Test Student',
      applicationNo: 'JKLU/2026/BTECH/S1001',
      course: 'B.Tech',
      cohort: 'A1',
      email: 'test@example.com'
    };

    const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: student.cohort }) || {
      name: 'Vedika Agrawal',
      phone: '9772219303',
      email: 'vedikaagrawal@jklu.edu.in'
    };

    const rawFirstName = student.name.trim().split(' ')[0];
    const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
    const clName = cohortLeader.name;
    const clPhone = cohortLeader.phone || 'N/A';
    const clEmail = cohortLeader.email;

    // Parse template
    const parsedBody = templateContent
      .replace(/\{\{name\}\}/g, student.name)
      .replace(/\{\{firstName\}\}/g, firstName)
      .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
      .replace(/\{\{course\}\}/g, student.course)
      .replace(/\{\{cohort\}\}/g, student.cohort)
      .replace(/\{\{cohortLeaderName\}\}/g, clName)
      .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
      .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

    const subject = `Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!`;

    const attachments = [];
    if (parsedBody.includes('cid:bannerImage')) {
      attachments.push({
        filename: 'banner.jpg',
        path: path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg'),
        cid: 'bannerImage'
      });
    }

    const recipients = [
      'deepak.sogani@jklu.edu.in',
      'deepaksogani@jklu.edu.in',
      'vedikaagrawal@jklu.edu.in',
      'amanpratapsingh@jklu.edu.in',
      'vaishnavishukla@jklu.edu.in',
      'tanikgupta@jklu.edu.in',
      'ambikadalmia@jklu.edu.in'
    ];

    console.log(`Starting campaign to send to ${recipients.length} recipients...`);

    for (const recipient of recipients) {
      console.log(`Sending email to ${recipient}...`);
      try {
        const result = await sendEmail({
          to: recipient,
          subject: subject,
          body: parsedBody,
          attachments: attachments.length > 0 ? attachments : undefined
        });

        if (result.success) {
          console.log(`  [SUCCESS] Email sent to ${recipient}`);
        } else {
          console.error(`  [FAILED] Failed to send to ${recipient}:`, result.error || 'Unknown error');
        }
      } catch (err) {
        console.error(`  [ERROR] Exception sending to ${recipient}:`, err.message);
      }
      
      // Add a small delay between sends (e.g. 500ms) to ensure smooth sending via SMTP server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Campaign execution finished.');

  } catch (error) {
    console.error('Error in sendBulkTest:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

sendBulkTest();
