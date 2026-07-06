'use client';

import AuroraBackground from '../components/AuroraBackground';
import Loader from '../components/Loader';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';

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
  confirmedAt?: string;
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

export default function CohortRegistrationsPage() {
  const { user, loading: appLoading, theme, toggleTheme } = useApp();
  const isDark = theme === 'fun';
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU Logo.svg';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';
  const router = useRouter();

  // Redirect to login if not authenticated or not authorized
  useEffect(() => {
    if (!appLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.email === 'hosteladmin@jklu.edu.in') {
        router.push('/admin/hostel');
      }
    }
  }, [user, appLoading, router]);

  const [data, setData] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notPublished, setNotPublished] = useState(false);
  const [expandedCohorts, setExpandedCohorts] = useState<Record<string, boolean>>({});

  const getBackLink = () => {
    if (!user) return { href: '/', label: 'Back to Home' };
    switch (user.role) {
      case 'super_admin': return { href: '/super-admin', label: 'Back to Dashboard' };
      case 'admin': return { href: '/admin', label: 'Back to Dashboard' };
      case 'cluster_head': return { href: '/cluster-head', label: 'Back to Dashboard' };
      case 'cohort_leader': return { href: '/cohort-leader', label: 'Back to Dashboard' };
      default: return { href: '/', label: 'Back to Home' };
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

  const getPercent = (count: number, total: number) => {
    if (!total) return 0;
    return Math.round((count / total) * 100);
  };

  const filteredData = data.map(cluster => {
    const filteredCohorts = cluster.cohorts.map(cohort => {
      const filteredStudents = cohort.students.filter(student => {
        const matchSearch =
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cohort.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cohort.cohortName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchSearch;
      });
      const isCohortMatch =
        cohort.cohortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cohort.leaderName.toLowerCase().includes(searchTerm.toLowerCase());
      return { ...cohort, students: isCohortMatch ? cohort.students : filteredStudents };
    }).filter(cohort => cohort.students.length > 0 || cohort.cohortName.toLowerCase().includes(searchTerm.toLowerCase()));
    return { ...cluster, cohorts: filteredCohorts };
  }).filter(cluster => cluster.cohorts.length > 0);

  // Grand metrics
  let grandTotalStudents = 0;
  let grandRegisteredCount = 0;
  let grandVerifiedCount = 0;
  let grandAarambhConfirmedCount = 0;
  let grandNotContinuingCount = 0;
  let grandNotComingAarambhCount = 0;

  let regMales = 0;
  let regFemales = 0;
  let regBTech = 0;
  let regBBA = 0;
  let regBDes = 0;

  const cohortsRanked: Array<{
    cohortName: string; leaderName: string; clusterName: string;
    total: number; registered: number; verified: number;
    percentage: number; latestConfirmTime: number;
  }> = [];

  data.forEach(cluster => {
    cluster.cohorts.forEach(cohort => {
      const total = cohort.students.length;
      const registeredStudents = cohort.students.filter(s => s.confirmedJklu);
      const registered = registeredStudents.length;
      const verified = cohort.students.filter(s => s.documentsVerified).length;
      const percentage = total > 0 ? Math.round((registered / total) * 100) : 0;
      
      const aarambhConfirmed = cohort.students.filter(s => s.confirmedAarambh).length;
      const notContinuing = cohort.students.filter(s => s.notContinuing).length;
      const notComingAarambh = cohort.students.filter(s => s.notComingAarambh).length;
      
      cohort.students.forEach(s => {
        if (s.confirmedJklu) {
          if (s.gender === 'Female') regFemales++;
          else regMales++;

          if (s.course === 'B.Tech') regBTech++;
          else if (s.course === 'BBA') regBBA++;
          else if (s.course === 'B.Des') regBDes++;
        }
      });
      
      let latestConfirmTime = Infinity;
      if (registered > 0) {
        const confirmTimes = registeredStudents
          .map(s => s.confirmedAt ? new Date(s.confirmedAt).getTime() : null)
          .filter((t): t is number => t !== null);
        if (confirmTimes.length > 0) {
          latestConfirmTime = Math.max(...confirmTimes);
        }
      }

      grandTotalStudents += total;
      grandRegisteredCount += registered;
      grandVerifiedCount += verified;
      grandAarambhConfirmedCount += aarambhConfirmed;
      grandNotContinuingCount += notContinuing;
      grandNotComingAarambhCount += notComingAarambh;
      cohortsRanked.push({ 
        cohortName: cohort.cohortName, 
        leaderName: cohort.leaderName, 
        clusterName: cluster.clusterName, 
        total, 
        registered, 
        verified, 
        percentage, 
        latestConfirmTime 
      });
    });
  });

  // Wilson Score Lower Bound — z=1.65 (90% confidence).
  // Primary ranking: normalization by rate + volume.
  //   1/1 (100%) < 3/3 (100%) < 8/10 (80%)
  // Secondary ranking: when Wilson scores are equal, earlier completion wins.
  const wilsonScore = (registered: number, total: number): number => {
    if (total === 0 || registered === 0) return 0;
    const z = 1.65;
    const p = registered / total;
    const z2 = z * z;
    const numerator = p + z2 / (2 * total) - z * Math.sqrt((p * (1 - p) + z2 / (4 * total)) / total);
    const denominator = 1 + z2 / total;
    return Math.max(0, numerator / denominator);
  };

  cohortsRanked.sort((a, b) => {
    const scoreA = wilsonScore(a.registered, a.total);
    const scoreB = wilsonScore(b.registered, b.total);
    // 1st priority: Wilson score (normalization)
    if (Math.abs(scoreB - scoreA) > 0.001) return scoreB - scoreA;
    // 2nd priority: time — earlier completion ranks higher
    if (a.latestConfirmTime !== b.latestConfirmTime) return a.latestConfirmTime - b.latestConfirmTime;
    // Final fallback: alphabetical
    return a.cohortName.localeCompare(b.cohortName);
  });

  // Group cohorts into brackets
  const bracketLess3: string[] = [];
  const bracketEqual3: string[] = [];
  const bracketEqual4: string[] = [];
  const bracketEqual5: string[] = [];
  const bracketMore5: string[] = [];

  cohortsRanked.forEach(c => {
    if (c.registered < 3) {
      bracketLess3.push(c.cohortName);
    } else if (c.registered === 3) {
      bracketEqual3.push(c.cohortName);
    } else if (c.registered === 4) {
      bracketEqual4.push(c.cohortName);
    } else if (c.registered === 5) {
      bracketEqual5.push(c.cohortName);
    } else {
      bracketMore5.push(c.cohortName);
    }
  });

  bracketLess3.sort();
  bracketEqual3.sort();
  bracketEqual4.sort();
  bracketEqual5.sort();
  bracketMore5.sort();

  // Group statistics by cluster
  const clusterStats: Array<{
    clusterName: string;
    head: string | null;
    total: number;
    registered: number;
    percent: number;
  }> = [];

  data.forEach(cluster => {
    let total = 0;
    let registered = 0;
    cluster.cohorts.forEach(cohort => {
      total += cohort.students.length;
      registered += cohort.students.filter(s => s.confirmedJklu).length;
    });
    const percent = total > 0 ? Math.round((registered / total) * 100) : 0;
    clusterStats.push({
      clusterName: cluster.clusterName,
      head: cluster.head,
      total,
      registered,
      percent
    });
  });

  clusterStats.sort((a, b) => a.clusterName.localeCompare(b.clusterName));

  // Group registrations by day
  const dailyRegs: Record<string, number> = {};
  data.forEach(cluster => {
    cluster.cohorts.forEach(cohort => {
      cohort.students.forEach(s => {
        if (s.confirmedJklu && s.confirmedAt) {
          try {
            const dateObj = new Date(s.confirmedAt);
            if (!isNaN(dateObj.getTime())) {
              const day = String(dateObj.getDate()).padStart(2, '0');
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const month = months[dateObj.getMonth()];
              const dateStr = `${day} ${month}`;
              dailyRegs[dateStr] = (dailyRegs[dateStr] || 0) + 1;
            }
          } catch (e) {
            // Ignore format errors
          }
        }
      });
    });
  });

  const activeDays = Object.keys(dailyRegs).sort((a, b) => {
    const parseDate = (dStr: string) => {
      const [day, mStr] = dStr.split(' ');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = months.indexOf(mStr);
      return new Date(2026, mIdx, parseInt(day)).getTime();
    };
    return parseDate(a) - parseDate(b);
  }).slice(-7); // Keep last 7 days of activity

  if (appLoading || !user || user.email === 'hosteladmin@jklu.edu.in') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader scale={0.7} label="Verifying session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between text-foreground relative overflow-hidden">
      <AuroraBackground />

      {/* Header */}
      <header className="sticky top-0 bg-card-bg/85 backdrop-blur-md border-b border-card-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <img src={jkluLogo} alt="JKLU Logo" className="h-9 sm:h-12 object-contain" />
            <div className="w-[1px] h-6 bg-card-border"></div>
            <img src={aarambhLogo} alt="Aarambh logo" className="h-12 sm:h-16 object-contain" />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>
              <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">JKLU</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-card-bg border border-card-border rounded-full hover:bg-background transition-all cursor-pointer shrink-0"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link
              href={backLink.href}
              className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-card-bg border border-card-border hover:bg-background text-foreground text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
            >
              ← <span className="hidden sm:inline">{backLink.label}</span><span className="inline sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full space-y-8 sm:space-y-10 relative z-10">

        {/* Page Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Cohort Registration Tracker</h1>
          <p className="inline-block bg-primary/10 border border-primary/25 text-primary text-xs font-semibold px-4 py-1.5 rounded-full">
            Real-time student registration progress across all cohorts.
          </p>
        </div>

        {/* Global Stats */}
        {!loading && !notPublished && grandTotalStudents > 0 && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div className="glass-card p-5 sm:p-6 flex flex-col gap-2 sm:gap-3 border-l-4 border-l-primary">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest">Total Students</div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{grandTotalStudents}</div>
                <div className="text-xs text-text-muted">Allocated across all cohorts</div>
              </div>
              <div className="glass-card p-5 sm:p-6 flex flex-col gap-2 sm:gap-3 border-l-4 border-l-emerald-500">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest">Registered at JKLU</div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{grandRegisteredCount}</div>
                <div className="text-xs text-text-muted">Registered in database</div>
              </div>
              <div className="glass-card p-5 sm:p-6 flex flex-col gap-2 sm:gap-3 border-l-4 border-l-indigo-500">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest">Documents Verified</div>
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{grandVerifiedCount}</div>
                <div className="text-xs text-text-muted">Verified by cluster head</div>
              </div>
            </div>

            {/* Effective Aarambh Progress */}
            {(() => {
              const effectiveTarget = grandTotalStudents - grandNotContinuingCount - grandNotComingAarambhCount;
              const effectivePercent = effectiveTarget > 0 ? Math.round((grandAarambhConfirmedCount / effectiveTarget) * 100) : 0;
              return (
                <div className="glass-card p-5 sm:p-6 border-l-4 border-l-amber-500 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-widest">Effective Aarambh Progress</div>
                      <div className="text-xs text-text-muted">
                        Aarambh Confirmed registrations respective to active target students (Total - [Not Continuing + Not Coming])
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">{grandAarambhConfirmedCount} / {effectiveTarget}</div>
                      <div className="text-xs font-semibold text-amber-500">{effectivePercent}% Completed</div>
                    </div>
                  </div>
                  <div className="w-full bg-card-border/50 rounded-full h-3 overflow-hidden mt-1">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${effectivePercent}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-[10px] text-text-muted font-bold mt-1">
                    <span>Not Continuing: {grandNotContinuingCount}</span>
                    <span>Not Coming to Aarambh: {grandNotComingAarambhCount}</span>
                    <span>Active Target: {effectiveTarget}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Brackets Dashboard */}
        {!loading && !notPublished && cohortsRanked.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">
              <span className="text-xl font-bold">📊</span>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cohort Size Brackets (Database Registered)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {/* Bracket <3 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-rose-500 bg-rose-500/5">
                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Bracket &lt; 3</div>
                <div className="text-2xl font-black text-rose-600">{bracketLess3.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-wrap gap-1 mt-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                  {bracketLess3.map(c => (
                    <span key={c} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200/50">{c}</span>
                  ))}
                  {bracketLess3.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =3 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-orange-500 bg-orange-500/5">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Bracket = 3</div>
                <div className="text-2xl font-black text-orange-600">{bracketEqual3.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-wrap gap-1 mt-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                  {bracketEqual3.map(c => (
                    <span key={c} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200/50">{c}</span>
                  ))}
                  {bracketEqual3.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =4 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-amber-500 bg-amber-500/5">
                <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Bracket = 4</div>
                <div className="text-2xl font-black text-amber-600">{bracketEqual4.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-wrap gap-1 mt-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                  {bracketEqual4.map(c => (
                    <span key={c} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200/50">{c}</span>
                  ))}
                  {bracketEqual4.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =5 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-emerald-500 bg-emerald-500/5">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Bracket = 5</div>
                <div className="text-2xl font-black text-emerald-600">{bracketEqual5.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-wrap gap-1 mt-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                  {bracketEqual5.map(c => (
                    <span key={c} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50">{c}</span>
                  ))}
                  {bracketEqual5.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket >5 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-indigo-500 bg-indigo-500/5">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Bracket &gt; 5</div>
                <div className="text-2xl font-black text-indigo-600">{bracketMore5.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-wrap gap-1 mt-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                  {bracketMore5.map(c => (
                    <span key={c} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">{c}</span>
                  ))}
                  {bracketMore5.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demographics Charts */}
        {!loading && !notPublished && grandRegisteredCount > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">
              <span className="text-xl font-bold">🥧</span>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Registration Demographics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Gender Chart Card */}
              {(() => {
                const total = regMales + regFemales;
                const malePct = total > 0 ? Math.round((regMales / total) * 100) : 0;
                const femalePct = total > 0 ? 100 - malePct : 0;
                const conicBg = `conic-gradient(#3b82f6 0% ${malePct}%, #ec4899 ${malePct}% 100%)`;
                return (
                  <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="relative w-32 h-32 rounded-full shrink-0 flex items-center justify-center shadow-inner border border-card-border" style={{ background: conicBg }}>
                      {/* Donut Hole */}
                      <div className="absolute w-24 h-24 rounded-full bg-card-bg flex flex-col items-center justify-center border border-card-border">
                        <span className="text-2xl font-black text-foreground">{total}</span>
                        <span className="text-[9px] font-bold text-text-muted uppercase">Registered</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider text-center sm:text-left">Gender Distribution</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-8 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-500 shrink-0"></div>
                            <span className="font-semibold text-foreground">Male</span>
                          </div>
                          <span className="font-bold text-text-muted">{regMales} ({malePct}%)</span>
                        </div>
                        <div className="flex items-center justify-between gap-8 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-pink-500 shrink-0"></div>
                            <span className="font-semibold text-foreground">Female</span>
                          </div>
                          <span className="font-bold text-text-muted">{regFemales} ({femalePct}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Course Chart Card */}
              {(() => {
                const total = regBTech + regBBA + regBDes;
                const btechPct = total > 0 ? Math.round((regBTech / total) * 100) : 0;
                const bbaPct = total > 0 ? Math.round((regBBA / total) * 100) : 0;
                const bdesPct = total > 0 ? 100 - btechPct - bbaPct : 0;
                const conicBg = `conic-gradient(#6366f1 0% ${btechPct}%, #10b981 ${btechPct}% ${btechPct + bbaPct}%, #f59e0b ${btechPct + bbaPct}% 100%)`;
                return (
                  <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="relative w-32 h-32 rounded-full shrink-0 flex items-center justify-center shadow-inner border border-card-border" style={{ background: conicBg }}>
                      {/* Donut Hole */}
                      <div className="absolute w-24 h-24 rounded-full bg-card-bg flex flex-col items-center justify-center border border-card-border">
                        <span className="text-2xl font-black text-foreground">{total}</span>
                        <span className="text-[9px] font-bold text-text-muted uppercase">Registered</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider text-center sm:text-left">Course Distribution</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-8 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-indigo-500 shrink-0"></div>
                            <span className="font-semibold text-foreground">B.Tech</span>
                          </div>
                          <span className="font-bold text-text-muted">{regBTech} ({btechPct}%)</span>
                        </div>
                        <div className="flex items-center justify-between gap-8 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-emerald-500 shrink-0"></div>
                            <span className="font-semibold text-foreground">BBA</span>
                          </div>
                          <span className="font-bold text-text-muted">{regBBA} ({bbaPct}%)</span>
                        </div>
                        <div className="flex items-center justify-between gap-8 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-amber-500 shrink-0"></div>
                            <span className="font-semibold text-foreground">B.Des</span>
                          </div>
                          <span className="font-bold text-text-muted">{regBDes} ({bdesPct}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Cluster Progress Overview */}
        {!loading && !notPublished && clusterStats.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">
              <span className="text-xl font-bold">🏫</span>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cluster Progress Overview</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {clusterStats.map(c => (
                <div key={c.clusterName} className="glass-card p-3 flex flex-col gap-1.5 border-t-2 border-t-indigo-500/60">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-foreground">Cluster {c.clusterName}</span>
                    <span className="text-indigo-500">{c.percent}%</span>
                  </div>
                  <div className="w-full bg-card-border/55 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${c.percent}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-text-muted mt-0.5">
                    <span>{c.registered}/{c.total} reg</span>
                    <span className="truncate max-w-[55px] font-medium text-[8px]" title={c.head || ''}>{c.head || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration Daily Velocity */}
        {!loading && !notPublished && activeDays.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">
              <span className="text-xl font-bold">📈</span>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Registration Daily Velocity</h2>
            </div>
            <div className="glass-card p-6 flex flex-col items-center gap-5">
              <div className="w-full flex items-end justify-around h-32 pt-4 border-b border-card-border px-2">
                {(() => {
                  const maxCount = Math.max(...activeDays.map(d => dailyRegs[d]), 1);
                  return activeDays.map(day => {
                    const count = dailyRegs[day];
                    const heightPercent = Math.round((count / maxCount) * 100);
                    return (
                      <div key={day} className="flex flex-col items-center gap-2 group relative w-12" style={{ height: '100%', justifyContent: 'flex-end' }}>
                        {/* Tooltip */}
                        <div className="absolute -top-8 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm whitespace-nowrap z-10">
                          {count} registrations
                        </div>
                        <div 
                          className="bg-indigo-500/80 hover:bg-indigo-500 w-8 rounded-t transition-all duration-500 shadow-sm"
                          style={{ height: `${heightPercent}%`, minHeight: count > 0 ? '4px' : '0px' }}
                        ></div>
                      </div>
                    );
                  });
                })()}
              </div>
              <div className="w-full flex justify-around text-[10px] font-bold text-text-muted px-2">
                {activeDays.map(day => (
                  <div key={day} className="w-12 text-center flex flex-col gap-0.5">
                    <span className="text-foreground">{day}</span>
                    <span className="text-indigo-500 font-semibold">+{dailyRegs[day]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {!loading && !notPublished && cohortsRanked.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">
              <span className="text-xl">🏆</span>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cohort Leaderboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Podium */}
              <div className="md:col-span-2 grid grid-cols-3 gap-2 sm:gap-3 items-end">
                {/* 2nd */}
                {cohortsRanked[1] && (
                  <div className="glass-card p-2 sm:p-4 flex flex-col items-center border-t-4 border-t-slate-400 relative h-[140px] sm:h-[170px]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-400 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">2</div>
                    <span className="text-xl sm:text-2xl mt-1.5 sm:mt-2">🥈</span>
                    <div className="text-center mt-1 sm:mt-2 flex-1 w-full min-w-0">
                      <div className="text-[10px] sm:text-xs font-bold text-foreground truncate w-full">Cohort {cohortsRanked[1].cohortName}</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted mt-0.5 truncate w-full">{cohortsRanked[1].leaderName}</div>
                    </div>
                    <div className="w-full text-center mt-auto bg-card-bg border border-card-border py-1 sm:py-1.5 rounded-lg">
                      <div className="text-[11px] sm:text-sm font-bold text-foreground">{cohortsRanked[1].registered}/{cohortsRanked[1].total}</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted">Registered</div>
                    </div>
                  </div>
                )}
                {/* 1st */}
                {cohortsRanked[0] && (
                  <div className="glass-card p-2 sm:p-4 flex flex-col items-center border-t-4 border-t-amber-400 relative h-[160px] sm:h-[196px] shadow-md">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">1</div>
                    <span className="text-2xl sm:text-3xl mt-1.5 sm:mt-2">🥇</span>
                    <div className="text-center mt-1 sm:mt-2 flex-1 w-full min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-foreground truncate w-full">Cohort {cohortsRanked[0].cohortName}</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted mt-0.5 truncate w-full">{cohortsRanked[0].leaderName}</div>
                    </div>
                    <div className="w-full text-center mt-auto bg-amber-500/10 py-1 sm:py-1.5 rounded-lg border border-amber-500/20">
                      <div className="text-[11px] sm:text-sm font-bold text-amber-600">{cohortsRanked[0].registered}/{cohortsRanked[0].total}</div>
                      <div className="text-[8px] sm:text-[9px] text-amber-600/70">Registered</div>
                    </div>
                  </div>
                )}
                {/* 3rd */}
                {cohortsRanked[2] && (
                  <div className="glass-card p-2 sm:p-4 flex flex-col items-center border-t-4 border-t-amber-600 relative h-[130px] sm:h-[155px]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">3</div>
                    <span className="text-xl sm:text-2xl mt-1.5 sm:mt-2">🥉</span>
                    <div className="text-center mt-1 sm:mt-2 flex-1 w-full min-w-0">
                      <div className="text-[10px] sm:text-xs font-bold text-foreground truncate w-full">Cohort {cohortsRanked[2].cohortName}</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted mt-0.5 truncate w-full">{cohortsRanked[2].leaderName}</div>
                    </div>
                    <div className="w-full text-center mt-auto bg-card-bg border border-card-border py-1 sm:py-1.5 rounded-lg">
                      <div className="text-[11px] sm:text-sm font-bold text-foreground">{cohortsRanked[2].registered}/{cohortsRanked[2].total}</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted">Registered</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Rankings List */}
              <div className="glass-card p-4 flex flex-col h-[196px]">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 border-b border-card-border pb-2">All Rankings</div>
                <div className="overflow-y-auto flex-1 pr-1 space-y-1.5 scrollbar-thin">
                  {cohortsRanked.map((c, idx) => {
                    const isMyCohort = user && user.role === 'cohort_leader' && (user as any).cohort === c.cohortName;
                    return (
                      <div key={c.cohortName} className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-all ${
                        isMyCohort ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-background/40 border border-card-border/50 text-text-muted'
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-4 text-[10px] font-medium text-center shrink-0">#{idx + 1}</span>
                          <div className="min-w-0">
                            <span className="font-semibold truncate block text-foreground text-[11px]">Cohort {c.cohortName}</span>
                            <span className="text-[9px] text-text-muted block truncate">{c.leaderName}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <span className="font-bold text-foreground">{c.registered}/{c.total}</span>
                          <span className="text-[9px] text-text-muted block">Registered</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        {!notPublished && (
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, application no, cohort, or leader..."
                className="w-full pl-10 pr-10 py-3 bg-background/60 border border-card-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-foreground"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader scale={0.6} label="Loading registration progress..." />
          </div>
        ) : notPublished && (!user || user.role !== 'super_admin') ? (
          <div className="glass-card p-14 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-card-border/30 flex items-center justify-center text-3xl">🔒</div>
            <h2 className="text-lg font-bold text-foreground">Student Lists Not Published Yet</h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              The student allocation list has not been released by the Super Admin yet. Please check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredData.map((cluster) => {
              const clTotal = cluster.cohorts.reduce((a, c) => a + c.students.length, 0);
              const clReg = cluster.cohorts.reduce((a, c) => a + c.students.filter(s => s.confirmedJklu).length, 0);

              return (
                <div key={cluster.clusterName} className="space-y-5">
                  {/* Cluster Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border pb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0"></div>
                        <h2 className="text-xl font-bold text-foreground">Cluster {cluster.clusterName}</h2>
                      </div>
                      <p className="text-xs text-text-muted mt-1 ml-5">Coordinator: <span className="font-semibold text-foreground">{cluster.head || 'To be assigned'}</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-text-muted">{clReg}/{clTotal} registered</span>
                    </div>
                  </div>

                  {/* Cohort Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cluster.cohorts.map((cohort) => {
                      const isExpanded = !!expandedCohorts[cohort.cohortName];
                      const totalStudents = cohort.students.length;
                      const registeredCount = cohort.students.filter(s => s.confirmedJklu).length;
                      const verifiedCount = cohort.students.filter(s => s.documentsVerified).length;

                      return (
                        <div key={cohort.cohortName} className="glass-card overflow-hidden border border-card-border">

                          {/* Cohort Header */}
                          <div
                            onClick={() => toggleCohort(cohort.cohortName)}
                            className="px-5 py-4 border-b border-card-border flex items-center justify-between gap-4 cursor-pointer hover:bg-background/40 transition-all"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                <h3 className="text-sm font-bold text-foreground truncate">Cohort {cohort.cohortName}</h3>
                              </div>
                              <p className="text-xs text-text-muted ml-3.5 truncate">Leader: <span className="font-medium text-foreground">{cohort.leaderName}</span></p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <div className="text-xs font-semibold text-emerald-600">{registeredCount} reg</div>
                                <div className="text-[10px] text-text-muted">{verifiedCount} verified</div>
                              </div>
                              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Student list */}
                          {isExpanded && (
                            <div className="divide-y divide-card-border">
                              {cohort.students.map((student) => {
                                const initial = student.name.charAt(0).toUpperCase();
                                return (
                                  <div
                                    key={student._id}
                                    className={`px-5 py-3 flex items-center justify-between gap-3 text-sm ${
                                      student.notContinuing || student.notComingAarambh
                                        ? 'bg-red-50/50'
                                        : student.confirmedJklu
                                        ? 'bg-emerald-50/40'
                                        : ''
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                        student.notContinuing || student.notComingAarambh
                                          ? 'bg-red-100 text-red-600'
                                          : student.confirmedJklu
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : 'bg-primary/10 text-primary'
                                      }`}>{initial}</div>
                                      <div className="min-w-0">
                                        <div className="font-semibold text-foreground text-sm truncate">{student.name}</div>
                                        <div className="text-[10px] text-text-muted truncate">{student.applicationNo} · {student.course}</div>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1 shrink-0 justify-end">
                                      {student.notComingAarambh ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-600 border border-red-200">Not Coming</span>
                                      ) : student.notContinuing ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">Not Continuing</span>
                                      ) : (
                                        <>
                                          {student.documentsVerified && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-600 border border-indigo-200">Verified</span>
                                          )}
                                          {student.confirmedJklu ? (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">Registered</span>
                                          ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-text-muted border border-card-border">Pending</span>
                                          )}
                                        </>
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
              <div className="glass-card p-14 text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-card-border/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-foreground">No matching records found</h3>
                <p className="text-sm text-text-muted mt-1.5">Try searching for a different student name, application number, or cohort leader.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-card-border text-[10px] font-bold text-text-muted z-10 bg-card-bg/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 Team Aarambh. All Rights Reserved.</span>
          <span>Built by Aman P</span>
        </div>
      </footer>
    </div>
  );
}