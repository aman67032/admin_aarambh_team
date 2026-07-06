const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { distributeStudents } = require('../services/distribution');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  const csvPath = path.join(__dirname, 'temp_students.csv');
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    if (!fs.existsSync(csvPath)) {
      console.error(`CSV file not found at: ${csvPath}`);
      return;
    }

    console.log('Reading CSV file...');
    const csvText = fs.readFileSync(csvPath, 'utf-8');
    
    console.log('Running distribution algorithm...');
    const distributedStudents = await distributeStudents(csvText);
    
    const totalCount = distributedStudents.length;
    let northCount = 0;
    let southCount = 0;
    const cohortStats = {};

    distributedStudents.forEach(student => {
      if (student.region === 'South') southCount++;
      else northCount++;

      const cohort = student.cohort;
      if (!cohortStats[cohort]) {
        cohortStats[cohort] = 0;
      }
      cohortStats[cohort]++;
    });

    console.log('\n=== Distribution Summary ===');
    console.log(`Total Students: ${totalCount}`);
    console.log(`North India: ${northCount}`);
    console.log(`South India: ${southCount}`);
    console.log('Students per cohort:');
    console.log(cohortStats);
    console.log('============================\n');

    // Confirm save
    console.log('Clearing existing students in database...');
    await Student.deleteMany({});

    console.log(`Saving ${totalCount} distributed students to MongoDB...`);
    const insertedStudents = await Student.insertMany(distributedStudents);
    console.log(`Successfully saved ${insertedStudents.length} students to database!`);

    // Clean up temporary file
    console.log('Cleaning up temporary CSV file...');
    fs.unlinkSync(csvPath);
    console.log('Cleanup complete.');

  } catch (err) {
    console.error('Error during distribution execution:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

run();
