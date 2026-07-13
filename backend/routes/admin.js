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


// GET /api/admin/overview
// Overall performance of all cluster heads
router.get('/overview', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    if (!isPub) {
      const allClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
      const clusterHeads = await User.find({ role: 'cluster_head' });
      const headsMap = {};
      clusterHeads.forEach(head => {
        headsMap[head.cluster] = head.name;
      });
      const clusters = allClusters.map(c => ({
        cluster: c,
        headName: headsMap[c] || 'N/A',
        total: 0,
        verified: 0,
        calls: 0,
        confirmedAarambh: 0,
        confirmedJklu: 0,
        notContinuing: 0
      }));
      return res.json({
        summary: {
          totalStudents: 0,
          verified: 0,
          totalCalls: 0,
          confirmedAarambh: 0,
          confirmedJklu: 0,
          notContinuing: 0,
          verificationRate: 0,
          confirmationRate: 0
        },
        clusters,
        notPublished: true
      });
    }

    const students = await Student.find({});
    
    // Overall counts
    let totalCount = students.length;
    let verifiedCount = 0;
    let callCount = 0;
    let confirmedAarambhCount = 0;
    let confirmedJkluCount = 0;
    let notContinuingCount = 0;

    // Cluster performance mapping
    const clusterPerf = {};
    // Seed clusters A-L
    const allClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    // Fetch all cluster head names to associate with stats
    const clusterHeads = await User.find({ role: 'cluster_head' });
    const headsMap = {};
    clusterHeads.forEach(head => {
      headsMap[head.cluster] = head.name;
    });

    allClusters.forEach(c => {
      clusterPerf[c] = {
        cluster: c,
        headName: headsMap[c] || 'N/A',
        total: 0,
        verified: 0,
        calls: 0,
        confirmedAarambh: 0,
        confirmedJklu: 0,
        notContinuing: 0
      };
    });

    students.forEach(student => {
      const c = student.cluster;
      if (!clusterPerf[c]) {
        clusterPerf[c] = {
          cluster: c,
          headName: headsMap[c] || 'N/A',
          total: 0,
          verified: 0,
          calls: 0,
          confirmedAarambh: 0,
          confirmedJklu: 0,
          notContinuing: 0
        };
      }

      clusterPerf[c].total++;
      if (student.mailReceived && student.documentsVerified) {
        verifiedCount++;
        clusterPerf[c].verified++;
      }
      
      callCount += student.callCount;
      clusterPerf[c].calls += student.callCount;

      if (student.confirmedAarambh) {
        confirmedAarambhCount++;
        clusterPerf[c].confirmedAarambh++;
      }
      if (student.confirmedJklu) {
        confirmedJkluCount++;
        clusterPerf[c].confirmedJklu++;
      }
      if (student.notContinuing || student.notComingAarambh) {
        notContinuingCount++;
        clusterPerf[c].notContinuing++;
      }
    });

    res.json({
      summary: {
        totalStudents: totalCount,
        verified: verifiedCount,
        totalCalls: callCount,
        confirmedAarambh: confirmedAarambhCount,
        confirmedJklu: confirmedJkluCount,
        notContinuing: notContinuingCount,
        verificationRate: totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0,
        confirmationRate: totalCount > 0 ? (confirmedAarambhCount / totalCount) * 100 : 0
      },
      clusters: Object.values(clusterPerf).sort((a, b) => a.cluster.localeCompare(b.cluster))
    });

  } catch (error) {
    console.error('Fetch admin overview error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/admin/batches
// Get Aarambh'26 batch structure and attendee stats (allotted, active, confirmed, checked-in)
router.get('/batches', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const Student = require('../models/Student');
    const TeamMember = require('../models/TeamMember');

    const students = await Student.find({});
    const checkedInMembers = await TeamMember.find({ checkedIn: true }, 'rollNo');
    
    function normalizeRoll(rollNo) {
      if (!rollNo) return "";
      return rollNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
    }

    const checkedInRolls = new Set(checkedInMembers.map(m => normalizeRoll(m.rollNo)));

    const batchesConfig = [
      {
        batchName: 'Batch 1',
        clusters: [
          { clusterName: 'A', cohortsCount: 5 },
          { clusterName: 'E', cohortsCount: 5 },
          { clusterName: 'I', cohortsCount: 3 }
        ]
      },
      {
        batchName: 'Batch 2',
        clusters: [
          { clusterName: 'B', cohortsCount: 4 },
          { clusterName: 'F', cohortsCount: 5 },
          { clusterName: 'J', cohortsCount: 3 }
        ]
      },
      {
        batchName: 'Batch 3',
        clusters: [
          { clusterName: 'C', cohortsCount: 4 },
          { clusterName: 'G', cohortsCount: 5 },
          { clusterName: 'K', cohortsCount: 3 }
        ]
      },
      {
        batchName: 'Batch 4',
        clusters: [
          { clusterName: 'D', cohortsCount: 5 },
          { clusterName: 'H', cohortsCount: 5 },
          { clusterName: 'L', cohortsCount: 3 }
        ]
      }
    ];

    const batches = batchesConfig.map(batch => {
      const clusterStats = batch.clusters.map(cConfig => {
        const clusterStudents = students.filter(s => s.cluster === cConfig.clusterName);
        
        const totalAllotted = clusterStudents.length;
        const notComing = clusterStudents.filter(s => s.notComingAarambh || s.notContinuing).length;
        const activeAttendees = totalAllotted - notComing;
        const confirmed = clusterStudents.filter(s => s.confirmedAarambh).length;
        
        const checkedIn = clusterStudents.filter(s => {
          const norm = normalizeRoll(s.applicationNo);
          return checkedInRolls.has(norm);
        }).length;

        return {
          clusterName: cConfig.clusterName,
          cohortsCount: cConfig.cohortsCount,
          totalAllotted,
          notComing,
          activeAttendees,
          confirmed,
          checkedIn
        };
      });

      const totals = {
        cohortsCount: clusterStats.reduce((acc, c) => acc + c.cohortsCount, 0),
        totalAllotted: clusterStats.reduce((acc, c) => acc + c.totalAllotted, 0),
        notComing: clusterStats.reduce((acc, c) => acc + c.notComing, 0),
        activeAttendees: clusterStats.reduce((acc, c) => acc + c.activeAttendees, 0),
        confirmed: clusterStats.reduce((acc, c) => acc + c.confirmed, 0),
        checkedIn: clusterStats.reduce((acc, c) => acc + c.checkedIn, 0)
      };

      return {
        batchName: batch.batchName,
        clusters: clusterStats,
        totals
      };
    });

    res.json({
      success: true,
      batches
    });

  } catch (error) {
    console.error('Fetch batches stats error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/admin/distribution-check
// Check is distribution correct or not (course and gender ratio checks)
router.get('/distribution-check', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const students = await Student.find({});
    
    // Group by cohort to analyze
    const cohortData = {};
    students.forEach(s => {
      if (!cohortData[s.cohort]) {
        cohortData[s.cohort] = {
          cohort: s.cohort,
          cluster: s.cluster,
          total: 0,
          males: 0,
          females: 0,
          btech: 0,
          bba: 0,
          bdes: 0
        };
      }
      
      cohortData[s.cohort].total++;
      if (s.gender === 'Female') cohortData[s.cohort].females++;
      else cohortData[s.cohort].males++;

      if (s.course === 'B.Tech') cohortData[s.cohort].btech++;
      else if (s.course === 'BBA') cohortData[s.cohort].bba++;
      else if (s.course === 'B.Des') cohortData[s.cohort].bdes++;
    });

    const cohorts = Object.values(cohortData);

    // Analyze North vs South cohorts
    // North Cohorts (clusters A-H) should have relatively equal gender and course ratios.
    // South Cohorts (clusters I-L) should contain BTech students with balanced gender ratio.
    const analysis = cohorts.map(c => {
      const isSouth = ['I', 'J', 'K', 'L'].includes(c.cluster);
      
      let genderIssue = false;
      let courseIssue = false;
      let reason = [];

      // Size check (max 10, or up to 11 if overflowed)
      const isSizeOverLimit = c.total > 11;
      if (isSizeOverLimit) {
        reason.push(`Cohort size exceeds limit (${c.total})`);
      }

      // Gender balance check (should be close to 50/50, say diff no more than 4 for a group of 10)
      const genderDiff = Math.abs(c.males - c.females);
      if (c.total >= 4 && genderDiff > 4) {
        genderIssue = true;
        reason.push(`Imbalanced gender ratio (Males: ${c.males}, Females: ${c.females})`);
      }

      if (isSouth) {
        // South cohorts must ONLY contain B.Tech (or mostly BTech unless overflowed)
        const nonBTech = c.total - c.btech;
        if (nonBTech > 0 && c.total <= 10) {
          // If total size was <= 10 and we put non-BTech, that's unusual unless overflow
          courseIssue = true;
          reason.push(`South cohort contains non-BTech courses (${nonBTech} students)`);
        }
      } else {
        // North cohorts should have courses distributed
        // For a cohort of 10, ideally ~3-4 BTech, ~3-4 BBA, ~3 BDes depending on proportions.
        // We highlight cohorts that are completely dominated by a single course (e.g. > 8 students of one course)
        if (c.total >= 5) {
          if (c.btech / c.total > 0.8) {
            courseIssue = true;
            reason.push(`Dominated by B.Tech (${c.btech}/${c.total})`);
          }
          if (c.bba / c.total > 0.8) {
            courseIssue = true;
            reason.push(`Dominated by BBA (${c.bba}/${c.total})`);
          }
          if (c.bdes / c.total > 0.8) {
            courseIssue = true;
            reason.push(`Dominated by B.Des (${c.bdes}/${c.total})`);
          }
        }
      }

      return {
        ...c,
        isSouth,
        genderIssue,
        courseIssue,
        status: (genderIssue || courseIssue || isSizeOverLimit) ? 'Warning' : 'Correct',
        reasons: reason
      };
    });

    const warnings = analysis.filter(c => c.status === 'Warning').length;

    res.json({
      success: true,
      stats: {
        totalCohortsAnalyzed: cohorts.length,
        correctCohorts: cohorts.length - warnings,
        warningCohorts: warnings,
        status: warnings === 0 ? 'Optimal' : 'Needs Review'
      },
      cohorts: analysis.sort((a, b) => a.cohort.localeCompare(b.cohort))
    });

  } catch (error) {
    console.error('Distribution check error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/admin/not-continuing
// Get list of all students who are not continuing at JKLU
router.get('/not-continuing', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    if (!isPub) {
      return res.json([]);
    }

    const students = await Student.find({
      $or: [
        { notContinuing: true },
        { notComingAarambh: true }
      ]
    })
      .populate('confirmedBy', 'name')
      .sort({ updatedAt: -1 });

    res.json(students);
  } catch (error) {
    console.error('Fetch not continuing error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/aarambh-verification', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    if (!isPub) {
      return res.json({
        success: true,
        usingFallback: false,
        fallbackReason: 'Not published yet',
        summary: {
          totalStudents: 0,
          registered: 0,
          notRegistered: 0,
          registrationRate: 0
        },
        students: []
      });
    }

    const students = await Student.find({}).sort({ name: 1 });
    
    // Use database confirmedJklu registration status directly
    const result = students.map(s => {
      return {
        _id: s._id,
        name: s.name,
        applicationNo: s.applicationNo,
        cohort: s.cohort,
        cluster: s.cluster,
        registeredOnPortal: !!s.confirmedJklu
      };
    });

    const totalStudents = students.length;
    const registeredCount = result.filter(s => s.registeredOnPortal).length;
    const notRegisteredCount = totalStudents - registeredCount;

    res.json({
      success: true,
      usingFallback: false,
      fallbackReason: '',
      summary: {
        totalStudents,
        registered: registeredCount,
        notRegistered: notRegisteredCount,
        registrationRate: totalStudents > 0 ? (registeredCount / totalStudents) * 100 : 0
      },
      students: result
    });

  } catch (error) {
    console.error('Aarambh verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/admin/cluster/:clusterId
// Detailed view of a specific cluster's cohorts and students (Admin/Super Admin)
router.get('/cluster/:clusterId', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const isPub = await checkPublished(req);
    if (!isPub) {
      const clusterId = req.params.clusterId.toUpperCase();
      const clusterHead = await User.findOne({ role: 'cluster_head', cluster: clusterId });
      return res.json({
        cluster: clusterId,
        clusterHead: clusterHead
          ? { name: clusterHead.name, email: clusterHead.email, phone: clusterHead.phone }
          : null,
        cohorts: []
      });
    }

    const clusterId = req.params.clusterId.toUpperCase();

    // Validate cluster ID is one of A-L
    const validClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    if (!validClusters.includes(clusterId)) {
      return res.status(400).json({ error: `Invalid cluster ID "${clusterId}". Must be one of A-L.` });
    }

    // Fetch cluster head, students, and cohort leaders for this cluster
    const clusterHead = await User.findOne({ role: 'cluster_head', cluster: clusterId });
    const students = await Student.find({ cluster: clusterId });
    const cohortLeaders = await User.find({ role: 'cohort_leader', cluster: clusterId });

    // Group students by cohort
    const cohortsMap = {};
    students.forEach(student => {
      if (!cohortsMap[student.cohort]) {
        cohortsMap[student.cohort] = [];
      }
      cohortsMap[student.cohort].push(student);
    });

    // Map cohort leader info and build sorted result
    const result = Object.entries(cohortsMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([cohortName, students]) => {
        const leader = cohortLeaders.find(l => l.cohort === cohortName);
        return {
          cohortName,
          leader: leader ? { id: leader._id, name: leader.name, email: leader.email, phone: leader.phone } : null,
          students
        };
      });

    res.json({
      cluster: clusterId,
      clusterHead: clusterHead
        ? { name: clusterHead.name, email: clusterHead.email, phone: clusterHead.phone }
        : null,
      cohorts: result
    });

  } catch (error) {
    console.error('Fetch cluster detail error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/admin/settings
router.get('/settings', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: 'studentsPublished' });
    res.json({ studentsPublished: setting ? !!setting.value : false });
  } catch (error) {
    console.error('Fetch settings error:', error);
    res.status(500).json({ error: 'Failed to retrieve system settings.' });
  }
});

// POST /api/admin/settings
router.post('/settings', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { studentsPublished } = req.body;
    if (studentsPublished === undefined) {
      return res.status(400).json({ error: 'studentsPublished value is required.' });
    }
    
    let setting = await Settings.findOne({ key: 'studentsPublished' });
    if (!setting) {
      setting = new Settings({ key: 'studentsPublished', value: studentsPublished });
    } else {
      setting.value = studentsPublished;
    }
    await setting.save();
    
    res.json({ success: true, studentsPublished: !!setting.value });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update system settings.' });
  }
});

// POST /api/admin/backup
router.post('/backup', requireAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const Student = require('../models/Student');
    const User = require('../models/User');
    const TeamMember = require('../models/TeamMember');
    const HostelRoom = require('../models/HostelRoom');
    const EmailLog = require('../models/EmailLog');

    const backupDir = 'E:\\backup';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const collections = {
      students: await Student.find({}).lean(),
      users: await User.find({}).lean(),
      settings: await Settings.find({}).lean(),
      teammembers: await TeamMember.find({}).lean(),
      hostelrooms: await HostelRoom.find({}).lean(),
      emaillogs: await EmailLog.find({}).lean()
    };

    for (const [name, data] of Object.entries(collections)) {
      const filePath = path.join(backupDir, `${name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    res.json({ success: true, message: `Successfully backed up all collections to ${backupDir}` });
  } catch (error) {
    console.error('Database backup failed:', error);
    res.status(500).json({ error: 'Failed to create backup: ' + error.message });
  }
});

// POST /api/admin/register-student
// Register a new student, auto-assign underfilled cohort, and send welcome email
router.post('/register-student', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { sendEmail } = require('../services/email');
    
    const {
      name,
      applicationNo,
      email,
      mobile,
      gender,
      course,
      specialization,
      fatherName,
      fatherMobile,
      fatherEmail,
      city,
      district,
      state,
      pincode
    } = req.body;

    // Check mandatory fields
    if (!name || !applicationNo || !email || !mobile || !gender || !course) {
      return res.status(400).json({ error: 'Mandatory fields: name, applicationNo, email, mobile, gender, and course are required.' });
    }

    // Clean up input fields
    const studentName = String(name).trim().toUpperCase();
    const appNo = String(applicationNo).trim().toUpperCase();
    const studentEmail = String(email).trim().toLowerCase();
    const studentMobile = String(mobile).trim();
    const studentGender = String(gender).trim().charAt(0).toUpperCase() + String(gender).trim().slice(1).toLowerCase();
    const studentCourse = String(course).trim() === 'BBA' ? 'BBA' : (String(course).trim() === 'B.Des' ? 'B.Des' : 'B.Tech');

    // Check for duplicates
    const existingApp = await Student.findOne({ applicationNo: appNo });
    if (existingApp) {
      return res.status(400).json({ error: `Student with application number ${appNo} is already registered.` });
    }

    const existingEmail = await Student.findOne({ email: studentEmail });
    if (existingEmail) {
      return res.status(400).json({ error: `Student with email ${studentEmail} is already registered.` });
    }

    // Determine region based on state
    let region = 'North';
    const stateUpper = String(state || '').toUpperCase();
    if (
      stateUpper.includes('ANDHRA') || 
      stateUpper.includes('TELANGANA') || 
      stateUpper.includes('TAMIL') || 
      stateUpper.includes('KARNATAKA') || 
      stateUpper.includes('KERALA')
    ) {
      region = 'South';
    }

    // Get all cohort leaders and dynamic cohort course mapping
    const cohortLeaders = await User.find({ role: 'cohort_leader' });
    const activeCohorts = cohortLeaders.map(cl => cl.cohort).filter(Boolean);

    // Map cohorts to course by scanning database
    const cohortCourses = {};
    const dbStudents = await Student.find({}, 'cohort course');
    dbStudents.forEach(s => {
      if (s.cohort && s.course) {
        if (!cohortCourses[s.cohort]) cohortCourses[s.cohort] = {};
        cohortCourses[s.cohort][s.course] = (cohortCourses[s.cohort][s.course] || 0) + 1;
      }
    });

    const cohortToCourse = {};
    for (const cohort in cohortCourses) {
      const courses = cohortCourses[cohort];
      let maxCount = 0;
      let dominantCourse = null;
      for (const c in courses) {
        if (courses[c] > maxCount) {
          maxCount = courses[c];
          dominantCourse = c;
        }
      }
      cohortToCourse[cohort] = dominantCourse;
    }

    // Static fallback mappings
    const fallbackMapping = {
      "A1": "B.Tech", "A2": "BBA", "A3": "B.Tech", "A4": "BBA", "A5": "B.Tech",
      "B1": "B.Tech", "B2": "B.Tech", "B3": "B.Tech", "B4": "BBA",
      "C1": "B.Des", "C2": "B.Tech", "C3": "BBA", "C4": "BBA",
      "D1": "B.Tech", "D2": "B.Tech", "D3": "B.Tech", "D4": "BBA", "D5": "B.Tech",
      "E1": "B.Des", "E2": "BBA", "E3": "B.Tech", "E4": "B.Tech", "E5": "BBA",
      "F1": "BBA", "F2": "BBA", "F3": "B.Tech", "F4": "BBA", "F5": "B.Tech",
      "G1": "B.Des", "G2": "B.Tech", "G3": "B.Tech", "G4": "B.Tech", "G5": "B.Tech",
      "H1": "B.Tech", "H2": "BBA", "H3": "B.Tech", "H4": "B.Des", "H5": "B.Tech",
      "I1": "B.Tech", "I2": "B.Tech", "I3": "B.Tech",
      "J1": "B.Tech", "J2": "B.Tech", "J3": "B.Tech",
      "K1": "B.Tech", "K2": "B.Tech", "K3": "B.Tech",
      "L1": "B.Tech", "L2": "B.Tech", "L3": "B.Tech"
    };

    const getCohortCourse = (c) => cohortToCourse[c] || fallbackMapping[c] || "B.Tech";

    // Count active students per cohort
    const cohortCounts = {};
    activeCohorts.forEach(c => { cohortCounts[c] = 0; });
    const activeStudents = await Student.find({ notContinuing: { $ne: true }, notComingAarambh: { $ne: true } });
    activeStudents.forEach(s => {
      if (s.cohort && cohortCounts[s.cohort] !== undefined) {
        cohortCounts[s.cohort]++;
      }
    });

    // Filter matching cohorts
    const matchingCohorts = activeCohorts.filter(c => getCohortCourse(c) === studentCourse);

    // Pick matching cohort with the minimum size
    let selectedCohort = null;
    let minCount = Infinity;
    matchingCohorts.forEach(c => {
      if (cohortCounts[c] < minCount) {
        minCount = cohortCounts[c];
        selectedCohort = c;
      }
    });

    if (!selectedCohort) {
      selectedCohort = Object.keys(fallbackMapping).find(c => fallbackMapping[c] === studentCourse) || "A1";
    }

    // Determine next sequential S.No
    const maxStudent = await Student.findOne().sort({ sno: -1 });
    const nextSno = maxStudent ? maxStudent.sno + 1 : 430;

    // Generate random 6-digit arrival code
    const arrivalCode = String(Math.floor(100000 + Math.random() * 900000));

    // Construct student document
    const newStudent = new Student({
      sno: nextSno,
      applicationNo: appNo,
      name: studentName,
      gender: studentGender,
      course: studentCourse,
      specialization: specialization || '',
      mobile: studentMobile,
      email: studentEmail,
      fatherName: fatherName || '',
      fatherMobile: fatherMobile || '',
      fatherEmail: fatherEmail || '',
      city: city || '',
      district: district || '',
      state: state || '',
      pincode: pincode || '',
      region: region,
      cohort: selectedCohort,
      cluster: selectedCohort.charAt(0),
      confirmedAarambh: true,
      confirmedJklu: true,
      documentsVerified: false,
      mailReceived: false,
      arrivalCode: arrivalCode,
      callLogs: [],
      callCount: 0
    });

    await newStudent.save();
    console.log(`Saved new student ${studentName} to database with S.No ${nextSno} and cohort ${selectedCohort}.`);

    // Fetch cohort leader details
    const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: selectedCohort });
    const clName = cohortLeader ? cohortLeader.name : 'N/A';
    const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
    const clEmail = cohortLeader ? cohortLeader.email : 'N/A';
    const ccEmail = cohortLeader ? cohortLeader.email : '';

    // Load email template
    const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
    let emailSent = false;

    if (fs.existsSync(templatePath)) {
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      
      const rawFirstName = studentName.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';

      const parsedBody = templateContent
        .replace(/\{\{name\}\}/g, studentName)
        .replace(/\{\{firstName\}\}/g, firstName)
        .replace(/\{\{applicationNo\}\}/g, appNo)
        .replace(/\{\{course\}\}/g, studentCourse)
        .replace(/\{\{cohort\}\}/g, selectedCohort)
        .replace(/\{\{cohortLeaderName\}\}/g, clName)
        .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
        .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

      const attachments = [];
      const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
      if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
        attachments.push({
          filename: 'banner.jpg',
          path: bannerPath,
          cid: 'bannerImage'
        });
      }

      const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
      if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
        attachments.push({
          filename: 'registration_qr.png',
          path: qrPath,
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
            attachments.push({ filename: file, path: filePath });
          }
        });
      }

      console.log(`Triggering welcome email for ${studentName}...`);
      const emailResult = await sendEmail({
        to: studentEmail,
        subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
        body: parsedBody,
        cc: ccEmail || undefined,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (emailResult.success || emailResult.queued) {
        emailSent = true;
        newStudent.mailReceived = true;
        await newStudent.save();
        console.log(`Email successfully sent/queued for ${studentName}.`);
      }
    } else {
      console.log("Warning: Welcome email template not found.");
    }

    res.json({
      success: true,
      message: 'Student registered successfully.',
      student: {
        sno: newStudent.sno,
        name: newStudent.name,
        cohort: newStudent.cohort,
        cohortLeader: clName,
        emailSent
      }
    });

  } catch (error) {
    console.error('Register new student endpoint error:', error);
    res.status(500).json({ error: 'Failed to register student: ' + error.message });
  }
});

module.exports = router;
