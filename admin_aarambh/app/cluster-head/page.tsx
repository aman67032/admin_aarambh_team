'use client';

import React, { useEffect, useState } from 'react';
import { api, Student } from '../lib/api';

export default function ClusterHeadDashboard() {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [cluster, setCluster] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  
  // Call logging form state
  const [callNotes, setCallNotes] = useState<string>('');
  const [loggingCallId, setLoggingCallId] = useState<string | null>(null);
  
  // Confirmation state
  const [notContinuingNotes, setNotContinuingNotes] = useState<string>('');
  const [showNotContinuingForm, setShowNotContinuingForm] = useState<string | null>(null);

  const fetchCohortData = async () => {
    try {
      const data = await api.cluster.getCohorts();
      setCohorts(data.cohorts);
      setCluster(data.cluster);
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

  const handleConfirmStatus = async (studentId: string, updates: { confirmedAarambh?: boolean; confirmedJklu?: boolean; notContinuing?: boolean; confirmationNote?: string }) => {
    try {
      const res = await api.cluster.confirmStatus(studentId, updates);
      if (res.success) {
        setShowNotContinuingForm(null);
        setNotContinuingNotes('');
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
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
        <div className="space-y-6">
          <div className="h-48 bg-slate-200 rounded-3xl"></div>
          <div className="h-48 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Cluster {cluster} Dashboard</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">Verify student documents, log outreach calls, and record orientation decisions.</p>
      </div>

      {/* Cohort list */}
      <div className="space-y-8">
        {cohorts.map((cohort) => (
          <div key={cohort.cohortName} className="glass-card overflow-hidden">
            
            {/* Cohort Header (Cohort Name & Leader Details) */}
            <div className="p-6 bg-slate-50 border-b border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-outfit text-slate-800">Cohort {cohort.cohortName}</h2>
                <span className="text-xs text-text-muted font-bold mt-1 block">
                  Students count: {cohort.students.length} / 10
                </span>
              </div>
              
              {cohort.leader && (
                <div className="text-xs font-semibold text-slate-500 space-y-1">
                  <div><span className="text-slate-400">Cohort Leader:</span> <span className="text-slate-800">{cohort.leader.name}</span></div>
                  <div><span className="text-slate-400">Email:</span> <span className="text-slate-800">{cohort.leader.email}</span></div>
                  <div><span className="text-slate-400">Phone:</span> <span className="text-slate-800">{cohort.leader.phone}</span></div>
                </div>
              )}
            </div>

            {/* Students list */}
            <div className="divide-y divide-slate-100">
              {cohort.students.map((student: Student) => {
                const isExpanded = selectedStudent === student._id;
                const isVerified = student.mailReceived && student.documentsVerified;

                return (
                  <div key={student._id} className="transition-all duration-200">
                    
                    {/* Student Row Click Header */}
                    <div
                      onClick={() => setSelectedStudent(isExpanded ? null : student._id)}
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors ${
                        student.notContinuing ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-800 text-sm">{student.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{student.applicationNo} • {student.course}</div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2 font-bold text-[10px] uppercase self-start sm:self-auto mt-1 sm:mt-0">
                        {student.notContinuing ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">Not Continuing</span>
                        ) : (
                          <>
                            {isVerified ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Verified</span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending Verify</span>
                            )}
                            
                            {student.confirmedAarambh && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Confirmed Aarambh</span>
                            )}

                            {student.confirmedJklu && (
                              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700">Confirmed JKLU</span>
                            )}
                          </>
                        )}
                        
                        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Student Expanded Detail Panel (Progressive Workflow) */}
                    {isExpanded && (
                      <div className="p-6 bg-slate-50/30 border-t border-slate-50 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          
                          {/* Student Details Info */}
                          <div className="space-y-2 text-xs font-semibold text-slate-500">
                            <h4 className="text-slate-800 font-extrabold text-sm mb-3">Student Demographics</h4>
                            <div><span className="text-slate-400">Gender:</span> <span className="text-slate-800">{student.gender}</span></div>
                            <div><span className="text-slate-400">Mobile:</span> <span className="text-slate-800">{student.mobile}</span></div>
                            <div><span className="text-slate-400">Email:</span> <span className="text-slate-800">{student.email}</span></div>
                            <div><span className="text-slate-400">Father Name:</span> <span className="text-slate-800">{student.fatherName}</span></div>
                            <div><span className="text-slate-400">Father Phone:</span> <span className="text-slate-800">{student.fatherMobile}</span></div>
                            <div><span className="text-slate-400">Location:</span> <span className="text-slate-800">{student.city}, {student.district}, {student.state}</span></div>
                          </div>

                          {/* Progressive Workflow Control Box */}
                          <div className="glass-card p-5 space-y-4">
                            <h4 className="text-slate-800 font-extrabold text-sm">Outreach Action panel</h4>

                            {student.notContinuing ? (
                              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-800 text-xs space-y-1">
                                <span className="font-extrabold block">Marked as Not Continuing</span>
                                <p className="font-normal italic">Note: &ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                                <button
                                  onClick={() => handleConfirmStatus(student._id, { notContinuing: false, confirmationNote: '' })}
                                  className="mt-3 text-[10px] font-bold text-red-700 hover:underline cursor-pointer"
                                >
                                  Revert status
                                </button>
                              </div>
                            ) : (
                              <>
                                {/* Step 1: Verification Options */}
                                {!isVerified ? (
                                  <div className="space-y-3">
                                    <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-2xl text-amber-800 text-[10px] font-bold">
                                      STEP 1: Complete Verification to unlock Call Logging and Confirmations.
                                    </div>
                                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={student.mailReceived}
                                        onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'mail', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
                                      />
                                      Verification Mail Received?
                                    </label>
                                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={student.documentsVerified}
                                        onChange={(e) => handleVerifyDocs(student._id, student.mailReceived, student.documentsVerified, 'docs', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
                                      />
                                      All attached documents verified & confirmed?
                                    </label>
                                  </div>
                                ) : (
                                  /* Verification Success & Step 2/3 */
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl">
                                      <span>✅</span>
                                      <span>Document Verification Completed</span>
                                    </div>

                                    {/* Confirmation Buttons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      <button
                                        onClick={() => handleConfirmStatus(student._id, { confirmedAarambh: !student.confirmedAarambh })}
                                        className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                                          student.confirmedAarambh
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                      >
                                        {student.confirmedAarambh ? '✓ Aarambh Confirmed' : 'Confirm Aarambh'}
                                      </button>

                                      <button
                                        onClick={() => handleConfirmStatus(student._id, { confirmedJklu: !student.confirmedJklu })}
                                        className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                                          student.confirmedJklu
                                            ? 'bg-teal-600 border-teal-600 text-white'
                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                      >
                                        {student.confirmedJklu ? '✓ JKLU Confirmed' : 'Confirm JKLU'}
                                      </button>
                                    </div>

                                    {/* Not Continuing button */}
                                    {showNotContinuingForm !== student._id ? (
                                      <button
                                        onClick={() => setShowNotContinuingForm(student._id)}
                                        className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                                      >
                                        Student is Not Continuing at JKLU
                                      </button>
                                    ) : (
                                      <div className="space-y-2 pt-2 border-t border-slate-100">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Specify Reason</label>
                                        <textarea
                                          value={notContinuingNotes}
                                          onChange={(e) => setNotContinuingNotes(e.target.value)}
                                          placeholder="Enter reasons why student is not continuing..."
                                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-900"
                                          rows={2}
                                        />
                                        <div className="flex gap-2 justify-end">
                                          <button
                                            onClick={() => setShowNotContinuingForm(null)}
                                            className="px-3 py-1 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-lg bg-white"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={() => handleConfirmStatus(student._id, { notContinuing: true, confirmationNote: notContinuingNotes })}
                                            className="px-3 py-1 text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
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
                        {isVerified && !student.notContinuing && (
                          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Log call form */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Log Outreach Call</h5>
                              <textarea
                                value={callNotes}
                                onChange={(e) => setCallNotes(e.target.value)}
                                placeholder="Enter outreach conversation notes..."
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                                rows={3}
                              />
                              <button
                                onClick={() => handleLogCall(student._id)}
                                disabled={loggingCallId === student._id || !callNotes.trim()}
                                className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer ${
                                  callNotes.trim() ? 'bg-primary hover:bg-primary-hover shadow-indigo-100' : 'bg-slate-300 shadow-none cursor-not-allowed'
                                }`}
                              >
                                {loggingCallId === student._id ? 'Logging...' : 'Save Call Entry'}
                              </button>
                            </div>

                            {/* Call logs list history */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Call History ({student.callLogs.length})</h5>
                              <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
                                {student.callLogs.map((log) => (
                                  <div key={log._id} className="p-3 bg-white border border-slate-100 rounded-2xl text-xs space-y-1.5">
                                    <p className="text-slate-700 font-semibold leading-relaxed">{log.notes}</p>
                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mt-2">
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
                                  <div className="text-xs text-slate-400 italic">No outreach calls logged yet.</div>
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
                <div className="p-6 text-center text-slate-400 font-bold text-xs">No students allocated to this cohort yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
