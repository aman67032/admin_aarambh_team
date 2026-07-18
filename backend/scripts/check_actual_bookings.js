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
    console.log("Successfully connected to Database.");

    const slot = "09:30";
    const bookings = await TimeSlotBooking.find({ date: '2026-07-22', timeSlot: slot }).lean();
    console.log(`Bookings on 2026-07-22 for slot ${slot}:`);
    console.log(JSON.stringify(bookings, null, 2));

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
