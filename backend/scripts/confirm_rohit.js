const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const student = await Student.findOne({ applicationNo: 'JKLU/B.TECH/2026/0758' });
    if (!student) {
      console.log('Student not found!');
      return;
    }

    if (!student.confirmedJklu) {
      student.confirmedJklu = true;
      student.confirmedAt = new Date();
      await student.save();
      console.log(`[SUCCESS] Marked ${student.name} (${student.applicationNo}) as confirmed/registered!`);
    } else {
      console.log(`[NOTICE] ${student.name} was already marked as confirmed/registered.`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
