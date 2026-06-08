const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

// GET /api/cluster/cohorts
// Get cohorts, cohort leaders, and student listings under the logged-in Cluster Head's cluster
router.get('/cohorts', requireAuth, requireRole('cluster_head'), async (req, res) => {
  try {
    const clusterName = req.user.cluster;
    if (!clusterName) {
      return res.status(400).json({ error: 'Logged-in user is not associated with any cluster.' });
    }

    // Find all cohort leaders in this cluster
    const cohortLeaders = await User.find({
      role: 'cohort_leader',
      cluster: clusterName
    }).select('-password');

    // Find all students in this cluster
    const students = await Student.find({ cluster: clusterName }).sort({ cohort: 1, name: 1 });

    // Group students by cohort
    const cohortData = {};
    
    // Initialize with seeded cohort leaders
    cohortLeaders.forEach(leader => {
      cohortData[leader.cohort] = {
        cohortName: leader.cohort,
        leader: {
          id: leader._id,
          name: leader.name,
          email: leader.email,
          phone: leader.phone,
          studentId: leader.studentId
        },
        students: []
      };
    });

    // If there are cohorts with no leader in DB (shouldn't happen), initialize them
    students.forEach(student => {
      const cohort = student.cohort;
      if (!cohortData[cohort]) {
        cohortData[cohort] = {
          cohortName: cohort,
          leader: null,
          students: []
        };
      }
      cohortData[cohort].students.push(student);
    });

    res.json({
      cluster: clusterName,
      cohorts: Object.values(cohortData)
    });

  } catch (error) {
    console.error('Fetch cluster cohorts error:', error);
    res.status(500).json({ error: 'Server error retrieving cluster details: ' + error.message });
  }
});

// PUT /api/cluster/verify/:studentId
// Verify that student mail is received and documents are verified
router.put('/verify/:studentId', requireAuth, requireRole('cluster_head'), async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mailReceived, documentsVerified } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Ensure Cluster Head only modifies students in their own cluster
    if (student.cluster !== req.user.cluster) {
      return res.status(403).json({ error: 'You can only modify students in your own cluster.' });
    }

    student.mailReceived = mailReceived !== undefined ? mailReceived : student.mailReceived;
    student.documentsVerified = documentsVerified !== undefined ? documentsVerified : student.documentsVerified;

    if (student.mailReceived && student.documentsVerified) {
      student.verifiedAt = new Date();
      student.verifiedBy = req.user._id;
    }

    await student.save();

    res.json({
      success: true,
      message: 'Student documents/mail verification updated successfully.',
      student
    });

  } catch (error) {
    console.error('Verify student error:', error);
    res.status(500).json({ error: 'Server error updating student verification: ' + error.message });
  }
});

// POST /api/cluster/call-log/:studentId
// Add a call log notes and increment call count
router.post('/call-log/:studentId', requireAuth, requireRole('cluster_head'), async (req, res) => {
  try {
    const { studentId } = req.params;
    const { notes } = req.body;

    if (!notes || notes.trim() === '') {
      return res.status(400).json({ error: 'Call notes cannot be empty.' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Ensure Cluster Head only modifies students in their own cluster
    if (student.cluster !== req.user.cluster) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // Ensure verification is complete before logging call
    if (!student.mailReceived || !student.documentsVerified) {
      return res.status(400).json({ error: 'Verification must be completed before logging calls.' });
    }

    student.callLogs.push({
      notes: notes.trim(),
      loggedBy: req.user._id,
      loggedByName: req.user.name
    });

    student.callCount = student.callLogs.length;

    await student.save();

    res.json({
      success: true,
      message: 'Call log added successfully.',
      student
    });

  } catch (error) {
    console.error('Add call log error:', error);
    res.status(500).json({ error: 'Server error logging call: ' + error.message });
  }
});

// PUT /api/cluster/confirm/:studentId
// Set confirmation status for student
router.put('/confirm/:studentId', requireAuth, requireRole('cluster_head'), async (req, res) => {
  try {
    const { studentId } = req.params;
    const { confirmedAarambh, confirmedJklu, notContinuing, confirmationNote } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Ensure Cluster Head only modifies students in their own cluster
    if (student.cluster !== req.user.cluster) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // Verification must be complete
    if (!student.mailReceived || !student.documentsVerified) {
      return res.status(400).json({ error: 'Verification must be completed before confirming status.' });
    }

    student.confirmedAarambh = confirmedAarambh !== undefined ? confirmedAarambh : student.confirmedAarambh;
    student.confirmedJklu = confirmedJklu !== undefined ? confirmedJklu : student.confirmedJklu;
    student.notContinuing = notContinuing !== undefined ? notContinuing : student.notContinuing;
    
    if (confirmationNote !== undefined) {
      student.confirmationNote = confirmationNote.trim();
    }

    student.confirmedAt = new Date();
    student.confirmedBy = req.user._id;

    await student.save();

    res.json({
      success: true,
      message: 'Confirmation status updated successfully.',
      student
    });

  } catch (error) {
    console.error('Confirm student error:', error);
    res.status(500).json({ error: 'Server error updating confirmation status: ' + error.message });
  }
});

module.exports = router;
