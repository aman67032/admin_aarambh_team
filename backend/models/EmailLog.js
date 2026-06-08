const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  cc: {
    type: String
  },
  bcc: {
    type: String
  },
  status: {
    type: String,
    enum: ['sent', 'failed', 'pending'],
    default: 'pending'
  },
  errorMessage: {
    type: String
  },
  sentAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmailLog', emailLogSchema);
