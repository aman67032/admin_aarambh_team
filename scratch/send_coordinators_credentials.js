const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const User = require('../backend/models/User');

const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  console.error("Error: SMTP_USER and SMTP_PASS must be configured in backend/.env!");
  process.exit(1);
}

// CC Addresses
const ccAddresses = [
  'deepak.sogani@jklu.edu.in',
  'vaishnavishukla@jklu.edu.in',
  'amanpratapsingh@jklu.edu.in',
  'ambikadalmia@jklu.edu.in',
  'tanikgupta@jklu.edu.in',
  'vedikaagrawal@jklu.edu.in'
];

function getPassword(name) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanName}@2026`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Fetch Cluster Heads and Cohort Leaders
    const clusterHeads = await User.find({ role: 'cluster_head' }).sort({ cluster: 1 });
    const cohortLeaders = await User.find({ role: 'cohort_leader' }).sort({ cohort: 1 });

    console.log(`Found ${clusterHeads.length} Cluster Heads and ${cohortLeaders.length} Cohort Leaders.`);

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

    // Send emails
    for (let idx = 0; idx < clusterHeads.length; idx++) {
      const head = clusterHeads[idx];
      const cluster = head.cluster;
      
      // Find cohort leaders in this cluster
      const leadersInCluster = cohortLeaders.filter(l => l.cluster === cluster);

      console.log(`[${idx + 1}/${clusterHeads.length}] Preparing email for Cluster ${cluster} Head: ${head.name} (${head.email})...`);

      // Build cohort leaders table rows
      let tableRows = '';
      leadersInCluster.forEach(leader => {
        const password = getPassword(leader.name);
        tableRows += `
          <tr>
            <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px;"><strong>${leader.cohort}</strong></td>
            <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px;">${leader.name}</td>
            <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px;">${leader.email}</td>
            <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px;"><code>${password}</code></td>
          </tr>
        `;
      });

      const headPassword = getPassword(head.name);

      // Email HTML Body
      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; line-height: 1.6; }
          .container { max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 24px; text-align: center; }
          .content { padding: 32px 24px; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          .credentials-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 12px; margin: 20px 0; }
          .warning-banner { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0; color: #b45309; font-size: 13px; font-weight: 600; }
          .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div class="header" style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 24px; text-align: center;">
            <h2 style="margin: 0;">AARAMBH &apos;26 TEAM PORTAL</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Orientation Program Portal Management</p>
          </div>
          
          <div class="content" style="padding: 32px 24px; color: #334155; line-height: 1.6;">
            <p>Dear <strong>${head.name}</strong>,</p>
            
            <p>You have been assigned as the <strong>Cluster Head for Cluster ${cluster}</strong> for the Aarambh '26 Orientation Program. Below are your credentials to log in to the management portal where you can verify student documents, record calling logs, and track orientation status.</p>

            <!-- HIGHLIGHTED NOTICE -->
            <div class="warning-banner" style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0; color: #b45309; font-size: 13px; font-weight: 600;">
              ⚠️ IMPORTANT NOTICE:<br>
              Please note that the existing student data currently in the portal is TEMPORARY for testing and verification purposes. Official student distributions will be confirmed and re-allocated soon.
            </div>

            <!-- CLUSTER HEAD CREDENTIALS -->
            <div class="credentials-box" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 12px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #15803d;">Your Coordinator Credentials:</h4>
              <strong>Login Link:</strong> <a href="https://admin-aarambh-team-crat.vercel.app/cluster-head" style="color: #3b82f6; font-weight: bold;">Portal Login Page</a><br>
              <strong>Email ID:</strong> ${head.email}<br>
              <strong>Password:</strong> ${headPassword}
            </div>

            <p>Please share the following login details with your respective <strong>Cohort Leaders</strong> so they can view and track their assigned cohort students:</p>

            <!-- COHORT LEADERS TABLE -->
            <table class="table" style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <thead>
                <tr style="background-color: #f1f5f9;">
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; color: #1e293b; font-weight: bold;">Cohort</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; color: #1e293b; font-weight: bold;">Cohort Leader</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; color: #1e293b; font-weight: bold;">Email</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; color: #1e293b; font-weight: bold;">Password</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>

            <!-- INSTRUCTIONS & LINKS -->
            <h4 style="margin: 24px 0 10px 0; color: #1e293b;">Cohort Leader Portals:</h4>
            <p style="font-size: 13px; margin: 5px 0;">
              • <strong>Cohort Leader Dashboard</strong> (to view their cohort's students): <br>
              <a href="https://admin-aarambh-team-crat.vercel.app/cohort-leader" style="color: #3b82f6; font-weight: bold;">https://admin-aarambh-team-crat.vercel.app/cohort-leader</a>
            </p>
            <p style="font-size: 13px; margin: 5px 0;">
              • <strong>All Cohorts Registration Leaderboard</strong> (to check registrations across all cohorts): <br>
              <a href="https://admin-aarambh-team-crat.vercel.app/cohort-registrations" style="color: #3b82f6; font-weight: bold;">https://admin-aarambh-team-crat.vercel.app/cohort-registrations</a>
            </p>

            <p style="margin-top: 30px;">Regards,<br><strong>Team Aarambh &apos;26</strong><br>JK Lakshmipat University, Jaipur</p>
          </div>
          
          <div class="footer" style="background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            JK Lakshmipat University, Jaipur &copy; 2026 All Rights Reserved.
          </div>
        </div>
      </body>
      </html>
      `;

      const mailOptions = {
        from: smtpUser,
        to: head.email,
        cc: ccAddresses,
        subject: `Aarambh '26 Portal - Cluster ${cluster} Head & Cohort Leader credentials`,
        html: emailHtml
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`   ✅ Sent successfully! Message ID: ${info.messageId}`);
      } catch (sendErr) {
        console.error(`   ❌ Failed to send to ${head.email}:`, sendErr.message);
      }

      // 3 seconds delay between emails to satisfy SMTP limits
      console.log('Waiting 3 seconds before sending next...');
      await delay(3000);
    }

    console.log('\nAll Cluster Heads have been emailed credentials successfully.');

  } catch (err) {
    console.error('Execution error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

run();
