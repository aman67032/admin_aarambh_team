'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Loader from '../components/Loader';
import PlasmaWave from '../components/PlasmaWave';

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
      const isTimeRequired = wantsBus === false;
      const isTimeFilled = !isTimeRequired || arrivalTime.trim() !== '';
      if (!jaipurArea.trim() || wantsBus === null || !arrivalDate.trim() || !isTimeFilled) {
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
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-outfit text-slate-900 relative overflow-hidden">
      {/* Background dynamic elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <PlasmaWave speed1={0.03} speed2={0.03} focalLength={0.7} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-orange-400/10 blur-[130px] opacity-75 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full bg-amber-400/10 blur-[130px] opacity-75 pointer-events-none"></div>

      {/* Navbar Header */}
      <header className="w-full bg-white border-b-4 border-slate-900 py-4 px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <img src={jkluLogo} alt="JKLU Logo" className="h-10 w-auto" />
          <div className="h-8 w-[2px] bg-slate-900" />
          <img src={aarambhLogo} alt="Aarambh Logo" className="h-9 w-auto" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 z-10 my-6">
        {/* Comical Card: Thick borders and blocky offset shadow */}
        <div className="w-full max-w-xl bg-white border-4 border-slate-900 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] space-y-6 transition-all duration-300">
          
          {/* Header Title Block */}
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-outfit">
              Transport & Arrival Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-outfit uppercase">
              Arrival at JKLU
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold leading-relaxed">
              Declare your travel details or choose day-scholar bus transportation route options.
            </p>
          </div>

          {/* Form Step Indicator UX */}
          {!success && (
            <div className="flex items-center justify-center gap-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <span className={`px-3 py-1.5 rounded-xl border-2 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${!student ? 'bg-orange-500 border-slate-900 text-white' : 'bg-emerald-500 border-slate-900 text-white'}`}>
                {!student ? '1. Verify Identity' : '✓ Verified'}
              </span>
              <div className="w-6 h-[3px] bg-slate-900" />
              <span className={`px-3 py-1.5 rounded-xl border-2 transition-all ${student ? 'bg-orange-500 border-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]' : 'bg-white border-slate-200 text-slate-400'}`}>
                2. Declaration
              </span>
            </div>
          )}

          {success ? (
            /* SUCCESS PANEL SCREEN */
            <div className="py-10 text-center space-y-6 animate-scaleIn">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 border-4 border-slate-900 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] animate-bounce">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Details Saved!</h3>
                <p className="text-xs text-slate-500 font-semibold max-w-xs mx-auto leading-relaxed">
                  Thank you! Your arrival coordinates and route preferences have been successfully recorded in the system for Aarambh 2026.
                </p>
              </div>
            </div>
          ) : !student ? (
            /* STEP 1: Verification Form */
            <form onSubmit={handleVerify} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                {/* Cohort input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Cohort Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. A1, L3"
                      value={cohortName}
                      onChange={(e) => setCohortName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                    />
                    <svg className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>

                {/* Arrival Access Code */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Arrival Access Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="6-digit code"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold tracking-wider font-mono shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                    />
                    <svg className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Application Number */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Application Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. JKLU/B.TECH/2026/0449"
                    value={appNo}
                    onChange={(e) => setAppNo(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                  />
                  <svg className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border-2 border-rose-500 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(244,63,94,1)]">
                  <span className="text-base shrink-0">⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Verify Button with active offset translate shadow click logic */}
              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 border-2 border-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Verifying Details...
                  </>
                ) : (
                  'Verify Details ➔'
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Declaration Details Form */
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              {/* Account welcome card */}
              <div className="bg-[#FFFDF9] border-2 border-slate-900 p-4 rounded-2xl flex items-center justify-between text-xs shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <div>
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Welcome, Student</span>
                  <div className="font-black text-slate-900 text-base mt-0.5">{student.name}</div>
                  <div className="text-[10px] text-slate-500 font-bold mt-0.5">{student.course} · Cohort {student.cohort}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStudent(null)}
                  className="px-3 py-1.5 bg-white border-2 border-slate-900 hover:bg-rose-500 hover:text-white text-[10px] font-black uppercase rounded-xl transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Jaipur Residency Query */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Are you currently residing in Jaipur? (Day Scholar) *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => {
                      setIsFromJaipur(true);
                      setTransportMode('');
                    }}
                    className={`p-4 border-2 border-slate-900 rounded-2xl flex flex-col items-center justify-center gap-2.5 cursor-pointer text-center transition-all ${isFromJaipur === true ? 'bg-orange-500/10 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] translate-y-[-2px]' : 'bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50'}`}
                  >
                    <svg className={`w-6 h-6 transition-all ${isFromJaipur === true ? 'text-orange-500 animate-float' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-xs font-black uppercase tracking-wider">Yes, Jaipur</div>
                    <span className="text-[9px] font-bold text-slate-400">Day Scholar</span>
                  </div>

                  <div 
                    onClick={() => {
                      setIsFromJaipur(false);
                      setJaipurArea('');
                      setWantsBus(null);
                    }}
                    className={`p-4 border-2 border-slate-900 rounded-2xl flex flex-col items-center justify-center gap-2.5 cursor-pointer text-center transition-all ${isFromJaipur === false ? 'bg-orange-500/10 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] translate-y-[-2px]' : 'bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50'}`}
                  >
                    <svg className={`w-6 h-6 transition-all ${isFromJaipur === false ? 'text-orange-500 animate-float' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V10a2 2 0 00-2-2h-1a2 2 0 00-2-2V5a2 2 0 00-2-2H9.065m-2.13 14.15l2-2.5" />
                    </svg>
                    <div className="text-xs font-black uppercase tracking-wider">No, Outside</div>
                    <span className="text-[9px] font-bold text-slate-400">Outstation</span>
                  </div>
                </div>
              </div>

              {/* Jaipur day scholar details panel */}
              {isFromJaipur === true && (
                <div className="space-y-4 animate-slideUp">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Specify Area / Locality in Jaipur *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vaishali Nagar, Mansarovar, C-Scheme"
                        value={jaipurArea}
                        onChange={(e) => setJaipurArea(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none transition-all font-semibold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                      />
                      <svg className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  {/* Avail Bus Facility Query */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Do you wish to avail the University Bus Facility? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => setWantsBus(true)}
                        className={`p-3.5 border-2 border-slate-900 rounded-xl flex items-center justify-center gap-2.5 cursor-pointer transition-all ${wantsBus === true ? 'bg-orange-500/10 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] translate-y-[-1px]' : 'bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${wantsBus === true ? 'bg-orange-500' : 'bg-white'}`}>
                          {wantsBus === true && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider">Yes, Avail Bus</span>
                      </div>

                      <div 
                        onClick={() => setWantsBus(false)}
                        className={`p-3.5 border-2 border-slate-900 rounded-xl flex items-center justify-center gap-2.5 cursor-pointer transition-all ${wantsBus === false ? 'bg-orange-500/10 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] translate-y-[-1px]' : 'bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${wantsBus === false ? 'bg-orange-500' : 'bg-white'}`}>
                          {wantsBus === false && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider">No, Own Option</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Render arrival date and time selection for all students */}
              {isFromJaipur !== null && (
                <div className="space-y-4 animate-slideUp">
                  <div className={(isFromJaipur && wantsBus) ? "space-y-1.5" : "grid grid-cols-2 gap-4"}>
                    
                    {/* Arrival Date Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Date of Arrival at JKLU *
                      </label>
                      <select
                        required
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none font-semibold cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                      >
                        <option value="">Select Date</option>
                        <option value="12-07-2026">July 12, 2026 (Sunday)</option>
                        <option value="13-07-2026">July 13, 2026 (Monday)</option>
                        <option value="14-07-2026">July 14, 2026 (Tuesday)</option>
                        <option value="Other">Other / Delayed</option>
                      </select>
                    </div>

                    {/* Arrival Time Input */}
                    {!(isFromJaipur && wantsBus) && (
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Approx Arrival Time at JKLU *
                        </label>
                        <select
                          required
                          value={arrivalTime}
                          onChange={(e) => setArrivalTime(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none font-semibold cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
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
                    )}
                  </div>

                  {/* Mode of Transportation Input */}
                  {isFromJaipur === false && (
                    <div className="space-y-1.5 animate-slideUp">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Mode of Transportation to Campus *
                      </label>
                      <select
                        required
                        value={transportMode}
                        onChange={(e) => setTransportMode(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border-2 border-slate-900 focus:border-orange-500 rounded-xl text-slate-800 text-xs outline-none font-semibold cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                      >
                        <option value="">Select Mode</option>
                        <option value="Train">Train (Jaipur Railway Station)</option>
                        <option value="Flight">Flight (Jaipur Airport)</option>
                        <option value="Bus">Bus (Sindhi Camp / Local Stop)</option>
                        <option value="Personal Vehicle">Personal Vehicle / Cab</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Submit declaration button with click offset drop shadow */}
              {isFromJaipur !== null && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 border-2 border-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
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
