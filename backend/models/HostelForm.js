const mongoose = require('mongoose');

const hostelFormSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember',
    required: true,
    unique: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  studentContact: {
    type: String,
    required: true,
    trim: true
  },
  parentName: {
    type: String,
    required: true,
    trim: true
  },
  parentContact: {
    type: String,
    required: true,
    trim: true
  },
  parentEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  parentGuardian2: {
    type: String,
    trim: true
  },
  parent2Contact: {
    type: String,
    trim: true
  },
  parent2Email: {
    type: String,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HostelForm', hostelFormSchema);
