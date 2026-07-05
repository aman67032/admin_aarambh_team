const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  position: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  arrivalDate: {
    type: String,
    default: ''
  },
  arrivalTime: {
    type: String,
    default: ''
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkedInTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
