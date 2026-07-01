'use client';

import AuroraBackground from '../components/AuroraBackground';
import Loader from '../components/Loader';
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

interface StudentInfo {
  _id: string;
  name: string;
  applicationNo: string;
  course: string;
  cohort: string;
  cluster: string;
  confirmedJklu: boolean;
  confirmedAarambh: boolean;
  documentsVerified: boolean;
  notContinuing: boolean;
  notComingAarambh: boolean;
}

interface CohortInfo {
  cohortName: string;
  leaderName: string;
  students: StudentInfo[];
}

interface ClusterInfo {
  clusterName: string;
  head: string | null;
  cohorts: CohortInfo[];
}

const StatusDot = ({ color }: { color: string }) => (
  <span className={`inline-block w-1.5 h-1.5 rounded-full ${color} mr-1`} />
);

export default function CohortRegistrationsPage() {
  const { user } = useApp();
  const [data, setData] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notPublished, setNotPublished] = useState(false);
  const [expandedCohorts, setExpandedCohorts] = useState<Record<string, boolean>>({});
  const [activeView, setActiveView] = useState<'clusters' | 'leaderboard'>('clusters');

  const getBackLink = () => {
    if (!user) return { href: '/', label: 'Back to Home' };
    switch (user.role) {
      case 'super_admin': return { href: '/super-admin', label: 'Super Admin' };
      case 'admin': return { href: '/admin', label: 'Admin' };
      case 'cluster_head': return { href: '/cluster-head', label: 'Cluster Head' };
      case 'cohort_leader': return { href: '/cohort-leader', label: 'Cohort Leader' };
      default: return { href: '/', label: 'Home' };
    }
  };

  const backLink = getBackLink();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch('/api/status/cohort-registrations');
        if (res.ok) {
          const result = await res.json();
          let allocationsList: ClusterInfo[] = [];
          if (result && typeof result === 'object' && 'allocations' in result) {
            allocationsList = result.allocations;
            setData(result.allocations);
            setNotPublished(!!result.notPublished);
          } else {
            allocationsList = result;
            setData(result);
          }
          const initialExpanded: Record<string, boolean> = {};
          allocationsList.forEach((cluster: ClusterInfo) => {
            cluster.cohorts.forEach((cohort) => {
              initialExpanded[cohort.cohortName] = true;
            });
          });
          setExpandedCohorts(initialExpanded);
        }
      } catch (err) {
        console.error('Error fetching registrations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const toggleCohort = (cohortName: string) => {
    setExpandedCohorts(prev => ({ ...prev, [cohortName]: !prev[cohortName] }));
  };

  const collapseAll = () => {
    const collapsed: Record<string, boolean> = {};
    data.forEach(cl => cl.cohorts.forEach(co => { collapsed[co.cohortName] = false; }));
    setExpandedCohorts(collapsed);
  };
  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    data.forEach(cl => cl.cohorts.forEach(co => { expanded[co.cohortName] = true; }));
    setExpandedCohorts(expanded);
  };

  // Grand metrics
  const grandStats = useMemo(() => {
    let total = 0, registered = 0, verified = 0, notContinuing = 0, notComing = 0;
    data.forEach(cl => cl.cohorts.forEach(co => {
      co.students.forEach(s => {
        total++;
        if (s.confirmedJklu) registered++;
        if (s.documentsVerified) verified++;
        if (s.notContinuing) notContinuing++;
        if (s.notComingAarambh) notComing++;
      });
    }));
    return { total, registered, verified, notContinuing, notComing, pending: total - registered - notContinuing - notComing };
  }, [data]);

  const cohortsRanked = useMemo(() => {
    const list: Array<{
      cohortName: string; leaderName: string; clusterName: string;
      total: number; registered: number; verified: number; normalizedScore: number;
    }> = [];
    data.forEach(cluster => {
      cluster.cohorts.forEach(cohort => {
        const total = cohort.students.length;
        const registered = cohort.students.filter(s => s.confirmedJklu).length;
        const verified = cohort.students.filter(s => s.documentsVerified).length;
        const normalizedScore = total > 0 ? (registered / (total + 2)) * 100 : 0;
        list.push({ cohortName: cohort.cohortName, leaderName: cohort.leaderName, clusterName: cluster.clusterName, total, registered, verified, normalizedScore });
      });
    });
    return list.sort((a, b) => {
      if (b.normalizedScore !== a.normalizedScore) return b.normalizedScore - a.normalizedScore;
      if (b.registered !== a.registered) return b.registered - a.registered;
      return a.cohortName.localeCompare(b.cohortName);
    });
  }, [data]);

  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return data;
    return data.map(cluster => {
      const filteredCohorts = cluster.cohorts.map(cohort => {
        const isCohortMatch = cohort.cohortName.toLowerCase().includes(q) || cohort.leaderName.toLowerCase().includes(q);
        const filteredStudents = isCohortMatch ? cohort.students : cohort.students.filter(s =>
          s.name.toLowerCase().includes(q) || s.applicationNo.toLowerCase().includes(q)
        );
        return { ...cohort, students: filteredStudents };
      }).filter(cohort => cohort.students.length > 0);
      return { ...cluster, cohorts: filteredCohorts };
    }).filter(cluster => cluster.cohorts.length > 0);
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground relative overflow-hidden">
      <AuroraBackground />

      {/* ── Header ── */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-card-border z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 h-15 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/JKLU Logo.svg" alt="JKLU" className="h-10 object-contain" />
            <div className="w-px h-5 bg-card-border" />
            <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh" className="h-14 object-contain" />
          </Link>

          <div className="flex items-center gap-2">
            <Link href={backLink.href} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-text-muted hover:text-foreground bg-background hover:bg-card-bg border border-card-border rounded-full transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {backLink.label}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10 flex-1 w-full space-y-8 relative z-10">

        {/* ── Page Hero ── */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
            <span>Aarambh &apos;26</span>
            <span>›</span>
            <span className="text-primary font-semibold">Registration Tracker</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cohort Registration Tracker</h1>
          <p className="text-sm text-text-muted">Live student confirmation status across all clusters and cohorts.</p>
        </div>

        {/* ── Stats Row ── */}
        {!loading && !notPublished && grandStats.total > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Allocated', value: grandStats.total, icon: '👥', accent: 'bg-slate-100 text-slate-600', num: 'text-foreground' },
              { label: 'Registered', value: grandStats.registered, icon: '✅', accent: 'bg-emerald-100 text-emerald-600', num: 'text-emerald-600' },
              { label: 'Docs Verified', value: grandStats.verified, icon: '📄', accent: 'bg-indigo-100 text-indigo-600', num: 'text-indigo-600' },
              { label: 'Not Continuing', value: grandStats.notContinuing + grandStats.notComing, icon: '⚠️', accent: 'bg-red-100 text-red-500', num: 'text-red-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-white border border-card-border rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${stat.accent}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className={`text-2xl font-bold leading-none ${stat.num}`}>{stat.value}</div>
                  <div className="text-[11px] text-text-muted font-medium mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── View Tabs + Search ── */}
        {!loading && !notPublished && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-card-bg border border-card-border rounded-xl p-1 self-start">
              <button
                onClick={() => setActiveView('clusters')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeView === 'clusters' ? 'bg-white text-foreground shadow-sm border border-card-border' : 'text-text-muted hover:text-foreground'}`}
              >
                By Cluster
              </button>
              <button
                onClick={() => setActiveView('leaderboard')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeView === 'leaderboard' ? 'bg-white text-foreground shadow-sm border border-card-border' : 'text-text-muted hover:text-foreground'}`}
              >
                🏆 Leaderboard
              </button>
            </div>

            <div className="flex items-center gap-2">
              {activeView === 'clusters' && (
                <div className="flex gap-1">
                  <button onClick={expandAll} className="px-3 py-1.5 text-[11px] font-semibold text-text-muted hover:text-foreground bg-background border border-card-border rounded-lg transition-all cursor-pointer">Expand All</button>
                  <button onClick={collapseAll} className="px-3 py-1.5 text-[11px] font-semibold text-text-muted hover:text-foreground bg-background border border-card-border rounded-lg transition-all cursor-pointer">Collapse All</button>
                </div>
              )}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, cohort, leader..."
                  className="pl-9 pr-8 py-2 bg-white border border-card-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground w-60 shadow-sm"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader scale={0.6} label="Loading registration data..." />
          </div>
        ) : notPublished && (!user || user.role !== 'super_admin') ? (
          <div className="bg-white border border-card-border rounded-3xl p-16 text-center flex flex-col items-center gap-5 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">🔒</div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Not Published Yet</h2>
              <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
                Student allocation lists haven&apos;t been released by the Super Admin yet. Please check back later.
              </p>
            </div>
          </div>
        ) : activeView === 'leaderboard' ? (
          /* ── LEADERBOARD VIEW ── */
          <div className="space-y-3">
            <div className="bg-white border border-card-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 border-b border-card-border bg-card-bg/50 grid grid-cols-12 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <span className="col-span-1 text-center">Rank</span>
                <span className="col-span-5">Cohort · Leader</span>
                <span className="col-span-2 text-center">Cluster</span>
                <span className="col-span-2 text-center text-emerald-600">Registered</span>
                <span className="col-span-2 text-center text-indigo-600">Verified</span>
              </div>
              <div className="divide-y divide-card-border">
                {cohortsRanked.map((c, idx) => {
                  const isMyCohort = user && user.role === 'cohort_leader' && (user as any).cohort === c.cohortName;
                  const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;
                  return (
                    <div
                      key={c.cohortName}
                      className={`grid grid-cols-12 items-center px-5 py-3.5 text-sm transition-colors ${
                        isMyCohort ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-background/60'
                      }`}
                    >
                      <div className="col-span-1 flex items-center justify-center">
                        {medal ? (
                          <span className="text-base">{medal}</span>
                        ) : (
                          <span className="text-xs font-bold text-text-muted">#{idx + 1}</span>
                        )}
                      </div>
                      <div className="col-span-5">
                        <div className="font-semibold text-foreground text-sm">Cohort {c.cohortName}</div>
                        <div className="text-[11px] text-text-muted mt-0.5">{c.leaderName}</div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="inline-block px-2 py-0.5 bg-card-bg border border-card-border rounded-full text-[11px] font-medium text-text-muted">
                          {c.clusterName}
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-emerald-600 font-bold text-base">{c.registered}</span>
                        <span className="text-text-muted text-xs"> / {c.total}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-indigo-600 font-bold text-base">{c.verified}</span>
                        <span className="text-text-muted text-xs"> / {c.total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ── CLUSTERS VIEW ── */
          <div className="space-y-8">
            {filteredData.map((cluster) => {
              const clTotal = cluster.cohorts.reduce((a, c) => a + c.students.length, 0);
              const clReg = cluster.cohorts.reduce((a, c) => a + c.students.filter(s => s.confirmedJklu).length, 0);

              return (
                <div key={cluster.clusterName} className="space-y-4">
                  {/* Cluster Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center font-bold text-secondary text-sm">
                        {cluster.clusterName}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-foreground">Cluster {cluster.clusterName}</h2>
                        <p className="text-xs text-text-muted">
                          Head: <span className="font-medium text-foreground">{cluster.head || 'TBA'}</span>
                          <span className="mx-1.5 text-card-border">·</span>
                          <span className="font-medium text-foreground">{clReg}</span> / {clTotal} registered
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {cluster.cohorts.map(co => {
                        const reg = co.students.filter(s => s.confirmedJklu).length;
                        const tot = co.students.length;
                        return (
                          <div key={co.cohortName} title={`Cohort ${co.cohortName}: ${reg}/${tot} registered`}
                            className="w-7 h-7 rounded-lg bg-white border border-card-border flex items-center justify-center text-xs font-bold text-text-muted hover:border-emerald-400 hover:text-emerald-600 transition-all cursor-default shadow-sm">
                            {co.cohortName}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cohort Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cluster.cohorts.map((cohort) => {
                      const isExpanded = !!expandedCohorts[cohort.cohortName];
                      const totalStudents = cohort.students.length;
                      const registeredCount = cohort.students.filter(s => s.confirmedJklu).length;
                      const verifiedCount = cohort.students.filter(s => s.documentsVerified).length;
                      const notContinuingCount = cohort.students.filter(s => s.notContinuing).length;
                      const notComingCount = cohort.students.filter(s => s.notComingAarambh).length;

                      return (
                        <div key={cohort.cohortName} className="bg-white border border-card-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                          {/* Cohort header */}
                          <div
                            onClick={() => toggleCohort(cohort.cohortName)}
                            className="px-5 py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-card-bg/30 transition-colors"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                  {cohort.cohortName}
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-sm font-bold text-foreground truncate">Cohort {cohort.cohortName}</h3>
                                  <p className="text-[11px] text-text-muted truncate">{cohort.leaderName}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 mt-0.5">
                              {/* Mini stat chips */}
                              <div className="flex gap-1.5">
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] font-bold text-emerald-700">
                                  {registeredCount}
                                  <span className="font-normal text-emerald-500">reg</span>
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border border-card-border rounded-lg text-[11px] font-bold text-text-muted">
                                  {totalStudents}
                                  <span className="font-normal">total</span>
                                </span>
                              </div>
                              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Summary strip */}
                          <div className="px-5 py-2 bg-card-bg/40 border-t border-card-border flex items-center gap-4 text-[11px] text-text-muted">
                            <span className="flex items-center gap-1">
                              <StatusDot color="bg-indigo-400" />
                              <span className="font-medium text-indigo-600">{verifiedCount}</span> verified
                            </span>
                            {notContinuingCount > 0 && (
                              <span className="flex items-center gap-1">
                                <StatusDot color="bg-red-400" />
                                <span className="font-medium text-red-500">{notContinuingCount}</span> not continuing
                              </span>
                            )}
                            {notComingCount > 0 && (
                              <span className="flex items-center gap-1">
                                <StatusDot color="bg-orange-400" />
                                <span className="font-medium text-orange-500">{notComingCount}</span> not coming
                              </span>
                            )}
                          </div>

                          {/* Expanded student list */}
                          {isExpanded && (
                            <div className="border-t border-card-border divide-y divide-card-border">
                              {cohort.students.map((student) => {
                                const initial = student.name.charAt(0).toUpperCase();
                                return (
                                  <div
                                    key={student._id}
                                    className={`px-5 py-2.5 flex items-center justify-between gap-3 ${
                                      student.notContinuing || student.notComingAarambh
                                        ? 'bg-red-50/60'
                                        : student.confirmedJklu
                                        ? 'bg-emerald-50/50'
                                        : ''
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                                        student.notContinuing || student.notComingAarambh
                                          ? 'bg-red-100 text-red-500'
                                          : student.confirmedJklu
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : 'bg-slate-100 text-slate-500'
                                      }`}>{initial}</div>
                                      <div className="min-w-0">
                                        <div className="text-sm font-medium text-foreground truncate leading-tight">{student.name}</div>
                                        <div className="text-[10px] text-text-muted truncate">{student.applicationNo}</div>
                                      </div>
                                    </div>

                                    <div className="shrink-0">
                                      {student.notComingAarambh ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 text-orange-600 border border-orange-200">Not Coming</span>
                                      ) : student.notContinuing ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-600 border border-red-200">Not Continuing</span>
                                      ) : student.confirmedJklu ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">Registered</span>
                                      ) : (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">Pending</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                              {cohort.students.length === 0 && (
                                <div className="px-5 py-8 text-center text-sm text-text-muted italic">No students allocated.</div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredData.length === 0 && (
              <div className="bg-white border border-card-border rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-xl">🔍</div>
                <h3 className="text-base font-bold text-foreground">No matching records</h3>
                <p className="text-sm text-text-muted mt-1.5">Try a different name, application number, or leader.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="py-6 border-t border-card-border text-center text-xs text-text-muted bg-white/60 backdrop-blur-sm relative z-10">
        JK Lakshmipat University, Jaipur &copy; 2026
      </footer>
    </div>
  );
}
