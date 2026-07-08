const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoUri = process.env.MONGODB_URI;

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('Connected.');

  const students = await Student.find({});
  console.log(`Found ${students.length} students in total.`);

  let updatedCount = 0;
  for (const student of students) {
    if (!student.arrivalCode) {
      student.arrivalCode = Math.floor(100000 + Math.random() * 900000).toString();
      await student.save();
      updatedCount++;
    }
  }

  console.log(`Successfully generated and saved arrivalCodes for ${updatedCount} students.`);
  await mongoose.disconnect();
  console.log('MongoDB disconnected.');
}

run().catch(err => {
  console.error('Error running migration script:', err);
  process.exit(1);
});
