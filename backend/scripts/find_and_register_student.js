const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in env!");
  process.exit(1);
}

const Student = require('../models/Student');

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to Database.");

    const nameQuery = "Aniruddh Vardhan Singh";
    console.log(`Searching for: "${nameQuery}"`);

    // Case-insensitive regex search
    const student = await Student.findOne({ name: new RegExp(nameQuery, 'i') });
    
    if (!student) {
      console.log("No student found with that name.");
      
      // Let's do a broader search just in case
      const partials = await Student.find({ name: /Aniruddh/i });
      if (partials.length > 0) {
        console.log("Found close matches:");
        partials.forEach(s => {
          console.log(`- Name: ${s.name} | AppNo: ${s.applicationNo} | Cohort: ${s.cohort}`);
        });
      }
    } else {
      console.log("Found student details:");
      console.log(JSON.stringify(student, null, 2));
      
      // Let's update the student fields to mark him registered/confirmed
      console.log("\nUpdating student to be registered/confirmed...");
      student.confirmedJklu = true;
      student.confirmedAarambh = true;
      student.notContinuing = false;
      student.notComingAarambh = false;
      student.documentsVerified = true; // also mark docs verified
      
      await student.save();
      console.log("Student successfully marked as registered and verified!");
      
      // Re-fetch to confirm
      const updated = await Student.findById(student._id);
      console.log("\nUpdated student details:");
      console.log(JSON.stringify(updated, null, 2));
    }

  } catch (error) {
    console.error("Error during DB operations:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
