const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

const normalizeAppNo = (val) => (val || '').replace(/[\/\.\s_-]/g, '').toUpperCase();

// Helper to recursively find any value matching the JKLU Customer Ref pattern in the webhook payload
function findCustomerReference(obj) {
  if (!obj) return null;
  if (typeof obj === 'string') {
    // Matches patterns like JKLU_B_DES_2026_0521, JKLUBDES20260521, JKLU/B.DES/2026/0521, etc.
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

// POST /api/webhooks/cashfree
// Cashfree payment success webhook handler
router.post('/cashfree', async (req, res) => {
  try {
    console.log('=== Received Cashfree Webhook ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const payload = req.body;
    
    // Check if the payment was successful
    // Cashfree payload formats can vary (v3 vs v2 vs older API versions)
    // We check common status flags: type === 'PAYMENT_SUCCESS_WEBHOOK', txStatus === 'SUCCESS', or payment_status === 'SUCCESS'
    const isSuccess = 
      payload.type === 'PAYMENT_SUCCESS_WEBHOOK' || 
      (payload.data && payload.data.payment && payload.data.payment.payment_status === 'SUCCESS') ||
      payload.txStatus === 'SUCCESS' ||
      payload.payment_status === 'SUCCESS';

    if (!isSuccess) {
      console.log('Webhook ignored: Payment was not successful.');
      return res.status(200).json({ status: 'ignored', reason: 'Not a success event' });
    }

    // Recursively look for customer reference ID in the payload
    const customerRef = findCustomerReference(payload);
    if (!customerRef) {
      console.warn('Webhook warning: Could not find any JKLU customer reference ID in payload.');
      return res.status(200).json({ status: 'ignored', reason: 'No student reference found in payload' });
    }

    console.log(`Found Customer Reference ID: "${customerRef}"`);
    const normalizedRef = normalizeAppNo(customerRef);
    console.log(`Normalized Reference: "${normalizedRef}"`);

    // Pull all students from database
    const students = await Student.find({});
    
    // Search for matching student
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
    // Always return 200/500 to Cashfree so they don't continuously retry unless it's a real transient failure
    return res.status(500).json({ error: 'Server error processing webhook: ' + err.message });
  }
});

module.exports = router;
