const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Student = require('../models/Student');

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const result = await Student.updateOne(
      { applicationNo: 'JKLU/B.TECH/2026/1456' },
      { $unset: { arrivalInfo: "" } }
    );

    if (result.matchedCount > 0) {
      console.log(`[SUCCESS] Unset arrivalInfo for Chakshu Jain. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    } else {
      console.log('[ERROR] Chakshu Jain not found in database.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

main();
