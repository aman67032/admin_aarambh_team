'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Loader from '../components/Loader';

interface StudentInfo {
  name: string;
  applicationNo: string;
  email: string;
  course: string;
  cohort: string;
  arrivalInfo?: {
    isFromJaipur: boolean;
    jaipurArea?: string;
    wantsBus?: boolean;
    arrivalDate?: string;
    arrivalTime?: string;
    transportMode?: string;
    declaredAt?: string;
  };
}

export default function ArrivalDeclarationPage() {
  const jkluLogo = '/JKLU Logo.svg';
  const aarambhLogo = '/Aarambh_logo_Final-01.svg';

  // Step 1: Verification
  const [cohortName, setCohortName] = useState('');
  const [appNo, setAppNo] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 2: Form Fields
  const [isFromJaipur, setIsFromJaipur] = useState<boolean | null>(null);
  const [jaipurArea, setJaipurArea] = useState('');
  const [wantsBus, setWantsBus] = useState<boolean | null>(null);
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Step 1 handler: Verify student credentials
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortName.trim() || !appNo.trim() || !accessCode.trim()) return;

    setVerifying(true);
    setErrorMsg('');
    setStudent(null);

    try {
      const res = await fetch(`/api/arrival/verify?cohort=${encodeURIComponent(cohortName.trim())}&applicationNo=${encodeURIComponent(appNo.trim())}&code=${encodeURIComponent(accessCode.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify details.');
      }

      setStudent(data);
      if (data.arrivalInfo) {
        setIsFromJaipur(data.arrivalInfo.isFromJaipur);
        setJaipurArea(data.arrivalInfo.jaipurArea || '');
        setWantsBus(data.arrivalInfo.wantsBus ?? null);
        setArrivalDate(data.arrivalInfo.arrivalDate || '');
        setArrivalTime(data.arrivalInfo.arrivalTime || '');
        setTransportMode(data.arrivalInfo.transportMode || '');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during verification.');
    } finally {
      setVerifying(false);
    }
  };

  // Step 2 handler: Submit arrival declaration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || isFromJaipur === null) return;

    // Validate fields
    if (isFromJaipur) {
      if (!jaipurArea.trim() || wantsBus === null) {
        alert('Please fill out all required fields.');
        return;
      }
    } else {
      if (!arrivalDate.trim() || !arrivalTime.trim() || !transportMode.trim()) {
        alert('Please fill out all required fields.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/arrival/declare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cohort: student.cohort,
          applicationNo: student.applicationNo,
          code: accessCode.trim(),
          isFromJaipur,
          jaipurArea,
          wantsBus,
          arrivalDate,
          arrivalTime,
          transportMode
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit declaration.');
      }

      setSuccess(true);
    } catch (err: any) {
      alert(err.message || 'An error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-outfit text-slate-800">
      {/* Navbar header */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <img src={jkluLogo} alt="JKLU Logo" className="h-10 w-auto" />
          <div className="h-8 w-[1px] bg-slate-200" />
          <img src={aarambhLogo} alt="Aarambh Logo" className="h-9 w-auto" />
        </div>
      </header>

      {/* Main Content Form area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
              Transport & Arrival Declaration
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Arrival at JKLU</h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please enter your details below to declare your arrival date/time or coordinate day-scholar bus transportation routes.
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Details Saved Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Thank you! Your arrival and route preference have been logged for AARAMBH 2026.
                </p>
              </div>
              <button
                onClick={() => {
                  setSuccess(false);
                  setStudent(null);
                  setCohortName('');
                  setAppNo('');
                  setAccessCode('');
                  setIsFromJaipur(null);
                  setJaipurArea('');
                  setWantsBus(null);
                  setArrivalDate('');
                  setArrivalTime('');
                  setTransportMode('');
                }}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer"
              >
                Submit Another Form
              </button>
            </div>
          ) : !student ? (
            /* STEP 1: Verification Form */
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Cohort Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A1, L3"
                    value={cohortName}
                    onChange={(e) => setCohortName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Arrival Access Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Application Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JKLU/B.TECH/2026/0449"
                  value={appNo}
                  onChange={(e) => setAppNo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold uppercase"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Verifying Credentials...
                  </>
                ) : (
                  'Verify Details ➔'
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Declaration Details Form */
            <form onSubmit={handleSubmit} className="space-y-5 border-t border-slate-100 pt-5">
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase">Welcome, Student</span>
                  <div className="font-black text-slate-900 text-sm">{student.name}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{student.course} · Cohort {student.cohort}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStudent(null)}
                  className="text-[10px] font-bold text-rose-500 hover:underline"
                >
                  Change Account
                </button>
              </div>

              {/* Jaipur Residency Query */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Are you currently residing in Jaipur? (Day Scholar) *
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 p-3 border border-slate-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
                    <input
                      type="radio"
                      name="isFromJaipur"
                      checked={isFromJaipur === true}
                      onChange={() => {
                        setIsFromJaipur(true);
                        // Reset other fields
                        setArrivalDate('');
                        setArrivalTime('');
                        setTransportMode('');
                      }}
                      className="accent-indigo-600 w-4 h-4"
                    />
                    <span className="text-xs font-bold">Yes, from Jaipur</span>
                  </label>
                  <label className="flex-1 p-3 border border-slate-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
                    <input
                      type="radio"
                      name="isFromJaipur"
                      checked={isFromJaipur === false}
                      onChange={() => {
                        setIsFromJaipur(false);
                        // Reset other fields
                        setJaipurArea('');
                        setWantsBus(null);
                      }}
                      className="accent-indigo-600 w-4 h-4"
                    />
                    <span className="text-xs font-bold">No, from Outside Jaipur</span>
                  </label>
                </div>
              </div>

              {/* Conditionally render Jaipur day scholar routes */}
              {isFromJaipur === true && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Specify Area / Locality in Jaipur *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vaishali Nagar, Mansarovar, C-Scheme"
                      value={jaipurArea}
                      onChange={(e) => setJaipurArea(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Do you wish to avail the University Bus Facility? *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 p-3 border border-slate-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
                        <input
                          type="radio"
                          name="wantsBus"
                          checked={wantsBus === true}
                          onChange={() => setWantsBus(true)}
                          className="accent-indigo-600 w-4 h-4"
                        />
                        <span className="text-xs font-bold">Yes, I want University Bus</span>
                      </label>
                      <label className="flex-1 p-3 border border-slate-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
                        <input
                          type="radio"
                          name="wantsBus"
                          checked={wantsBus === false}
                          onChange={() => setWantsBus(false)}
                          className="accent-indigo-600 w-4 h-4"
                        />
                        <span className="text-xs font-bold">No, I have my own transport</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditionally render outstation arrival details */}
              {isFromJaipur === false && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Date of Arrival at JKLU *
                      </label>
                      <select
                        required
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="">Select Date</option>
                        <option value="12-07-2026">July 12, 2026 (Sunday)</option>
                        <option value="13-07-2026">July 13, 2026 (Monday)</option>
                        <option value="14-07-2026">July 14, 2026 (Tuesday)</option>
                        <option value="Other">Other / Delayed</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Approx Arrival Time at JKLU *
                      </label>
                      <select
                        required
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="">Select Time Slot</option>
                        <option value="Early Morning (6 AM - 9 AM)">Early Morning (6 AM - 9 AM)</option>
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                        <option value="Night (8 PM - Midnight)">Night (8 PM - Midnight)</option>
                        <option value="Late Night (Midnight - 6 AM)">Late Night (Midnight - 6 AM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Mode of Transportation to Campus *
                    </label>
                    <select
                      required
                      value={transportMode}
                      onChange={(e) => setTransportMode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                    >
                      <option value="">Select Mode</option>
                      <option value="Train">Train (Jaipur Railway Station)</option>
                      <option value="Flight">Flight (Jaipur Airport)</option>
                      <option value="Bus">Bus (Sindhi Camp / Local Stop)</option>
                      <option value="Personal Vehicle">Personal Vehicle / Cab</option>
                    </select>
                  </div>
                </div>
              )}

              {isFromJaipur !== null && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Submitting Declaration...
                    </>
                  ) : (
                    'Submit Arrival Declaration ✓'
                  )}
                </button>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
