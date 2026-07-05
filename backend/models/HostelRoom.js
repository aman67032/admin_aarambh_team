const mongoose = require('mongoose');

const hostelRoomSchema = new mongoose.Schema({
  hostel: {
    type: String,
    required: true,
    enum: ['BH-1', 'GH-2']
  },
  floor: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  bed: {
    type: String,
    required: true
  },
  sno: {
    type: Number,
    required: true
  },
  allottedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember',
    default: null
  },
  allottedToName: {
    type: String,
    default: null
  },
  allottedToAppNo: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Ensure a bed slot in a specific room is unique
hostelRoomSchema.index({ hostel: 1, room: 1, bed: 1 }, { unique: true });

// Ensure a student can only be allotted to one room slot
hostelRoomSchema.index({ allottedTo: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('HostelRoom', hostelRoomSchema);
