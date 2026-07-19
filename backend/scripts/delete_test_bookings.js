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

    // Delete test bookings
    const res1 = await TimeSlotBooking.deleteMany({ applicationNo: "JKLU/TEST/99999" });
    console.log(`Deleted ${res1.deletedCount} bookings for JKLU/TEST/99999`);

    const res2 = await TimeSlotBooking.deleteMany({ applicationNo: "JKLU/B.TECH/2026/1254", date: "2026-07-24" });
    console.log(`Deleted ${res2.deletedCount} bookings for MADHU KISHORE on July 24`);

    const res3 = await TimeSlotBooking.deleteMany({ applicationNo: "JKLU/BBA/2025/0527", date: "2026-07-24" });
    console.log(`Deleted ${res3.deletedCount} bookings for Ishika Yadav on July 24`);

  } catch (error) {
    console.error("Error during DB operations:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
