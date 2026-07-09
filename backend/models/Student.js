const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  notes: {
    type: String,
    required: true
  },
  loggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loggedByName: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true
  },
  applicationNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'M', 'F', 'male', 'female']
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    trim: true
  },
  mobile: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  fatherName: {
    type: String,
    trim: true
  },
  fatherMobile: {
    type: String,
    trim: true
  },
  fatherEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  studentUserId: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    enum: ['North', 'South'],
    required: true
  },
  cluster: {
    type: String,
    required: true
  },
  cohort: {
    type: String,
    required: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  mailReceived: {
    type: Boolean,
    default: false
  },
  documentsVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: {
    type: Date
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  callLogs: [callLogSchema],
  callCount: {
    type: Number,
    default: 0
  },
  confirmedAarambh: {
    type: Boolean,
    default: false
  },
  confirmedJklu: {
    type: Boolean,
    default: false
  },
  notContinuing: {
    type: Boolean,
    default: false
  },
  notComingAarambh: {
    type: Boolean,
    default: false
  },
  confirmationNote: {
    type: String
  },
  confirmedAt: {
    type: Date
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  arrivalCode: {
    type: String,
    trim: true,
    index: true
  },
  arrivalInfo: {
    isFromJaipur: { type: Boolean },
    jaipurArea: { type: String, trim: true },
    wantsBus: { type: Boolean },
    arrivalDate: { type: String, trim: true },
    arrivalTime: { type: String, trim: true },
    transportMode: { type: String, trim: true },
    pickupPoint: { type: String, trim: true },
    city: { type: String, trim: true },
    place: { type: String, trim: true },
    declaredAt: { type: Date }
  }
}, {
  timestamps: true
});

studentSchema.pre('save', function(next) {
  if (!this.arrivalCode) {
    this.arrivalCode = Math.floor(100000 + Math.random() * 900000).toString();
  }
  if (this.confirmedJklu && !this.notContinuing && !this.notComingAarambh) {
    this.confirmedAarambh = true;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
