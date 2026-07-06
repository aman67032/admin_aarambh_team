const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const CSV_PATH = path.join(__dirname, 'temp_students_new.csv');

// Cohorts configurations
const NORTH_CLUSTERS = { A: 5, B: 4, C: 4, D: 5, E: 5, F: 5, G: 5, H: 5 };
const SOUTH_CLUSTERS = { I: 3, J: 3, K: 3, L: 3 };

function getCohortNames(config) {
  const list = [];
  for (const [cluster, count] of Object.entries(config)) {
    for (let i = 1; i <= count; i++) {
      list.push(`${cluster}${i}`);
    }
  }
  return list;
}

const NORTH_COHORTS = getCohortNames(NORTH_CLUSTERS);
const SOUTH_COHORTS = getCohortNames(SOUTH_CLUSTERS);
const ALL_COHORTS = [...NORTH_COHORTS, ...SOUTH_COHORTS];

const BDES_COHORTS = ['C1', 'E1'];
const BBA_COHORTS = ['A2', 'A4', 'B4', 'C3', 'C4', 'D4', 'E2', 'E5', 'F1', 'F2', 'F3', 'F4', 'F5', 'G1', 'H2', 'H4'];

function getCohortCourse(cohortName) {
  if (BDES_COHORTS.includes(cohortName)) return 'B.Des';
  if (BBA_COHORTS.includes(cohortName)) return 'BBA';
  return 'B.Tech';
}

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

function normalizeCourse(course) {
  const c = (course || '').toLowerCase().trim();
  if (c.includes('btech') || (c.includes('b') && c.includes('tech'))) return 'B.Tech';
  if (c.includes('bba')) return 'BBA';
  if (c.includes('bdes') || (c.includes('b') && c.includes('des'))) return 'B.Des';
  return 'B.Tech';
}

