const express = require('express');
const router = express.Router();
const multer = require('multer');
const { distributeStudents } = require('../services/distribution');
const Student = require('../models/Student');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/distribution/preview
// Super Admin uploads a CSV and previews the distribution details before saving
router.post('/preview', requireAuth, requireRole('super_admin'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a CSV file.' });
    }

    const csvText = req.file.buffer.toString('utf-8');
    const distributedStudents = distributeStudents(csvText);

    // Calculate preview statistics
    const totalCount = distributedStudents.length;
    let northCount = 0;
    let southCount = 0;
    const cohortStats = {};

    distributedStudents.forEach(student => {
      if (student.region === 'South') southCount++;
      else northCount++;

      const cohort = student.cohort;
      if (!cohortStats[cohort]) {
        cohortStats[cohort] = {
          cohortName: cohort,
          cluster: student.cluster,
          total: 0,
          males: 0,
          females: 0,
          btech: 0,
          bba: 0,
          bdes: 0
        };
      }

      cohortStats[cohort].total++;
      if (student.gender === 'Female') cohortStats[cohort].females++;
      else cohortStats[cohort].males++;

      if (student.course === 'B.Tech') cohortStats[cohort].btech++;
      else if (student.course === 'BBA') cohortStats[cohort].bba++;
      else if (student.course === 'B.Des') cohortStats[cohort].bdes++;
    });

    res.json({
      success: true,
      stats: {
        totalStudents: totalCount,
        northCount,
        southCount,
        cohorts: Object.values(cohortStats)
      },
      students: distributedStudents
    });

  } catch (error) {
    console.error('Distribution preview error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/distribution/confirm
// Super Admin confirms the preview and saves students to the database
router.post('/confirm', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: 'No student data provided to confirm.' });
    }

    // Fetch backup of existing students first to support in-memory transactional rollback
    const existingBackup = await Student.find({}).lean();

    console.log('Clearing existing students...');
    await Student.deleteMany({});

    try {
      console.log(`Inserting ${students.length} students...`);
      const insertedStudents = await Student.insertMany(students);

      res.json({
        success: true,
        message: `${insertedStudents.length} students have been successfully distributed and saved in the database.`,
        count: insertedStudents.length
      });
    } catch (insertErr) {
      console.error('Insert failed, rolling back to backup...', insertErr);
      if (existingBackup.length > 0) {
        await Student.insertMany(existingBackup);
      }
      throw new Error('Database insert failed. Rollback executed successfully.');
    }

  } catch (error) {
    console.error('Distribution confirm error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/distribution/stats
// Get current distribution stats
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const students = await Student.find({});
    const totalCount = students.length;
    let northCount = 0;
    let southCount = 0;
    
    // Group by cluster and cohort
    const clusterStats = {};
    const cohortStats = {};

    students.forEach(student => {
      if (student.region === 'South') southCount++;
      else northCount++;

      const cluster = student.cluster;
      if (!clusterStats[cluster]) {
        clusterStats[cluster] = { clusterName: cluster, total: 0, btech: 0, bba: 0, bdes: 0, males: 0, females: 0 };
      }
      clusterStats[cluster].total++;
      if (student.gender === 'Female') clusterStats[cluster].females++;
      else clusterStats[cluster].males++;

      if (student.course === 'B.Tech') clusterStats[cluster].btech++;
      else if (student.course === 'BBA') clusterStats[cluster].bba++;
      else if (student.course === 'B.Des') clusterStats[cluster].bdes++;

      const cohort = student.cohort;
      if (!cohortStats[cohort]) {
        cohortStats[cohort] = { cohortName: cohort, cluster, total: 0, btech: 0, bba: 0, bdes: 0, males: 0, females: 0 };
      }
      cohortStats[cohort].total++;
      if (student.gender === 'Female') cohortStats[cohort].females++;
      else cohortStats[cohort].males++;

      if (student.course === 'B.Tech') cohortStats[cohort].btech++;
      else if (student.course === 'BBA') cohortStats[cohort].bba++;
      else if (student.course === 'B.Des') cohortStats[cohort].bdes++;
    });

    res.json({
      totalStudents: totalCount,
      northCount,
      southCount,
      clusters: Object.values(clusterStats),
      cohorts: Object.values(cohortStats)
    });

  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({ error: 'Error fetching distribution statistics.' });
  }
});

module.exports = router;
