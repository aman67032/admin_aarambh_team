const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const HostelRoom = require('../models/HostelRoom');

// Normalize application numbers for comparison
function normalizeAppNo(appNo) {
  if (!appNo) return "";
  return appNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
}

// POST /api/hostel/verify-student
// Verify a student by application number and check room allotment status
router.post('/verify-student', async (req, res) => {
  try {
    const { applicationNo } = req.body;
    if (!applicationNo) {
      return res.status(400).json({ error: 'Application number is required.' });
    }

    const normAppNo = normalizeAppNo(applicationNo);
    
    // Find student in DB
    const students = await Student.find({});
    const student = students.find(s => normalizeAppNo(s.applicationNo) === normAppNo);

    if (!student) {
      return res.status(404).json({ error: 'No student found with this application number.' });
    }

    // Determine gender-based hostel ('BH-1' for male, 'GH-2' for female)
    const gender = (student.gender || '').toLowerCase();
    const isFemale = gender === 'female' || gender === 'f';
    const hostel = isFemale ? 'GH-2' : 'BH-1';

    // Check if student is already allotted a room
    const allotment = await HostelRoom.findOne({ allottedTo: student._id });

    res.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        applicationNo: student.applicationNo,
        gender: student.gender,
        course: student.course,
        cohort: student.cohort,
        cluster: student.cluster,
        email: student.email
      },
      hostel,
      isAllotted: !!allotment,
      allotment: allotment ? {
        hostel: allotment.hostel,
        floor: allotment.floor,
        room: allotment.room,
        bed: allotment.bed
      } : null
    });

  } catch (error) {
    console.error('Verify student error:', error);
    res.status(500).json({ error: 'Server error verifying student: ' + error.message });
  }
});

// GET /api/hostel/rooms/:hostelName
// Get rooms and their occupancy status for a specific hostel
router.get('/rooms/:hostelName', async (req, res) => {
  try {
    const { hostelName } = req.params;
    if (hostelName !== 'BH-1' && hostelName !== 'GH-2') {
      return res.status(400).json({ error: 'Invalid hostel name. Must be BH-1 or GH-2.' });
    }

    const beds = await HostelRoom.find({ hostel: hostelName }).sort({ sno: 1 });

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
      roomsMap[roomKey].beds.push({
        sno: bed.sno,
        bed: bed.bed,
        isOccupied: !!bed.allottedTo,
        // For privacy, we only share the occupied student's cohort & first name
        occupiedByCohort: bed.allottedTo ? (bed.allottedToName || 'Reserved') : null
      });
    });

    const roomsList = Object.values(roomsMap);
    res.json({
      success: true,
      hostel: hostelName,
      rooms: roomsList
    });

  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Server error retrieving rooms: ' + error.message });
  }
});

