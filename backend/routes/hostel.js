const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const HostelRoom = require('../models/HostelRoom');

// Normalize roll numbers for comparison
function normalizeRollNo(rollNo) {
  if (!rollNo) return "";
  return rollNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
}

// POST /api/hostel/verify-student
// Verify a team member by roll number and check room allotment status
router.post('/verify-student', async (req, res) => {
  try {
    const { rollNo } = req.body;
    if (!rollNo) {
      return res.status(400).json({ error: 'Roll number is required.' });
    }

    const normRoll = normalizeRollNo(rollNo);
    
    // Find team member in DB
    const member = await TeamMember.findOne({
      rollNo: { $regex: new RegExp('^' + normRoll + '$', 'i') }
    });

    if (!member) {
      return res.status(404).json({ error: 'No team leader or volunteer found with this Roll Number.' });
    }

    // Determine gender-based hostel ('BH-1' for male, 'GH-2' for female)
    const gender = (member.gender || '').toLowerCase();
    const isFemale = gender === 'female' || gender === 'f';
    const hostel = isFemale ? 'GH-2' : 'BH-1';

    // Check if team member is already allotted a room
    const allotment = await HostelRoom.findOne({ allottedTo: member._id });

    res.json({
      success: true,
      student: {
        id: member._id,
        name: member.name,
        applicationNo: member.rollNo, // client page uses student.applicationNo to display ID
        gender: member.gender,
        course: member.position, // client page displays this
        cohort: member.position,
        cluster: '',
        email: member.email
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
    console.error('Verify team member error:', error);
    res.status(500).json({ error: 'Server error verifying team member: ' + error.message });
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
// Book room beds for primary team member and optional friends
router.post('/book', async (req, res) => {
  try {
    const { studentAppNo: rollNo, bedSno, friends } = req.body;
    
    if (!rollNo || !bedSno) {
      return res.status(400).json({ error: 'Team member Roll Number and selected bed are required.' });
    }

    const normPrimaryRoll = normalizeRollNo(rollNo);
    
    // 1. Verify primary team member
    const primaryMember = await TeamMember.findOne({
      rollNo: { $regex: new RegExp('^' + normPrimaryRoll + '$', 'i') }
    });
    
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
        const friendRec = await TeamMember.findOne({
          rollNo: { $regex: new RegExp('^' + normFriendRoll + '$', 'i') }
        });
        
        if (!friendRec) {
          return res.status(404).json({ error: `Friend team member with Roll Number ${fRoll} not found.` });
        }

        // Verify friend matches primary student's gender/hostel
        const fGender = (friendRec.gender || '').toLowerCase();
        const fIsFemale = fGender === 'female' || fGender === 'f';
        if (fIsFemale !== isFemale) {
          return res.status(400).json({ error: `Friend team member ${friendRec.name} has a different gender. Co-ed room bookings are not allowed.` });
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
    const targetBeds = await HostelRoom.find({ sno: { $in: targetSnos } });

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

    // 4. Perform the booking updates
    // Assign primary bed
    await HostelRoom.updateOne(
      { _id: primaryBed._id },
      {
        $set: {
          allottedTo: primaryMember._id,
          allottedToName: primaryMember.name,
          allottedToAppNo: primaryMember.rollNo
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
            allottedTo: f.member._id,
            allottedToName: f.member.name,
            allottedToAppNo: f.member.rollNo
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
