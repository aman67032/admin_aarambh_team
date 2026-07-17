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

const COURSE = 'B.Tech';
const COURSE_GRADIENT = 'from-indigo-600 to-violet-600';
const COURSE_GLOW = 'shadow-indigo-500/25';
const COURSE_RING = 'focus:ring-indigo-500/30';
const COURSE_BORDER = 'focus:border-indigo-500';
const MAX_DESKS = 4;

export default function BtechBookSlotPage() {
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

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col font-sans">
      <AuroraBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card-bg/70 border-b border-card-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={jkluLogo} alt="JKLU" className="h-8 sm:h-10 object-contain" />
            <img src={aarambhLogo} alt="Aarambh" className="h-8 sm:h-10 object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-card-bg border border-card-border/50 rounded-full hover:bg-background transition-all cursor-pointer shrink-0"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full relative z-10">
        
        {/* Step Progress Tracker */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            {/* Background bar */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-card-border/40 z-0"></div>
            {/* Active bar */}
            <div 
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-indigo-600 transition-all duration-500 z-0`}
              style={{
                width: step === 'form' ? '0%' : step === 'slots' ? '50%' : '100%'
              }}
            ></div>

            {/* Step 1 */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === 'form' 
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' 
                  : 'bg-indigo-600 text-white'
              }`}>
                {step !== 'form' ? '✓' : '1'}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${
                step === 'form' ? 'text-indigo-500' : 'text-text-muted'
              }`}>Verify</span>
            </div>

            {/* Step 2 */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === 'slots' 
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' 
                  : step === 'confirmed' ? 'bg-indigo-600 text-white' : 'bg-card-bg border border-card-border/80 text-text-muted'
              }`}>
                {step === 'confirmed' ? '✓' : '2'}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${
                step === 'slots' ? 'text-indigo-500' : 'text-text-muted'
              }`}>Pick Slot</span>
            </div>

            {/* Step 3 */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === 'confirmed' 
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' 
                  : 'bg-card-bg border border-card-border/80 text-text-muted'
              }`}>
                3
              </div>
              <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${
                step === 'confirmed' ? 'text-indigo-500' : 'text-text-muted'
              }`}>Confirm</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className={`inline-block bg-gradient-to-r ${COURSE_GRADIENT} text-white text-[10px] font-bold px-4.5 py-1.5 rounded-full uppercase tracking-widest`}>
            {COURSE} Registration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-outfit">
            Choose Your Registration Slot
          </h1>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            Select a preferred 15-minute time slot for your registration desk check-in.
          </p>
        </div>

        {/* Step 1: Form */}
        {step === 'form' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 max-w-lg mx-auto animate-float-subtle">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Application Number</label>
              <input
                type="text"
                value={applicationNo}
                onChange={e => setApplicationNo(e.target.value)}
                placeholder="e.g. JKLU/B.TECH/2026/1234"
                className={`w-full px-4 py-3 bg-background border border-card-border rounded-xl text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 ${COURSE_RING} ${COURSE_BORDER} transition-all duration-300 font-semibold`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-background border border-card-border rounded-xl text-sm text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 ${COURSE_RING} ${COURSE_BORDER} transition-all duration-300 font-semibold`}
              />
            </div>
            
            {error && (
              <div className="text-xs text-red-500 dark:text-red-400 font-bold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-start gap-2 animate-pulse-once">
                <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <button
              onClick={handleVerify}
              disabled={loading}
              className={`w-full py-3.5 bg-gradient-to-r ${COURSE_GRADIENT} text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all ${COURSE_GLOW} hover:shadow-lg disabled:opacity-50 cursor-pointer`}
            >
              {loading ? 'Verifying Details...' : 'Find Available Slots →'}
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
                  onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold border transition-all duration-300 cursor-pointer ${
                    selectedDate === d
                      ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent shadow-md ${COURSE_GLOW}`
                      : 'bg-card-bg border-card-border/60 text-text-muted hover:border-indigo-500/50 hover:bg-indigo-500/5'
                  }`}
                >
                  {new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', weekday: 'short' })}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 bg-card-bg/40 border border-card-border/40 py-2.5 px-4 rounded-full max-w-sm mx-auto text-xs text-text-muted font-bold tracking-wide">
              <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDateLabel(selectedDate)}</span>
            </div>

            {slotsLoading ? (
              <div className="text-center text-sm text-text-muted animate-pulse py-12 font-semibold">Loading available desks...</div>
            ) : (
              <div className="space-y-6">
                {/* Morning Session */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest bg-card-bg/60 border border-card-border/30 w-fit px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                    </svg>
                    <span>Morning Session · 9:30 AM – 1:30 PM</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {slots.filter(s => {
                      const h = parseInt(s.time.split(':')[0]);
                      return h < 14;
                    }).map(slot => {
                      const isSelected = selectedSlot === slot.time;
                      const isFull = slot.available === 0;
                      const isLow = slot.available === 1;

                      return (
                        <button
                          key={slot.time}
                          disabled={isFull}
                          onClick={() => setSelectedSlot(isSelected ? null : slot.time)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col justify-between items-center min-h-[68px] sm:min-h-[72px] ${
                            isSelected
                              ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent shadow-md ${COURSE_GLOW} scale-102`
                              : isFull
                                ? 'bg-card-bg/40 border-card-border/30 text-text-muted/30 cursor-not-allowed opacity-50'
                                : isLow
                                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 hover:-translate-y-0.5'
                                  : 'bg-card-bg border-card-border text-foreground hover:border-indigo-500 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5'
                          }`}
                        >
                          <span className="text-xs font-bold tracking-tight">
                            {(() => {
                              const [h, m] = slot.time.split(':').map(Number);
                              const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                              return `${h12}:${m.toString().padStart(2, '0')}`;
                            })()}
                            <span className="text-[9px] uppercase ml-0.5 opacity-90">
                              {parseInt(slot.time.split(':')[0]) >= 12 ? 'pm' : 'am'}
                            </span>
                          </span>
                          <span className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : isFull
                                ? 'bg-card-border/10 text-text-muted/40'
                                : isLow
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          }`}>
                            {isFull ? 'Full' : `${slot.available} open`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Session */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest bg-card-bg/60 border border-card-border/30 w-fit px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m-7 8h14M5 19h14M8 15h8m-7-3l3-3 3 3" />
                    </svg>
                    <span>Afternoon Session · 2:00 PM – 5:00 PM</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {slots.filter(s => {
                      const h = parseInt(s.time.split(':')[0]);
                      return h >= 14;
                    }).map(slot => {
                      const isSelected = selectedSlot === slot.time;
                      const isFull = slot.available === 0;
                      const isLow = slot.available === 1;

                      return (
                        <button
                          key={slot.time}
                          disabled={isFull}
                          onClick={() => setSelectedSlot(isSelected ? null : slot.time)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col justify-between items-center min-h-[68px] sm:min-h-[72px] ${
                            isSelected
                              ? `bg-gradient-to-r ${COURSE_GRADIENT} text-white border-transparent shadow-md ${COURSE_GLOW} scale-102`
                              : isFull
                                ? 'bg-card-bg/40 border-card-border/30 text-text-muted/30 cursor-not-allowed opacity-50'
                                : isLow
                                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 hover:-translate-y-0.5'
                                  : 'bg-card-bg border-card-border text-foreground hover:border-indigo-500 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5'
                          }`}
                        >
                          <span className="text-xs font-bold tracking-tight">
                            {(() => {
                              const [h, m] = slot.time.split(':').map(Number);
                              const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                              return `${h12}:${m.toString().padStart(2, '0')}`;
                            })()}
                            <span className="text-[9px] uppercase ml-0.5 opacity-90">
                              {parseInt(slot.time.split(':')[0]) >= 12 ? 'pm' : 'am'}
                            </span>
                          </span>
                          <span className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : isFull
                                ? 'bg-card-border/10 text-text-muted/40'
                                : isLow
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          }`}>
                            {isFull ? 'Full' : `${slot.available} open`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500 dark:text-red-400 font-bold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-3">
              <button
                onClick={() => { setStep('form'); setSelectedSlot(null); setError(''); }}
                className="w-full sm:flex-1 py-3.5 bg-card-bg border border-card-border/60 text-foreground text-xs font-bold rounded-xl hover:bg-background hover:border-card-border transition-all duration-300 cursor-pointer order-2 sm:order-1"
              >
                ← Back
              </button>
              <button
                onClick={handleBook}
                disabled={!selectedSlot || loading}
                className={`w-full sm:flex-[2] py-3.5 bg-gradient-to-r ${COURSE_GRADIENT} text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all ${COURSE_GLOW} disabled:opacity-40 cursor-pointer order-1 sm:order-2`}
              >
                {loading ? 'Reserving slot...' : 'Confirm Registration Slot'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed */}
        {step === 'confirmed' && booking && (
          <div className="glass-card p-6 sm:p-8 space-y-6 max-w-lg mx-auto text-center border-2 border-indigo-500/20 relative overflow-hidden animate-float-subtle">
            {/* Ticket Stub Decorative Elements */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full border-r border-card-border/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full border-l border-card-border/50"></div>

            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground font-outfit">
                {existingBooking ? 'Pass Details' : 'Booking Confirmed!'}
              </h2>
              <p className="text-xs text-text-muted mt-1 font-semibold">
                {existingBooking ? 'Your slot is already reserved.' : 'Registration slip generated successfully.'}
              </p>
            </div>

            {/* Ticket Details Box */}
            <div className="bg-card-bg/60 border border-card-border/50 rounded-2xl p-5 space-y-3.5 relative">
              <div className="flex justify-between items-center gap-4 py-1.5 border-b border-card-border/20">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider shrink-0">Application No</span>
                <span className="text-xs font-extrabold text-foreground tracking-wider text-right break-all max-w-[180px] sm:max-w-none">{booking.applicationNo}</span>
              </div>
              <div className="flex justify-between items-center gap-4 py-1.5 border-b border-card-border/20">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider shrink-0">Name</span>
                <span className="text-xs font-extrabold text-foreground uppercase text-right break-words max-w-[180px] sm:max-w-none">{booking.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-card-border/20">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Date</span>
                <span className="text-xs font-extrabold text-foreground">{formatDateLabel(booking.date)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-card-border/20">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Time Slot</span>
                <span className={`text-xs font-extrabold bg-gradient-to-r ${COURSE_GRADIENT} bg-clip-text text-transparent`}>
                  {(() => {
                    const [h, m] = booking.timeSlot.split(':').map(Number);
                    const ampm = h >= 12 ? 'PM' : 'AM';
                    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                    const endMin = (m + 15) % 60;
                    const endH = m + 15 >= 60 ? (h + 1) : h;
                    const endAmpm = endH >= 12 ? 'PM' : 'AM';
                    const endH12 = endH > 12 ? endH - 12 : endH === 0 ? 12 : endH;
                    return `${h12}:${m.toString().padStart(2, '0')} ${ampm} - ${endH12}:${endMin.toString().padStart(2, '0')} ${endAmpm}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Assigned Desk</span>
                <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r ${COURSE_GRADIENT} text-white shadow-md ${COURSE_GLOW}`}>
                  DESK {booking.deskNumber}
                </span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 text-[11px] text-amber-600 dark:text-amber-400 font-semibold leading-relaxed flex items-start gap-2.5">
              <svg className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span><strong>Important Note:</strong> Please report at **Desk {booking.deskNumber}** exactly 5 minutes before your time slot. Make sure to carry all your original academic & confirmation documents.</span>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-text-muted font-bold border-t border-card-border/30 relative z-10">
        Aarambh &apos;26 · JK Lakshmipat University
      </footer>
    </div>
  );
}
