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
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Cluster Head</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cluster {cluster}</h1>
          <p className="text-sm text-text-muted mt-1">Verify student documents, log outreach calls, and record orientation decisions.</p>
        </div>
        <div className="glass-card p-14 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-card-border/30 flex items-center justify-center text-3xl">🔒</div>
          <h2 className="text-lg font-bold text-foreground">Student Lists Not Published Yet</h2>
          <p className="text-text-muted max-w-md text-sm leading-relaxed">
            The student allocation lists have not been released by the Super Admin yet. Please wait until details are finalized.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Cluster Head View</p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Cluster {cluster}</h1>
        <p className="text-sm text-text-muted mt-1.5">Verify student documents, log outreach calls, and record orientation decisions.</p>
      </div>

      {/* Cohort list */}
      <div className="space-y-6">
        {cohorts.map((cohort) => {
          const cohortTotal = cohort.students.length;
          const cohortReg = cohort.students.filter((s: any) => s.confirmedJklu).length;
          const cohortVerified = cohort.students.filter((s: any) => s.mailReceived && s.documentsVerified).length;
          const cohortPct = cohortTotal ? Math.round((cohortReg / cohortTotal) * 100) : 0;

          return (
            <div key={cohort.cohortName} className="glass-card overflow-hidden">
              
              {/* Cohort Header */}
              <div className="px-6 py-5 border-b border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <h2 className="text-base font-bold text-foreground">Cohort {cohort.cohortName}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span>{cohortTotal} students</span>
                    <span className="text-card-border">·</span>
                    <span className="text-emerald-600 font-medium">{cohortReg} registered</span>
                    <span className="text-card-border">·</span>
                    <span className="text-indigo-600 font-medium">{cohortVerified} verified</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-28 bg-card-border/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${cohortPct}%` }}></div>
                    </div>
                    <span className="text-[10px] font-semibold text-text-muted">{cohortPct}% reg</span>
                  </div>
                </div>
                
                {cohort.leader && (
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-card-border">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary text-sm">
                      {cohort.leader.name.charAt(0)}
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-foreground">{cohort.leader.name}</p>
                      <p className="text-text-muted">{cohort.leader.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Students list */}
              <div className="divide-y divide-card-border">
                {cohort.students.map((student: any) => {
                  const isExpanded = selectedStudent === student._id;
                  const isVerified = student.mailReceived && student.documentsVerified;
                  const initial = student.name.charAt(0).toUpperCase();

                  return (
                    <div key={student._id} className="transition-all duration-200">
                      
                      {/* Student Row */}
                      <div
                        onClick={() => setSelectedStudent(isExpanded ? null : student._id)}
                        className={`px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:bg-background/40 transition-colors ${
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

                        {/* Status Badges */}
                        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto ml-12 md:ml-0">
                          {student.notContinuing ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-semibold border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                              Not Continuing
                            </span>
                          ) : student.notComingAarambh ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-semibold border border-orange-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                              Not Coming (Aarambh)
                            </span>
                          ) : (
                            <>
                              {isVerified ? (
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

                      {/* Student Expanded Panel */}
                      {isExpanded && (
                        <div className="px-6 py-6 bg-background/40 border-t border-card-border space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            
                            {/* Student Info */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Student Demographics</h4>
                              <div className="space-y-2.5">
                                {[
                                  { label: 'Gender', value: student.gender },
                                  { label: 'Mobile', value: student.mobile },
                                  { label: 'Email', value: student.email },
                                  { label: 'Father', value: student.fatherName },
                                  { label: 'F.Phone', value: student.fatherMobile },
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

                            {/* Outreach Action Panel */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">Outreach Action Panel</h4>
                              <div className="p-4 bg-card-bg border border-card-border rounded-xl space-y-3">
                                {student.notContinuing ? (
                                  <div className="space-y-2">
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                      <p className="text-xs font-bold text-red-600">Marked as Not Continuing at JKLU</p>
                                      <p className="text-sm text-red-700 italic mt-1">&ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                                    </div>
                                    <button
                                      onClick={() => handleConfirmStatus(student._id, { notContinuing: false, confirmationNote: '' })}
                                      className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    >
                                      Revert status
                                    </button>
                                  </div>
                                ) : student.notComingAarambh ? (
                                  <div className="space-y-2">
                                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                      <p className="text-xs font-bold text-orange-600">Marked as Not Coming to Aarambh</p>
                                      <p className="text-sm text-orange-700 italic mt-1">&ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                                    </div>
                                    <button
                                      onClick={() => handleConfirmStatus(student._id, { notComingAarambh: false, confirmationNote: '' })}
                                      className="text-xs font-semibold text-orange-500 hover:text-orange-700 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    >
                                      Revert status
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    {!isVerified ? (
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                                          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <p className="text-xs font-semibold text-amber-700">Complete verification to unlock call logging</p>
                                        </div>
                                        <label className="flex items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={student.mailReceived}
                                            onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'mail', e.target.checked)}
                                            className="w-4 h-4 rounded text-primary focus:ring-primary border-card-border"
                                          />
                                          Verification Mail Received
                                        </label>
                                        <label className="flex items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={student.documentsVerified}
                                            onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'docs', e.target.checked)}
                                            className="w-4 h-4 rounded text-primary focus:ring-primary border-card-border"
                                          />
                                          All documents verified &amp; confirmed
                                        </label>
                                      </div>
                                    ) : (
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg">
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                          <span className="text-xs font-semibold">Document Verification Completed</span>
                                        </div>

                                        {(!activeForm || activeForm.studentId !== student._id) ? (
                                          <div className="space-y-2">
                                            <button
                                              onClick={() => { setActiveForm({ studentId: student._id, type: 'aarambh' }); setConfirmationNotes(''); }}
                                              className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                            >
                                              Student is Not Coming to Aarambh
                                            </button>
                                            <button
                                              onClick={() => { setActiveForm({ studentId: student._id, type: 'jklu' }); setConfirmationNotes(''); }}
                                              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                            >
                                              Student is Not Continuing at JKLU
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-2.5 pt-2 border-t border-card-border">
                                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">
                                              Reason ({activeForm.type === 'aarambh' ? 'Not Coming to Aarambh' : 'Not Continuing at JKLU'})
                                            </label>
                                            <textarea
                                              value={confirmationNotes}
                                              onChange={(e) => setConfirmationNotes(e.target.value)}
                                              placeholder={activeForm.type === 'aarambh' ? 'Why is student not coming to Aarambh?' : 'Why is student not continuing at JKLU?'}
                                              className="w-full px-3 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground resize-none"
                                              rows={2}
                                            />
                                            <div className="flex gap-2 justify-end">
                                              <button
                                                onClick={() => setActiveForm(null)}
                                                className="px-4 py-1.5 text-xs font-semibold text-text-muted border border-card-border rounded-lg bg-card-bg cursor-pointer hover:bg-background transition-colors"
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
                                                className="px-4 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg cursor-pointer transition-colors"
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
                          </div>
 
                          {/* Call Logging (Only if Verified) */}
                          {isVerified && !student.notContinuing && !student.notComingAarambh && (
                            <div className="pt-5 border-t border-card-border grid grid-cols-1 md:grid-cols-2 gap-6">
                              
                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-text-muted uppercase tracking-widest">Log Outreach Call</h5>
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

                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-text-muted uppercase tracking-widest">Call History <span className="text-primary">({student.callLogs.length})</span></h5>
                                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                                  {student.callLogs.map((log: any) => (
                                    <div key={log._id} className="p-3.5 bg-card-bg border border-card-border rounded-xl space-y-2">
                                      <p className="text-sm text-foreground leading-relaxed">{log.notes}</p>
                                      <div className="flex justify-between items-center text-xs">
                                        <div className="text-text-muted">
                                          <span>By <span className="font-medium text-foreground">{log.loggedByName}</span></span>
                                          <span className="mx-1.5">·</span>
                                          <span>{new Date(log.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        
                                        {!log.verified ? (
                                          <button
                                            onClick={() => handleVerifyCallLog(student._id, log._id)}
                                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                                          >
                                            Verify Log
                                          </button>
                                        ) : (
                                          <span className="text-emerald-600 font-semibold text-[10px] flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            Verified
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {student.callLogs.length === 0 && (
                                    <div className="text-sm text-text-muted italic py-2">No outreach calls logged yet.</div>
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
                  <div className="py-12 text-center">
                    <p className="text-text-muted text-sm">No students allocated to this cohort yet.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
