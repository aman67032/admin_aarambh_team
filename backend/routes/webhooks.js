const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Student = require('../models/Student');

const normalizeAppNo = (val) => (val || '').replace(/[\/\.\s_-]/g, '').replace('2025', '2026').toUpperCase();

// Helper to recursively find any value matching the JKLU Customer Ref pattern in the webhook payload
function findCustomerReference(obj) {
  if (!obj) return null;
  if (typeof obj === 'string') {
    const match = obj.match(/JKLU[A-Z0-9_]*_(\d{4})/i) || obj.match(/JKLU[\/\.A-Z0-9_]*\/(\d{4})/i);
    if (match) return obj;
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = findCustomerReference(obj[key]);
        if (val) return val;
      }
    }
  }
  return null;
}

// Cashfree Signature verification middleware
function verifyCashfreeSignature(req, res, next) {
  const secret = process.env.CASHFREE_WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn('WARNING: CASHFREE_WEBHOOK_SECRET env variable is not configured. Webhook signature check is temporarily bypassed.');
    return next();
  }

  const signature = req.headers['x-webhook-signature'] || req.headers['x-cashfree-signature'] || req.headers['x-signature'];
  const timestamp = req.headers['x-webhook-timestamp'] || req.headers['x-timestamp'];

  if (!signature) {
    console.error('Webhook signature verification failed: Missing signature header.');
    return res.status(401).json({ error: 'Missing Webhook signature.' });
  }

  try {
    let computedSignature = '';
    const rawBody = JSON.stringify(req.body);
    
    if (timestamp) {
      const signatureData = timestamp + rawBody;
      computedSignature = crypto
        .createHmac('sha256', secret)
        .update(signatureData)
        .digest('base64');
    } else {
      computedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('base64');
    }

    if (computedSignature !== signature) {
      console.error('Webhook signature verification failed: Signature mismatch.');
      return res.status(401).json({ error: 'Invalid Webhook signature.' });
    }

    next();
  } catch (err) {
    console.error('Signature verification error:', err);
    return res.status(500).json({ error: 'Signature verification failed.' });
  }
}

// GET /api/webhooks/cashfree
router.get('/cashfree', (req, res) => {
  res.json({
    status: 'online',
    message: 'Cashfree Webhook endpoint is active. Please configure Cashfree to send POST requests here.',
    timestamp: new Date()
  });
});

// POST /api/webhooks/cashfree
// Cashfree payment success webhook handler (secured with signature check)
router.post('/cashfree', verifyCashfreeSignature, async (req, res) => {
  try {
    console.log('=== Received Cashfree Webhook ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const payload = req.body;
    
    const isSuccess = 
      payload.type === 'PAYMENT_SUCCESS_WEBHOOK' || 
      (payload.data && payload.data.payment && payload.data.payment.payment_status === 'SUCCESS') ||
      payload.txStatus === 'SUCCESS' ||
      payload.payment_status === 'SUCCESS';

    if (!isSuccess) {
      console.log('Webhook ignored: Payment was not successful.');
      return res.status(200).json({ status: 'ignored', reason: 'Not a success event' });
    }

    const customerRef = findCustomerReference(payload);
    if (!customerRef) {
      console.warn('Webhook warning: Could not find any JKLU customer reference ID in payload.');
      return res.status(200).json({ status: 'ignored', reason: 'No student reference found in payload' });
    }

    console.log(`Found Customer Reference ID: "${customerRef}"`);
    const normalizedRef = normalizeAppNo(customerRef);
    console.log(`Normalized Reference: "${normalizedRef}"`);

    const students = await Student.find({});
    const matchedStudent = students.find(s => normalizeAppNo(s.applicationNo) === normalizedRef);

    if (!matchedStudent) {
      console.warn(`Webhook warning: No student matching reference "${customerRef}" (normalized: "${normalizedRef}") found in DB.`);
      return res.status(200).json({ status: 'not_found', reason: 'Student not found in database' });
    }

    console.log(`Found matching student in DB: ${matchedStudent.name} (Cohort: ${matchedStudent.cohort}, Current Registration: ${matchedStudent.confirmedJklu})`);

    if (!matchedStudent.confirmedJklu) {
      matchedStudent.confirmedJklu = true;
      matchedStudent.confirmedAt = new Date();
      await matchedStudent.save();
      console.log(`Successfully marked student "${matchedStudent.name}" as registered (confirmedJklu = true) via Cashfree Webhook!`);
    } else {
      console.log(`Student "${matchedStudent.name}" was already marked as registered.`);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Student registration status updated successfully',
      student: matchedStudent.name,
      cohort: matchedStudent.cohort
    });

  } catch (err) {
    console.error('Error processing Cashfree webhook:', err);
    return res.status(500).json({ error: 'Server error processing webhook.' });
  }
});

module.exports = router;
