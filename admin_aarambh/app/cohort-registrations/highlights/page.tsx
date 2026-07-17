'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';
import PlasmaWave from '../../components/PlasmaWave';

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
  state?: string;
  city?: string;
  gender?: string;
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

const stateCorrections: Record<string, string> = {
  'RJ': 'RAJASTHAN',
  'RAJASTHAN ': 'RAJASTHAN',
  'MP': 'MADHYA PRADESH',
  'UP': 'UTTAR PRADESH',
  'HARAYANA': 'HARYANA',
  'DELHI NCR': 'DELHI',
};

export default function HighlightsDisplayPage() {
  const { user, loading: appLoading, theme } = useApp();
  const isDark = theme === 'fun';
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU Logo.png';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';
  const router = useRouter();

  const [data, setData] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeStr, setTimeStr] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  // Redirect if not authorized
  useEffect(() => {
    if (!appLoading && !user) {
      router.push('/login');
    }
  }, [user, appLoading, router]);

  // Fetch data periodically
  useEffect(() => {
    let isMounted = true;
    const fetchRegistrations = async () => {
      try {
        const res = await fetch('/api/status/cohort-registrations');
        if (res.ok && isMounted) {
          const result = await res.json();
          if (result && typeof result === 'object' && 'allocations' in result) {
            setData(result.allocations);
          } else {
            setData(result);
          }
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRegistrations();
    const interval = setInterval(fetchRegistrations, 12000); // refresh every 12 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Clock tick
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (loading || data.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 4);
    }, 6000); // slide transitions every 6 seconds
    return () => clearInterval(interval);
  }, [loading, data, isPaused]);

  // Accumulate registration statistics
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

  const stateCourseCounts: Record<string, { btech: number; bba: number; bdes: number; total: number }> = {};

  if (data && data.length > 0) {
    data.forEach(cluster => {
      cluster.cohorts.forEach(cohort => {
        cohort.students.forEach(student => {
          grandTotalStudents++;
          if (student.confirmedJklu) {
            grandRegisteredCount++;
            if (student.documentsVerified) grandVerifiedCount++;
            if (student.confirmedAarambh) grandAarambhConfirmedCount++;

            // Statewise stats
            const sName = student.state || 'UNKNOWN';
            const cleanState = stateCorrections[sName.trim().toUpperCase()] || sName.trim().toUpperCase();
            if (!stateCourseCounts[cleanState]) {
              stateCourseCounts[cleanState] = { btech: 0, bba: 0, bdes: 0, total: 0 };
            }
            stateCourseCounts[cleanState].total++;

            // Gender diversity
            const gen = (student.gender || '').trim().toLowerCase();
            const isFemale = gen === 'female' || gen.startsWith('f');
            if (isFemale) regFemales++;
            else regMales++;

            // Coursewise stats
            const course = (student.course || '').trim().toUpperCase();
            if (course.includes('B.TECH') || course.includes('BTECH')) {
              regBTech++;
              stateCourseCounts[cleanState].btech++;
            } else if (course.includes('BBA')) {
              regBBA++;
              stateCourseCounts[cleanState].bba++;
            } else if (course.includes('DES')) {
              regBDes++;
              stateCourseCounts[cleanState].bdes++;
            } else {
              regBTech++; // fallback
              stateCourseCounts[cleanState].btech++;
            }
          }
          if (student.notContinuing) grandNotContinuingCount++;
          if (student.notComingAarambh) grandNotComingAarambhCount++;
        });
      });
    });
  }

  if (appLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader scale={1} label="Initializing Live Highlights display screen..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden font-outfit">
      {/* Background Plasma Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <PlasmaWave speed1={0.03} speed2={0.03} focalLength={0.7} bend1={1.2} bend2={0.6} dir2={-1} rotationDeg={45} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Fullscreen Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-card-border/40 relative z-20 backdrop-blur-md bg-card-bg/40">
        <div className="flex items-center gap-4">
          <img src={jkluLogo} alt="JKLU" className="h-14 object-contain" />
          <div className="w-[1.5px] h-8 bg-card-border"></div>
          <img src={aarambhLogo} alt="Aarambh" className="h-20 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-widest text-primary uppercase">Live Highlights Screen</span>
            <span className="text-[10px] font-bold text-text-muted uppercase mt-0.5">Real-time Dashboard Display</span>
          </div>
        </div>

        {/* Digital Clock */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <div className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-foreground tabular-nums bg-background/50 border border-card-border px-5 py-2 rounded-2xl shadow-inner">
            {timeStr}
          </div>
        </div>
      </header>

      {/* Main Highlights Display area */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center px-8 relative z-20">
        <div 
          className="w-full glass-card p-10 border-l-8 border-l-primary flex flex-col justify-between h-[380px] sm:h-[340px] relative overflow-hidden transition-all duration-500 bg-card-bg/70 shadow-2xl group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={() => setActiveSlide(prev => (prev - 1 + 4) % 4)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-foreground/5 hover:bg-foreground/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 text-foreground cursor-pointer font-black text-lg border border-card-border shadow-md"
          >
            ←
          </button>
          <button 
            onClick={() => setActiveSlide(prev => (prev + 1) % 4)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-foreground/5 hover:bg-foreground/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 text-foreground cursor-pointer font-black text-lg border border-card-border shadow-md"
          >
            →
          </button>

          {/* Slide Contents */}
          <div className="flex-1 flex flex-col justify-center px-6">
            {activeSlide === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest">
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                  Current Registration Status
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Cohort Students</div>
                    <div className="text-3xl sm:text-4xl font-black text-foreground">{grandTotalStudents}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Registered in database</div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-500">{grandRegisteredCount}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Documents Verified</div>
                    <div className="text-3xl sm:text-4xl font-black text-indigo-500">{grandVerifiedCount}</div>
                  </div>
                </div>
                <div className="w-full bg-card-border/50 rounded-full h-2.5 overflow-hidden mt-3 shadow-inner">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-700" 
                    style={{ width: `${grandTotalStudents > 0 ? (grandRegisteredCount / grandTotalStudents) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}

            {activeSlide === 1 && (() => {
              const topStates = Object.entries(stateCourseCounts)
                .map(([state, counts]) => ({ name: state, total: counts.total }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 3);

              return (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    Geographic Distribution
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {topStates.map((st, idx) => {
                      const pct = grandRegisteredCount > 0 ? Math.round((st.total / grandRegisteredCount) * 100) : 0;
                      const colors = ['from-orange-500 to-amber-500', 'from-emerald-500 to-teal-500', 'from-indigo-500 to-purple-500'];
                      return (
                        <div key={st.name} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-extrabold text-text-muted">
                            <span className="text-foreground text-sm tracking-wide">{st.name}</span>
                            <span>{st.total} students ({pct}%)</span>
                          </div>
                          <div className="w-full bg-card-border/45 rounded-full h-3 overflow-hidden shadow-inner">
                            <div 
                              className={`bg-gradient-to-r ${colors[idx]} h-full rounded-full transition-all duration-700`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {activeSlide === 2 && (() => {
              const totalReg = regBTech + regBBA + regBDes;
              const btechPct = totalReg > 0 ? Math.round((regBTech / totalReg) * 100) : 0;
              const bbaPct = totalReg > 0 ? Math.round((regBBA / totalReg) * 100) : 0;
              const bdesPct = totalReg > 0 ? Math.round((regBDes / totalReg) * 100) : 0;

              return (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
                    Course-wise Enrollment Breakdown
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider">B.Tech</div>
                      <div className="text-3xl font-black text-indigo-500">{regBTech}</div>
                      <div className="text-xs text-text-muted font-bold mt-1">{btechPct}% of registrations</div>
                    </div>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider">BBA</div>
                      <div className="text-3xl font-black text-emerald-500">{regBBA}</div>
                      <div className="text-xs text-text-muted font-bold mt-1">{bbaPct}% of registrations</div>
                    </div>
                    <div className="p-4 bg-pink-500/5 border border-pink-500/10 rounded-2xl">
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider">B.Des</div>
                      <div className="text-3xl font-black text-pink-500">{regBDes}</div>
                      <div className="text-xs text-text-muted font-bold mt-1">{bdesPct}% of registrations</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeSlide === 3 && (() => {
              const totalGender = regMales + regFemales;
              const malePct = totalGender > 0 ? Math.round((regMales / totalGender) * 100) : 0;
              const femalePct = totalGender > 0 ? Math.round((regFemales / totalGender) * 100) : 0;

              return (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-3 text-sm font-bold text-text-muted uppercase tracking-widest">
                    <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></span>
                    Cohort Diversity Index
                  </div>
                  <div className="flex items-center justify-between text-sm font-extrabold text-text-muted mb-2">
                    <span className="text-blue-500 text-lg">Male: {regMales} ({malePct}%)</span>
                    <span className="text-pink-500 text-lg">Female: {regFemales} ({femalePct}%)</span>
                  </div>
                  <div className="w-full bg-card-border/45 rounded-full h-5 overflow-hidden flex shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-700"
                      style={{ width: `${malePct}%` }}
                    ></div>
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-700"
                      style={{ width: `${femalePct}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-text-muted italic text-center font-semibold mt-2">
                    Celebrating a vibrant, balanced, and inclusive student community.
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Slide dots indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3].map(idx => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx 
                    ? 'bg-primary w-6' 
                    : 'bg-card-border hover:bg-text-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Screen Footer */}
      <footer className="px-8 py-6 border-t border-card-border/40 relative z-20 backdrop-blur-md bg-card-bg/40 flex items-center justify-between">
        <Link
          href="/cohort-registrations"
          className="px-5 py-2.5 bg-background border border-card-border hover:bg-card-bg/85 text-foreground text-xs font-bold rounded-full transition-all cursor-pointer shadow-md flex items-center gap-2"
        >
          ← Exit TV Mode
        </Link>
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
          Aarambh &copy; 2026 Admin Portal
        </span>
      </footer>
    </div>
  );
}
