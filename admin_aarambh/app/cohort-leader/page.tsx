'use client';
import Loader from '../components/Loader';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Student } from '../lib/api';

interface CohortData {
  cohortName: string;
  clusterName: string;
  leaderName: string;
  coordinatorName: string;
  students: Student[];
}

export default function CohortLeaderDashboard() {
  const [cohortData, setCohortData] = useState<CohortData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [callNotes, setCallNotes] = useState<string>('');
  const [loggingCallId, setLoggingCallId] = useState<string | null>(null);

  const handleLogCall = async (studentId: string) => {
    if (!callNotes.trim()) return;
    setLoggingCallId(studentId);
    try {
      const res = await api.cohort.addCallLog(studentId, callNotes);
      if (res.success) {
        setCallNotes('');
        setCohortData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            students: prev.students.map((s: Student) => s._id === studentId ? res.student : s)
          };
        });
      }
    } catch (err: any) {
      alert(err.message || 'Error adding call log.');
    } finally {
      setLoggingCallId(null);
    }
  };

  const fetchCohortInfo = async () => {
    try {
      const data = await api.cohort.getMyStudents();
      setCohortData(data);
    } catch (err: any) {
      console.error('Failed to fetch cohort students:', err);
      setError(err.message || 'Failed to load cohort information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCohortInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader scale={0.7} label="Loading cohort leader dashboard..." />
      </div>
    );
  }

  if (error || !cohortData) {
    return (
      <div className="glass-card p-10 text-center max-w-md mx-auto mt-12 border border-red-100">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="text-lg font-bold text-foreground mt-2">Error Loading Dashboard</h3>
        <p className="text-sm text-red-500 mt-1.5">{error || 'Unable to retrieve cohort information.'}</p>
        <button 
          onClick={fetchCohortInfo}
          className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover transition-all cursor-pointer shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { cohortName, clusterName, leaderName, coordinatorName, students, notPublished } = cohortData as CohortData & { notPublished?: boolean };

  if (notPublished) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Cohort Leader</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cohort {cohortName}</h1>
          <p className="text-sm text-text-muted mt-1">Leader: <span className="text-foreground font-semibold">{leaderName}</span></p>
        </div>
        <div className="glass-card p-14 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-card-border/30 flex items-center justify-center text-3xl">🔒</div>
          <h2 className="text-lg font-bold text-foreground">Student Lists Not Published Yet</h2>
          <p className="text-text-muted max-w-md text-sm leading-relaxed">
            The student allocation lists have not been released by the Super Admin yet. Please contact your coordinator or check back later.
          </p>
        </div>
      </div>
    );
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const registeredCount = students.filter(s => s.confirmedJklu).length;
  const verifiedCount = students.filter(s => s.documentsVerified).length;
  const notContinuingCount = students.filter(s => s.notContinuing).length;

  const getPercent = (count: number, total: number) => {
    if (!total) return 0;
    return Math.round((count / total) * 100);
  };

  const regPct = getPercent(registeredCount, totalStudents);

  return (
    <div className="space-y-8 text-foreground">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Cohort Leader View</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Cohort {cohortName}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              Leader: <span className="text-foreground font-semibold">{leaderName}</span>
            </span>
            <span className="text-card-border">·</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
              Cluster Head: <span className="text-foreground font-semibold">{coordinatorName}</span>
            </span>
          </div>
        </div>
        
        <Link
          href="/cohort-registrations"
          className="inline-flex items-center gap-2 px-5 py-2.5 btn-premium text-white text-sm font-semibold rounded-full shadow-md self-start whitespace-nowrap cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          All Cohorts Tracker
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-foreground">{totalStudents}</span>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted">Total Students</p>
            <p className="text-[10px] text-text-muted/70 mt-0.5">Allocated to your cohort</p>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-emerald-600">{registeredCount}</span>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted">Registered at JKLU</p>
            <div className="mt-1.5 h-1.5 bg-card-border/40 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${regPct}%` }}></div>
            </div>
            <p className="text-[10px] text-text-muted/70 mt-0.5">{regPct}% of cohort</p>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{verifiedCount}</span>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted">Docs Verified</p>
            <div className="mt-1.5 h-1.5 bg-card-border/40 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${getPercent(verifiedCount, totalStudents)}%` }}></div>
            </div>
            <p className="text-[10px] text-text-muted/70 mt-0.5">{getPercent(verifiedCount, totalStudents)}% of cohort</p>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-red-500">{notContinuingCount}</span>
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted">Not Continuing</p>
            <p className="text-[10px] text-text-muted/70 mt-0.5">{getPercent(notContinuingCount, totalStudents)}% of cohort</p>
          </div>
        </div>
      </div>

      {/* Student Roster Card */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-5 border-b border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Student Roster</h2>
            <p className="text-xs text-text-muted mt-0.5">{filteredStudents.length} of {totalStudents} students shown</p>
          </div>
          
          <div className="relative max-w-xs w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, ID, or course..."
              className="w-full pl-9 pr-9 py-2.5 bg-background/60 border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-card-border">
          {filteredStudents.map((student) => {
            const isExpanded = selectedStudent === student._id;
            const initial = student.name.charAt(0).toUpperCase();
            
            return (
              <div key={student._id} className="transition-all duration-200">
                <div
                  onClick={() => setSelectedStudent(isExpanded ? null : student._id)}
                  className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-background/40 transition-colors ${
                    student.notContinuing
                      ? 'bg-red-50/60'
                      : student.confirmedJklu
                      ? 'bg-emerald-50/40'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      student.notContinuing
                        ? 'bg-red-100 text-red-600'
                        : student.confirmedJklu
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {initial}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm leading-tight">{student.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {student.applicationNo} <span className="text-card-border mx-1">·</span> {student.course}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto ml-12 sm:ml-0">
                    {student.notContinuing ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-semibold border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                        Not Continuing
                      </span>
                    ) : (
                      <>
                        {student.documentsVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-semibold border border-indigo-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
                            Docs Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                            Pending Verify
                          </span>
                        )}
                        {student.confirmedJklu ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                            Registered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card-bg text-text-muted text-[10px] font-semibold border border-card-border">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
                            Pending Reg
                          </span>
                        )}
                      </>
                    )}
                    <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 py-6 bg-background/40 border-t border-card-border space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Student Details</h4>
                        <div className="space-y-2.5">
                          {[
                            { label: 'Gender', value: student.gender },
                            { label: 'Mobile', value: student.mobile },
                            { label: 'Email', value: student.email },
                            { label: 'Location', value: `${student.city}, ${student.district}, ${student.state}` },
                            { label: 'Arrival Code', value: student.arrivalCode || 'N/A' },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex gap-3 text-sm items-center">
                              <span className="text-text-muted min-w-[85px] font-medium shrink-0">{label}</span>
                              {label === 'Arrival Code' ? (
                                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-extrabold font-mono tracking-wider text-xs">
                                  {value}
                                </span>
                              ) : (
                                <span className="text-foreground font-medium">{value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Guardian &amp; Outreach</h4>
                        <div className="space-y-2.5">
                          {[
                            { label: 'Father', value: student.fatherName },
                            { label: 'Phone', value: student.fatherMobile },
                            { label: 'Email', value: student.fatherEmail },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex gap-3 text-sm">
                              <span className="text-text-muted min-w-[80px] font-medium shrink-0">{label}</span>
                              <span className="text-foreground font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                        {student.notContinuing && student.confirmationNote && (
                          <div className="mt-3 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-xs font-bold text-red-600 mb-1">Reason for not continuing:</p>
                            <p className="text-sm text-red-700 italic leading-relaxed">&ldquo;{student.confirmationNote}&rdquo;</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {student.arrivalInfo && (
                      <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-3">
                        <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span>📅</span> Declared Arrival Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 text-xs text-foreground font-semibold">
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Origin City:</span>
                            {student.arrivalInfo.city || 'N/A'}
                          </div>
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Boarding Place:</span>
                            {student.arrivalInfo.place || 'N/A'}
                          </div>
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Transport Mode:</span>
                            {student.arrivalInfo.transportMode || 'N/A'}
                          </div>
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Bus Service:</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${student.arrivalInfo.wantsBus ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                              {student.arrivalInfo.wantsBus ? 'Yes, Availing Bus' : 'No, Own Option'}
                            </span>
                          </div>
                          {student.arrivalInfo.wantsBus && student.arrivalInfo.pickupPoint && (
                            <div>
                              <span className="text-text-muted mr-1.5 font-medium">Bus Pickup Point:</span>
                              {student.arrivalInfo.pickupPoint}
                            </div>
                          )}
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Arrival Date:</span>
                            {student.arrivalInfo.arrivalDate || 'N/A'}
                          </div>
                          <div>
                            <span className="text-text-muted mr-1.5 font-medium">Arrival Time:</span>
                            {student.arrivalInfo.arrivalTime || 'N/A'}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-5 border-t border-card-border grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {!student.notContinuing ? (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Log Outreach Call</h4>
                          <textarea
                            value={callNotes}
                            onChange={(e) => setCallNotes(e.target.value)}
                            placeholder="Enter outreach conversation notes..."
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground resize-none"
                            rows={3}
                          />
                          <button
                            onClick={() => handleLogCall(student._id)}
                            disabled={loggingCallId === student._id || !callNotes.trim()}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer ${
                              callNotes.trim() ? 'btn-premium shadow-sm' : 'bg-slate-200 text-text-muted cursor-not-allowed'
                            }`}
                          >
                            {loggingCallId === student._id ? 'Saving...' : '+ Save Call Entry'}
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                          Outreach is closed — student is not continuing admissions.
                        </div>
                      )}

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                          Call History <span className="text-primary ml-1">({student.callLogs.length})</span>
                        </h4>
                        <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
                          {student.callLogs.map((log) => (
                            <div key={log._id} className="p-3.5 bg-card-bg border border-card-border rounded-xl space-y-2">
                              <p className="text-sm text-foreground leading-relaxed">{log.notes}</p>
                              <div className="flex justify-between items-center text-xs text-text-muted">
                                <span>By <span className="font-medium text-foreground">{log.loggedByName}</span></span>
                                {log.verified ? (
                                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Verified
                                  </span>
                                ) : (
                                  <span className="text-amber-600 font-medium">⏳ Pending</span>
                                )}
                              </div>
                              <p className="text-[10px] text-text-muted/60">{new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString()}</p>
                            </div>
                          ))}
                          {student.callLogs.length === 0 && (
                            <div className="text-sm text-text-muted italic py-2">No outreach calls logged yet.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredStudents.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-card-border/30 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-text-muted text-sm font-medium">
                {students.length === 0 ? 'No students allocated to your cohort.' : 'No matching student records found.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
