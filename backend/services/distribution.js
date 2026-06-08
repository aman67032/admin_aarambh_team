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
    const applicationNo = getVal(['Application No', 'ApplicationNo', 'App No']);
    const name = getVal(['Registered Name', 'RegisteredName', 'Name']);
    const gender = normalizeGender(getVal(['Gender', 'Sex']));
    const course = normalizeCourse(getVal(['Course', 'Branch']));
    const mobile = getVal(['Registered Mobile', 'RegisteredMobile', 'Mobile', 'Phone']);
    const email = getVal(['Registered Email', 'RegisteredEmail', 'Email']);
    const fatherName = getVal(['Father First Name', 'FatherFirstName', 'Father Name', 'FatherName']);
    const fatherMobile = getVal(['Father Mobile No', 'FatherMobileNo', 'Father Mobile', 'FatherPhone']);
    const fatherEmail = getVal(['Father Email', 'FatherEmail']);
    const city = getVal(['City']);
    const district = getVal(['Permanent District', 'PermanentDistrict', 'District']);
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
  });

  // Separate South BTech and others
  const southBTech = students.filter(s => s.region === 'South' && s.course === 'B.Tech');
  const northPool = students.filter(s => !(s.region === 'South' && s.course === 'B.Tech')); // North students + South BBA + South B.Des

  // Cohort assignments state
  const assignments = {};
  ALL_COHORTS.forEach(c => {
    assignments[c] = [];
  });

  const maxCapacity = 10;

  // 1. Distribute South BTech to I, J, K, L cohorts (12 cohorts)
  // Balance gender ratio
  const southBTechMales = southBTech.filter(s => s.gender === 'Male');
  const southBTechFemales = southBTech.filter(s => s.gender === 'Female');

  // Round-robin alternate gender distribution
  let southCohortIdx = 0;
  
  const distributeToSouth = (studentList) => {
    studentList.forEach(student => {
      // Find a cohort in South (I1-L3) that is not full
      let attempts = 0;
      let placed = false;
      while (attempts < SOUTH_COHORTS.length) {
        const cohortName = SOUTH_COHORTS[southCohortIdx];
        if (assignments[cohortName].length < maxCapacity) {
          assignments[cohortName].push(student);
          student.cluster = cohortName[0];
          student.cohort = cohortName;
          placed = true;
          southCohortIdx = (southCohortIdx + 1) % SOUTH_COHORTS.length;
          break;
        }
        southCohortIdx = (southCohortIdx + 1) % SOUTH_COHORTS.length;
        attempts++;
      }

      if (!placed) {
        // South cohorts are full (overflow will be handled later, put in a temporary array or treat as overflow)
        student.overflow = true;
      }
    });
  };

  distributeToSouth(southBTechFemales);
  distributeToSouth(southBTechMales);

  // Collect any South BTech overflow
  const southOverflow = southBTech.filter(s => s.overflow);
  southOverflow.forEach(s => delete s.overflow);

  // Add South BTech overflow to North Pool
  const combinedNorthPool = [...northPool, ...southOverflow];

  // 2. Distribute North Pool to A-H cohorts (38 cohorts)
  // Balance by Course (BTech, BBA, BDes) and Gender (Male, Female)
  // Group by (Course, Gender)
  const groups = {
    'B.Tech_Male': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Male'),
    'B.Tech_Female': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Female'),
    'BBA_Male': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Male'),
    'BBA_Female': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Female'),
    'B.Des_Male': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Male'),
    'B.Des_Female': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Female')
  };

  let northCohortIdx = 0;
  const overflowPool = [];

  // Round-robin each group to A-H cohorts
  Object.keys(groups).forEach(groupKey => {
    const studentList = groups[groupKey];
    studentList.forEach(student => {
      let attempts = 0;
      let placed = false;
      while (attempts < NORTH_COHORTS.length) {
        const cohortName = NORTH_COHORTS[northCohortIdx];
        if (assignments[cohortName].length < maxCapacity) {
          assignments[cohortName].push(student);
          student.cluster = cohortName[0];
          student.cohort = cohortName;
          placed = true;
          northCohortIdx = (northCohortIdx + 1) % NORTH_COHORTS.length;
          break;
        }
        northCohortIdx = (northCohortIdx + 1) % NORTH_COHORTS.length;
        attempts++;
      }

      if (!placed) {
        overflowPool.push(student);
      }
    });
  });

  // 3. Overflow Handling
  // "if A-H fill and if I-L has slot left then add them"
  if (overflowPool.length > 0) {
    overflowPool.forEach((student, idx) => {
      // Find a slot in South Cohorts (I-L)
      let placed = false;
      for (const cohortName of SOUTH_COHORTS) {
        if (assignments[cohortName].length < maxCapacity) {
          assignments[cohortName].push(student);
          student.cluster = cohortName[0];
          student.cohort = cohortName;
          placed = true;
          break;
        }
      }

      if (placed) {
        overflowPool[idx] = null; // Mark as placed
      }
    });
  }

  // Filter out placed students from overflowPool
  const remainingOverflow = overflowPool.filter(s => s !== null);

  // "and there will no space then it will goes to any cohort increasing number one by one as max limit of each reach 11"
  if (remainingOverflow.length > 0) {
    let currentLimit = maxCapacity + 1;
    let cohortIdx = 0;

    while (remainingOverflow.length > 0) {
      const student = remainingOverflow.shift();
      let placed = false;

      // Try to place in any cohort (A-L) up to currentLimit
      let attempts = 0;
      while (attempts < ALL_COHORTS.length) {
        const cohortName = ALL_COHORTS[cohortIdx];
        if (assignments[cohortName].length < currentLimit) {
          assignments[cohortName].push(student);
          student.cluster = cohortName[0];
          student.cohort = cohortName;
          placed = true;
          cohortIdx = (cohortIdx + 1) % ALL_COHORTS.length;
          break;
        }
        cohortIdx = (cohortIdx + 1) % ALL_COHORTS.length;
        attempts++;
      }

      if (!placed) {
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
