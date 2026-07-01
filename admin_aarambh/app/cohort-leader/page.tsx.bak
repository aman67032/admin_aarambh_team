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
  
  // Call logging form state
  const [callNotes, setCallNotes] = useState<string>('');
  const [loggingCallId, setLoggingCallId] = useState<string | null>(null);

  const handleLogCall = async (studentId: string) => {
    if (!callNotes.trim()) return;
    setLoggingCallId(studentId);
    try {
      const res = await api.cohort.addCallLog(studentId, callNotes);
      if (res.success) {
        setCallNotes('');
        // Refresh local state
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
      <div className="glass-card p-8 text-center max-w-md mx-auto mt-12 border border-red-100">
        <span className="text-3xl">⚠️</span>
        <h3 className="text-md font-extrabold text-foreground font-outfit mt-4">Error Loading Dashboard</h3>
        <p className="text-xs text-red-500 font-semibold mt-1">{error || 'Unable to retrieve cohort information.'}</p>
        <button 
          onClick={fetchCohortInfo}
          className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover transition-all cursor-pointer"
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">
              Cohort {cohortName} Dashboard
            </h1>
            <p className="text-xs text-text-muted font-semibold mt-1">
              Cohort Leader: <span className="text-foreground font-bold">{leaderName}</span>
            </p>
          </div>
        </div>
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="text-5xl">🔒</div>
          <h2 className="text-xl font-bold text-foreground">Student Lists Not Published Yet</h2>
          <p className="text-text-muted max-w-md">
            The student allocation lists have not been released by the Super Admin yet. Please contact your coordinator or check back later once orientation details are finalized.
          </p>
        </div>
      </div>
    );
  }

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cohort level stats
  const totalStudents = students.length;
  const registeredCount = students.filter(s => s.confirmedJklu).length;
  const verifiedCount = students.filter(s => s.documentsVerified).length;
  const notContinuingCount = students.filter(s => s.notContinuing).length;

  const getPercent = (count: number, total: number) => {
    if (!total) return 0;
    return Math.round((count / total) * 100);
  };

  return (
    <div className="space-y-8 text-foreground">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-outfit text-foreground">
            Cohort {cohortName} Dashboard
          </h1>
          <p className="text-xs text-text-muted font-semibold mt-1">
            Cohort Leader: <span className="text-foreground font-bold">{leaderName}</span> • 
            Coordinator (Cluster Head): <span className="text-foreground font-bold">{coordinatorName}</span>
          </p>
        </div>
        
        <Link
          href="/cohort-registrations"
          className="px-5 py-2.5 btn-premium text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <span>📊</span>
          View All Cohorts Tracker
        </Link>
      </div>

      {/* Cohort Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-primary flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total Allocated Students</span>
          <div className="text-2xl font-black font-outfit text-foreground mt-2">{totalStudents}</div>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Registered at JKLU</span>
          <div className="text-2xl font-black font-outfit text-emerald-600 mt-2">
            {registeredCount}
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-indigo-500 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Documents Verified</span>
          <div className="text-2xl font-black font-outfit text-indigo-600 mt-2">
            {verifiedCount}
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-red-500 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Not Continuing</span>
          <div className="text-2xl font-black font-outfit text-red-600 mt-2">
            {notContinuingCount} <span className="text-xs font-semibold text-text-muted">({getPercent(notContinuingCount, totalStudents)}%)</span>
          </div>
        </div>
      </div>

      {/* Students Card and Listing */}
      <div className="glass-card overflow-hidden">
        {/* Card Header & Search */}
        <div className="p-6 border-b border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card-bg/20">
          <h2 className="text-lg font-extrabold font-outfit text-foreground">
            Student Roster
          </h2>
          
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or course..."
              className="w-full px-4 py-2 bg-background/50 border border-card-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-foreground font-semibold"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-2.5 text-text-muted hover:text-foreground font-bold text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Student List */}
        <div className="divide-y divide-card-border">
          {filteredStudents.map((student) => {
            const isExpanded = selectedStudent === student._id;
            
            return (
              <div key={student._id} className="transition-all duration-200">
                {/* Clickable Header Row */}
                <div
                  onClick={() => setSelectedStudent(isExpanded ? null : student._id)}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-card-bg/50 transition-colors ${
                    student.notContinuing 
                      ? 'bg-red-500/10' 
                      : student.confirmedJklu 
                      ? 'bg-emerald-500/10' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card-bg border border-card-border flex items-center justify-center font-bold text-text-muted text-xs shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-foreground text-sm">{student.name}</div>
                      <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                        {student.applicationNo} • {student.course}
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2 font-bold text-[10px] uppercase mt-1 sm:mt-0 self-end sm:self-auto">
                    {student.notContinuing ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">Not Coming</span>
                    ) : (
                      <>
                        {student.documentsVerified ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Verified</span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending Verify</span>
                        )}
                        
                        {student.confirmedJklu ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Registered</span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-card-bg/500/10 text-text-muted border border-slate-500/20">Pending Reg</span>
                        )}
                      </>
                    )}
                    
                    <svg className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-6 bg-card-bg/25 border-t border-card-border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Demographics and Contact */}
                      <div className="space-y-2 text-xs font-semibold text-text-muted">
                        <h4 className="text-foreground font-extrabold text-xs uppercase tracking-wider mb-3">Student Details</h4>
                        <div><span className="text-text-muted/80">Gender:</span> <span className="text-foreground">{student.gender}</span></div>
                        <div><span className="text-text-muted/80">Mobile:</span> <span className="text-foreground">{student.mobile}</span></div>
                        <div><span className="text-text-muted/80">Email:</span> <span className="text-foreground">{student.email}</span></div>
                        <div><span className="text-text-muted/80">Location:</span> <span className="text-foreground">{student.city}, {student.district}, {student.state}</span></div>
                      </div>

                      {/* Parent and Outreach info */}
                      <div className="space-y-2 text-xs font-semibold text-text-muted">
                        <h4 className="text-foreground font-extrabold text-xs uppercase tracking-wider mb-3">Guardian & Outreach Information</h4>
                        <div><span className="text-text-muted/80">Father Name:</span> <span className="text-foreground">{student.fatherName}</span></div>
                        <div><span className="text-text-muted/80">Father Phone:</span> <span className="text-foreground">{student.fatherMobile}</span></div>
                        <div><span className="text-text-muted/80">Father Email:</span> <span className="text-foreground">{student.fatherEmail}</span></div>
                        
                        {student.notContinuing && student.confirmationNote && (
                          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                            <span className="font-extrabold block text-xs">Reason for not coming to Aarambh:</span>
                            <span className="italic text-xs font-normal">&ldquo;{student.confirmationNote}&rdquo;</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Outreach Call Log & History for Cohort Leader */}
                    <div className="pt-4 border-t border-card-border grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Log call form (only if student is continuing) */}
                      {!student.notContinuing ? (
                        <div className="space-y-3">
                          <h4 className="text-foreground font-extrabold text-xs uppercase tracking-wider">Log Outreach Call</h4>
                          <textarea
                            value={callNotes}
                            onChange={(e) => setCallNotes(e.target.value)}
                            placeholder="Enter outreach conversation notes..."
                            className="w-full px-4 py-3 bg-background/50 border border-card-border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-semibold"
                            rows={3}
                          />
                          <button
                            onClick={() => handleLogCall(student._id)}
                            disabled={loggingCallId === student._id || !callNotes.trim()}
                            className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer ${
                              callNotes.trim() ? 'btn-premium' : 'bg-slate-300 dark:bg-slate-800 text-text-muted cursor-not-allowed shadow-none'
                            }`}
                          >
                            {loggingCallId === student._id ? 'Logging...' : 'Save Call Entry'}
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-semibold">
                          Outreach is closed for this student as they are not continuing admissions.
                        </div>
                      )}

                      {/* Call logs list history */}
                      <div className="space-y-3 w-full">
                        <h4 className="text-foreground font-extrabold text-xs uppercase tracking-wider">Outreach Call History ({student.callLogs.length})</h4>
                        <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 scrollbar-thin">
                          {student.callLogs.map((log) => (
                            <div key={log._id} className="p-3 bg-background/50 border border-card-border rounded-xl text-xs space-y-1">
                              <p className="text-foreground font-medium leading-relaxed">{log.notes}</p>
                              <div className="flex justify-between items-center text-[10px] text-text-muted font-bold mt-2">
                                <span>By: {log.loggedByName}</span>
                                {log.verified ? (
                                  <span className="text-emerald-600 font-extrabold">✓ Verified</span>
                                ) : (
                                  <span className="text-amber-500 font-extrabold">⏳ Pending Approval</span>
                                )}
                              </div>
                              <div className="text-[9px] text-text-muted/65 font-bold">
                                {new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          ))}
                          {student.callLogs.length === 0 && (
                            <div className="text-xs text-text-muted italic">No outreach calls logged yet.</div>
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
            <div className="p-8 text-center text-text-muted font-bold text-xs">
              {students.length === 0 ? 'No students allocated to your cohort.' : 'No matching student records found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
