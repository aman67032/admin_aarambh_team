const mongoose = require('mongoose');

const timeSlotBookingSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    enum: ['B.Tech', 'BBA']
  },
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  deskNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked'
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// One desk per slot per course per date
timeSlotBookingSchema.index(
  { date: 1, timeSlot: 1, course: 1, deskNumber: 1 },
  { unique: true }
);

// One booking per student per course
timeSlotBookingSchema.index(
  { applicationNo: 1, course: 1 },
  { unique: true }
);

module.exports = mongoose.model('TimeSlotBooking', timeSlotBookingSchema);
