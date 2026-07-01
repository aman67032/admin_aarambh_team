const { parse } = require('csv-parse/sync');

// Define cohorts list
const NORTH_CLUSTERS = {
  A: 5, // A1-A5
  B: 4, // B1-B4
  C: 4, // C1-C4
  D: 5, // D1-D5
  E: 5, // E1-E5
  F: 5, // F1-F5
  G: 5, // G1-G5
  H: 5  // H1-H5
};

const SOUTH_CLUSTERS = {
  I: 3, // I1-I3
  J: 3, // J1-J3
  K: 3, // K1-K3
  L: 3  // L1-L3
};

// Get list of cohort names
function getCohortNames(clustersConfig) {
  const names = [];
  for (const [cluster, count] of Object.entries(clustersConfig)) {
    for (let i = 1; i <= count; i++) {
      names.push(`${cluster}${i}`);
    }
  }
  return names;
}

const NORTH_COHORTS = getCohortNames(NORTH_CLUSTERS); // 38 cohorts
const SOUTH_COHORTS = getCohortNames(SOUTH_CLUSTERS); // 12 cohorts
const ALL_COHORTS = [...NORTH_COHORTS, ...SOUTH_COHORTS]; // 50 cohorts

const BDES_COHORTS = ['C1', 'E1'];
const BBA_COHORTS = ['A2', 'A4', 'B4', 'C3', 'C4', 'D4', 'E2', 'E5', 'F1', 'F2', 'F3', 'F4', 'F5', 'G1', 'H2', 'H4'];

function getCohortCourse(cohortName) {
  if (BDES_COHORTS.includes(cohortName)) return 'B.Des';
  if (BBA_COHORTS.includes(cohortName)) return 'BBA';
  return 'B.Tech';
}

// Helper to check if a location is South India
function isSouthIndia(city, district, state) {
  const c = (city || '').toLowerCase().trim();
  const d = (district || '').toLowerCase().trim();
  const s = (state || '').toLowerCase().trim();

  const southKeywords = [
    'andhra', 'telangana', 'karnataka', 'tamil', 'kerala', 'goa', 'puducherry', 'pondicherry',
    'hyderabad', 'bangalore', 'bengaluru', 'chennai', 'coimbatore', 'kochi', 'cochin', 'mysore', 'mysuru',
    'trivandrum', 'thiruvananthapuram', 'amaravati', 'visakhapatnam', 'vizag', 'vijayawada',
    'secunderabad', 'guntur', 'nellore', 'warangal', 'tirupati', 'hubli', 'dharwad', 'mangalore', 'mangaluru',
    'belgaum', 'gulbarga', 'madurai', 'trichy', 'tiruchirappalli', 'salem', 'tirunelveli', 'vellore',
    'thanjavur', 'kozhikode', 'calicut', 'thrissur', 'malappuram', 'kollam', 'alappuzha', 'palakkad'
  ];

  const southStates = ['ap', 'ts', 'tn', 'ka', 'kl', 'ga'];

  return southKeywords.some(keyword => c.includes(keyword) || d.includes(keyword) || s.includes(keyword)) ||
         southStates.includes(s);
}

// Helper to normalize course names
function normalizeCourse(course) {
  const c = (course || '').toLowerCase().trim();
  if (c.includes('btech') || (c.includes('b') && c.includes('tech'))) {
    return 'B.Tech';
  }
  if (c.includes('bba')) {
    return 'BBA';
  }
  if (c.includes('bdes') || (c.includes('b') && c.includes('des'))) {
    return 'B.Des';
  }
  // Fallback default
  return 'B.Tech';
}

// Helper to normalize gender
function normalizeGender(gender) {
  const g = (gender || '').toLowerCase().trim();
  if (g.startsWith('f')) {
    return 'Female';
  }
  return 'Male';
}

