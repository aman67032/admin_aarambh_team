const mongoose = require('mongoose');

const hostelOtpSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Automatically deletes after 5 minutes (300 seconds)
  }
});

module.exports = mongoose.model('HostelOtp', hostelOtpSchema);
