const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

// GET /api/admin/overview
// Overall performance of all cluster heads
router.get('/overview', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
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
      if (student.notContinuing) {
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
    res.status(500).json({ error: 'Server error fetching overview: ' + error.message });
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
    res.status(500).json({ error: 'Server error analyzing distribution: ' + error.message });
  }
});

// GET /api/admin/not-continuing
// Get list of all students who are not continuing at JKLU
router.get('/not-continuing', requireAuth, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const students = await Student.find({ notContinuing: true })
      .populate('confirmedBy', 'name')
      .sort({ updatedAt: -1 });

    res.json(students);
  } catch (error) {
    console.error('Fetch not continuing error:', error);
    res.status(500).json({ error: 'Server error fetching not-continuing list.' });
  }
});

module.exports = router;
