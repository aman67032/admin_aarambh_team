const express = require('express');
const router = express.Router();
const { sendEmail, checkRateLimit } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');
const EmailLog = require('../models/EmailLog');
const { requireAuth, requireRole } = require('../middleware/auth');

// POST /api/email/send-trial
// Send a test mail to verification address (Super Admin)
router.post('/send-trial', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { testEmail } = req.body;
    const recipient = testEmail || req.user.email;

    const result = await sendEmail({
      to: recipient,
      subject: 'Aarambh 2026 Portal - SMTP Server Trial Mail',
      body: `<h3>SMTP Server Check Successful</h3>
             <p>This is a trial email sent from the Aarambh 2026 Team Portal to verify Outlook SMTP server settings.</p>
             <p>Sent at: ${new Date().toLocaleString()}</p>`
    });

    if (result.success) {
      res.json({ success: true, message: `Trial email sent successfully to ${recipient}.` });
    } else {
      res.status(500).json({ error: `Failed to send trial email: ${result.error}` });
    }

  } catch (error) {
    console.error('Send trial error:', error);
    res.status(500).json({ error: 'Server error during trial mail send: ' + error.message });
  }
});

// GET /api/email/rate-status
// Check remaining quota (hourly and daily limits)
router.get('/rate-status', requireAuth, async (req, res) => {
  try {
    const status = await checkRateLimit();
    res.json({
      success: true,
      allowed: status.allowed,
      reason: status.reason || null,
      hourlyCount: status.hourlyCount,
      hourlyLimit: parseInt(process.env.EMAIL_LIMIT_HOURLY || '50'),
      dailyCount: status.dailyCount,
      dailyLimit: parseInt(process.env.EMAIL_LIMIT_DAILY || '300')
    });
  } catch (error) {
    console.error('Rate status error:', error);
    res.status(500).json({ error: 'Failed to retrieve email rate status.' });
  }
});

// POST /api/email/send-bulk
// Send template-based emails to selected students
router.post('/send-bulk', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { studentIds, subject, bodyTemplate, bcc } = req.body;

    if (!subject || !bodyTemplate) {
      return res.status(400).json({ error: 'Subject and Body Template are required.' });
    }

    // Query students
    let query = {};
    if (studentIds && Array.isArray(studentIds) && studentIds.length > 0) {
      query = { _id: { $in: studentIds } };
    }

    const students = await Student.find(query);
    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found to email.' });
    }

    // Retrieve all cohort leaders to map to students quickly
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const cohortLeadersMap = {};
    cohortLeaders.forEach(leader => {
      if (leader.cohort) {
        cohortLeadersMap[leader.cohort] = leader;
      }
    });

    let sentCount = 0;
    let queuedCount = 0;
    let failedCount = 0;
    const errors = [];

    for (const student of students) {
      const cohortLeader = cohortLeadersMap[student.cohort];
      const ccEmail = cohortLeader ? cohortLeader.email : '';
      const clName = cohortLeader ? cohortLeader.name : 'N/A';
      const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';

      // Parse template variables
      let parsedBody = bodyTemplate
        .replace(/\{\{name\}\}/g, student.name)
        .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
        .replace(/\{\{course\}\}/g, student.course)
        .replace(/\{\{cohort\}\}/g, student.cohort)
        .replace(/\{\{cohortLeaderName\}\}/g, clName)
        .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone);

      // Attempt sending
      const result = await sendEmail({
        to: student.email,
        subject: subject,
        body: parsedBody,
        cc: ccEmail,
        bcc: bcc
      });

      if (result.success) {
        sentCount++;
      } else if (result.queued) {
        queuedCount++;
      } else {
        failedCount++;
        errors.push({ student: student.name, email: student.email, error: result.error });
      }
    }

    res.json({
      success: true,
      message: `Bulk email processing complete. Sent: ${sentCount}, Queued: ${queuedCount}, Failed: ${failedCount}.`,
      sentCount,
      queuedCount,
      failedCount,
      errors
    });

  } catch (error) {
    console.error('Send bulk error:', error);
    res.status(500).json({ error: 'Server error during bulk email sending: ' + error.message });
  }
});

// GET /api/email/logs
// Retrieve recent email logs
router.get('/logs', requireAuth, async (req, res) => {
  try {
    const logs = await EmailLog.find({})
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    console.error('Fetch logs error:', error);
    res.status(500).json({ error: 'Failed to retrieve email logs.' });
  }
});

module.exports = router;
