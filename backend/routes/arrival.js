const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { requireAuth, requireRole } = require('../middleware/auth');

// Normalize application numbers for robust comparison
const normalizeAppNo = (appNo) => {
  if (!appNo) return '';
  return appNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
};

// GET /api/arrival/verify
// Verify student identity using Cohort name, Application Number, and Access Code
router.get('/verify', async (req, res) => {
  try {
    const { cohort, applicationNo, code } = req.query;

    if (!cohort || !applicationNo || !code) {
      return res.status(400).json({ error: 'Cohort name, application number, and access code are required.' });
    }

    const cleanCohort = cohort.toUpperCase().trim();
    const cleanAppNo = normalizeAppNo(applicationNo);
    const cleanCode = code.trim();

    // Query database for matching student
    const students = await Student.find({
      cohort: cleanCohort,
      arrivalCode: cleanCode
    });

    const matchedStudent = students.find(s => 
      normalizeAppNo(s.applicationNo) === cleanAppNo
    );

    if (!matchedStudent) {
      return res.status(404).json({ error: 'Invalid details. Please verify your Cohort Name, Application Number, and Access Code.' });
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
      cohort,
      applicationNo,
      code,
      isFromJaipur, 
      jaipurArea, 
      wantsBus, 
      arrivalDate, 
      arrivalTime, 
      transportMode 
    } = req.body;

    if (!cohort || !applicationNo || !code) {
      return res.status(400).json({ error: 'Cohort name, application number, and access code are required.' });
    }

    const cleanCohort = cohort.toUpperCase().trim();
    const cleanAppNo = normalizeAppNo(applicationNo);
    const cleanCode = code.trim();

    // Query database for matching student
    const students = await Student.find({
      cohort: cleanCohort,
      arrivalCode: cleanCode
    });

    const matchedStudent = students.find(s => 
      normalizeAppNo(s.applicationNo) === cleanAppNo
    );

    if (!matchedStudent) {
      return res.status(404).json({ error: 'Invalid details. Verification failed.' });
    }

    // Set arrivalInfo sub-document
    matchedStudent.arrivalInfo = {
      isFromJaipur: !!isFromJaipur,
      jaipurArea: isFromJaipur ? (jaipurArea || '').trim() : undefined,
      wantsBus: isFromJaipur ? !!wantsBus : undefined,
      arrivalDate: (arrivalDate || '').trim(),
      arrivalTime: (isFromJaipur && wantsBus) ? undefined : (arrivalTime || '').trim(),
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
