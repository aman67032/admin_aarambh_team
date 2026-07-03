'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '../components/Loader';
import PlasmaWave from '../components/PlasmaWave';
import { useApp } from '../context/AppContext';

// Normalize roll numbers for comparison
const normalizeRollNo = (rollNo: string) => {
  if (!rollNo) return '';
  let clean = rollNo.replace(/[\/\.\s-]/g, '').toUpperCase().trim();
  clean = clean.replace('BETCH', 'BTECH');
  return clean;
};

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
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'fun';
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU%20Logo.png';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';

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
  const [friendsList, setFriendsList] = useState<{ 
    appNo: string; 
    verifiedStudent: StudentInfo | null; 
    bedSno: number | null; 
    error: string; 
    verifying: boolean;
    otpSent?: boolean;
    otpCode?: string;
    maskedEmail?: string;
  }[]>([
    { appNo: '', verifiedStudent: null, bedSno: null, error: '', verifying: false }
  ]);

  // Document generation states
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [parentGuardian2, setParentGuardian2] = useState('');
  const [parent2Contact, setParent2Contact] = useState('');
  const [parent2Email, setParent2Email] = useState('');

  // Dynamically load html2pdf script
  const loadHtml2Pdf = () => {
    return new Promise((resolve) => {
      if ((window as any).html2pdf) {
        resolve((window as any).html2pdf);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => resolve((window as any).html2pdf);
      document.body.appendChild(script);
    });
  };

  // Load and trigger HTML to PDF conversion
  const generatePDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.display = 'block';

    try {
      const html2pdf = (await loadHtml2Pdf()) as any;
      const opt = {
        margin: 0.5,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      element.style.display = 'none';
    }
  };

  const downloadShortStayForm = () => {
    generatePDF('short-stay-pdf-template', `Short_Stay_Form_${student?.name.replace(/\s+/g, '_')}.pdf`);
  };

  const downloadParentConsentForm = () => {
    generatePDF('parent-consent-pdf-template', `Parent_Consent_Form_${student?.name.replace(/\s+/g, '_')}.pdf`);
  };

  // OTP Verification states
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [hostelToken, setHostelToken] = useState('');

  // Booking process states
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Force light theme on mount for clean layout and readability
  useEffect(() => {
    document.documentElement.classList.remove('theme-fun');
  }, []);

  // Step 1: Send OTP to official email
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
    setOtp('');

    try {
      const res = await fetch('/api/hostel/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: appNo.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setOtpEmail(data.email);
      setOtpStep(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during verification.');
    } finally {
      setVerifying(false);
    }
  };

  // Step 1.2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setVerifying(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/hostel/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: appNo.trim(), otp: otp.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification code failed.');
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
      setHostelToken(data.token);
      setOtpStep(false); // clear OTP step

      if (!data.isAllotted && data.hostel) {
        fetchRooms(data.hostel, data.token);
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
      setHostelToken(data.token);
      setMultipleMembers([]); // clear list

      if (!data.isAllotted && data.hostel) {
        fetchRooms(data.hostel, data.token);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during verification.');
    } finally {
      setVerifying(false);
    }
  };

  // Fetch hostel rooms
  const fetchRooms = async (hostel: string, authToken?: string) => {
    setLoadingRooms(true);
    try {
      const activeToken = authToken || hostelToken;
      const res = await fetch(`/api/hostel/rooms/${hostel}`, {
        headers: {
          'Authorization': `Bearer ${activeToken}`
        }
      });
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
    if (student && normalizeRollNo(friend.appNo) === normalizeRollNo(student.applicationNo)) {
      updateFriendState(index, { error: 'You cannot add yourself as a friend.' });
      return;
    }

    // Check if duplicate in friendsList
    const normFriendApp = normalizeRollNo(friend.appNo);
    const duplicate = friendsList.some((f, idx) => {
      if (idx === index || !f.appNo) return false;
      return normalizeRollNo(f.appNo) === normFriendApp;
    });
    if (duplicate) {
      updateFriendState(index, { error: 'Duplicate friend roll number.' });
      return;
    }

    updateFriendState(index, { verifying: true, error: '', verifiedStudent: null, otpSent: false });

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

      // Trigger OTP sending to friend's registered email
      const otpRes = await fetch('/api/hostel/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: friend.appNo.trim() })
      });

      const otpData = await otpRes.json();
      if (!otpRes.ok) {
        throw new Error(otpData.error || 'Failed to send OTP to friend.');
      }

      updateFriendState(index, { 
        otpSent: true, 
        maskedEmail: otpData.email, 
        error: '',
        otpCode: '' 
      });
    } catch (err: any) {
      updateFriendState(index, { error: err.message || 'Verification failed.' });
    } finally {
      updateFriendState(index, { verifying: false });
    }
  };

  // Verify OTP code entered for friend
  const handleVerifyFriendOtp = async (index: number) => {
    const friend = friendsList[index];
    if (!friend.otpCode || friend.otpCode.trim().length !== 6) {
      updateFriendState(index, { error: 'Please enter a valid 6-digit verification code.' });
      return;
    }

    updateFriendState(index, { verifying: true, error: '' });

    try {
      const res = await fetch('/api/hostel/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          rollNo: friend.appNo.trim(), 
          otp: friend.otpCode.trim(),
          gender: student?.gender 
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      updateFriendState(index, { 
        verifiedStudent: data.student, 
        otpSent: false, 
        error: '' 
      });
    } catch (err: any) {
      updateFriendState(index, { error: err.message || 'OTP verification failed.' });
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hostelToken}`
        },
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={jkluLogo} alt="JKLU Logo" className="h-9 md:h-12 object-contain" />
            <div className="w-[1px] h-6 bg-card-border"></div>
            <img src={aarambhLogo} alt="Aarambh logo" className="h-12 md:h-16 object-contain" />
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-card-bg border border-card-border rounded-full hover:bg-background transition-all cursor-pointer"
            title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 flex-1 w-full z-10">
        {/* Success screen */}
        {bookingSuccess ? (
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-5 md:p-8 backdrop-blur-md text-center shadow-glow">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
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

            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="w-full mb-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Required Forms (PDF)
            </button>

            <Link
              href="/"
              className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow block text-center"
            >
              Done
            </Link>
          </div>
        ) : !student ? (
          /* Step 1: Verification Screen (Roll Number and OTP inputs) */
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-5 md:p-8 backdrop-blur-md shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-2xl font-bold font-outfit text-foreground mb-2">Team Hostel Allotment</h1>
              <p className="text-text-muted text-xs">Aarambh 2026 Team Leaders & Volunteers Room Selection</p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2 mt-4 text-[10px] text-primary inline-block">
                <svg className="w-3.5 h-3.5 inline-block mr-1.5 align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Friend & Room sharing supported (No login required)
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
            ) : otpStep ? (
              /* Step 1.2: OTP Code Verification Screen */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-[10.5px] text-primary">
                  A verification code has been sent to your registered email: <strong>{otpEmail}</strong>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2 font-outfit">
                    Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-sm outline-none transition-all placeholder:text-text-muted/50 text-center font-mono text-lg tracking-wider"
                    maxLength={6}
                    required
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(false);
                      setOtp('');
                      setErrorMsg('');
                    }}
                    className="flex-1 py-3 border border-card-border text-text-muted hover:bg-card-bg font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-black font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow flex items-center justify-center gap-2"
                  >
                    {verifying ? 'Verifying Code...' : 'Verify & Continue'}
                  </button>
                </div>
              </form>
            ) : (
              /* Step 1: Normal Form (Enter Roll) */
              <form onSubmit={handleVerifyStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2 font-outfit">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2023BTech***"
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
                  {verifying ? 'Sending Code...' : 'Proceed to Book'}
                </button>
              </form>
            )}
          </div>
        ) : isAllotted && allotment ? (
          /* Step 1.5: Already Booked View */
          <div className="max-w-md mx-auto bg-card-bg/60 border border-card-border rounded-2xl p-5 md:p-8 backdrop-blur-md text-center shadow-lg">
            <div className="w-16 h-16 bg-primary/20 border border-primary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
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

            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="w-full mb-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider text-xs shadow-glow flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Required Forms (PDF)
            </button>

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
              <div className="bg-card-bg/60 border border-card-border rounded-2xl p-4 md:p-6 backdrop-blur-md">
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
                          className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-4">
                      {filteredRooms.map((room) => {
                        const totalBeds = room.beds.length;
                        const occupiedBeds = room.beds.filter(b => b.isOccupied).length;
                        const isFullyBooked = occupiedBeds === totalBeds;
                        const isSelected = selectedRoom?.room === room.room;

                        return (
                          <button
                            key={room.room}
                            onClick={() => handleSelectRoom(room)}
                            className={`p-3 md:p-4 border rounded-xl text-left transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between gap-2 md:gap-3 ${
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
              <div className="bg-card-bg/60 border border-card-border rounded-2xl p-4 md:p-6 backdrop-blur-md">
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
                              <div key={idx} className="border border-card-border rounded-xl overflow-hidden">
                                {/* Friend Card Header */}
                                <div className="flex justify-between items-center px-4 py-2.5 bg-card-bg border-b border-card-border">
                                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
                                    Friend {idx + 1}
                                  </span>
                                  {friendsList.length > 1 && (
                                    <button
                                      onClick={() => removeFriendInput(idx)}
                                      className="text-[10px] text-red-400 hover:text-red-300 font-bold transition-colors"
                                    >
                                      ✕ Remove
                                    </button>
                                  )}
                                </div>

                                <div className="p-4 space-y-4">

                                  {/* ─── STEP 1: Roll Number ─── */}
                                  <div className="space-y-2">
                                    <span className="block text-[9px] font-bold text-text-muted uppercase tracking-widest">
                                      Step 1 — Enter Roll Number
                                    </span>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        placeholder="e.g. 2025BTech***"
                                        value={friend.appNo}
                                        onChange={(e) => updateFriendState(idx, {
                                          appNo: e.target.value,
                                          verifiedStudent: null,
                                          error: '',
                                          bedSno: null,
                                          otpSent: false,
                                          otpCode: ''
                                        })}
                                        className="flex-1 min-w-0 px-3 py-2 bg-background border border-card-border rounded-lg text-foreground text-xs outline-none focus:border-primary transition-colors"
                                        disabled={friend.verifying || !!friend.otpSent || !!friend.verifiedStudent}
                                      />
                                      {!friend.otpSent && !friend.verifiedStudent && (
                                        <button
                                          onClick={() => handleVerifyFriend(idx)}
                                          className="flex-shrink-0 px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-40"
                                          disabled={friend.verifying || !friend.appNo.trim()}
                                        >
                                          {friend.verifying ? (
                                            <span className="flex items-center gap-1.5">
                                              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                                              Sending…
                                            </span>
                                          ) : 'Send OTP'}
                                        </button>
                                      )}
                                      {(friend.otpSent || friend.verifiedStudent) && (
                                        <button
                                          onClick={() => updateFriendState(idx, {
                                            appNo: '',
                                            verifiedStudent: null,
                                            error: '',
                                            bedSno: null,
                                            otpSent: false,
                                            otpCode: ''
                                          })}
                                          className="flex-shrink-0 px-3 py-2 border border-card-border text-text-muted hover:text-foreground text-xs rounded-lg transition-colors cursor-pointer"
                                        >
                                          Change
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* ─── STEP 2: OTP Entry ─── */}
                                  {friend.otpSent && !friend.verifiedStudent && (
                                    <div className="space-y-3 bg-background rounded-xl p-3 border border-card-border/60">
                                      <div className="flex items-start gap-2">
                                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5">2</div>
                                        <div className="space-y-0.5 min-w-0">
                                          <span className="block text-[9px] font-bold text-text-muted uppercase tracking-widest">Verify OTP</span>
                                          <span className="block text-[10px] text-foreground/70">
                                            Code sent to <strong className="text-foreground">{friend.maskedEmail}</strong>
                                          </span>
                                        </div>
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        value={friend.otpCode || ''}
                                        onChange={(e) => updateFriendState(idx, { otpCode: e.target.value.replace(/\D/g, '') })}
                                        className="w-full px-4 py-2.5 bg-card-bg border border-card-border rounded-lg text-foreground text-sm outline-none focus:border-primary font-mono text-center tracking-[8px] transition-colors"
                                        disabled={friend.verifying}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => handleVerifyFriendOtp(idx)}
                                          className="flex-1 py-2 bg-green-600 text-white font-bold text-xs rounded-lg hover:bg-green-700 transition-all cursor-pointer disabled:opacity-40"
                                          disabled={friend.verifying || !friend.otpCode || friend.otpCode.trim().length !== 6}
                                        >
                                          {friend.verifying ? (
                                            <span className="flex items-center justify-center gap-1.5">
                                              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                                              Verifying…
                                            </span>
                                          ) : '✓ Confirm Code'}
                                        </button>
                                        <button
                                          onClick={() => handleVerifyFriend(idx)}
                                          className="px-3 py-2 border border-card-border text-text-muted hover:text-foreground text-xs rounded-lg transition-colors cursor-pointer flex-shrink-0 disabled:opacity-40"
                                          disabled={friend.verifying}
                                        >
                                          Resend
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* ─── STEP 3: Verified + Bed Assignment ─── */}
                                  {friend.verifiedStudent && (
                                    <div className="space-y-3">
                                      {/* Verified banner */}
                                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                                        <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[8px] font-black">✓</span>
                                        <div className="min-w-0">
                                          <span className="block text-[10px] font-bold text-green-500 truncate">{friend.verifiedStudent.name}</span>
                                          <span className="block text-[9px] text-text-muted">Friend verified — select a bed below</span>
                                        </div>
                                      </div>

                                      {/* Bed selector */}
                                      <div className="space-y-1.5">
                                        <span className="block text-[9px] font-bold text-text-muted uppercase tracking-widest">
                                          Step 3 — Assign a Bed
                                        </span>
                                        <div className="grid grid-cols-2 gap-2">
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
                                                className={`w-full py-2 text-[11px] border rounded-lg font-bold transition-all cursor-pointer ${
                                                  isSelected
                                                    ? 'bg-primary text-white border-primary shadow-glow'
                                                    : 'bg-background hover:bg-card-bg text-foreground border-card-border hover:border-primary/40'
                                                }`}
                                              >
                                                {b.bed}
                                                {isSelected && <span className="ml-1 text-[9px]">✓</span>}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {friend.bedSno && (
                                          <span className="block text-[9px] text-green-500 font-semibold pt-0.5">
                                            Bed assigned ✓
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Error message */}
                                  {friend.error && (
                                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                      <span className="text-red-400 text-[10px] flex-shrink-0 mt-0.5">⚠</span>
                                      <span className="text-[10px] text-red-400 font-semibold">{friend.error}</span>
                                    </div>
                                  )}

                                </div>
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

      {/* Parent consent details modal */}
      {isDocsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-card-border pb-3">
              <h3 className="text-lg font-bold font-outfit text-foreground">Fill Parent/Guardian Consent Details</h3>
              <button
                onClick={() => setIsDocsModalOpen(false)}
                className="text-text-muted hover:text-foreground text-sm font-bold cursor-pointer"
              >
                x
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-muted mb-1">Parent/Guardian 1 Name</label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-muted mb-1">Parent 1 Contact No.</label>
                  <input
                    type="text"
                    value={parentContact}
                    onChange={(e) => setParentContact(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-muted mb-1">Parent 1 Email</label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-text-muted mb-1">Parent/Guardian 2 Name (Optional)</label>
                <input
                  type="text"
                  value={parentGuardian2}
                  onChange={(e) => setParentGuardian2(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-muted mb-1">Parent 2 Contact (Optional)</label>
                  <input
                    type="text"
                    value={parent2Contact}
                    onChange={(e) => setParent2Contact(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-muted mb-1">Parent 2 Email (Optional)</label>
                  <input
                    type="email"
                    value={parent2Email}
                    onChange={(e) => setParent2Email(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-text-muted mb-1">Home Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete postal address"
                  rows={2}
                  className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-card-border">
              <button
                onClick={downloadShortStayForm}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all"
              >
                Short Stay PDF
              </button>
              <button
                onClick={downloadParentConsentForm}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all"
              >
                Consent PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Templates for PDF Generation */}
      <div style={{ display: 'none' }}>
        {/* Short Stay Form */}
        <div id="short-stay-pdf-template" style={{ padding: '40px', fontFamily: 'serif', color: '#000', backgroundColor: '#fff', fontSize: '12px', lineHeight: '1.6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            <img src="/JKLU%20Logo.png" alt="JKLU Logo" style={{ height: '50px' }} />
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>JK LAKSHMIPAT UNIVERSITY</h2>
              <span style={{ fontSize: '10px', color: '#666' }}>OFFICE OF STUDENT AFFAIRS</span>
            </div>
          </div>

          <h3 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '25px', textTransform: 'uppercase' }}>
            Hostel Stay Permission Form (Short Stay)
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px' }}>
            <tbody>
              <tr>
                <td style={{ width: '35%', padding: '6px 0', fontWeight: 'bold' }}>Student Name:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{student?.name}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Roll No:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{student?.applicationNo}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Programme / Position:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{student?.course}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Contact No:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{student?.email ? 'Listed on Roster' : ''}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>JKLU Mail ID:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{student?.email}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Parent Name:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{parentName || '___________________________________________________'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Parent Contact No:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{parentContact || '___________________________________________________'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Address:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{address || '___________________________________________________'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Purpose of stay:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>Aarambh 2026 Organizing Team Duty</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Approved By:</td>
                <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px', fontWeight: 'bold' }}>Mr. Deepak Sogani (Head-Student Affairs)</td>
              </tr>
            </tbody>
          </table>

          <h4 style={{ fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Room Allotment Details (To be filled by Wardens)
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px' }}>
            <tbody>
              <tr>
                <td style={{ width: '20%', padding: '6px 0', fontWeight: 'bold' }}>Hostel Block:</td>
                <td style={{ width: '30%', borderBottom: '1px dotted #000', padding: '6px 5px' }}>{bookingDetails?.hostel || allotment?.hostel}</td>
                <td style={{ width: '20%', padding: '6px 0', fontWeight: 'bold', textAlign: 'center' }}>Room No:</td>
                <td style={{ width: '30%', borderBottom: '1px dotted #000', padding: '6px 5px' }}>{bookingDetails?.room || allotment?.room}</td>
              </tr>
            </tbody>
          </table>

          <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', textTransform: 'uppercase' }}>
            Undertaking
          </h4>
          <p style={{ margin: '0 0 35px 0', textAlign: 'justify', fontSize: '10px' }}>
            I hereby declare that I have checked all the items in the room and found them in proper condition at the time of allotment. I understand that I am responsible for maintaining the room and its inventory during my stay. In case of any loss, damage, or missing item, I shall be liable to bear the cost as decided by the hostel authorities.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', paddingBottom: '40px', fontWeight: 'bold' }}>Check In Date: _________________</td>
                <td style={{ width: '50%', paddingBottom: '40px', fontWeight: 'bold', paddingLeft: '20px' }}>Time: _________________</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', paddingBottom: '50px' }}>Student Signature: _________________</td>
                <td style={{ fontWeight: 'bold', paddingBottom: '50px', paddingLeft: '20px' }}>Warden Signature: _________________</td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '40px', fontWeight: 'bold' }}>Check Out Date: _________________</td>
                <td style={{ width: '50%', paddingBottom: '40px', fontWeight: 'bold', paddingLeft: '20px' }}>Time: _________________</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Student Signature: _________________</td>
                <td style={{ fontWeight: 'bold', paddingLeft: '20px' }}>Warden Signature: _________________</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Parent Consent Form */}
        <div id="parent-consent-pdf-template" style={{ padding: '40px', fontFamily: 'serif', color: '#000', backgroundColor: '#fff', fontSize: '11px', lineHeight: '1.5' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            <img src="/JKLU%20Logo.png" alt="JKLU Logo" style={{ height: '50px' }} />
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>JK LAKSHMIPAT UNIVERSITY</h2>
              <span style={{ fontSize: '9px', color: '#666' }}>ANNEXURE - B</span>
            </div>
          </div>

          <h3 style={{ textAlign: 'center', fontSize: '13px', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '20px', textTransform: 'uppercase' }}>
            Consent Form for Parent(s)/Guardian
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontWeight: 'bold', textDecoration: 'underline' }}>University Entry-Exit Procedures</h4>
            <ul style={{ margin: '0', paddingLeft: '15px', textAlign: 'justify' }}>
              <li>Students are not permitted to leave the campus between 10:00 PM and 6:00 AM.</li>
              <li>Between 6:00 AM and 10:00 PM, students may move in and out of the campus freely.</li>
              <li>For outstation travel, students must apply for leave via email to the Hostel Warden or submit a leave form at least four hours prior to the scheduled departure to avoid inconvenience.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontWeight: 'bold', textDecoration: 'underline' }}>Night Attendance</h4>
            <ul style={{ margin: '0', paddingLeft: '15px', textAlign: 'justify' }}>
              <li>Night attendance must be marked between 10:00 PM and 10:30 PM.</li>
              <li>In case a student fails to mark attendance, the hostel authorities will inform the concerned guardian.</li>
              <li>Repeated failure to mark attendance will attract disciplinary action, including fines.</li>
            </ul>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
            <tbody>
              <tr>
                <td style={{ width: '20%', padding: '5px 0', fontWeight: 'bold' }}>1- Student Name:</td>
                <td style={{ borderBottom: '1px solid #000', padding: '5px' }} colSpan={3}>{student?.name}</td>
              </tr>
              <tr>
                <td style={{ width: '15%', padding: '5px 0', fontWeight: 'bold' }}>2- Roll NO:</td>
                <td style={{ width: '25%', borderBottom: '1px solid #000', padding: '5px' }}>{student?.applicationNo}</td>
                <td style={{ width: '25%', padding: '5px 0', fontWeight: 'bold', textAlign: 'center' }}>3- Hostel Block:</td>
                <td style={{ width: '35%', borderBottom: '1px solid #000', padding: '5px' }}>{bookingDetails?.hostel || allotment?.hostel}</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 0', fontWeight: 'bold' }}>4- Room No.:</td>
                <td style={{ borderBottom: '1px solid #000', padding: '5px' }} colSpan={3}>{bookingDetails?.room || allotment?.room}</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Parent/Guardian 1:</td>
                <td style={{ borderBottom: '1px solid #000', padding: '5px' }} colSpan={3}>{parentName || '___________________________________________________'}</td>
              </tr>
              {parentGuardian2 && (
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Parent/Guardian 2:</td>
                  <td style={{ borderBottom: '1px solid #000', padding: '5px' }} colSpan={3}>{parentGuardian2}</td>
                </tr>
              )}
            </tbody>
          </table>

          <p style={{ margin: '0 0 15px 0', textAlign: 'justify' }}>
            I/we have read and clearly understood the University's <strong>ENTRY-EXIT PROCEDURES</strong>.
          </p>
          <p style={{ margin: '0 0 15px 0', textAlign: 'justify' }}>
            I/We give my/our consent to university that my/our ward be allowed to check-in and check-out of the University Campus for overnight stay out of the campus, warden office will take prior approval from us. (Please tick):
          </p>
          <p style={{ margin: '0 0 15px 0', fontStyle: 'italic', fontWeight: 'bold' }}>
            [Yes] (I/We also agree to submit our permission for night-out via email to <span style={{ textDecoration: 'underline', color: 'blue' }}>wardenboys@jklu.edu.in</span> / <span style={{ textDecoration: 'underline', color: 'blue' }}>wardengirls@jklu.edu.in</span>)
          </p>
          <p style={{ margin: '0 0 20px 0', fontSize: '9px', textAlign: 'justify', borderLeft: '2px solid #666', paddingLeft: '8px' }}>
            The request must be submitted latest by 6:00 PM on the day of the student's night-out. If a student is found absent (staying outside the campus) without prior information or approval from the Hostel Warden, the University reserves the right to take appropriate disciplinary action as per rules.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', paddingBottom: '20px', fontWeight: 'bold' }}>Signature of Parent/Guardian: _________________</td>
                <td style={{ width: '50%', paddingBottom: '20px', fontWeight: 'bold', paddingLeft: '20px' }}>Date: {new Date().toLocaleDateString('en-GB')}</td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '25px', fontWeight: 'bold' }}>Mobile 1: {parentContact || '_________________'}</td>
                <td style={{ paddingBottom: '25px', fontWeight: 'bold', paddingLeft: '20px' }}>Mobile 2: {parent2Contact || '_________________'}</td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '40px', fontWeight: 'bold' }}>Email 1: {parentEmail || '_________________'}</td>
                <td style={{ paddingBottom: '40px', fontWeight: 'bold', paddingLeft: '20px' }}>Email 2: {parent2Email || '_________________'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>(Signature of Student)</td>
                <td style={{ fontWeight: 'bold', paddingLeft: '20px', textAlign: 'right' }}>(Signature of Hostel Warden)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-card-border py-4 bg-card-bg/25">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center text-xs text-text-muted">
          <span>&copy; 2026 Team Aarambh. All Rights Reserved.</span>
          <span>Built by Aman P</span>
        </div>
      </footer>
    </div>
  );
}
