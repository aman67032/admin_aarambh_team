'use client';

import AuroraBackground from '../../components/AuroraBackground';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';

interface TimeSlotInfo {
  time: string;
  label: string;
  booked: number;
  capacity: number;
  available: number;
}

interface BookingInfo {
  applicationNo: string;
  name: string;
  course: string;
  date: string;
  timeSlot: string;
  deskNumber: number;
  status: string;
}

const COURSE = 'BBA';
const COURSE_GRADIENT = 'from-amber-500 to-orange-500';
const MAX_DESKS = 2;

export default function BbaBookSlotPage() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'fun';
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU Logo.png';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';

  const [step, setStep] = useState<'form' | 'slots' | 'confirmed'>('form');
  const [applicationNo, setApplicationNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [slots, setSlots] = useState<TimeSlotInfo[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [existingBooking, setExistingBooking] = useState<BookingInfo | null>(null);

  // Registration dates: July 22, 23, 24
  const registrationDates = ['2026-07-22', '2026-07-23', '2026-07-24'];

  useEffect(() => {
    setSelectedDate(registrationDates[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const fetchSlots = useCallback(async (date: string) => {
    setSlotsLoading(true);
    try {
      const res = await fetch(`/api/timeslot/available?course=${encodeURIComponent(COURSE)}&date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setSlots(data.slots || []);
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === 'slots' && selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [step, selectedDate, fetchSlots]);

  const handleVerify = async () => {
    setError('');
    if (!applicationNo.trim() || !studentName.trim()) {
      setError('Please enter both Application Number and Name.');
      return;
    }
    setLoading(true);
    try {
      // Check existing booking
      const bookingRes = await fetch(`/api/timeslot/my-booking?applicationNo=${encodeURIComponent(applicationNo.trim())}&course=${encodeURIComponent(COURSE)}`);
      if (bookingRes.ok) {
        const bookingData = await bookingRes.json();
        if (bookingData.booking) {
          setExistingBooking(bookingData.booking);
          setBooking(bookingData.booking);
          setStep('confirmed');
          setLoading(false);
          return;
        }
      }
      setStep('slots');
    } catch (err) {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/timeslot/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationNo: applicationNo.trim(),
          name: studentName.trim(),
          course: COURSE,
          date: selectedDate,
          timeSlot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooking(data.booking);
        setStep('confirmed');
      } else {
        setError(data.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSlotColor = (slot: TimeSlotInfo) => {
    if (slot.available === 0) return 'bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed opacity-60';
    if (slot.available <= 1) return 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:border-amber-400';
    return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-400';
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <AuroraBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card-bg/70 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={jkluLogo} alt="JKLU" className="h-8 sm:h-10 object-contain" />
            <img src={aarambhLogo} alt="Aarambh" className="h-8 sm:h-10 object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-card-bg border border-card-border rounded-full hover:bg-background transition-all cursor-pointer shrink-0"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 w-full relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className={`inline-block bg-gradient-to-r ${COURSE_GRADIENT} text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest`}>
            BBA Registration
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Registration Time Slot Booking
          </h1>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Book your preferred registration time slot. {MAX_DESKS} desks available per slot, 15 minutes each.
          </p>
        </div>

        {/* Step 1: Form */}
        {step === 'form' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 max-w-lg mx-auto">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Application Number</label>
              <input
                type="text"
                value={applicationNo}
                onChange={e => setApplicationNo(e.target.value)}
                placeholder="e.g. JKLU/BBA/2026/1234"
                className="w-full px-4 py-3 bg-background border border-card-border rounded-xl text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-background border border-card-border rounded-xl text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
            </div>
            
            {error && (
              <div className="text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}
            
            <button
              onClick={handleVerify}
              disabled={loading}
              className={`w-full py-3.5 bg-gradient-to-r ${COURSE_GRADIENT} text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer`}
            >
              {loading ? 'Checking...' : 'Find Available Slots →'}
            </button>
          </div>
        )}

        {/* Step 2: Slots */}
        {step === 'slots' && (
          <div className="space-y-6 max-w-xl mx-auto">
            {/* Date Selector */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {registrationDates.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    selectedDate === d
                      ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent`
                      : 'bg-card-bg border-card-border text-text-muted hover:border-amber-500/50'
                  }`}
                >
                  {new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', weekday: 'short' })}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-text-muted font-semibold">
              {formatDateLabel(selectedDate)} · Select your preferred time slot
            </p>

            {slotsLoading ? (
              <div className="text-center text-sm text-text-muted animate-pulse py-10">Loading slots...</div>
            ) : (
              <>
                {/* Morning Session */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Morning Session · 9:30 AM – 1:30 PM
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {slots.filter(s => {
                      const h = parseInt(s.time.split(':')[0]);
                      return h < 14;
                    }).map(slot => (
                      <button
                        key={slot.time}
                        disabled={slot.available === 0}
                        onClick={() => setSelectedSlot(selectedSlot === slot.time ? null : slot.time)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSlot === slot.time
                            ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent shadow-lg shadow-amber-500/20`
                            : getSlotColor(slot)
                        }`}
                      >
                        <div className="text-xs font-bold">{slot.label.split(' - ')[0]}</div>
                        <div className="text-[10px] mt-1 opacity-80">
                          {slot.available === 0 ? 'Full' : `${slot.available}/${slot.capacity} open`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Session */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                    Afternoon Session · 2:00 PM – 5:00 PM
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {slots.filter(s => {
                      const h = parseInt(s.time.split(':')[0]);
                      return h >= 14;
                    }).map(slot => (
                      <button
                        key={slot.time}
                        disabled={slot.available === 0}
                        onClick={() => setSelectedSlot(selectedSlot === slot.time ? null : slot.time)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSlot === slot.time
                            ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent shadow-lg shadow-amber-500/20`
                            : getSlotColor(slot)
                        }`}
                      >
                        <div className="text-xs font-bold">{slot.label.split(' - ')[0]}</div>
                        <div className="text-[10px] mt-1 opacity-80">
                          {slot.available === 0 ? 'Full' : `${slot.available}/${slot.capacity} open`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setStep('form'); setSelectedSlot(null); setError(''); }}
                className="flex-1 py-3 bg-card-bg border border-card-border text-foreground text-sm font-bold rounded-xl hover:bg-background transition-all cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={handleBook}
                disabled={!selectedSlot || loading}
                className={`flex-[2] py-3 bg-gradient-to-r ${COURSE_GRADIENT} text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-40 cursor-pointer`}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed */}
        {step === 'confirmed' && booking && (
          <div className="glass-card p-6 sm:p-8 space-y-6 max-w-lg mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {existingBooking ? 'Your Existing Booking' : 'Slot Booked Successfully!'}
              </h2>
              <p className="text-xs text-text-muted mt-1">
                {existingBooking ? 'You have already booked a slot.' : 'Please arrive on time at your assigned desk.'}
              </p>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2.5 border-b border-card-border/30">
                <span className="text-xs text-text-muted font-bold">Application No</span>
                <span className="text-sm font-bold text-foreground">{booking.applicationNo}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-card-border/30">
                <span className="text-xs text-text-muted font-bold">Name</span>
                <span className="text-sm font-bold text-foreground">{booking.name}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-card-border/30">
                <span className="text-xs text-text-muted font-bold">Date</span>
                <span className="text-sm font-bold text-foreground">{formatDateLabel(booking.date)}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-card-border/30">
                <span className="text-xs text-text-muted font-bold">Time Slot</span>
                <span className={`text-sm font-bold bg-gradient-to-r ${COURSE_GRADIENT} bg-clip-text text-transparent`}>
                  {(() => {
                    const [h, m] = booking.timeSlot.split(':').map(Number);
                    const ampm = h >= 12 ? 'PM' : 'AM';
                    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs text-text-muted font-bold">Desk Number</span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r ${COURSE_GRADIENT} text-white`}>
                  Desk {booking.deskNumber}
                </span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-xs text-amber-500 font-semibold">
              ⚠️ Please carry your original documents and arrive 5 minutes before your slot.
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-text-muted font-semibold border-t border-card-border/30 relative z-10">
        Aarambh &apos;26 · JK Lakshmipat University
      </footer>
    </div>
  );
}
