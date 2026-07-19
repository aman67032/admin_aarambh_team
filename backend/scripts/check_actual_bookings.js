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
    console.log("Connected.");

    const query = "Menghani";
    const matches = await Student.find({ name: new RegExp(query, 'i') }).lean();
    console.log(`Found ${matches.length} matches for "${query}":`);
    matches.forEach(s => {
      console.log(`- Name: ${s.name} | AppNo: ${s.applicationNo} | Course: ${s.course} | ConfJklu: ${s.confirmedJklu}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
