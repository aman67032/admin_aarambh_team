const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { requireAuth, requireRole } = require('../middleware/auth');

// Normalize application numbers for robust comparison
const normalizeAppNo = (appNo) => {
  if (!appNo) return '';
  return appNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
};

// GET /api/arrival/student/:applicationNo
// Verify student identity using Application No
router.get('/student/:applicationNo', async (req, res) => {
  try {
    let { applicationNo } = req.params;

    if (!applicationNo) {
      return res.status(400).json({ error: 'Application number is required.' });
    }

    const cleanAppNo = normalizeAppNo(applicationNo);

    // Query database for matching student
    const students = await Student.find({});
    const matchedStudent = students.find(s => 
      normalizeAppNo(s.applicationNo) === cleanAppNo
    );

    if (!matchedStudent) {
      return res.status(404).json({ error: 'No student matches the provided Application Number.' });
    }

    res.json({
      name: matchedStudent.name,
      applicationNo: matchedStudent.applicationNo,
      email: matchedStudent.email || '',
      course: matchedStudent.course,
      cohort: matchedStudent.cohort,
      arrivalInfo: matchedStudent.arrivalInfo || null
    });

  } catch (err) {
    console.error('Error verifying student for arrival:', err);
    res.status(500).json({ error: 'An error occurred during verification.' });
  }
});

// POST /api/arrival/declare
// Submit or update arrival/transport details
router.post('/declare', async (req, res) => {
  try {
    const { 
      applicationNo, 
      isFromJaipur, 
      jaipurArea, 
      wantsBus, 
      arrivalDate, 
      arrivalTime, 
      transportMode 
    } = req.body;

    if (!applicationNo) {
      return res.status(400).json({ error: 'Application number is required.' });
    }

    const cleanAppNo = normalizeAppNo(applicationNo);

    // Query database for matching student
    const students = await Student.find({});
    const matchedStudent = students.find(s => 
      normalizeAppNo(s.applicationNo) === cleanAppNo
    );

    if (!matchedStudent) {
      return res.status(404).json({ error: 'No student matches the provided Application Number.' });
    }

    // Set arrivalInfo sub-document
    matchedStudent.arrivalInfo = {
      isFromJaipur: !!isFromJaipur,
      jaipurArea: isFromJaipur ? (jaipurArea || '').trim() : undefined,
      wantsBus: isFromJaipur ? !!wantsBus : undefined,
      arrivalDate: !isFromJaipur ? (arrivalDate || '').trim() : undefined,
      arrivalTime: !isFromJaipur ? (arrivalTime || '').trim() : undefined,
      transportMode: !isFromJaipur ? (transportMode || '').trim() : undefined,
      declaredAt: new Date()
    };

    await matchedStudent.save();

    res.json({ 
      success: true, 
      message: 'Arrival details recorded successfully!',
      arrivalInfo: matchedStudent.arrivalInfo 
    });

  } catch (err) {
    console.error('Error declaring arrival details:', err);
    res.status(500).json({ error: 'Failed to submit arrival details.' });
  }
});

// GET /api/arrival/all
// Retrieve all student arrival declarations (Admin/Super Admin only)
router.get('/all', requireAuth, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const declaredStudents = await Student.find({
      'arrivalInfo.declaredAt': { $exists: true }
    }).select('name applicationNo email course gender cohort cluster arrivalInfo');

    res.json({ success: true, declarations: declaredStudents });
  } catch (err) {
    console.error('Error fetching all arrival declarations:', err);
    res.status(500).json({ error: 'Failed to retrieve arrival logs.' });
  }
});

module.exports = router;