function getWarningPenalty(cohortName, cohortStudents, student) {
  const isSouth = ['I', 'J', 'K', 'L'].includes(cohortName[0]);
  if (isSouth) {
    return 0; // Keep South out of warn-aware penalty checks since they only get B.Tech
  }
  
  const newTotal = cohortStudents.length + 1;
  const newMales = cohortStudents.filter(s => s.gender === 'Male').length + (student.gender === 'Male' ? 1 : 0);
  const newFemales = cohortStudents.filter(s => s.gender === 'Female').length + (student.gender === 'Female' ? 1 : 0);
  
  const newBTech = cohortStudents.filter(s => s.course === 'B.Tech').length + (student.course === 'B.Tech' ? 1 : 0);
  const newBBA = cohortStudents.filter(s => s.course === 'BBA').length + (student.course === 'BBA' ? 1 : 0);
  const newBDes = cohortStudents.filter(s => s.course === 'B.Des').length + (student.course === 'B.Des' ? 1 : 0);
  
  let penalty = 0;

  // 1. Size over limit warning (> 11)
  if (newTotal > 11) {
    penalty += 1000;
  }

  // 2. Gender ratio check
  const genderDiff = Math.abs(newMales - newFemales);
  if (newTotal >= 4 && genderDiff > 4) {
    penalty += 300; // Penalize gender imbalance
  }

  // 3. Course check (North cohorts should not be dominated by a single course)
  if (newTotal >= 5) {
    if (newBTech / newTotal > 0.8) penalty += 400;
    if (newBBA / newTotal > 0.8) penalty += 400;
    if (newBDes / newTotal > 0.8) penalty += 400;
  }

  return penalty;
}

/**
 * Main student distribution function
 * @param {string} csvText - Raw CSV text
 * @returns {Array} - Distributed student objects ready to save
 */
