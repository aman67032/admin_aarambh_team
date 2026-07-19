const express = require('express');
const router = express.Router();
const TimeSlotBooking = require('../models/TimeSlotBooking');
const Student = require('../models/Student');

// ── Helpers ──────────────────────────────────────────────────────────

const CAPACITY = { 'B.Tech': 4, 'BBA': 2 };

/**
 * Generate all 28 time slots for a day.
 * Morning: 09:30 – 13:15 (16 slots, 15 min each)
 * Afternoon: 14:00 – 16:45 (12 slots, 15 min each)
 */
function generateTimeSlots() {
  const slots = [];

  // Morning session: 9:30 AM to 1:15 PM (last slot starts at 13:15)
  let hour = 9, min = 30;
  for (let i = 0; i < 16; i++) {
    const startH = hour;
    const startM = min;

    // Next slot time
    let endMin = min + 15;
    let endH = hour;
    if (endMin >= 60) { endMin -= 60; endH += 1; }

    const time = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;
    const label = `${formatAMPM(startH, startM)} - ${formatAMPM(endH, endMin)}`;
    slots.push({ time, label });

    min = endMin;
    hour = endH;
  }

  // Afternoon session: 2:00 PM to 4:45 PM (last slot starts at 16:45)
  hour = 14; min = 0;
  for (let i = 0; i < 12; i++) {
    const startH = hour;
    const startM = min;

    let endMin = min + 15;
    let endH = hour;
    if (endMin >= 60) { endMin -= 60; endH += 1; }

    const time = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;
    const label = `${formatAMPM(startH, startM)} - ${formatAMPM(endH, endMin)}`;
    slots.push({ time, label });

    min = endMin;
    hour = endH;
  }

  return slots;
}

function formatAMPM(h, m) {
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

// ── GET /available ───────────────────────────────────────────────────

router.get('/available', async (req, res) => {
  return res.status(403).json({ error: 'Slot booking is currently closed.', slots: [] });
  try {
    const { course, date } = req.query;
    if (!course || !date) {
      return res.status(400).json({ error: 'course and date are required' });
    }

    const capacity = CAPACITY[course];
    if (!capacity) {
      return res.status(400).json({ error: 'Invalid course. Must be B.Tech or BBA' });
    }

    // Count booked (non-cancelled) entries per time slot
    const bookedCounts = await TimeSlotBooking.aggregate([
      { $match: { date, course, status: 'booked' } },
      { $group: { _id: '$timeSlot', booked: { $sum: 1 } } }
    ]);

    const bookedMap = {};
    bookedCounts.forEach(b => { bookedMap[b._id] = b.booked; });

    const slots = generateTimeSlots().map(slot => {
      const booked = bookedMap[slot.time] || 0;
      return {
        time: slot.time,
        label: slot.label,
        booked,
        capacity,
        available: capacity - booked
      };
    });

    res.json({ date, course, slots });
  } catch (err) {
    console.error('Error fetching available slots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── POST /book ───────────────────────────────────────────────────────

router.post('/book', async (req, res) => {
  return res.status(403).json({ error: 'Slot booking is currently closed.' });
  try {
    const { applicationNo, name, course, date, timeSlot } = req.body;

    if (!applicationNo || !name || !course || !date || !timeSlot) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const capacity = CAPACITY[course];
    if (!capacity) {
      return res.status(400).json({ error: 'Invalid course. Must be B.Tech or BBA' });
    }

    // 1. Validate student exists and is confirmed (Bypassed by request)
    // Bypassed completely to allow any application number and course combination.

    // 3. Check student hasn't already booked for this course
    const existingBooking = await TimeSlotBooking.findOne({
      applicationNo,
      course,
      status: 'booked'
    });
    if (existingBooking) {
      return res.status(409).json({
        error: 'You already have an active booking for this course',
        booking: existingBooking
      });
    }

    // 4. Check slot capacity
    const bookedCount = await TimeSlotBooking.countDocuments({
      date,
      timeSlot,
      course,
      status: 'booked'
    });
    if (bookedCount >= capacity) {
      return res.status(409).json({ error: 'This time slot is fully booked' });
    }

    // 5. Assign next available desk number
    const bookedDesks = await TimeSlotBooking.find({
      date,
      timeSlot,
      course,
      status: 'booked'
    }).select('deskNumber').lean();

    const takenDesks = new Set(bookedDesks.map(b => b.deskNumber));
    let deskNumber = null;
    for (let i = 1; i <= capacity; i++) {
      if (!takenDesks.has(i)) {
        deskNumber = i;
        break;
      }
    }

    if (deskNumber === null) {
      return res.status(409).json({ error: 'No desks available for this slot' });
    }

    // 6. Create booking
    const booking = await TimeSlotBooking.create({
      applicationNo,
      name,
      course,
      date,
      timeSlot,
      deskNumber
    });

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (err) {
    // Handle duplicate key errors from unique indexes
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate booking detected' });
    }
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /my-booking ──────────────────────────────────────────────────

router.get('/my-booking', async (req, res) => {
  try {
    const { applicationNo, course } = req.query;
    if (!applicationNo || !course) {
      return res.status(400).json({ error: 'applicationNo and course are required' });
    }

    const booking = await TimeSlotBooking.findOne({ applicationNo, course });
    if (!booking) {
      return res.json({ booking: null });
    }

    res.json({ booking });
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── DELETE /cancel ───────────────────────────────────────────────────

router.delete('/cancel', async (req, res) => {
  try {
    const { applicationNo, course } = req.body;
    if (!applicationNo || !course) {
      return res.status(400).json({ error: 'applicationNo and course are required' });
    }

    const booking = await TimeSlotBooking.findOneAndUpdate(
      { applicationNo, course, status: 'booked' },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'No active booking found to cancel' });
    }

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /admin/all ───────────────────────────────────────────────────

router.get('/admin/all', async (req, res) => {
  try {
    const { date, course } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'date is required' });
    }

    const filter = { date };
    if (course) filter.course = course;

    const bookings = await TimeSlotBooking.find(filter)
      .sort({ timeSlot: 1, deskNumber: 1 })
      .lean();

    // Group by time slot
    const grouped = {};
    bookings.forEach(b => {
      if (!grouped[b.timeSlot]) {
        grouped[b.timeSlot] = [];
      }
      grouped[b.timeSlot].push(b);
    });

    res.json({ date, course: course || 'all', grouped, total: bookings.length });
  } catch (err) {
    console.error('Error fetching admin bookings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