// POST /api/hostel/book
// Book room beds for primary student and optional friends
router.post('/book', async (req, res) => {
  try {
    const { studentAppNo, bedSno, friends } = req.body;
    
    if (!studentAppNo || !bedSno) {
      return res.status(400).json({ error: 'Student application number and selected bed are required.' });
    }

    const normPrimaryApp = normalizeAppNo(studentAppNo);
    const allStudents = await Student.find({});
    
    // 1. Verify primary student
    const primaryStudent = allStudents.find(s => normalizeAppNo(s.applicationNo) === normPrimaryApp);
    if (!primaryStudent) {
      return res.status(404).json({ error: 'Primary student not found.' });
    }

    // Check if primary student already has a room
    const primaryExisting = await HostelRoom.findOne({ allottedTo: primaryStudent._id });
    if (primaryExisting) {
      return res.status(400).json({ error: `Student ${primaryStudent.name} is already allotted to Room ${primaryExisting.room}.` });
    }

    // Determine correct hostel
    const gender = (primaryStudent.gender || '').toLowerCase();
    const isFemale = gender === 'female' || gender === 'f';
    const expectedHostel = isFemale ? 'GH-2' : 'BH-1';

    // 2. Verify friends (if any)
    const friendRecords = [];
    const friendAppNosSeen = new Set([normPrimaryApp]);
    const friendSnosSeen = new Set([parseInt(bedSno)]);

    if (friends && Array.isArray(friends) && friends.length > 0) {
      for (const friend of friends) {
        const { applicationNo: fAppNo, bedSno: fSno } = friend;
        
        if (!fAppNo || !fSno) {
          return res.status(400).json({ error: 'Friend application number and bed slot are required.' });
        }

        const normFriendApp = normalizeAppNo(fAppNo);
        const parseFriendSno = parseInt(fSno);

        if (friendAppNosSeen.has(normFriendApp)) {
          return res.status(400).json({ error: 'Duplicate friend application numbers or booking primary student as friend is not allowed.' });
        }
        if (friendSnosSeen.has(parseFriendSno)) {
          return res.status(400).json({ error: 'Two students cannot select the same bed slot.' });
        }

        friendAppNosSeen.add(normFriendApp);
        friendSnosSeen.add(parseFriendSno);

        // Find friend record
        const friendRec = allStudents.find(s => normalizeAppNo(s.applicationNo) === normFriendApp);
        if (!friendRec) {
          return res.status(404).json({ error: `Friend student with Application Number ${fAppNo} not found.` });
        }

        // Verify friend matches primary student's gender/hostel
        const fGender = (friendRec.gender || '').toLowerCase();
        const fIsFemale = fGender === 'female' || fGender === 'f';
        if (fIsFemale !== isFemale) {
          return res.status(400).json({ error: `Friend student ${friendRec.name} has a different gender. Co-ed room bookings are not allowed.` });
        }

        // Check if friend already has a room
        const friendExisting = await HostelRoom.findOne({ allottedTo: friendRec._id });
        if (friendExisting) {
          return res.status(400).json({ error: `Friend student ${friendRec.name} is already allotted to Room ${friendExisting.room}.` });
        }

        friendRecords.push({ student: friendRec, bedSno: parseFriendSno });
      }
    }

    // 3. Verify all selected beds are vacant and belong to the correct hostel
    const targetSnos = [parseInt(bedSno), ...friendRecords.map(f => f.bedSno)];
    const targetBeds = await HostelRoom.find({ sno: { $in: targetSnos } });

    if (targetBeds.length !== targetSnos.length) {
      return res.status(400).json({ error: 'One or more of the selected bed slots do not exist.' });
    }

    // Check hostel consistency and occupancy
    const primaryBed = targetBeds.find(b => b.sno === parseInt(bedSno));
    if (primaryBed.hostel !== expectedHostel) {
      return res.status(403).json({ error: `Primary student gender does not match selected bed hostel (${primaryBed.hostel}).` });
    }
    if (primaryBed.allottedTo) {
      return res.status(400).json({ error: `Selected bed slot in Room ${primaryBed.room} is already occupied.` });
    }

    // Verify all selected slots are in the SAME room (crucial "friend type thing" logic!)
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

    // 4. Perform the booking updates
    // Assign primary bed
    await HostelRoom.updateOne(
      { _id: primaryBed._id },
      {
        $set: {
          allottedTo: primaryStudent._id,
          allottedToName: primaryStudent.name,
          allottedToAppNo: primaryStudent.applicationNo
        }
      }
    );

    // Assign friend beds
    for (const f of friendRecords) {
      const fBed = targetBeds.find(b => b.sno === f.bedSno);
      await HostelRoom.updateOne(
        { _id: fBed._id },
        {
          $set: {
            allottedTo: f.student._id,
            allottedToName: f.student.name,
            allottedToAppNo: f.student.applicationNo
          }
        }
      );
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
    res.status(500).json({ error: 'Server error booking room: ' + error.message });
  }
});

module.exports = router;
