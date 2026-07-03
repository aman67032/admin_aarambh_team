const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
