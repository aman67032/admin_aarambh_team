const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const TeamMember = require('../models/TeamMember');
const HostelRoom = require('../models/HostelRoom');
const HostelOtp = require('../models/HostelOtp');
const HostelForm = require('../models/HostelForm');

// Helper to escape regex special characters to prevent regex injection
function escapeRegex(text) {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Normalize roll numbers for comparison
function normalizeRollNo(rollNo) {
  if (!rollNo) return "";
  let clean = rollNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
  clean = clean.replace('BETCH', 'BTECH');
  return clean;
}

// Singleton Transporters for connection pooling (speeds up SMTP delivery and prevents queue buildup)
const directTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'amanpratapsingh@jklu.edu.in',
    pass: process.env.SMTP_PASS
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

const otpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST_OTP || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT_OTP || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER_OTP || 'aarambh@jklu.edu.in',
    pass: process.env.SMTP_PASS_OTP
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Helper to send email directly using project's configured SMTP settings
const sendDirectEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: process.env.SMTP_USER || 'amanpratapsingh@jklu.edu.in',
    to,
    subject,
    html,
    bcc: 'amanpratapsingh@jklu.edu.in'
  };
  return directTransporter.sendMail(mailOptions);
};

// Dedicated helper for OTP emails — uses a separate Aarambh SMTP account
const sendOtpEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Aarambh 2026" <${process.env.SMTP_FROM_OTP || 'aarambh@jklu.edu.in'}>`,
    to,
    subject,
    html,
    bcc: 'amanpratapsingh@jklu.edu.in'
  };
  return otpTransporter.sendMail(mailOptions);
};

// Middleware to require Hostel session authentication
const requireHostelAuth = (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Session verification required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Allow either direct hostel booking OTP session OR general admin/super_admin user session
    if (decoded.isHostelAuth || decoded.role === 'admin' || decoded.role === 'super_admin') {
      req.hostelUser = decoded;
      return next();
    }

    return res.status(401).json({ error: 'Invalid session token type.' });
  } catch (error) {
    return res.status(401).json({ error: 'Session expired or invalid.' });
  }
};

