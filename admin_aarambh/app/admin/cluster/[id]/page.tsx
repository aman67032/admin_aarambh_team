'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api, Student } from '../../../lib/api';
import Loader from '../../../components/Loader';

export default function AdminClusterDetailPage() {
  const params = useParams();
  const clusterId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cluster, setCluster] = useState<string>('');
  const [clusterHead, setClusterHead] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [cohorts, setCohorts] = useState<Array<{
    cohortName: string;
    leader: { id: string; name: string; email: string; phone: string } | null;
    students: Student[];
  }>>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.admin.getClusterDetails(clusterId);
        setCluster(data.cluster);
        setClusterHead(data.clusterHead);
        setCohorts(data.cohorts);
      } catch (err: any) {
        console.error('Failed to fetch cluster details:', err);
        setError(err.message || 'Failed to load cluster details.');
      } finally {
        setLoading(false);
      }
    };
    if (clusterId) fetchData();
  }, [clusterId]);

  // Compute summary stats
  const allStudents = cohorts.flatMap(c => c.students);
  const totalStudents = allStudents.length;
  const verifiedCount = allStudents.filter(s => s.mailReceived && s.documentsVerified).length;
  const callsLogged = allStudents.reduce((sum, s) => sum + (s.callLogs?.length || 0), 0);
  const confirmedAarambhCount = allStudents.filter(s => s.confirmedAarambh).length;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader scale={0.7} label="Loading cluster details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Admin Dashboard
        </Link>
        <div className="glass-card p-8 text-center space-y-3">
          <div className="text-red-500 font-extrabold text-lg">Error Loading Cluster</div>
          <p className="text-sm text-text-muted font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Link & Header */}
      <div>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Admin Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Cluster {cluster} Dashboard</h1>
        {clusterHead && (
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-semibold text-text-muted">
            <span><span className="text-text-muted">Cluster Head:</span> <span className="text-foreground">{clusterHead.name}</span></span>
            <span className="text-text-muted/60">•</span>
            <span><span className="text-text-muted">Email:</span> <span className="text-foreground">{clusterHead.email}</span></span>
            <span className="text-text-muted/60">•</span>
            <span><span className="text-text-muted">Phone:</span> <span className="text-foreground">{clusterHead.phone}</span></span>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Students</span>
          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{totalStudents}</div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Verified (Doc Check)</span>
          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">
            {verifiedCount} <span className="text-sm font-semibold text-text-muted">({totalStudents > 0 ? Math.round((verifiedCount / totalStudents) * 100) : 0}%)</span>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Calls Logged</span>
          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{callsLogged}</div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmed Aarambh</span>
          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2 text-emerald-600">
            {confirmedAarambhCount} <span className="text-sm font-semibold text-text-muted">({totalStudents > 0 ? Math.round((confirmedAarambhCount / totalStudents) * 100) : 0}%)</span>
          </div>
        </div>
      </div>

      {/* Cohort Cards */}
      <div className="space-y-8">
        {cohorts.map((cohort) => (
          <div key={cohort.cohortName} className="glass-card overflow-hidden">

            {/* Cohort Header */}
            <div className="p-6 bg-card-bg/50 border-b border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-outfit text-foreground">Cohort {cohort.cohortName}</h2>
                <span className="text-xs text-text-muted font-bold mt-1 block">
                  Students count: {cohort.students.length} / 10
                </span>
              </div>

              {cohort.leader && (
                <div className="text-xs font-semibold text-text-muted space-y-1">
                  <div><span className="text-text-muted">Cohort Leader:</span> <span className="text-foreground">{cohort.leader.name}</span></div>
                  <div><span className="text-text-muted">Email:</span> <span className="text-foreground">{cohort.leader.email}</span></div>
                  <div><span className="text-text-muted">Phone:</span> <span className="text-foreground">{cohort.leader.phone}</span></div>
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
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-card-bg/50/50 transition-colors ${
                        student.notContinuing ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center font-bold text-text-muted text-xs shrink-0">
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

                        <svg className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Student Expanded Detail Panel (Read-Only) */}
                    {isExpanded && (
                      <div className="p-6 bg-card-bg/50/30 border-t border-slate-50 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                          {/* Student Demographics */}
                          <div className="space-y-2 text-xs font-semibold text-text-muted">
                            <h4 className="text-foreground font-extrabold text-sm mb-3">Student Demographics</h4>
                            <div><span className="text-text-muted">Gender:</span> <span className="text-foreground">{student.gender}</span></div>
                            <div><span className="text-text-muted">Mobile:</span> <span className="text-foreground">{student.mobile}</span></div>
                            <div><span className="text-text-muted">Email:</span> <span className="text-foreground">{student.email}</span></div>
                            <div className="flex items-center gap-1.5"><span className="text-text-muted">Arrival Code:</span> <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-black font-mono tracking-wider text-[11px]">{student.arrivalCode || 'N/A'}</span></div>
                            <div><span className="text-text-muted">Father Name:</span> <span className="text-foreground">{student.fatherName}</span></div>
                            <div><span className="text-text-muted">Father Phone:</span> <span className="text-foreground">{student.fatherMobile}</span></div>
                            <div><span className="text-text-muted">Location:</span> <span className="text-foreground">{student.city}, {student.district}, {student.state}</span></div>
                          </div>

                          {/* Status Summary (Read-Only) */}
                          <div className="glass-card p-5 space-y-4">
                            <h4 className="text-foreground font-extrabold text-sm">Status Overview</h4>

                            {student.notContinuing ? (
                              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-800 text-xs space-y-1">
                                <span className="font-extrabold block">Marked as Not Continuing</span>
                                <p className="font-normal italic">Note: &ldquo;{student.confirmationNote || 'No explanation provided.'}&rdquo;</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {/* Verification Status */}
                                <div className={`flex items-center gap-2 p-3 text-xs font-bold rounded-2xl ${
                                  isVerified
                                    ? 'bg-emerald-50 text-emerald-800'
                                    : 'bg-amber-50 text-amber-800'
                                }`}>
                                  <span>{isVerified ? '✅' : '⏳'}</span>
                                  <span>{isVerified ? 'Document Verification Completed' : 'Pending Document Verification'}</span>
                                </div>

                                {/* Verification Detail */}
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className={`p-2 rounded-xl text-center font-bold ${
                                    student.mailReceived ? 'bg-emerald-50 text-emerald-700' : 'bg-card-bg/50 text-text-muted'
                                  }`}>
                                    {student.mailReceived ? '✓' : '✗'} Mail Received
                                  </div>
                                  <div className={`p-2 rounded-xl text-center font-bold ${
                                    student.documentsVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-card-bg/50 text-text-muted'
                                  }`}>
                                    {student.documentsVerified ? '✓' : '✗'} Docs Verified
                                  </div>
                                </div>

                                {/* Confirmation Status */}
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className={`p-2 rounded-xl text-center font-bold ${
                                    student.confirmedAarambh ? 'bg-indigo-50 text-indigo-700' : 'bg-card-bg/50 text-text-muted'
                                  }`}>
                                    {student.confirmedAarambh ? '✓ Aarambh Confirmed' : '- Aarambh Pending'}
                                  </div>
                                  <div className={`p-2 rounded-xl text-center font-bold ${
                                    student.confirmedJklu ? 'bg-teal-50 text-teal-700' : 'bg-card-bg/50 text-text-muted'
                                  }`}>
                                    {student.confirmedJklu ? '✓ JKLU Confirmed' : '- JKLU Pending'}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Call History (Read-Only) */}
                        <div className="pt-6 border-t border-card-border/60">
                          <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Call History ({student.callLogs?.length || 0})</h5>
                          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                            {student.callLogs?.map((log) => (
                              <div key={log._id} className="p-3 bg-white border border-card-border/60 rounded-2xl text-xs space-y-1.5">
                                <p className="text-foreground font-semibold leading-relaxed">{log.notes}</p>
                                <div className="flex justify-between items-center text-[10px] text-text-muted font-bold mt-2">
                                  <div>
                                    <span>By: {log.loggedByName}</span>
                                    <span className="mx-1.5">•</span>
                                    <span>{new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString()}</span>
                                  </div>
                                  {log.verified ? (
                                    <span className="text-emerald-600 font-extrabold">✓ Verified</span>
                                  ) : (
                                    <span className="text-amber-500 font-extrabold">Unverified</span>
                                  )}
                                </div>
                              </div>
                            ))}
                            {(!student.callLogs || student.callLogs.length === 0) && (
                              <div className="text-xs text-text-muted italic">No outreach calls logged yet.</div>
                            )}
                          </div>
                        </div>
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
