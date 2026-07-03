'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '../components/Loader';
import PlasmaWave from '../components/PlasmaWave';

interface StudentInfo {
  id: string;
  name: string;
  applicationNo: string;
  gender: string;
  course: string;
  cohort: string;
  cluster: string;
  email: string;
}

interface AllotmentInfo {
  hostel: string;
  floor: string;
  room: string;
  bed: string;
}

interface BedInfo {
  sno: number;
  bed: string;
  isOccupied: boolean;
  occupiedByCohort: string | null;
}

interface RoomInfo {
  room: string;
  floor: string;
  beds: BedInfo[];
}

export default function HostelBookingPage() {
  // Verification states
  const [appNo, setAppNo] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [hostelName, setHostelName] = useState<'BH-1' | 'GH-2' | null>(null);
  const [isAllotted, setIsAllotted] = useState(false);
  const [allotment, setAllotment] = useState<AllotmentInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle duplicate roll numbers in sheet
  const [multipleMembers, setMultipleMembers] = useState<any[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Rooms display states
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo | null>(null);
  const [selectedBed, setSelectedBed] = useState<BedInfo | null>(null);

  // Group booking/friends state
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [friendsList, setFriendsList] = useState<{ appNo: string; verifiedStudent: StudentInfo | null; bedSno: number | null; error: string; verifying: boolean }[]>([
    { appNo: '', verifiedStudent: null, bedSno: null, error: '', verifying: false }
  ]);

  // Booking process states
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Force light theme on mount for clean layout and readability
  useEffect(() => {
    document.documentElement.classList.remove('theme-fun');
  }, []);

  // Verify primary student
  const handleVerifyStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNo.trim()) return;

    setVerifying(true);
    setErrorMsg('');
    setStudent(null);
    setHostelName(null);
    setIsAllotted(false);
    setAllotment(null);
    setSelectedRoom(null);
    setSelectedBed(null);
    setIsGroupBooking(false);
    setFriendsList([{ appNo: '', verifiedStudent: null, bedSno: null, error: '', verifying: false }]);
    setMultipleMembers([]);
    setSelectedMemberId(null);

    try {
      const res = await fetch('/api/hostel/verify-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: appNo.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      // If duplicate roll number found in sheet
      if (data.multiple) {
        setMultipleMembers(data.members);
        return;
      }

      setStudent(data.student);
      setHostelName(data.hostel);
      setIsAllotted(data.isAllotted);
      setAllotment(data.allotment);
      setSelectedMemberId(data.student.id);

      if (!data.isAllotted && data.hostel) {
        fetchRooms(data.hostel);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during verification.');
    } finally {
      setVerifying(false);
    }
  };

  // Handle select duplicate member
  const handleSelectMember = async (member: any) => {
    setVerifying(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/hostel/verify-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: appNo.trim(), gender: member.gender })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      setStudent(data.student);
      setHostelName(data.hostel);
      setIsAllotted(data.isAllotted);
      setAllotment(data.allotment);
      setSelectedMemberId(member.id);
      setMultipleMembers([]); // clear list

      if (!data.isAllotted && data.hostel) {
        fetchRooms(data.hostel);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during verification.');
    } finally {
      setVerifying(false);
    }
  };

  // Fetch hostel rooms
  const fetchRooms = async (hostel: string) => {
    setLoadingRooms(true);
    try {
      const res = await fetch(`/api/hostel/rooms/${hostel}`);
      const data = await res.json();
      if (res.ok) {
        setRooms(data.rooms);
        // Find all unique floors
        const floors = Array.from(new Set(data.rooms.map((r: any) => r.floor))) as string[];
        if (floors.length > 0) {
          // Default to first floor found
          setSelectedFloor(floors[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoadingRooms(false);
    }
  };

  // Verify a friend
  const handleVerifyFriend = async (index: number) => {
    const friend = friendsList[index];
    if (!friend.appNo.trim()) return;

    // Check if friend appNo is same as primary student
    if (student && friend.appNo.trim().toUpperCase().replace(/[\/\.\s-]/g, '') === student.applicationNo.toUpperCase().replace(/[\/\.\s-]/g, '')) {
      updateFriendState(index, { error: 'You cannot add yourself as a friend.' });
      return;
    }

    // Check if duplicate in friendsList
    const normFriendApp = friend.appNo.trim().toUpperCase().replace(/[\/\.\s-]/g, '');
    const duplicate = friendsList.some((f, idx) => {
      if (idx === index || !f.appNo) return false;
      return f.appNo.trim().toUpperCase().replace(/[\/\.\s-]/g, '') === normFriendApp;
    });
    if (duplicate) {
      updateFriendState(index, { error: 'Duplicate friend roll number.' });
      return;
    }

    updateFriendState(index, { verifying: true, error: '', verifiedStudent: null });

    try {
      // Pass primary student's gender to resolve duplicates automatically for the correct gender block!
      const res = await fetch('/api/hostel/verify-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: friend.appNo.trim(), gender: student?.gender })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      if (data.isAllotted) {
        throw new Error(`${data.student.name} is already allotted to Room ${data.allotment.room}.`);
      }

      // Check gender mismatch (double safety)
      if (student && data.student.gender !== student.gender) {
        throw new Error(`Gender mismatch: Friend must be ${student.gender}.`);
      }

      updateFriendState(index, { verifiedStudent: data.student, error: '' });
    } catch (err: any) {
      updateFriendState(index, { error: err.message || 'Verification failed.' });
    } finally {
      updateFriendState(index, { verifying: false });
    }
  };

  const updateFriendState = (index: number, updates: any) => {
    setFriendsList(prev => prev.map((f, idx) => idx === index ? { ...f, ...updates } : f));
  };

  const addFriendInput = () => {
    // Limits: BH-1 (max 1 friend for double sharing), GH-2 (max 3 friends)
    const limit = hostelName === 'BH-1' ? 1 : 3;
    if (friendsList.length < limit) {
      setFriendsList(prev => [...prev, { appNo: '', verifiedStudent: null, bedSno: null, error: '', verifying: false }]);
    }
  };

  const removeFriendInput = (index: number) => {
    setFriendsList(prev => prev.filter((_, idx) => idx !== index));
    // Clear friend bed assignments
    if (selectedRoom) {
      setSelectedBed(null);
    }
  };

  // Select room & reset assignments
  const handleSelectRoom = (room: RoomInfo) => {
    setSelectedRoom(room);
    setSelectedBed(null);
    // Reset friend bed assignments
    setFriendsList(prev => prev.map(f => ({ ...f, bedSno: null })));
  };

  // Submit booking
  const handleBookRoom = async () => {
    if (!student || !selectedRoom || !selectedBed) return;

    // Check if group booking has unverified friends or unassigned beds
    if (isGroupBooking) {
      const invalidFriend = friendsList.some(f => !f.verifiedStudent || !f.bedSno);
      if (invalidFriend) {
        alert('Please verify all friends and assign a bed slot to each of them.');
        return;
      }
    }

    setBooking(true);
    try {
      const payload = {
        studentAppNo: student.applicationNo,
        bedSno: selectedBed.sno,
        selectedMemberId: selectedMemberId,
        friends: isGroupBooking
          ? friendsList.map(f => ({
              applicationNo: f.verifiedStudent!.applicationNo,
              bedSno: f.bedSno
            }))
          : []
      };

      const res = await fetch('/api/hostel/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to book room.');
      }

      setBookingSuccess(true);
      setBookingDetails(data.details);
    } catch (err: any) {
      alert(err.message || 'An error occurred during booking.');
    } finally {
      setBooking(false);
    }
  };

  // Filter unique floors
  const floors = Array.from(new Set(rooms.map(r => r.floor))) as string[];

  // Filter rooms by floor
  const filteredRooms = rooms.filter(r => r.floor === selectedFloor);

  return (
    <div className="min-h-screen bg-background fun-bg-pattern flex flex-col justify-between text-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-card-bg/85 backdrop-blur-md border-b border-card-border z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-12 object-contain" />
            <div className="w-[1px] h-6 bg-card-border"></div>
            <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh logo" className="h-16 object-contain" />
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full z-10">
        {/* Success screen */}
        {bookingSuccess ? (
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-8 backdrop-blur-md text-center shadow-glow">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-green-500 font-bold">✓</span>
            </div>
            <h2 className="text-2xl font-bold font-outfit text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-text-muted text-sm mb-6">Your hostel room has been successfully booked.</p>

            <div className="bg-background/80 rounded-xl p-6 border border-card-border text-foreground mb-6 font-mono text-xs">
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Hostel Block:</span>
                <span className="font-bold text-foreground">{bookingDetails?.hostel}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Floor Level:</span>
                <span className="font-bold text-foreground">{bookingDetails?.floor}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Room Number:</span>
                <span className="font-bold text-primary text-sm">{bookingDetails?.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Your Bed Slot:</span>
                <span className="font-bold text-primary">{bookingDetails?.bookedBeds?.join(', ')}</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow block text-center"
            >
              Done
            </Link>
          </div>
        ) : !student ? (
          /* Step 1: Verification Screen */
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-8 backdrop-blur-md shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold font-outfit text-foreground mb-2">Team Hostel Allotment</h1>
              <p className="text-text-muted text-xs">Aarambh 2026 Team Leaders & Volunteers Room Selection</p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2 mt-4 text-[10px] text-primary inline-block">
                👥 Friend & Room sharing supported (No login required)
              </div>
            </div>

            {multipleMembers.length > 0 ? (
              /* If multiple members with duplicate roll number found */
              <div className="space-y-4">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  We found multiple members with this Roll Number. Please select your name:
                </p>
                <div className="flex flex-col gap-2">
                  {multipleMembers.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMember(m)}
                      className="w-full text-left p-4 border border-card-border hover:border-primary/50 bg-background hover:bg-card-bg rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-1"
                    >
                      <span className="text-sm font-bold text-foreground">{m.name}</span>
                      <span className="text-[10px] text-text-muted">{m.position} ({m.gender})</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setMultipleMembers([]);
                    setErrorMsg('');
                  }}
                  className="w-full py-2 border border-card-border text-text-muted hover:bg-card-bg text-xs font-bold rounded-lg transition-all mt-4 cursor-pointer"
                >
                  Go Back
                </button>
              </div>
            ) : (
              /* Normal Form */
              <form onSubmit={handleVerifyStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2 font-outfit">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2023BTech096"
                    value={appNo}
                    onChange={(e) => setAppNo(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-sm outline-none transition-all placeholder:text-text-muted/50"
                    required
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow flex items-center justify-center gap-2"
                >
                  {verifying ? 'Verifying Team Member...' : 'Proceed to Book'}
                </button>
              </form>
            )}
          </div>
        ) : isAllotted && allotment ? (
          /* Step 1.5: Already Booked View */
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-8 backdrop-blur-md text-center shadow-lg">
            <div className="w-16 h-16 bg-primary/20 border border-primary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-primary font-bold">🏢</span>
            </div>
            <h2 className="text-xl font-bold font-outfit text-foreground mb-2">Room Already Allotted!</h2>
            <p className="text-text-muted text-xs mb-6">
              Hey **{student.name}**, your hostel room allotment is already active.
            </p>

            <div className="bg-background/80 rounded-xl p-6 border border-card-border text-foreground mb-6 font-mono text-xs">
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Hostel Block:</span>
                <span className="font-bold text-foreground">{allotment.hostel}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Floor Level:</span>
                <span className="font-bold text-foreground">{allotment.floor}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-2 mb-2">
                <span className="text-text-muted">Room Number:</span>
                <span className="font-bold text-primary text-sm">{allotment.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Your Bed Slot:</span>
                <span className="font-bold text-primary">{allotment.bed}</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow block text-center"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          /* Step 2: Room Selection & Grid Screen */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Middle Column: Grid and Floor Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/60 border border-card-border rounded-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-outfit text-foreground">
                      Select Room in {hostelName}
                    </h2>
                    <p className="text-xs text-text-muted">
                      Member: <span className="font-extrabold text-foreground">{student.name}</span> ({student.gender}) | Position: <span className="font-extrabold text-primary">{student.cohort}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Vacant
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold bg-gray-500/10 border border-gray-500/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Fully Occupied
                    </span>
                  </div>
                </div>

                {loadingRooms ? (
                  <div className="py-12 flex justify-center">
                    <Loader size={40} />
                  </div>
                ) : (
                  <>
                    {/* Floor Selector Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-card-border pb-4">
                      {floors.map((floor) => (
                        <button
                          key={floor}
                          onClick={() => {
                            setSelectedFloor(floor);
                            setSelectedRoom(null);
                            setSelectedBed(null);
                          }}
                          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            selectedFloor === floor
                              ? 'bg-primary text-black font-extrabold shadow-glow'
                              : 'bg-background hover:bg-card-bg text-text-muted border border-card-border'
                          }`}
                        >
                          {floor} Floor
                        </button>
                      ))}
                    </div>

                    {/* Room Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {filteredRooms.map((room) => {
                        const totalBeds = room.beds.length;
                        const occupiedBeds = room.beds.filter(b => b.isOccupied).length;
                        const isFullyBooked = occupiedBeds === totalBeds;
                        const isSelected = selectedRoom?.room === room.room;

                        return (
                          <button
                            key={room.room}
                            onClick={() => handleSelectRoom(room)}
                            className={`p-4 border rounded-xl text-left transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between gap-3 ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-foreground shadow-glow'
                                : isFullyBooked
                                ? 'bg-background border-card-border/40 opacity-55 text-text-muted cursor-not-allowed'
                                : 'bg-background hover:bg-card-bg border-card-border text-foreground'
                            }`}
                            disabled={isFullyBooked}
                          >
                            <span className="text-sm font-bold font-outfit">
                              Room {room.room}
                            </span>
                            <div className="flex flex-col gap-1 w-full">
                              <span className="text-[10px] text-text-muted">
                                {totalBeds - occupiedBeds} of {totalBeds} vacant
                              </span>
                              {/* progress bar */}
                              <div className="w-full bg-card-border/55 h-1 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    isFullyBooked
                                      ? 'bg-gray-400'
                                      : 'bg-green-400'
                                  }`}
                                  style={{ width: `${(occupiedBeds / totalBeds) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Room Details & Booking Panel */}
            <div className="space-y-6">
              <div className="bg-card-bg/60 border border-card-border rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-md font-bold font-outfit text-foreground mb-4 border-b border-card-border pb-3 flex items-center justify-between">
                  <span>Room Selection Summary</span>
                  {selectedRoom && (
                    <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                      Room {selectedRoom.room}
                    </span>
                  )}
                </h3>

                {selectedRoom ? (
                  <div className="space-y-6">
                    {/* Bed layout selector */}
                    <div>
                      <span className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                        Choose your bed slot
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedRoom.beds.map((bed) => {
                          const isOccupied = bed.isOccupied;
                          const isPrimarySelected = selectedBed?.sno === bed.sno;
                          const friendAssigned = friendsList.find(f => f.bedSno === bed.sno);

                          let displayClass = '';
                          let displayName = bed.bed;

                          if (isOccupied) {
                            displayClass = 'bg-card-border/50 border-transparent opacity-60 text-text-muted cursor-not-allowed';
                            displayName += ` (${bed.occupiedByCohort || 'Occupied'})`;
                          } else if (isPrimarySelected) {
                            displayClass = 'bg-primary text-black border-primary font-bold shadow-glow scale-[1.02]';
                          } else if (friendAssigned) {
                            displayClass = 'bg-accent text-black border-accent font-bold scale-[1.02]';
                            displayName += ` (Friend: ${friendAssigned.verifiedStudent?.name.split(' ')[0]})`;
                          } else {
                            displayClass = 'bg-background border-card-border hover:bg-card-bg text-foreground hover:border-primary/50';
                          }

                          return (
                            <button
                              key={bed.sno}
                              onClick={() => {
                                if (isOccupied) return;
                                setSelectedBed(bed);
                                // Remove this bed if it was assigned to any friend
                                setFriendsList(prev => prev.map(f => f.bedSno === bed.sno ? { ...f, bedSno: null } : f));
                              }}
                              className={`p-3 border rounded-xl text-center text-xs transition-all cursor-pointer ${displayClass}`}
                              disabled={isOccupied}
                            >
                              {displayName}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Friend/Group booking section */}
                    {selectedBed && (
                      <div className="border-t border-card-border pt-4 space-y-4">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isGroupBooking}
                            onChange={(e) => {
                              setIsGroupBooking(e.target.checked);
                              if (!e.target.checked) {
                                setFriendsList([{ appNo: '', verifiedStudent: null, bedSno: null, error: '', verifying: false }]);
                              }
                            }}
                            className="w-4 h-4 accent-primary rounded border-card-border bg-background focus:ring-primary cursor-pointer"
                          />
                          <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                            Book with friends (same room)
                          </span>
                        </label>

                        {isGroupBooking && (
                          <div className="space-y-4">
                            {friendsList.map((friend, idx) => (
                              <div key={idx} className="bg-background/80 border border-card-border p-4 rounded-xl space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                                    Friend {idx + 1}
                                  </span>
                                  {friendsList.length > 1 && (
                                    <button
                                      onClick={() => removeFriendInput(idx)}
                                      className="text-[10px] text-red-400 hover:text-red-300 font-bold"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Friend Roll No"
                                    value={friend.appNo}
                                    onChange={(e) => updateFriendState(idx, { appNo: e.target.value, verifiedStudent: null, error: '', bedSno: null })}
                                    className="flex-1 px-3 py-2 bg-card-bg/40 border border-card-border rounded-lg text-foreground text-xs outline-none focus:border-accent"
                                    disabled={friend.verifying}
                                  />
                                  <button
                                    onClick={() => handleVerifyFriend(idx)}
                                    className="px-3 bg-accent text-black font-bold text-xs rounded-lg hover:bg-accent-dark transition-all cursor-pointer whitespace-nowrap"
                                    disabled={friend.verifying || !friend.appNo.trim()}
                                  >
                                    {friend.verifying ? '...' : 'Verify'}
                                  </button>
                                </div>

                                {friend.error && (
                                  <span className="block text-[10px] text-red-400 font-semibold">{friend.error}</span>
                                )}

                                {friend.verifiedStudent && (
                                  <div className="space-y-2">
                                    <span className="block text-[10px] text-green-500 font-bold">
                                      ✓ Verified: {friend.verifiedStudent.name}
                                    </span>
                                    {/* Friend Bed Selector */}
                                    <div className="space-y-1">
                                      <span className="block text-[9px] text-text-muted font-bold uppercase">Assign bed for friend:</span>
                                      <div className="flex gap-1.5">
                                        {selectedRoom.beds.map((b) => {
                                          const isOccupied = b.isOccupied;
                                          const isPrimary = selectedBed?.sno === b.sno;
                                          const assignedToOtherFriend = friendsList.some((f, fIdx) => fIdx !== idx && f.bedSno === b.sno);
                                          const isSelected = friend.bedSno === b.sno;

                                          if (isOccupied || isPrimary || assignedToOtherFriend) return null;

                                          return (
                                            <button
                                              key={b.sno}
                                              onClick={() => updateFriendState(idx, { bedSno: b.sno })}
                                              className={`px-2 py-1 text-[10px] border rounded-md font-bold transition-all cursor-pointer ${
                                                isSelected ? 'bg-accent text-black border-accent' : 'bg-background hover:bg-card-bg text-text-muted border-card-border'
                                              }`}
                                            >
                                              {b.bed}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Add Friend Input Trigger Button */}
                            {friendsList.length < (hostelName === 'BH-1' ? 1 : 3) && (
                              <button
                                onClick={addFriendInput}
                                className="w-full py-2 bg-card-bg border border-dashed border-card-border text-[10px] font-bold text-text-muted hover:text-foreground rounded-lg transition-all cursor-pointer"
                              >
                                + Add Friend
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Booking Confirmation Action Trigger */}
                    {selectedBed && (
                      <button
                        onClick={handleBookRoom}
                        disabled={booking || (isGroupBooking && friendsList.some(f => !f.verifiedStudent || !f.bedSno))}
                        className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-extrabold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow flex items-center justify-center gap-2"
                      >
                        {booking ? <Loader size={16} /> : 'Confirm Booking'}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted py-6 text-center">
                    Please select a room from the grid to view beds and complete booking.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border py-4 bg-card-bg/25">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-text-muted">
          <span>&copy; 2026 Team Aarambh. All Rights Reserved.</span>
          <span>Built by Aman</span>
        </div>
      </footer>
    </div>
  );
}