function distributeStudents(csvText) {
  // Parse CSV
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const students = records.map(record => {
    // Columns mapping:
    // S.No, Application No, Registered Name, Gender, Course, Registered Mobile, Registered Email,
    // Father First Name, Father Mobile No, Father Email, City, Permanent District, State, User Id
    
    // Normalize keys (handle spacing and case differences in headers)
    const getVal = (possibleKeys) => {
      for (const k of possibleKeys) {
        if (record[k] !== undefined) return record[k];
        // Check case insensitive
        const foundKey = Object.keys(record).find(key => key.toLowerCase().replace(/[^a-z0-9]/g, '') === k.toLowerCase().replace(/[^a-z0-9]/g, ''));
        if (foundKey) return record[foundKey];
      }
      return '';
    };

    const sno = parseInt(getVal(['S.No', 'SNo', 'Serial No'])) || 0;
    const applicationNo = getVal(['Application No', 'ApplicationNo', 'App No', 'Application Number']);
    const name = getVal(['Registered Name', 'RegisteredName', 'Name', 'Name of Student']);
    const gender = normalizeGender(getVal(['Gender', 'Sex']));
    const course = normalizeCourse(getVal(['Course', 'Branch']));
    const mobile = getVal(['Registered Mobile', 'RegisteredMobile', 'Mobile', 'Phone', 'Student Mobile Number', 'StudentMobileNumber']);
    const email = getVal(['Registered Email', 'RegisteredEmail', 'Email', 'Student Mail ID', 'StudentMailID', 'Student Email']);
    const fatherName = getVal(['Father First Name', 'FatherFirstName', 'Father Name', 'FatherName', 'Parent/Guardian Name', 'Parent Name', 'ParentGuardianName']);
    const fatherMobile = getVal(['Father Mobile No', 'FatherMobileNo', 'Father Mobile', 'FatherPhone', 'Parent Mobile Number', 'ParentMobileNumber']);
    const fatherEmail = getVal(['Father Email', 'FatherEmail', 'Parent Mail ID', 'ParentMailID', 'Parent Email']);
    const city = getVal(['City']);
    const district = getVal(['Permanent District', 'PermanentDistrict', 'District', 'District ']);
    const state = getVal(['State']);
    const studentUserId = getVal(['User Id', 'UserId', 'User_Id', 'Admission Id']);

    const region = isSouthIndia(city, district, state) ? 'South' : 'North';

    return {
      sno,
      applicationNo,
      name,
      gender,
      course,
      mobile,
      email,
      fatherName,
      fatherMobile,
      fatherEmail,
      city,
      district,
      state,
      studentUserId,
      region
    };
  }).filter(s => s.applicationNo && s.name);

  // Separate South BTech and others
  const southBTech = students.filter(s => s.region === 'South' && s.course === 'B.Tech');
  const northPool = students.filter(s => !(s.region === 'South' && s.course === 'B.Tech')); // North students + South BBA + South B.Des

  // Cohort assignments state
  const assignments = {};
  ALL_COHORTS.forEach(c => {
    assignments[c] = [];
  });

  const maxCapacity = 10;

  // 1. Distribute South BTech to I, J, K, L cohorts (12 cohorts) using greedy balance scoring
  // Interleave genders to alternate processing
  const southBTechMales = southBTech.filter(s => s.gender === 'Male');
  const southBTechFemales = southBTech.filter(s => s.gender === 'Female');
  const interleavedSouthBTech = [];
  const maxSouthBTechGroupLen = Math.max(southBTechMales.length, southBTechFemales.length);
  for (let i = 0; i < maxSouthBTechGroupLen; i++) {
    if (southBTechFemales[i]) interleavedSouthBTech.push(southBTechFemales[i]);
    if (southBTechMales[i]) interleavedSouthBTech.push(southBTechMales[i]);
  }

  interleavedSouthBTech.forEach(student => {
    let bestCohort = null;
    let bestScore = -Infinity;
    
    for (const cohortName of SOUTH_COHORTS) {
      const cohortStudents = assignments[cohortName];
      if (cohortStudents.length >= maxCapacity) continue;
      
      const clusterChar = cohortName[0];
      const clusterCount = assignments[clusterChar + '1'].length + 
                           assignments[clusterChar + '2'].length + 
                           assignments[clusterChar + '3'].length;

      const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
      const genderScore = -sameGenderCount;
      const sizeScore = -cohortStudents.length;
      const clusterScore = -clusterCount;
      const penalty = getWarningPenalty(cohortName, cohortStudents, student);
      const score = (sizeScore * 10) + (genderScore * 5) + (clusterScore * 100) - penalty;
      
      if (score > bestScore) {
        bestScore = score;
        bestCohort = cohortName;
      }
    }

    if (bestCohort) {
      assignments[bestCohort].push(student);
      student.cluster = bestCohort[0];
      student.cohort = bestCohort;
    } else {
      student.overflow = true;
    }
  });

  // Collect any South BTech overflow
  const southOverflow = southBTech.filter(s => s.overflow);
  southOverflow.forEach(s => delete s.overflow);

  // Add South BTech overflow to North Pool
  const combinedNorthPool = [...northPool, ...southOverflow];

  // 2. Distribute North Pool to A-H cohorts (38 cohorts) using greedy balance scoring
  // Group by (Course, Gender)
  const groups = {
    'B.Tech_Male': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Male'),
    'B.Tech_Female': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Female'),
    'BBA_Male': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Male'),
    'BBA_Female': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Female'),
    'B.Des_Male': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Male'),
    'B.Des_Female': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Female')
  };

  // Interleave the groups to process students in balanced order
  const interleavedNorthPool = [];
  const maxNorthGroupLen = Math.max(
    groups['B.Tech_Male'].length,
    groups['B.Tech_Female'].length,
    groups['BBA_Male'].length,
    groups['BBA_Female'].length,
    groups['B.Des_Male'].length,
    groups['B.Des_Female'].length
  );

  for (let i = 0; i < maxNorthGroupLen; i++) {
    if (groups['B.Tech_Male'][i]) interleavedNorthPool.push(groups['B.Tech_Male'][i]);
    if (groups['B.Tech_Female'][i]) interleavedNorthPool.push(groups['B.Tech_Female'][i]);
    if (groups['BBA_Male'][i]) interleavedNorthPool.push(groups['BBA_Male'][i]);
    if (groups['BBA_Female'][i]) interleavedNorthPool.push(groups['BBA_Female'][i]);
    if (groups['B.Des_Male'][i]) interleavedNorthPool.push(groups['B.Des_Male'][i]);
    if (groups['B.Des_Female'][i]) interleavedNorthPool.push(groups['B.Des_Female'][i]);
  }

  const overflowPool = [];

  interleavedNorthPool.forEach(student => {
    let bestCohort = null;
    let bestScore = -Infinity;

    for (const cohortName of NORTH_COHORTS) {
      const cohortStudents = assignments[cohortName];
      if (cohortStudents.length >= 8) continue;

      const cohortCourse = getCohortCourse(cohortName);

      // Enforce strict course match for South non-BTech students
      if (student.region === 'South' && cohortCourse !== student.course) {
        continue;
      }

      // Prioritize course alignment for all other students
      const courseMatchScore = (cohortCourse === student.course) ? 100 : 0;

      const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
      const genderScore = -sameGenderCount;

      const sizeScore = -cohortStudents.length;

      const penalty = getWarningPenalty(cohortName, cohortStudents, student);
      const score = (sizeScore * 10) + (genderScore * 5) + courseMatchScore - penalty;

      if (score > bestScore) {
        bestScore = score;
        bestCohort = cohortName;
      }
    }

    if (bestCohort) {
      assignments[bestCohort].push(student);
      student.cluster = bestCohort[0];
      student.cohort = bestCohort;
    } else {
      overflowPool.push(student);
    }
  });

  // 3. Overflow Handling
  // "if A-H fill and if I-L has slot left then add them"
  if (overflowPool.length > 0) {
    overflowPool.forEach((student, idx) => {
      // Find a slot in South Cohorts (I-L)
      let bestCohort = null;
      let bestScore = -Infinity;
      
      for (const cohortName of SOUTH_COHORTS) {
        const cohortStudents = assignments[cohortName];
        if (cohortStudents.length < maxCapacity) {
          const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
          const genderScore = -sameGenderCount;
          const sizeScore = -cohortStudents.length;
          const penalty = getWarningPenalty(cohortName, cohortStudents, student);
          const score = (sizeScore * 10) + (genderScore * 5) - penalty;
          
          if (score > bestScore) {
            bestScore = score;
            bestCohort = cohortName;
          }
        }
      }

      if (bestCohort) {
        assignments[bestCohort].push(student);
        student.cluster = bestCohort[0];
        student.cohort = bestCohort;
        overflowPool[idx] = null; // Mark as placed
      }
    });
  }

  // Filter out placed students from overflowPool
  const remainingOverflow = overflowPool.filter(s => s !== null);

  // "and there will no space then it will goes to any cohort increasing number one by one as max limit of each reach 11"
  if (remainingOverflow.length > 0) {
    let currentLimit = maxCapacity + 1;

    while (remainingOverflow.length > 0) {
      const student = remainingOverflow.shift();
      let bestCohort = null;
      let bestScore = -Infinity;

      for (const cohortName of ALL_COHORTS) {
        const cohortStudents = assignments[cohortName];
        if (cohortStudents.length < currentLimit) {
          const cohortCourse = getCohortCourse(cohortName);
          const courseMatchScore = (cohortCourse === student.course) ? 100 : 0;

          const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
          const genderScore = -sameGenderCount;
          const sizeScore = -cohortStudents.length;
          const penalty = getWarningPenalty(cohortName, cohortStudents, student);
          const score = (sizeScore * 10) + (genderScore * 5) + courseMatchScore - penalty;
          
          if (score > bestScore) {
            bestScore = score;
            bestCohort = cohortName;
          }
        }
      }

      if (bestCohort) {
        assignments[bestCohort].push(student);
        student.cluster = bestCohort[0];
        student.cohort = bestCohort;
      } else {
        // If all cohorts are at currentLimit, increase limit and push back to try again
        currentLimit++;
        remainingOverflow.unshift(student);
      }
    }
  }

  // Return the students list containing assignments
  return students;
}

module.exports = {
  distributeStudents,
  NORTH_COHORTS,
  SOUTH_COHORTS,
  ALL_COHORTS
};
