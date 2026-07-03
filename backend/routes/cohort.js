const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const Settings = require('../models/Settings');
const { requireAuth, requireRole } = require('../middleware/auth');

async function checkPublished(req) {
  if (req.user.role === 'super_admin') return true;
  const setting = await Settings.findOne({ key: 'studentsPublished' });
  return setting ? !!setting.value : false;
}

// GET /api/cohort/my-students
// Retrieve all students allocated to the logged-in Cohort Leader's cohort, along with coordinator details
router.get('/my-students', requireAuth, requireRole('cohort_leader'), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    const cohortName = req.user.cohort;
    const clusterName = req.user.cluster;

    if (!cohortName) {
      return res.status(400).json({ error: 'Logged-in user is not associated with any cohort.' });
    }

    if (!isPub) {
      return res.json({
        cohortName,
        clusterName,
        leaderName: req.user.name,
        coordinatorName: 'To be assigned',
        students: [],
        notPublished: true
      });
    }

    // Find coordinator (Cluster Head) of this cluster
    let coordinatorName = 'To be assigned';
    if (clusterName) {
      const coordinator = await User.findOne({
        role: 'cluster_head',
        cluster: clusterName
      });
      if (coordinator) {
        coordinatorName = coordinator.name;
      }
    }

    // Find all students in this cohort
    const students = await Student.find({ cohort: cohortName }).sort({ name: 1 });

    res.json({
      cohortName,
      clusterName,
      leaderName: req.user.name,
      coordinatorName,
      students
    });

  } catch (error) {
    console.error('Fetch my-students error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/cohort/call-log/:studentId
// Add a call log notes as a Cohort Leader (starts as unverified)
router.post('/call-log/:studentId', requireAuth, requireRole('cohort_leader'), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    if (!isPub) {
      return res.status(403).json({ error: 'Student data is not published yet.' });
    }

    const { studentId } = req.params;
    const { notes } = req.body;

    if (!notes || notes.trim() === '') {
      return res.status(400).json({ error: 'Call notes cannot be empty.' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Ensure Cohort Leader only modifies students in their own cohort
    if (student.cohort !== req.user.cohort) {
      return res.status(403).json({ error: 'Access denied. You can only log calls for students in your own cohort.' });
    }

    student.callLogs.push({
      notes: notes.trim(),
      loggedBy: req.user._id,
      loggedByName: req.user.name,
      verified: false // Unverified until Cluster Head approves
    });

    // Recompute verified calls count
    student.callCount = student.callLogs.filter(log => log.verified).length;

    await student.save();

    res.json({
      success: true,
      message: 'Call log added (pending coordinator verification).',
      student
    });

  } catch (error) {
    console.error('Cohort add call log error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
