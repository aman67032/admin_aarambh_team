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

    const maxCapacity = 10;
    
    const southBTech = newStudents.filter(s => s.region === 'South' && s.course === 'B.Tech');
    const northPool = newStudents.filter(s => !(s.region === 'South' && s.course === 'B.Tech'));

    const southBTechMales = southBTech.filter(s => s.gender === 'Male');
    const southBTechFemales = southBTech.filter(s => s.gender === 'Female');
    const interleavedSouthBTech = [];
    const maxSouthBTechGroupLen = Math.max(southBTechMales.length, southBTechFemales.length);
    for (let i = 0; i < maxSouthBTechGroupLen; i++) {
      if (southBTechFemales[i]) interleavedSouthBTech.push(southBTechFemales[i]);
      if (southBTechMales[i]) interleavedSouthBTech.push(southBTechMales[i]);
    }

    // 1. Assign South BTech to SOUTH_COHORTS (I-L)
    console.log(`Distributing ${interleavedSouthBTech.length} South region B.Tech students...`);
    interleavedSouthBTech.forEach(student => {
      let bestCohort = null;
      let bestScore = -Infinity;
      
      for (const cohortName of SOUTH_COHORTS) {
        const cohortStudents = assignments[cohortName];
        if (cohortStudents.length >= maxCapacity) continue;
        
        const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
        const genderScore = -sameGenderCount;
        const sizeScore = -cohortStudents.length;
        const score = (sizeScore * 10) + (genderScore * 5);
        
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

    const southOverflow = southBTech.filter(s => s.overflow);
    southOverflow.forEach(s => delete s.overflow);

    const combinedNorthPool = [...northPool, ...southOverflow];

    // North Pool interleaving
    const groups = {
      'B.Tech_Male': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Male'),
      'B.Tech_Female': combinedNorthPool.filter(s => s.course === 'B.Tech' && s.gender === 'Female'),
      'BBA_Male': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Male'),
      'BBA_Female': combinedNorthPool.filter(s => s.course === 'BBA' && s.gender === 'Female'),
      'B.Des_Male': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Male'),
      'B.Des_Female': combinedNorthPool.filter(s => s.course === 'B.Des' && s.gender === 'Female')
    };

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

    // 2. Assign North Pool to NORTH_COHORTS (A-H)
    console.log(`Distributing ${interleavedNorthPool.length} North pool students...`);
    interleavedNorthPool.forEach(student => {
      let bestCohort = null;
      let bestScore = -Infinity;

      for (const cohortName of NORTH_COHORTS) {
        const cohortStudents = assignments[cohortName];
        if (cohortStudents.length >= maxCapacity) continue;

        const cohortCourse = getCohortCourse(cohortName);

        if (student.region === 'South' && cohortCourse !== student.course) {
          continue;
        }

        const courseMatchScore = (cohortCourse === student.course) ? 100 : 0;
        const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
        const genderScore = -sameGenderCount;
        const sizeScore = -cohortStudents.length;
        const score = (sizeScore * 10) + (genderScore * 5) + courseMatchScore;

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

    // 3. Overflow Handling (South cohorts I-L)
    const overflowPool = [];
    // Recalculate overflow
    interleavedNorthPool.forEach(s => {
      if (!s.cohort) overflowPool.push(s);
    });

    if (overflowPool.length > 0) {
      console.log(`Handling ${overflowPool.length} overflow students into South region cohorts...`);
      overflowPool.forEach((student, idx) => {
        let bestCohort = null;
        let bestScore = -Infinity;
        
        for (const cohortName of SOUTH_COHORTS) {
          const cohortStudents = assignments[cohortName];
          if (cohortStudents.length < maxCapacity) {
            const sameGenderCount = cohortStudents.filter(s => s.gender === student.gender).length;
            const genderScore = -sameGenderCount;
            const sizeScore = -cohortStudents.length;
            const score = (sizeScore * 10) + (genderScore * 5);
            
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
          overflowPool[idx] = null;
        }
      });
    }

    const remainingOverflow = overflowPool.filter(s => s !== null);

    // 4. Increase cohort size limit dynamically if needed
    if (remainingOverflow.length > 0) {
      console.log(`Handling remaining ${remainingOverflow.length} overflow students by expanding cohort capacity...`);
      let currentLimit = maxCapacity + 1;
      for (const cohortName of ALL_COHORTS) {
        if (assignments[cohortName].length >= currentLimit) {
          currentLimit = assignments[cohortName].length + 1;
        }
      }

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
            const score = (sizeScore * 10) + (genderScore * 5) + courseMatchScore;
            
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
          currentLimit++;
          remainingOverflow.unshift(student);
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
