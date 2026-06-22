const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

// GET /api/cohort/my-students
// Retrieve all students allocated to the logged-in Cohort Leader's cohort, along with coordinator details
router.get('/my-students', requireAuth, requireRole('cohort_leader'), async (req, res) => {
  try {
    const cohortName = req.user.cohort;
    const clusterName = req.user.cluster;

    if (!cohortName) {
      return res.status(400).json({ error: 'Logged-in user is not associated with any cohort.' });
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
    res.status(500).json({ error: 'Server error retrieving cohort details: ' + error.message });
  }
});

module.exports = router;
