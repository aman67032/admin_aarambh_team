'use client';
import Loader from '../components/Loader';

import React, { useEffect, useState } from 'react';
import { api, Student } from '../lib/api';

export default function ClusterHeadDashboard() {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [cluster, setCluster] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [notPublished, setNotPublished] = useState(false);
  
  // Call logging form state
  const [callNotes, setCallNotes] = useState<string>('');
  const [loggingCallId, setLoggingCallId] = useState<string | null>(null);
  
  // Confirmation state
  const [confirmationNotes, setConfirmationNotes] = useState<string>('');
  const [activeForm, setActiveForm] = useState<{ studentId: string; type: 'aarambh' | 'jklu' } | null>(null);

  const fetchCohortData = async () => {
    try {
      const data = await api.cluster.getCohorts();
      setCohorts(data.cohorts);
      setCluster(data.cluster);
      setNotPublished(!!(data as any).notPublished);
    } catch (err) {
      console.error('Failed to fetch cluster cohorts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCohortData();
  }, []);

  const handleVerifyDocs = async (studentId: string, currentMail: boolean, currentDocs: boolean, field: 'mail' | 'docs', value: boolean) => {
    try {
      const mailReceived = field === 'mail' ? value : currentMail;
      const documentsVerified = field === 'docs' ? value : currentDocs;

      const res = await api.cluster.verifyDocs(studentId, { mailReceived, documentsVerified });
      if (res.success) {
        // Refresh local state
        setCohorts(prev => prev.map(cohort => ({
          ...cohort,
          students: cohort.students.map((s: Student) => s._id === studentId ? res.student : s)
        })));
      }
    } catch (err: any) {
      alert(err.message || 'Error updating verification.');
    }
  };

  const handleVerifyCallLog = async (studentId: string, logId: string) => {
    try {
      const res = await api.cluster.verifyCallLog(studentId, logId);
      if (res.success) {
        // Refresh local state
        setCohorts(prev => prev.map(cohort => ({
          ...cohort,
          students: cohort.students.map((s: Student) => s._id === studentId ? res.student : s)
        })));
      }
    } catch (err: any) {
      alert(err.message || 'Error verifying call log.');
    }
  };

  const handleLogCall = async (studentId: string) => {
    if (!callNotes.trim()) return;
    setLoggingCallId(studentId);
    try {
      const res = await api.cluster.addCallLog(studentId, callNotes);
      if (res.success) {
        setCallNotes('');
        // Refresh local state
        setCohorts(prev => prev.map(cohort => ({
          ...cohort,
          students: cohort.students.map((s: Student) => s._id === studentId ? res.student : s)
        })));
      }
    } catch (err: any) {
      alert(err.message || 'Error adding call log.');
    } finally {
      setLoggingCallId(null);
    }
  };

  const handleConfirmStatus = async (studentId: string, updates: { confirmedAarambh?: boolean; confirmedJklu?: boolean; notContinuing?: boolean; notComingAarambh?: boolean; confirmationNote?: string }) => {
    try {
      const res = await api.cluster.confirmStatus(studentId, updates);
      if (res.success) {
        setActiveForm(null);
        setConfirmationNotes('');
        // Refresh local state
        setCohorts(prev => prev.map(cohort => ({
          ...cohort,
          students: cohort.students.map((s: Student) => s._id === studentId ? res.student : s)
        })));
      }
    } catch (err: any) {
      alert(err.message || 'Error updating confirmation status.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader scale={0.7} label="Loading cluster head dashboard..." />
      </div>
    );
  }

  if (notPublished) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Cluster {cluster} Dashboard</h1>
          <p className="text-sm text-text-muted font-semibold mt-1">Verify student documents, log outreach calls, and record orientation decisions.</p>
        </div>
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="text-5xl">🔒</div>
          <h2 className="text-xl font-bold text-foreground">Student Lists Not Published Yet</h2>
          <p className="text-text-muted max-w-md">
            The student allocation lists have not been released by the Super Admin yet. Please wait until details are finalized.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black tracking-tight font-outfit text-foreground">Cluster {cluster} Dashboard</h1>
        <p className="text-sm text-text-muted font-semibold mt-1">Verify student documents, log outreach calls, and record orientation decisions.</p>
      </div>

      {/* Cohort list */}
      <div className="space-y-8">
        {cohorts.map((cohort) => (
          <div key={cohort.cohortName} className="glass-card overflow-hidden">
            
            {/* Cohort Header (Cohort Name & Leader Details) */}
            <div className="p-6 bg-card-bg/20 border-b border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-outfit text-foreground">Cohort {cohort.cohortName}</h2>
                <span className="text-xs text-text-muted font-bold mt-1 block">
                  Students count: {cohort.students.length} / 10
                </span>
              </div>
              
              {cohort.leader && (
                <div className="text-xs font-semibold text-text-muted space-y-1">
                  <div><span className="text-text-muted/80">Cohort Leader:</span> <span className="text-foreground font-bold">{cohort.leader.name}</span></div>
                  <div><span className="text-text-muted/80">Email:</span> <span className="text-foreground font-bold">{cohort.leader.email}</span></div>
                  <div><span className="text-text-muted/80">Phone:</span> <span className="text-foreground font-bold">{cohort.leader.phone}</span></div>
                </div>
              )}
            </div>

            {/* Students list */}
            <div className="divide-y divide-card-border">
              {cohort.students.map((student: Student) => {
                const isExpanded = selectedStudent === student._id;
                const isVerified = student.mailReceived && student.documentsVerified;

                return (
                  <div key={student._id} className="transition-all duration-200">
                    
                    {/* Student Row Click Header */}
                    <div
                      onClick={() => setSelectedStudent(isExpanded ? null : student._id)}
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-card-bg/50 transition-colors ${
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
                          <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{student.applicationNo} • {student.course}</div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2 font-bold text-[10px] uppercase self-start sm:self-auto mt-1 sm:mt-0">
                        {student.notContinuing ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-500 border border-red-500/20 font-extrabold">Not Continuing (JKLU)</span>
                        ) : student.notComingAarambh ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 border border-orange-500/20 font-extrabold">Not Coming (Aarambh)</span>
                        ) : (
                          <>
                            {isVerified ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/20">Verified</span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/20">Pending Verify</span>
                            )}
                            
                            {student.confirmedJklu ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">Registered</span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-card-bg/500/10 text-text-muted border border-slate-500/15">Pending Reg</span>
                            )}
                          </>
                        )}
                        
                        <svg className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Student Expanded Detail Panel (Progressive Workflow) */}
                    {isExpanded && (
                      <div className="p-6 bg-card-bg/25 border-t border-card-border space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          
                          {/* Student Details Info */}
                          <div className="space-y-2 text-xs font-semibold text-text-muted">
                            <h4 className="text-foreground font-extrabold text-sm mb-3">Student Demographics</h4>
                            <div><span className="text-text-muted/80">Gender:</span> <span className="text-foreground">{student.gender}</span></div>
                            <div><span className="text-text-muted/80">Mobile:</span> <span className="text-foreground">{student.mobile}</span></div>
                            <div><span className="text-text-muted/80">Email:</span> <span className="text-foreground">{student.email}</span></div>
                            <div><span className="text-text-muted/80">Father Name:</span> <span className="text-foreground">{student.fatherName}</span></div>
                            <div><span className="text-text-muted/80">Father Phone:</span> <span className="text-foreground">{student.fatherMobile}</span></div>
                            <div><span className="text-text-muted/80">Location:</span> <span className="text-foreground">{student.city}, {student.district}, {student.state}</span></div>
                          </div>

                          {/* Progressive Workflow Control Box */}
                          <div className="glass-card p-5 space-y-4 bg-background/50 border border-card-border">
                            <h4 className="text-foreground font-extrabold text-sm">Outreach Action Panel</h4>
                            {student.notContinuing ? (
                              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs space-y-1">
                                <span className="font-extrabold block">Marked as Not Continuing at JKLU</span>
                                <p className="font-normal italic">Note: &ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                                <button
                                  onClick={() => handleConfirmStatus(student._id, { notContinuing: false, confirmationNote: '' })}
                                  className="mt-3 text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
                                >
                                  Revert status
                                </button>
                              </div>
                            ) : student.notComingAarambh ? (
                              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-500 text-xs space-y-1">
                                <span className="font-extrabold block">Marked as Not Coming to Aarambh</span>
                                <p className="font-normal italic">Note: &ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                                <button
                                  onClick={() => handleConfirmStatus(student._id, { notComingAarambh: false, confirmationNote: '' })}
                                  className="mt-3 text-[10px] font-bold text-orange-500 hover:underline cursor-pointer"
                                >
                                  Revert status
                                </button>
                              </div>
                            ) : (
                              <>
                                {/* Step 1: Verification Options */}
                                {!isVerified ? (
                                  <div className="space-y-3">
                                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 text-[10px] font-bold">
                                      STEP 1: Complete Verification to unlock Call Logging and Confirmations.
                                    </div>
                                    <label className="flex items-center gap-3 text-xs font-semibold text-foreground cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={student.mailReceived}
                                        onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'mail', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-card-border"
                                      />
                                      Verification Mail Received?
                                    </label>
                                    <label className="flex items-center gap-3 text-xs font-semibold text-foreground cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={student.documentsVerified}
                                        onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'docs', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-card-border"
                                      />
                                      All attached documents verified & confirmed?
                                    </label>
                                  </div>
                                ) : (
                                  /* Verification Success & Step 2/3 */
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold rounded-2xl">
                                      <span>✅</span>
                                      <span>Document Verification Completed</span>
                                    </div>
 
                                    {(!activeForm || activeForm.studentId !== student._id) ? (
                                      <div className="space-y-2">
                                        <button
                                          onClick={() => {
                                            setActiveForm({ studentId: student._id, type: 'aarambh' });
                                            setConfirmationNotes('');
                                          }}
                                          className="w-full py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                                        >
                                          Student is Not Coming to Aarambh
                                        </button>
                                        <button
                                          onClick={() => {
                                            setActiveForm({ studentId: student._id, type: 'jklu' });
                                            setConfirmationNotes('');
                                          }}
                                          className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                                        >
                                          Student is Not Continuing at JKLU
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="space-y-2 pt-2 border-t border-card-border">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase">
                                          Specify Reason ({activeForm.type === 'aarambh' ? 'Not Coming to Aarambh' : 'Not Continuing at JKLU'})
                                        </label>
                                        <textarea
                                          value={confirmationNotes}
                                          onChange={(e) => setConfirmationNotes(e.target.value)}
                                          placeholder={activeForm.type === 'aarambh' ? 'Enter reasons why student is not coming to Aarambh...' : 'Enter reasons why student is not continuing at JKLU...'}
                                          className="w-full px-3 py-2 bg-background/50 border border-card-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                                          rows={2}
                                        />
                                        <div className="flex gap-2 justify-end">
                                          <button
                                            onClick={() => setActiveForm(null)}
                                            className="px-3 py-1 text-[10px] font-bold text-text-muted border border-card-border rounded-lg bg-card-bg cursor-pointer"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={() => {
                                              if (activeForm.type === 'aarambh') {
                                                handleConfirmStatus(student._id, { notComingAarambh: true, confirmationNote: confirmationNotes });
                                              } else {
                                                handleConfirmStatus(student._id, { notContinuing: true, confirmationNote: confirmationNotes });
                                              }
                                            }}
                                            className="px-3 py-1 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
 
                        {/* Call Logging Details (Only if Verified) */}
                        {isVerified && !student.notContinuing && !student.notComingAarambh && (
                          <div className="pt-6 border-t border-card-border grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Log call form */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Log Outreach Call</h5>
                              <textarea
                                value={callNotes}
                                onChange={(e) => setCallNotes(e.target.value)}
                                placeholder="Enter outreach conversation notes..."
                                className="w-full px-4 py-3 bg-background/50 border border-card-border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
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

                            {/* Call logs list history */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Call History ({student.callLogs.length})</h5>
                              <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin">
                                {student.callLogs.map((log) => (
                                  <div key={log._id} className="p-3 bg-background/50 border border-card-border rounded-2xl text-xs space-y-1.5">
                                    <p className="text-foreground font-semibold leading-relaxed">{log.notes}</p>
                                    <div className="flex justify-between items-center text-[10px] text-text-muted font-bold mt-2">
                                      <div>
                                        <span>By: {log.loggedByName}</span>
                                        <span className="mx-1.5">•</span>
                                        <span>{new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString()}</span>
                                      </div>
                                      
                                      {!log.verified ? (
                                        <button
                                          onClick={() => handleVerifyCallLog(student._id, log._id)}
                                          className="px-2.5 py-0.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold cursor-pointer transition-all"
                                        >
                                          Verify Log
                                        </button>
                                      ) : (
                                        <span className="text-emerald-600 font-extrabold">✓ Verified</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {student.callLogs.length === 0 && (
                                  <div className="text-xs text-text-muted italic">No outreach calls logged yet.</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {cohort.students.length === 0 && (
                <div className="p-6 text-center text-text-muted font-bold text-xs">No students allocated to this cohort yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
