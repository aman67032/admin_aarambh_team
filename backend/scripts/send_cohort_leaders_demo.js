const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Override default BCC and hourly cap temporarily for this script run
process.env.DEFAULT_BCC = 'amanpratapsingh@jklu.edu.in';
process.env.EMAIL_LIMIT_HOURLY = '100';

const { sendEmail } = require('../services/email');
const User = require('../models/User');

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

    // 2. Fetch all cohort leaders and cluster heads
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const clusterHeads = await User.find({ role: 'cluster_head' });

    if (cohortLeaders.length === 0) {
      console.log('No cohort leaders found in database.');
      return;
    }

    // Map cluster heads for quick lookup
    const clusterHeadsMap = {};
    clusterHeads.forEach(head => {
      if (head.cluster) {
        clusterHeadsMap[head.cluster.toUpperCase()] = head;
      }
    });

    // 3. Resolve attachments
    const attachments = [];
    if (templateContent.includes('cid:bannerImage')) {
      attachments.push({
        filename: 'banner.jpg',
        path: path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg'),
        cid: 'bannerImage'
      });
    }

    if (templateContent.includes('cid:registrationQr')) {
      attachments.push({
        filename: 'registration_qr.png',
        path: path.join(__dirname, '../../admin_aarambh/public/registration_qr.png'),
        cid: 'registrationQr'
      });
    }

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

    console.log(`Resolved ${attachments.length} attachments (including inline banner and handbook/poster).`);

    if (!isLive) {
      // TEST MODE - Send a sample to Aman
      console.log('--- RUNNING IN TEST MODE (SAMPLE TO AMAN) ---');
      const sampleLeader = cohortLeaders[0];
      const clusterHead = clusterHeadsMap[(sampleLeader.cluster || '').toUpperCase()];

      const clName = sampleLeader.name;
      const clPhone = sampleLeader.phone || 'N/A';
      const clEmail = sampleLeader.email;
      const ccEmail = clusterHead ? clusterHead.email : '';

      const rawFirstName = sampleLeader.name.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';

      // Parse template with cohort leader's info acting as the student
      const parsedBody = templateContent
        .replace(/\{\{name\}\}/g, `${sampleLeader.name} (Cohort Leader Demo)`)
        .replace(/\{\{firstName\}\}/g, firstName)
        .replace(/\{\{applicationNo\}\}/g, 'JKLU/2026/DEMO-COHORT')
        .replace(/\{\{course\}\}/g, 'B.Tech')
        .replace(/\{\{cohort\}\}/g, sampleLeader.cohort || 'A1')
        .replace(/\{\{cohortLeaderName\}\}/g, clName)
        .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
        .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

      const recipient = 'amanpratapsingh@jklu.edu.in';
      const subject = `[Demo Mode] Invitation to AARAMBH 2026 - Your Journey Begins!`;

      const finalCc = [ccEmail, 'deepak.sogani@jklu.edu.in'].filter(Boolean).join(', ');
      console.log(`Sending demo email to Aman (${recipient})...`);
      console.log(`CC-ing: ${finalCc}`);

      const result = await sendEmail({
        to: recipient,
        subject: subject,
        body: parsedBody,
        cc: finalCc || undefined,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (result.success) {
        console.log('Demo email sent successfully to Aman!');
      } else {
        console.error('Failed to send demo email:', result.error);
      }
      console.log('To trigger the actual campaign to all cohort leaders, run with: node scripts/send_cohort_leaders_demo.js --live');

    } else {
      // LIVE MODE - Send to all Cohort Leaders
      console.log('--- RUNNING IN LIVE MODE (SEND TO ALL COHORT LEADERS) ---');
      let sentCount = 0;
      let failedCount = 0;

      for (const leader of cohortLeaders) {
        const clusterHead = clusterHeadsMap[(leader.cluster || '').toUpperCase()];

        const clName = leader.name;
        const clPhone = leader.phone || 'N/A';
        const clEmail = leader.email;
        const ccEmail = clusterHead ? clusterHead.email : '';
        const finalCc = [ccEmail, 'deepak.sogani@jklu.edu.in'].filter(Boolean).join(', ');

        const rawFirstName = leader.name.trim().split(' ')[0];
        const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';

        // Parse template
        const parsedBody = templateContent
          .replace(/\{\{name\}\}/g, `${leader.name} (Cohort Leader Demo)`)
          .replace(/\{\{firstName\}\}/g, firstName)
          .replace(/\{\{applicationNo\}\}/g, 'JKLU/2026/DEMO-COHORT')
          .replace(/\{\{course\}\}/g, 'B.Tech')
          .replace(/\{\{cohort\}\}/g, leader.cohort || 'A1')
          .replace(/\{\{cohortLeaderName\}\}/g, clName)
          .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
          .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

        const recipient = leader.email;
        const subject = `[Demo for Cohort Leaders] Invitation to AARAMBH 2026 - Your Journey Begins!`;

        console.log(`Sending demo email to Cohort Leader: ${leader.name} (${recipient})...`);
        console.log(`CC-ing: ${finalCc}`);

        const result = await sendEmail({
          to: recipient,
          subject: subject,
          body: parsedBody,
          cc: finalCc || undefined,
          attachments: attachments.length > 0 ? attachments : undefined
        });

        if (result.success) {
          console.log(`Sent successfully to ${leader.name}!`);
          sentCount++;
        } else {
          console.error(`Failed to send to ${leader.name}:`, result.error);
          failedCount++;
        }

        // Wait 1 second between emails to prevent SMTP spam blocks
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`Outreach campaign complete. Sent: ${sentCount}, Failed: ${failedCount}.`);
    }

  } catch (error) {
    console.error('Execution error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
