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

module.exports = router;