// POST /api/hostel/send-otp
// Verify roll number and send a 6-digit OTP code to the registered email
router.post('/send-otp', async (req, res) => {
  try {
    const { rollNo } = req.body;
    if (!rollNo) {
      return res.status(400).json({ error: 'Roll number is required.' });
    }

    const normRoll = normalizeRollNo(rollNo);
    const escapedRoll = escapeRegex(normRoll);
    const members = await TeamMember.find({
      rollNo: { $regex: new RegExp('^' + escapedRoll + '$', 'i') }
    });

    if (members.length === 0) {
      return res.status(404).json({ error: 'No team leader or volunteer found with this Roll Number.' });
    }

    // Use email of the first member
    const member = members[0];
    if (!member.email) {
      return res.status(400).json({ error: 'No registered email found for this roll number. Please contact your coordinator.' });
    }

    // Generate a secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in database, overwriting any previous OTP for this roll number
    await HostelOtp.deleteMany({ rollNo: normRoll });
    const newOtp = new HostelOtp({
      rollNo: normRoll,
      email: member.email,
      otp: otp
    });
    await newOtp.save();

    // Send OTP via direct SMTP mail
    const subject = 'Aarambh 2026 Portal - Hostel Booking Verification Code';
    const html = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #1380c1; margin-top: 0;">Aarambh 2026</h2>
        <p>Hello <strong>${member.name}</strong>,</p>
        <p>You requested a verification code to access the Hostel Booking portal.</p>
        <div style="background-color: #f4f6f8; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #111;">${otp}</span>
        </div>
        <p style="font-size: 12px; color: #666;">This verification code is valid for 5 minutes. Do not share this code with anyone.</p>
      </div>
    `;

    // Send OTP in background to prevent blocking the HTTP event loop/queues
    sendOtpEmail({ to: member.email, subject, html }).catch(err => {
      console.error('Error sending OTP in background:', err);
    });

    // Mask email for response (e.g. a***@jklu.edu.in)
    const [local, domain] = member.email.split('@');
    const maskedEmail = local.length > 2 ? `${local[0]}***${local[local.length-1]}@${domain}` : `***@${domain}`;

    res.json({
      success: true,
      message: `OTP sent successfully to your registered email: ${maskedEmail}`,
      email: maskedEmail
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Server error sending verification code.' });
  }
});

// POST /api/hostel/verify-otp
// Verify OTP and return student/allotment details + short-lived JWT token
router.post('/verify-otp', async (req, res) => {
  try {
    const { rollNo, otp } = req.body;
    if (!rollNo || !otp) {
      return res.status(400).json({ error: 'Roll number and verification code are required.' });
    }

    const normRoll = normalizeRollNo(rollNo);
    const validOtp = await HostelOtp.findOne({ rollNo: normRoll, otp: otp.trim() });
    
    if (!validOtp) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    // Delete used OTP
    await HostelOtp.deleteOne({ _id: validOtp._id });

    // Find all matching team members (resolving duplicates by gender if provided)
    const escapedRoll = escapeRegex(normRoll);
    let memberQuery = {
      rollNo: { $regex: new RegExp('^' + escapedRoll + '$', 'i') }
    };
    if (req.body.gender) {
      const escapedGender = escapeRegex(req.body.gender);
      memberQuery.gender = { $regex: new RegExp('^' + escapedGender + '$', 'i') };
    }
    const members = await TeamMember.find(memberQuery);

    if (members.length === 0) {
      return res.status(404).json({ error: 'No team leader or volunteer found.' });
    }

    // Handle multiple entries (duplicates)
    if (members.length > 1) {
      return res.json({
        success: true,
        multiple: true,
        members: members.map(m => ({
          id: m._id,
          name: m.name,
          gender: m.gender,
          position: m.position,
          email: m.email
        }))
      });
    }

    const member = members[0];
    const mGender = (member.gender || '').toLowerCase();
    const isFemale = mGender === 'female' || mGender === 'f';
    const hostel = isFemale ? 'GH-2' : 'BH-1';
    const allotment = await HostelRoom.findOne({ allottedTo: member._id });

    // Generate short-lived JWT token for booking
    const token = jwt.sign(
      {
        rollNo: member.rollNo,
        gender: member.gender,
        isHostelAuth: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '365d' }
    );

    const form = await HostelForm.findOne({ rollNo: normRoll });
    res.json({
      success: true,
      token,
      student: {
        id: member._id,
        name: member.name,
        applicationNo: member.rollNo,
        gender: member.gender,
        course: member.position,
        cohort: member.position,
        cluster: '',
        email: member.email,
        mobile: member.mobile
      },
      hostel,
      isAllotted: !!allotment,
      hasFilledForm: !!form,
      allotment: allotment ? {
        hostel: allotment.hostel,
        floor: allotment.floor,
        room: allotment.room,
        bed: allotment.bed
      } : null
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Server error verifying code.' });
  }
});

// POST /api/hostel/verify-student
// Verify a team member by roll number (used to display selected name when duplicates exist)
router.post('/verify-student', async (req, res) => {
  try {
    const { rollNo, gender, selectedMemberId } = req.body;
    if (!rollNo) {
      return res.status(400).json({ error: 'Roll number is required.' });
    }

    const normRoll = normalizeRollNo(rollNo);
    const escapedRoll = escapeRegex(normRoll);
    let query = {
      rollNo: { $regex: new RegExp('^' + escapedRoll + '$', 'i') }
    };

    if (gender) {
      const cleanGender = (gender.toLowerCase() === 'female' || gender.toLowerCase() === 'f') ? 'Female' : 'Male';
      query.gender = cleanGender;
    }

    if (selectedMemberId) {
      query._id = selectedMemberId;
    }

    const members = await TeamMember.find(query);
    if (members.length === 0) {
      return res.status(404).json({ error: 'No team leader or volunteer found.' });
    }

    const member = members[0];
    const mGender = (member.gender || '').toLowerCase();
    const isFemale = mGender === 'female' || mGender === 'f';
    const hostel = isFemale ? 'GH-2' : 'BH-1';
    const allotment = await HostelRoom.findOne({ allottedTo: member._id });

    // Generate short-lived JWT token for booking
    const token = jwt.sign(
      {
        rollNo: member.rollNo,
        gender: member.gender,
        isHostelAuth: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '365d' }
    );

    const form = await HostelForm.findOne({ rollNo: normRoll });
    res.json({
      success: true,
      token,
      student: {
        id: member._id,
        name: member.name,
        applicationNo: member.rollNo,
        gender: member.gender,
        course: member.position,
        cohort: member.position,
        cluster: '',
        email: member.email,
        mobile: member.mobile
      },
      hostel,
      isAllotted: !!allotment,
      hasFilledForm: !!form,
      allotment: allotment ? {
        hostel: allotment.hostel,
        floor: allotment.floor,
        room: allotment.room,
        bed: allotment.bed
      } : null
    });

  } catch (error) {
    console.error('Verify student error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/hostel/rooms/:hostelName
// Get rooms and their occupancy status for a specific hostel
router.get('/rooms/:hostelName', requireHostelAuth, async (req, res) => {
  try {
    const { hostelName } = req.params;
    if (hostelName !== 'BH-1' && hostelName !== 'GH-2') {
      return res.status(400).json({ error: 'Invalid hostel name. Must be BH-1 or GH-2.' });
    }

    const beds = await HostelRoom.find({ hostel: hostelName }).populate('allottedTo').sort({ sno: 1 });

    const filledForms = await HostelForm.find({}, 'rollNo');
    const filledRolls = new Set(filledForms.map(f => normalizeRollNo(f.rollNo)));

    // Group beds by room
    const roomsMap = {};
    beds.forEach(bed => {
      const roomKey = bed.room;
      if (!roomsMap[roomKey]) {
        roomsMap[roomKey] = {
          room: bed.room,
          floor: bed.floor,
          beds: []
        };
      }
      const normAppNo = bed.allottedToAppNo ? normalizeRollNo(bed.allottedToAppNo) : null;
      roomsMap[roomKey].beds.push({
        sno: bed.sno,
        bed: bed.bed,
        isOccupied: !!bed.allottedTo,
        occupiedByCohort: bed.allottedTo ? (bed.allottedToName || 'Reserved') : null,
        occupiedByAppNo: bed.allottedToAppNo || null,
        hasFilledForm: normAppNo ? filledRolls.has(normAppNo) : false,
        arrivalDate: bed.allottedTo ? (bed.allottedTo.arrivalDate || '') : '',
        arrivalTime: bed.allottedTo ? (bed.allottedTo.arrivalTime || '') : '',
        checkedIn: bed.allottedTo ? (bed.allottedTo.checkedIn || false) : false,
        checkedInTime: bed.allottedTo ? (bed.allottedTo.checkedInTime || null) : null,
        memberId: bed.allottedTo ? bed.allottedTo._id : null
      });
    });

    // Filter out completely empty rooms dynamically
    const roomsList = Object.values(roomsMap).filter(room => {
      return room.beds.some(bed => bed.isOccupied);
    });

    res.json({
      success: true,
      hostel: hostelName,
      rooms: roomsList
    });

  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Server error retrieving rooms.' });
  }
});

// POST /api/hostel/book
// Book room beds for primary team member and optional friends
router.post('/book', requireHostelAuth, async (req, res) => {
  try {
    const { studentAppNo: rollNo, bedSno, friends, selectedMemberId } = req.body;
    
    if (!rollNo || !bedSno) {
      return res.status(400).json({ error: 'Team member Roll Number and selected bed are required.' });
    }

    const normPrimaryRoll = normalizeRollNo(rollNo);
    
    // Cross-user session validation
    if (normPrimaryRoll !== normalizeRollNo(req.hostelUser.rollNo)) {
      return res.status(403).json({ error: 'Access denied. You can only book a room for yourself.' });
    }

    // 1. Verify primary team member
    let primaryMember = null;
    if (selectedMemberId) {
      primaryMember = await TeamMember.findById(selectedMemberId);
    } else {
      const escapedRoll = escapeRegex(normPrimaryRoll);
      const members = await TeamMember.find({
        rollNo: { $regex: new RegExp('^' + escapedRoll + '$', 'i') }
      });
      if (members.length === 1) {
        primaryMember = members[0];
      } else if (members.length > 1) {
        return res.status(400).json({ error: 'Multiple members found with this Roll Number. Please select your name first.' });
      }
    }
    
    if (!primaryMember) {
      return res.status(404).json({ error: 'Primary team member not found.' });
    }

    // Check if primary member already has a room
    const primaryExisting = await HostelRoom.findOne({ allottedTo: primaryMember._id });
    if (primaryExisting) {
      return res.status(400).json({ error: `Team member ${primaryMember.name} is already allotted to Room ${primaryExisting.room}.` });
    }

    // Determine correct hostel
    const gender = (primaryMember.gender || '').toLowerCase();
    const isFemale = gender === 'female' || gender === 'f';
    const expectedHostel = isFemale ? 'GH-2' : 'BH-1';

    // 2. Verify friends (if any)
    const friendRecords = [];
    const friendRollsSeen = new Set([normPrimaryRoll]);
    const friendSnosSeen = new Set([parseInt(bedSno)]);

    if (friends && Array.isArray(friends) && friends.length > 0) {
      for (const friend of friends) {
        const { applicationNo: fRoll, bedSno: fSno } = friend;
        
        if (!fRoll || !fSno) {
          return res.status(400).json({ error: 'Friend Roll Number and bed slot are required.' });
        }

        const normFriendRoll = normalizeRollNo(fRoll);
        const parseFriendSno = parseInt(fSno);

        if (friendRollsSeen.has(normFriendRoll)) {
          return res.status(400).json({ error: 'Duplicate friend roll numbers or booking primary member as friend is not allowed.' });
        }
        if (friendSnosSeen.has(parseFriendSno)) {
          return res.status(400).json({ error: 'Two members cannot select the same bed slot.' });
        }

        friendRollsSeen.add(normFriendRoll);
        friendSnosSeen.add(parseFriendSno);

        // Find friend record
        const escapedFriendRoll = escapeRegex(normFriendRoll);
        const friendRec = await TeamMember.findOne({
          rollNo: { $regex: new RegExp('^' + escapedFriendRoll + '$', 'i') },
          gender: isFemale ? 'Female' : 'Male'
        });
        
        if (!friendRec) {
          return res.status(404).json({ error: `Friend team member with Roll Number ${fRoll} (matching gender ${isFemale ? 'Female' : 'Male'}) not found.` });
        }

        // Check if friend already has a room
        const friendExisting = await HostelRoom.findOne({ allottedTo: friendRec._id });
        if (friendExisting) {
          return res.status(400).json({ error: `Friend team member ${friendRec.name} is already allotted to Room ${friendExisting.room}.` });
        }

        friendRecords.push({ member: friendRec, bedSno: parseFriendSno });
      }
    }

    // 3. Verify all selected beds are vacant and belong to the correct hostel
    const targetSnos = [parseInt(bedSno), ...friendRecords.map(f => f.bedSno)];
    const targetBeds = await HostelRoom.find({ sno: { $in: targetSnos }, hostel: expectedHostel });

    if (targetBeds.length !== targetSnos.length) {
      return res.status(400).json({ error: 'One or more of the selected bed slots do not exist.' });
    }

    // Check hostel consistency and occupancy
    const primaryBed = targetBeds.find(b => b.sno === parseInt(bedSno));
    if (primaryBed.hostel !== expectedHostel) {
      return res.status(403).json({ error: `Primary member gender does not match selected bed hostel (${primaryBed.hostel}).` });
    }
    if (primaryBed.allottedTo) {
      return res.status(400).json({ error: `Selected bed slot in Room ${primaryBed.room} is already occupied.` });
    }

    // Verify all selected slots are in the SAME room
    const targetRoom = primaryBed.room;
    for (const bed of targetBeds) {
      if (bed.room !== targetRoom) {
        return res.status(400).json({ error: 'Group bookings with friends must be in the same room.' });
      }
      if (bed.hostel !== expectedHostel) {
        return res.status(400).json({ error: 'All selected slots must be in the same hostel.' });
      }
      if (bed.allottedTo) {
        return res.status(400).json({ error: `Bed slot ${bed.bed} in Room ${bed.room} is already occupied.` });
      }
    }

    // 4. Perform the booking updates atomically
    const primaryUpdate = await HostelRoom.updateOne(
      { _id: primaryBed._id, allottedTo: null },
      {
        $set: {
          allottedTo: primaryMember._id,
          allottedToName: primaryMember.name,
          allottedToAppNo: primaryMember.rollNo
        }
      }
    );

    if (primaryUpdate.modifiedCount === 0) {
      return res.status(400).json({ error: `Selected bed slot ${primaryBed.bed} in Room ${primaryBed.room} was just occupied by another member. Please refresh and try again.` });
    }

    // Assign friend beds, rollback all if any fail
    const successfulFriendIds = [];
    let friendFailed = false;
    let failedFriendBed = null;

    for (const f of friendRecords) {
      const fBed = targetBeds.find(b => b.sno === f.bedSno);
      const friendUpdate = await HostelRoom.updateOne(
        { _id: fBed._id, allottedTo: null },
        {
          $set: {
            allottedTo: f.member._id,
            allottedToName: f.member.name,
            allottedToAppNo: f.member.rollNo
          }
        }
      );

      if (friendUpdate.modifiedCount === 0) {
        friendFailed = true;
        failedFriendBed = fBed;
        break;
      } else {
        successfulFriendIds.push(fBed._id);
      }
    }

    if (friendFailed) {
      // Rollback primary booking
      await HostelRoom.updateOne({ _id: primaryBed._id }, { $set: { allottedTo: null, allottedToName: null, allottedToAppNo: null } });
      // Rollback successful friend bookings
      if (successfulFriendIds.length > 0) {
        await HostelRoom.updateMany(
          { _id: { $in: successfulFriendIds } },
          { $set: { allottedTo: null, allottedToName: null, allottedToAppNo: null } }
        );
      }
      return res.status(400).json({ error: `Friend bed slot ${failedFriendBed.bed} in Room ${failedFriendBed.room} was just occupied by another member. All bookings in this attempt have been rolled back.` });
    }

    res.json({
      success: true,
      message: 'Room booked successfully!',
      details: {
        hostel: primaryBed.hostel,
        floor: primaryBed.floor,
        room: primaryBed.room,
        bookedBeds: targetBeds.map(b => b.bed)
      }
    });

  } catch (error) {
    console.error('Book room error:', error);
    res.status(500).json({ error: 'Server error booking room.' });
  }
});

// POST /api/hostel/vacate
// Vacate a bed slot (Admin/Super Admin only)
router.post('/vacate', requireHostelAuth, async (req, res) => {
  try {
    if (req.hostelUser.role !== 'admin' && req.hostelUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    }

    const { bedSno } = req.body;
    if (!bedSno) {
      return res.status(400).json({ error: 'Bed serial number is required.' });
    }

    const result = await HostelRoom.updateOne(
      { sno: parseInt(bedSno) },
      {
        $set: {
          allottedTo: null,
          allottedToName: null,
          allottedToAppNo: null
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Bed slot not found.' });
    }

    res.json({ success: true, message: 'Bed slot vacated successfully.' });

  } catch (error) {
    console.error('Vacate bed error:', error);
    res.status(500).json({ error: 'Server error vacating bed slot.' });
  }
});


// GET /api/hostel/form/:rollNo
// Retrieve stay permission details for a student
router.get('/form/:rollNo', async (req, res) => {
  try {
    const { rollNo } = req.params;
    const normRoll = normalizeRollNo(rollNo);
    const form = await HostelForm.findOne({ rollNo: normRoll });
    if (!form) {
      return res.status(404).json({ error: 'Stay permission details not found for this roll number.' });
    }
    res.json({ success: true, form });
  } catch (error) {
    console.error('Get student form error:', error);
    res.status(500).json({ error: 'Server error retrieving form details.' });
  }
});

// POST /api/hostel/form
// Submit stay permission form details
router.post('/form', async (req, res) => {
  try {
    const {
      rollNo,
      studentContact,
      parentName,
      parentContact,
      parentEmail,
      parentGuardian2,
      parent2Contact,
      parent2Email,
      address
    } = req.body;

    if (!rollNo || !studentContact || !parentName || !parentContact || !address) {
      return res.status(400).json({ error: 'Roll number, student contact, parent name, parent contact, and address are required.' });
    }

    const normRoll = normalizeRollNo(rollNo);
    const escapedRoll = escapeRegex(normRoll);

    // Find the student member
    const member = await TeamMember.findOne({
      rollNo: { $regex: new RegExp('^' + escapedRoll + '$', 'i') }
    });

    if (!member) {
      return res.status(404).json({ error: 'Roster record not found for this roll number.' });
    }

    // Save or update
    let form = await HostelForm.findOne({ rollNo: normRoll });
    if (form) {
      form.studentContact = studentContact;
      form.parentName = parentName;
      form.parentContact = parentContact;
      form.parentEmail = parentEmail;
      form.parentGuardian2 = parentGuardian2;
      form.parent2Contact = parent2Contact;
      form.parent2Email = parent2Email;
      form.address = address;
    } else {
      form = new HostelForm({
        studentId: member._id,
        rollNo: normRoll,
        studentContact,
        parentName,
        parentContact,
        parentEmail,
        parentGuardian2,
        parent2Contact,
        parent2Email,
        address
      });
    }

    await form.save();
    res.json({ success: true, message: 'Stay permission details saved successfully.', form });
  } catch (error) {
    console.error('Save form error:', error);
    res.status(500).json({ error: 'Server error saving form details.' });
  }
});

// GET /api/hostel/forms
// Admin endpoint to retrieve all submitted forms
router.get('/forms', requireHostelAuth, async (req, res) => {
  try {
    if (req.hostelUser.role !== 'admin' && req.hostelUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    }
    const forms = await HostelForm.find({}).populate('studentId', 'name rollNo gender position email mobile');
    res.json({ success: true, forms });
  } catch (error) {
    console.error('Get all forms error:', error);
    res.status(500).json({ error: 'Server error retrieving all forms.' });
  }
});

// POST /api/hostel/member/arrival
// Update team member arrival details (Super Admin only)
router.post('/member/arrival', requireHostelAuth, async (req, res) => {
  try {
    if (req.hostelUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super Administrator privileges required.' });
    }

    const { memberId, arrivalDate, arrivalTime } = req.body;
    if (!memberId) {
      return res.status(400).json({ error: 'Team member ID is required.' });
    }

    const updated = await TeamMember.findByIdAndUpdate(
      memberId,
      { $set: { arrivalDate: arrivalDate || '', arrivalTime: arrivalTime || '' } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    res.json({ success: true, message: 'Arrival details updated successfully.', member: updated });

  } catch (error) {
    console.error('Update arrival error:', error);
    res.status(500).json({ error: 'Server error updating arrival details.' });
  }
});

// POST /api/hostel/member/check-in
// Record team member check-in time (Admin/Super Admin only)
router.post('/member/check-in', requireHostelAuth, async (req, res) => {
  try {
    if (req.hostelUser.role !== 'admin' && req.hostelUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    }

    const { memberId } = req.body;
    if (!memberId) {
      return res.status(400).json({ error: 'Team member ID is required.' });
    }

    const updated = await TeamMember.findByIdAndUpdate(
      memberId,
      { $set: { checkedIn: true, checkedInTime: new Date() } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    res.json({ success: true, message: 'Check-in recorded successfully.', member: updated });

  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Server error recording check-in.' });
  }
});

module.exports = router;