function normalizeGender(gender) {
  const g = (gender || '').toLowerCase().trim();
  if (g.startsWith('f')) return 'Female';
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

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    if (!fs.existsSync(CSV_PATH)) {
      console.error(`CSV file not found at: ${CSV_PATH}`);
      return;
    }

    console.log('Reading and parsing new CSV file...');
    const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const parsedStudents = records.map(record => {
      const getVal = (possibleKeys) => {
        for (const k of possibleKeys) {
          if (record[k] !== undefined) return record[k];
          const foundKey = Object.keys(record).find(key => key.toLowerCase().replace(/[^a-z0-9]/g, '') === k.toLowerCase().replace(/[^a-z0-9]/g, ''));
          if (foundKey) return record[foundKey];
        }
        return '';
      };

      const sno = parseInt(getVal(['S.No', 'SNo', 'Serial No'])) || 0;
      const applicationNo = getVal(['Application Number', 'Application No', 'ApplicationNo', 'App No']);
      const name = getVal(['Name of Student', 'Registered Name', 'RegisteredName', 'Name']);
      const gender = normalizeGender(getVal(['Gender', 'Sex']));
      const course = normalizeCourse(getVal(['Course', 'Branch']));
      const mobile = getVal(['Student Mobile Number', 'Registered Mobile', 'RegisteredMobile', 'Mobile', 'Phone']);
      const email = getVal(['Student Mail ID', 'Registered Email', 'RegisteredEmail', 'Email', 'Student Email']);
      const fatherName = getVal(['Parent/Guardian Name', 'Parent Name', 'Father First Name', 'FatherFirstName', 'Father Name']);
      const fatherMobile = getVal(['Parent Mobile Number', 'Father Mobile No', 'FatherMobileNo', 'Father Mobile', 'FatherPhone']);
      const fatherEmail = getVal(['Parent Mail ID', 'Father Email', 'FatherEmail', 'Parent Email']);
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

    console.log(`Parsed ${parsedStudents.length} students from the Excel file.`);

    // Check for duplicates in MongoDB
    const existingStudents = await Student.find({});
    const existingAppNos = new Set(existingStudents.map(s => s.applicationNo.toUpperCase().trim()));

    const duplicates = [];
    const newStudents = [];

    parsedStudents.forEach(s => {
      if (existingAppNos.has(s.applicationNo.toUpperCase().trim())) {
        duplicates.push(s);
      } else {
        newStudents.push(s);
      }
    });

    console.log(`\n=== Duplicacy Report ===`);
    console.log(`Total parsed from sheet: ${parsedStudents.length}`);
    console.log(`Duplicates already in DB: ${duplicates.length}`);
    console.log(`New students to distribute: ${newStudents.length}`);
    
    if (duplicates.length > 0) {
      console.log('Duplicates application numbers:');
      duplicates.forEach(d => console.log(`  - ${d.applicationNo} (${d.name})`));
    }
    console.log('========================\n');

    if (newStudents.length === 0) {
      console.log('No new students to distribute. Exiting.');
      return;
    }

    // Allocate new students while keeping already allocated students untouched!
    // Initialize allocations mapping using existing students in MongoDB
    console.log('Initializing cohort capacity state from existing database allocations...');
    const assignments = {};
    ALL_COHORTS.forEach(c => {
      assignments[c] = [];
    });

    existingStudents.forEach(s => {
      if (s.cohort && assignments[s.cohort]) {
        assignments[s.cohort].push(s);
      }
    });

    // Get existing students from database to get live registration counts per cohort
    const registeredCounts = {};
    ALL_COHORTS.forEach(c => {
      registeredCounts[c] = 0;
    });

    existingStudents.forEach(s => {
      if (s.cohort && registeredCounts[s.cohort] !== undefined && s.confirmedJklu) {
        registeredCounts[s.cohort]++;
      }
    });

    // Bracket prioritization mapping
    const getBracket = (cohortName) => {
      const reg = registeredCounts[cohortName] || 0;
      if (reg < 3) return 1;
      if (reg === 3) return 2;
      if (reg === 4) return 3;
      if (reg === 5) return 4;
      return 5;
    };

    // Interleave students by Course and Gender to process in balanced order
    const groups = {
      'B.Tech_Male': newStudents.filter(s => s.course === 'B.Tech' && s.gender === 'Male'),
      'B.Tech_Female': newStudents.filter(s => s.course === 'B.Tech' && s.gender === 'Female'),
      'BBA_Male': newStudents.filter(s => s.course === 'BBA' && s.gender === 'Male'),
      'BBA_Female': newStudents.filter(s => s.course === 'BBA' && s.gender === 'Female'),
      'B.Des_Male': newStudents.filter(s => s.course === 'B.Des' && s.gender === 'Male'),
      'B.Des_Female': newStudents.filter(s => s.course === 'B.Des' && s.gender === 'Female')
    };

    const interleaved = [];
    const maxGroupLen = Math.max(
      groups['B.Tech_Male'].length,
      groups['B.Tech_Female'].length,
      groups['BBA_Male'].length,
      groups['BBA_Female'].length,
      groups['B.Des_Male'].length,
      groups['B.Des_Female'].length
    );

    for (let i = 0; i < maxGroupLen; i++) {
      if (groups['B.Tech_Male'][i]) interleaved.push(groups['B.Tech_Male'][i]);
      if (groups['B.Tech_Female'][i]) interleaved.push(groups['B.Tech_Female'][i]);
      if (groups['BBA_Male'][i]) interleaved.push(groups['BBA_Male'][i]);
      if (groups['BBA_Female'][i]) interleaved.push(groups['BBA_Female'][i]);
      if (groups['B.Des_Male'][i]) interleaved.push(groups['B.Des_Male'][i]);
      if (groups['B.Des_Female'][i]) interleaved.push(groups['B.Des_Female'][i]);
    }

    // Assign students using priority brackets (irrespective of South/North regions)
    const overflowPool = [];
    let currentLimit = 8; // Soft initial limit

    interleaved.forEach(student => {
      let placed = false;

      // Try brackets in order: Bracket 1 (<3), Bracket 2 (=3), Bracket 3 (=4), Bracket 4 (=5), Bracket 5 (>5)
      for (let bracket = 1; bracket <= 5; bracket++) {
        let bestCohort = null;
        let bestScore = -Infinity;

        for (const cohortName of ALL_COHORTS) {
          // Enforce strict course-cohort matching
          if (getCohortCourse(cohortName) !== student.course) continue;

          // Check if cohort matches the current priority bracket
          if (getBracket(cohortName) !== bracket) continue;

          const cohortStudents = assignments[cohortName];
          if (cohortStudents.length >= currentLimit) continue;

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

        if (bestCohort) {
          assignments[bestCohort].push(student);
          student.cluster = bestCohort[0];
          student.cohort = bestCohort;
          placed = true;
          break; // Placed, stop looking at brackets
        }
      }

      if (!placed) {
        overflowPool.push(student);
      }
    });

    // Handle overflow by expanding capacity limit
    if (overflowPool.length > 0) {
      console.log(`Handling ${overflowPool.length} overflow students by expanding capacity...`);
      let currentOverflowLimit = currentLimit + 1;
      while (overflowPool.length > 0) {
        const student = overflowPool.shift();
        let placed = false;

        for (let bracket = 1; bracket <= 5; bracket++) {
          let bestCohort = null;
          let bestScore = -Infinity;

          for (const cohortName of ALL_COHORTS) {
            if (getCohortCourse(cohortName) !== student.course) continue;
            if (getBracket(cohortName) !== bracket) continue;

            const cohortStudents = assignments[cohortName];
            if (cohortStudents.length >= currentOverflowLimit) continue;

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

          if (bestCohort) {
            assignments[bestCohort].push(student);
            student.cluster = bestCohort[0];
            student.cohort = bestCohort;
            placed = true;
            break;
          }
        }

        if (!placed) {
          currentOverflowLimit++;
          overflowPool.unshift(student);
        }
      }
    }

    // Save newly distributed students to MongoDB
    console.log(`Saving ${newStudents.length} new students to database...`);
    
    // Set serial numbers sequentially starting from existing student count + 1
    let nextSno = existingStudents.length + 1;
    newStudents.forEach(s => {
      s.sno = nextSno++;
    });

    const inserted = await Student.insertMany(newStudents);
    console.log(`Successfully saved ${inserted.length} new student records to database!`);

    console.log('\n=== Distribution Allocation Report for New Students ===');
    const distributedByCohort = {};
    newStudents.forEach(s => {
      if (!distributedByCohort[s.cohort]) {
        distributedByCohort[s.cohort] = [];
      }
      distributedByCohort[s.cohort].push(s.name);
    });

    for (const [coh, list] of Object.entries(distributedByCohort)) {
      console.log(`  - Cohort ${coh}: ${list.length} new students (${list.join(', ')})`);
    }
    console.log('========================================================\n');

    // Clean up temporary file
    console.log('Cleaning up temporary CSV file...');
    fs.unlinkSync(CSV_PATH);
    console.log('Cleanup complete.');

  } catch (err) {
    console.error('Error executing incremental distribution:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

run();
