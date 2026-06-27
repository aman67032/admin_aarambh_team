const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');
const EmailLog = require('../models/EmailLog');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function cleanupData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Delete students with example.com emails (test data)
    const deleteResult = await Student.deleteMany({ email: /@example\.com$/i });
    console.log(`Deleted ${deleteResult.deletedCount} test/dummy student records.`);

    // 2. Delete all email logs (since they were sent to test students)
    const deleteLogsResult = await EmailLog.deleteMany({});
    console.log(`Deleted ${deleteLogsResult.deletedCount} email logs.`);

    // 2. Ensure applicationNo unique index is built
    const indexes = await Student.collection.indexes();
    const hasUniqueAppNo = indexes.some(idx => idx.key.applicationNo === 1 && idx.unique);
    if (!hasUniqueAppNo) {
      console.log('Rebuilding unique index on applicationNo...');
      await Student.collection.createIndex({ applicationNo: 1 }, { unique: true });
      console.log('Unique index on applicationNo created successfully.');
    } else {
      console.log('Unique index on applicationNo is already active.');
    }

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

cleanupData();
