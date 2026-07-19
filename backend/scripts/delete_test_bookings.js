const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in env!");
  process.exit(1);
}

const TimeSlotBooking = require('../models/TimeSlotBooking');

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database.");

    const res = await TimeSlotBooking.deleteMany({
      applicationNo: "JKLU/BBA/2025/0527",
      course: "B.Tech",
      date: "2026-07-24",
      timeSlot: "11:00"
    });
    console.log(`Deleted ${res.deletedCount} test bookings.`);

  } catch (error) {
    console.error("Error during DB operations:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
