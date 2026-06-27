const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');
const EmailLog = require('../models/EmailLog');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const students = await Student.find({}, 'name applicationNo email course cohort').lean();
    const logs = await EmailLog.find({}, 'to status errorMessage sentAt').sort({ createdAt: -1 }).lean();
    
    console.log(`Total students in DB: ${students.length}`);
    console.log(`Total email logs in DB: ${logs.length}`);

    // Map email to its most recent log
    const latestLogMap = {};
    logs.forEach(log => {
      if (log.to) {
        const emailKey = log.to.toLowerCase().trim();
        if (!latestLogMap[emailKey]) {
          latestLogMap[emailKey] = log;
        }
      }
    });
    
    const studentsWithStatus = students.map(student => {
      const emailKey = student.email ? student.email.toLowerCase().trim() : '';
      const log = emailKey ? latestLogMap[emailKey] : null;
      return {
        name: student.name,
        email: student.email,
        emailStatus: log ? log.status : 'not_sent',
        emailError: log ? log.errorMessage : null,
        emailSentAt: log ? (log.sentAt || log.createdAt) : null
      };
    });
    
    console.log('Sample outputs (first 5):');
    console.log(studentsWithStatus.slice(0, 5));
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

run();
