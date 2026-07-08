const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const student = await Student.findOne({ applicationNo: 'JKLU/B.TECH/2026/0758' });
    console.log('Rohit Sharma Record:', JSON.stringify(student, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
