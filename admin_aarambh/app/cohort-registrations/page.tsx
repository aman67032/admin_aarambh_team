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
  state?: string;
  city?: string;
}

const stateCorrections: Record<string, string> = {
  'RAJESTHAN': 'RAJASTHAN',
  'RAJASTHAN': 'RAJASTHAN',
  'MP': 'MADHYA PRADESH',
  'MADHYAPRADESH': 'MADHYA PRADESH',
  'UP': 'UTTAR PRADESH',
  'UTTARPRADESH': 'UTTAR PRADESH',
  'AP': 'ANDHRA PRADESH',
  'ANDHRAPRADESH': 'ANDHRA PRADESH',
  'TELANGANA': 'TELANGANA',
  'BIHAR': 'BIHAR',
  'GUJARAT': 'GUJARAT',
  'HARYANA': 'HARYANA',
  'JHARKHAND': 'JHARKHAND',
  'WEST BENGAL': 'WEST BENGAL',
  'MAHARASHTRA': 'MAHARASHTRA',
  'PUNJAB': 'PUNJAB',
  'DELHI': 'DELHI',
  'KARNATAKA': 'KARNATAKA',
  'ANDHAR PRADESH': 'ANDHRA PRADESH',
};

const cityCorrections: Record<string, string> = {
  'BEWAR': 'BEAWAR',
  'JOTHPUR': 'JODHPUR',
  'GULBPURA': 'GULABPURA',
  '105-B ANAND NAGAR SIRSI ROAD, NEAR HARSOLI HAVELI': 'JAIPUR',
  'PLOT NO42 BANDU NAGAR MURLIPURA JAIPUR DEPO SAME SIKKAR ROAD': 'JAIPUR',
  '65,SAKET COLONY VIJAY BARI PATH NO.7 SIKAR ROAD JAIPUR': 'JAIPUR',
  '4008,RAMLILA CHOWK , KALI MAI ROAD NASIRABAD AJMER': 'AJMER',
  'HNO.1118 AGARWAL MOHALLA NASIRABAD': 'AJMER',
  '2/62 B-BLOCK PANCHSHEEL': 'AJMER',
  'ANANDPURA KUCHAMAN CITY  DIDWANA-KUCHAMAN': 'KUCHAMAN CITY'
};

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
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU Logo.png';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';
  const router = useRouter();

  // Redirect if not authorized (hostel admin)
  useEffect(() => {
    if (!appLoading && user && user.email === 'hosteladmin@jklu.edu.in') {
      router.push('/admin/hostel');
    }
  }, [user, appLoading, router]);

  const [data, setData] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notPublished, setNotPublished] = useState(false);
  const [expandedCohorts, setExpandedCohorts] = useState<Record<string, boolean>>({});

  const [svgText, setSvgText] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<{
    name: string;
    count: number;
    breakdown?: { btech: number; bba: number; bdes: number };
    coords: { x: number; y: number };
  } | null>(null);

  // Load the map SVG
  useEffect(() => {
    fetch('/india_map.svg')
      .then(res => res.text())
      .then(text => {
        setSvgText(text);
      })
      .catch(err => console.error("Error loading map SVG:", err));
  }, []);

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
    let isMounted = true;
    const fetchRegistrations = async (isFirstLoad = false) => {
      try {
        const res = await fetch('/api/status/cohort-registrations');
        if (res.ok && isMounted) {
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
          if (isFirstLoad) {
            const initialExpanded: Record<string, boolean> = {};
            allocationsList.forEach((cluster: ClusterInfo) => {
              cluster.cohorts.forEach((cohort) => {
                initialExpanded[cohort.cohortName] = true;
              });
            });
            setExpandedCohorts(initialExpanded);
          }
        }
      } catch (err) {
        console.error('Error fetching registrations:', err);
      } finally {
        if (isFirstLoad && isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRegistrations(true);

    const interval = setInterval(() => {
      fetchRegistrations(false);
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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

  // Compute state-wise registrations
  const stateCourseCounts: Record<string, { btech: number; bba: number; bdes: number; total: number }> = {};
  
  if (data && data.length > 0) {
    data.forEach(cluster => {
      cluster.cohorts.forEach(cohort => {
        cohort.students.forEach(student => {
          if (student.confirmedJklu) {
            const sName = student.state || 'UNKNOWN';
            const cleanState = stateCorrections[sName.trim().toUpperCase()] || sName.trim().toUpperCase();
            
            if (!stateCourseCounts[cleanState]) {
              stateCourseCounts[cleanState] = { btech: 0, bba: 0, bdes: 0, total: 0 };
            }
            
            stateCourseCounts[cleanState].total++;
            
            const cName = student.course.trim().toUpperCase();
            if (cName.includes('TECH')) {
              stateCourseCounts[cleanState].btech++;
            } else if (cName.includes('DES')) {
              stateCourseCounts[cleanState].bdes++;
            } else if (cName.includes('BBA')) {
              stateCourseCounts[cleanState].bba++;
            } else {
              stateCourseCounts[cleanState].btech++; // fallback
            }
          }
        });
      });
    });
  }

  // Compute Rajasthan city-wise registrations
  const rajasthanCityCourseCounts: Record<string, { btech: number; bba: number; bdes: number; total: number }> = {};
  
  if (data && data.length > 0) {
    data.forEach(cluster => {
      cluster.cohorts.forEach(cohort => {
        cohort.students.forEach(student => {
          if (student.confirmedJklu) {
            const sName = student.state || 'UNKNOWN';
            const cleanState = stateCorrections[sName.trim().toUpperCase()] || sName.trim().toUpperCase();
            
            if (cleanState === 'RAJASTHAN') {
              const cNameRaw = student.city || 'UNKNOWN';
              const cName = cNameRaw.trim().toUpperCase();
              const cleanCity = cityCorrections[cName] || cName;
              
              if (!rajasthanCityCourseCounts[cleanCity]) {
                rajasthanCityCourseCounts[cleanCity] = { btech: 0, bba: 0, bdes: 0, total: 0 };
              }
              
              rajasthanCityCourseCounts[cleanCity].total++;
              
              const courseName = student.course.trim().toUpperCase();
              if (courseName.includes('TECH')) {
                rajasthanCityCourseCounts[cleanCity].btech++;
              } else if (courseName.includes('DES')) {
                rajasthanCityCourseCounts[cleanCity].bdes++;
              } else if (courseName.includes('BBA')) {
                rajasthanCityCourseCounts[cleanCity].bba++;
              } else {
                rajasthanCityCourseCounts[cleanCity].btech++;
              }
            }
          }
        });
      });
    });
  }

  // Update map colors dynamically based on the stateCourseCounts
  useEffect(() => {
    if (!svgText) return;
    
    // Find all paths in the SVG container
    const svgEl = document.getElementById('india-svg-container');
    if (!svgEl) return;
    
    const paths = svgEl.getElementsByTagName('path');
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const pathId = path.getAttribute('id');
      const stateName = path.getAttribute('name');
      
      // Default style
      path.style.fill = isDark ? '#1e293b' : '#f3f4f6'; // Light gray or Slate-800 default for 0 registrations
      path.style.stroke = isDark ? '#475569' : '#cbd5e1';
      path.style.strokeWidth = '0.5';
      path.style.transition = 'all 0.3s ease';
      
      // Add class for pointer
      path.setAttribute('class', 'state-path cursor-pointer hover:opacity-85');
      
      // Get count for this state
      const normalizedName = stateName ? stateName.toUpperCase() : '';
      const cleanState = stateCorrections[normalizedName] || normalizedName;
      const counts = stateCourseCounts[cleanState] || { total: 0, btech: 0, bba: 0, bdes: 0 };
      
      if (counts.total > 0) {
        // Beautiful amber palette for light/dark theme
        if (isDark) {
          if (counts.total > 100) path.style.fill = '#f59e0b'; // Amber 500
          else if (counts.total > 20) path.style.fill = '#d97706'; // Amber 600
          else if (counts.total > 5) path.style.fill = '#b45309'; // Amber 700
          else path.style.fill = '#78350f'; // Amber 900
        } else {
          if (counts.total > 100) path.style.fill = '#b45309'; // Amber 700
          else if (counts.total > 20) path.style.fill = '#d97706'; // Amber 600
          else if (counts.total > 5) path.style.fill = '#fbbf24'; // Amber 400
          else path.style.fill = '#fde68a'; // Amber 200
        }
        
        // Add glows on hover
        path.onmouseenter = (e: MouseEvent) => {
          path.style.stroke = '#ffffff';
          path.style.strokeWidth = '1.5';
          setHoveredState({
            name: stateName || '',
            count: counts.total,
            breakdown: { btech: counts.btech, bba: counts.bba, bdes: counts.bdes },
            coords: { x: e.clientX, y: e.clientY }
          });
        };
        path.onmousemove = (e: MouseEvent) => {
          setHoveredState(prev => prev ? { ...prev, coords: { x: e.clientX, y: e.clientY } } : null);
        };
        path.onmouseleave = () => {
          path.style.stroke = isDark ? '#475569' : '#cbd5e1';
          path.style.strokeWidth = '0.5';
          setHoveredState(null);
        };
      } else {
        // Zero count hover
        path.onmouseenter = (e: MouseEvent) => {
          path.style.stroke = isDark ? '#94a3b8' : '#64748b';
          path.style.strokeWidth = '1';
          setHoveredState({
            name: stateName || '',
            count: 0,
            breakdown: { btech: 0, bba: 0, bdes: 0 },
            coords: { x: e.clientX, y: e.clientY }
          });
        };
        path.onmousemove = (e: MouseEvent) => {
          setHoveredState(prev => prev ? { ...prev, coords: { x: e.clientX, y: e.clientY } } : null);
        };
        path.onmouseleave = () => {
          path.style.stroke = isDark ? '#475569' : '#cbd5e1';
          path.style.strokeWidth = '0.5';
          setHoveredState(null);
        };
      }
    }
  }, [svgText, stateCourseCounts, isDark]);

  let btechMales = 0;
  let btechFemales = 0;
  let bbaMales = 0;
  let bbaFemales = 0;
  let bdesMales = 0;
  let bdesFemales = 0;

  const cohortsRanked: Array<{
    cohortName: string; leaderName: string; clusterName: string;
    total: number; registered: number; verified: number;
    percentage: number; latestConfirmTime: number;
    activeTarget: number;
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
      const activeTarget = total - notContinuing - notComingAarambh;
      
      cohort.students.forEach(s => {
        if (s.confirmedJklu) {
          const gen = (s.gender || '').trim().toLowerCase();
          const isFemale = gen === 'female' || gen.startsWith('f');
          if (isFemale) regFemales++;
          else regMales++;

          const course = (s.course || '').trim().toUpperCase();
          if (course.includes('B.TECH') || course.includes('BTECH')) {
            regBTech++;
            if (isFemale) btechFemales++;
            else btechMales++;
          } else if (course.includes('BBA')) {
            regBBA++;
            if (isFemale) bbaFemales++;
            else bbaMales++;
          } else if (course.includes('B.DES') || course.includes('BDES') || course.includes('DESIGN')) {
            regBDes++;
            if (isFemale) bdesFemales++;
            else bdesMales++;
          }
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
        latestConfirmTime,
        activeTarget
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

  interface BracketItem {
    cohortName: string;
    registered: number;
    activeTarget: number;
  }

  // Group cohorts into brackets
  const bracketLess5: BracketItem[] = [];
  const bracketEqual5: BracketItem[] = [];
  const bracketEqual6: BracketItem[] = [];
  const bracketEqual7: BracketItem[] = [];
  const bracketMore7: BracketItem[] = [];

  cohortsRanked.forEach(c => {
    const item = {
      cohortName: c.cohortName,
      registered: c.registered,
      activeTarget: c.activeTarget
    };
    if (c.registered < 5) {
      bracketLess5.push(item);
    } else if (c.registered === 5) {
      bracketEqual5.push(item);
    } else if (c.registered === 6) {
      bracketEqual6.push(item);
    } else if (c.registered === 7) {
      bracketEqual7.push(item);
    } else {
      bracketMore7.push(item);
    }
  });

  const sortFn = (a: BracketItem, b: BracketItem) => a.cohortName.localeCompare(b.cohortName);
  bracketLess5.sort(sortFn);
  bracketEqual5.sort(sortFn);
  bracketEqual6.sort(sortFn);
  bracketEqual7.sort(sortFn);
  bracketMore7.sort(sortFn);

  // Group statistics by cluster
  const clusterStats: Array<{
    clusterName: string;
    head: string | null;
    total: number;
    registered: number;
    percent: number;
    notContinuing: number;
    notComing: number;
  }> = [];

  data.forEach(cluster => {
    let total = 0;
    let registered = 0;
    let notContinuing = 0;
    let notComing = 0;
    cluster.cohorts.forEach(cohort => {
      total += cohort.students.length;
      registered += cohort.students.filter(s => s.confirmedJklu).length;
      notContinuing += cohort.students.filter(s => s.notContinuing).length;
      notComing += cohort.students.filter(s => s.notComingAarambh).length;
    });
    const percent = total > 0 ? Math.round((registered / total) * 100) : 0;
    clusterStats.push({
      clusterName: cluster.clusterName,
      head: cluster.head,
      total,
      registered,
      percent,
      notContinuing,
      notComing
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

  if (appLoading || (user && user.email === 'hosteladmin@jklu.edu.in')) {
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

        {/* State-wise Map and Summary Table */}
        {!loading && !notPublished && data.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Map Column */}
            <div className="lg:col-span-7 glass-card p-5 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest self-start mb-4">Statewise Registration Heatmap</h2>
              {svgText ? (
                <>
                  <style dangerouslySetInnerHTML={{ __html: `
                    #india-svg-container svg {
                      width: 100%;
                      height: auto;
                      max-height: 450px;
                    }
                    .state-path {
                      transition: fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease;
                    }
                  `}} />
                  <div 
                    id="india-svg-container" 
                    className="w-full max-w-[450px] h-auto text-foreground"
                    dangerouslySetInnerHTML={{ __html: svgText }}
                  />
                </>
              ) : (
                <div className="text-text-muted text-sm font-semibold animate-pulse">Loading Map...</div>
              )}
              
              {/* Tooltip */}
              {hoveredState && (
                <div 
                  className="absolute pointer-events-none bg-slate-900/95 text-white p-3 rounded-xl border border-slate-700/50 shadow-xl text-xs space-y-1.5 z-50 backdrop-blur-sm transition-all duration-75"
                  style={{ 
                    left: `${hoveredState.coords.x + 15}px`, 
                    top: `${hoveredState.coords.y + 15}px`,
                    position: 'fixed'
                  }}
                >
                  <div className="font-bold text-sm text-amber-400 border-b border-slate-700/50 pb-1">{hoveredState.name}</div>
                  <div className="flex justify-between gap-4 font-semibold text-slate-300">
                    <span>Total Students:</span>
                    <span className="text-white font-bold">{hoveredState.count}</span>
                  </div>
                  {hoveredState.breakdown && (
                    <div className="space-y-0.5 pt-1 text-[10px] text-slate-400 font-medium border-t border-slate-800 mt-1">
                      <div className="flex justify-between gap-4">
                        <span>B.Tech:</span>
                        <span className="text-slate-200">{hoveredState.breakdown.btech}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>BBA:</span>
                        <span className="text-slate-200">{hoveredState.breakdown.bba}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>B.Des:</span>
                        <span className="text-slate-200">{hoveredState.breakdown.bdes}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Table Column */}
            <div className="lg:col-span-5 glass-card p-5 sm:p-6 flex flex-col overflow-hidden max-h-[550px]">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Registration Numbers by State</h2>
              <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border/50 text-text-muted font-bold uppercase tracking-wider">
                      <th className="py-2.5 pb-2">State</th>
                      <th className="py-2.5 pb-2 text-center">B.Tech</th>
                      <th className="py-2.5 pb-2 text-center">BBA</th>
                      <th className="py-2.5 pb-2 text-center">B.Des</th>
                      <th className="py-2.5 pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/30 font-semibold text-foreground">
                    {Object.entries(stateCourseCounts)
                      .sort((a, b) => b[1].total - a[1].total)
                      .map(([state, counts]) => (
                        <tr key={state} className="hover:bg-card-bg/25 transition-all">
                          <td className="py-2.5 font-bold text-foreground">{state}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.btech}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.bba}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.bdes}</td>
                          <td className="py-2.5 text-right font-extrabold text-primary">{counts.total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Second Row: Rajasthan City-wise and Report Downloads */}
        {!loading && !notPublished && data.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Rajasthan Citywise Column */}
            <div className="lg:col-span-7 glass-card p-5 sm:p-6 flex flex-col overflow-hidden max-h-[500px]">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                Rajasthan Citywise Registration Details
              </h2>
              <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border/50 text-text-muted font-bold uppercase tracking-wider">
                      <th className="py-2.5 pb-2">City</th>
                      <th className="py-2.5 pb-2 text-center">B.Tech</th>
                      <th className="py-2.5 pb-2 text-center">BBA</th>
                      <th className="py-2.5 pb-2 text-center">B.Des</th>
                      <th className="py-2.5 pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/30 font-semibold text-foreground">
                    {Object.entries(rajasthanCityCourseCounts)
                      .sort((a, b) => b[1].total - a[1].total)
                      .map(([city, counts]) => (
                        <tr key={city} className="hover:bg-card-bg/25 transition-all">
                          <td className="py-2.5 font-bold text-foreground">{city}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.btech}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.bba}</td>
                          <td className="py-2.5 text-center text-text-muted">{counts.bdes}</td>
                          <td className="py-2.5 text-right font-extrabold text-amber-500">{counts.total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Downloads & Reports Column */}
            <div className="lg:col-span-5 glass-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Reports & Downloads</h2>
                <p className="text-xs text-text-muted mb-6">
                  Export registration logs and summary charts directly to Excel spreadsheets.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="/api/reports/statewise-summary" 
                    download
                    className="flex items-center justify-between p-3.5 bg-card-bg border border-card-border hover:bg-primary/5 hover:border-primary/50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">State-wise Summary</div>
                        <div className="text-[10px] text-text-muted">Course-wise breakdowns by State</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Get XLSX →</span>
                  </a>

                  <a 
                    href="/api/reports/coursewise-details" 
                    download
                    className="flex items-center justify-between p-3.5 bg-card-bg border border-card-border hover:bg-primary/5 hover:border-primary/50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Complete Student List</div>
                        <div className="text-[10px] text-text-muted">3 separate sheets (B.Tech, BBA, B.Des)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Get XLSX →</span>
                  </a>

                  <a 
                    href="/api/reports/rajasthan-citywise" 
                    download
                    className="flex items-center justify-between p-3.5 bg-card-bg border border-card-border hover:bg-primary/5 hover:border-primary/50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Rajasthan City-wise</div>
                        <div className="text-[10px] text-text-muted">Breakdowns for Rajasthan cities</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Get XLSX →</span>
                  </a>
                </div>
              </div>
              
              <div className="text-[10px] text-text-muted font-bold text-center mt-6 border-t border-card-border/30 pt-4">
                Aarambh &apos;26 Registration Analytics Engine
              </div>
            </div>
          </div>
        )}

        {/* Batch Structure (Aarambh Attendees) Dashboard */}
        {!loading && !notPublished && data.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Aarambh &apos;26 Batch Structure (Attendees)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  batchName: 'Batch 1',
                  dateRange: '14th to 21st July',
                  clusters: [
                    { name: 'A', cohorts: 5 },
                    { name: 'E', cohorts: 5 },
                    { name: 'I', cohorts: 3 }
                  ]
                },
                {
                  batchName: 'Batch 2',
                  dateRange: '14th to 21st July',
                  clusters: [
                    { name: 'B', cohorts: 4 },
                    { name: 'F', cohorts: 5 },
                    { name: 'J', cohorts: 3 }
                  ]
                },
                {
                  batchName: 'Batch 3',
                  dateRange: '14th to 21st July',
                  clusters: [
                    { name: 'C', cohorts: 4 },
                    { name: 'G', cohorts: 5 },
                    { name: 'K', cohorts: 3 }
                  ]
                },
                {
                  batchName: 'Batch 4',
                  dateRange: '14th to 21st July',
                  clusters: [
                    { name: 'D', cohorts: 5 },
                    { name: 'H', cohorts: 5 },
                    { name: 'L', cohorts: 3 }
                  ]
                }
              ].map(batch => {
                let totalCohorts = 0;
                let totalAllotted = 0;
                let totalNotComing = 0;
                let totalActive = 0;
                let totalConfirmed = 0;

                const clusterBreakdown = batch.clusters.map(cConf => {
                  totalCohorts += cConf.cohorts;
                  const clusterObj = data.find(c => c.clusterName === cConf.name);
                  
                  let allotted = 0;
                  let notComing = 0;
                  let confirmed = 0;

                  if (clusterObj) {
                    clusterObj.cohorts.forEach(cohort => {
                      allotted += cohort.students.length;
                      notComing += cohort.students.filter(s => s.notComingAarambh || s.notContinuing).length;
                      confirmed += cohort.students.filter(s => s.confirmedAarambh).length;
                    });
                  }

                  const active = allotted - notComing;
                  totalAllotted += allotted;
                  totalNotComing += notComing;
                  totalActive += active;
                  totalConfirmed += confirmed;

                  return {
                    name: cConf.name,
                    cohorts: cConf.cohorts,
                    allotted,
                    notComing,
                    active,
                    confirmed
                  };
                });

                const progressPercent = totalActive > 0 ? Math.round((totalConfirmed / totalActive) * 100) : 0;

                return (
                  <div key={batch.batchName} className="glass-card overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div className="bg-card-bg/30 border-b border-card-border px-4 py-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-foreground font-outfit">{batch.batchName}</span>
                        <span className="text-[9px] text-text-muted font-bold block">{batch.dateRange}</span>
                      </div>
                      <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-extrabold uppercase">
                        {totalCohorts} Cohorts
                      </span>
                    </div>

                    <div className="p-3 overflow-x-auto">
                      <table className="w-full text-[10px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-card-border text-[8px] font-bold text-text-muted uppercase tracking-wider">
                            <th className="pb-1.5">Cluster</th>
                            <th className="pb-1.5 text-center">Cohorts</th>
                            <th className="pb-1.5 text-center">Allotted</th>
                            <th className="pb-1.5 text-center">Not Coming</th>
                            <th className="pb-1.5 text-center">Active Target</th>
                            <th className="pb-1.5 text-center">Confirmed</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border/30 font-bold text-foreground">
                          {clusterBreakdown.map(c => (
                            <tr key={c.name} className="hover:bg-card-bg/25">
                              <td className="py-2 text-primary font-extrabold">Cluster {c.name}</td>
                              <td className="py-2 text-center text-text-muted">{c.cohorts}</td>
                              <td className="py-2 text-center">{c.allotted}</td>
                              <td className="py-2 text-center text-red-500">{c.notComing}</td>
                              <td className="py-2 text-center text-indigo-600">{c.active}</td>
                              <td className="py-2 text-center text-emerald-600">{c.confirmed}</td>
                            </tr>
                          ))}
                          <tr className="border-t border-card-border bg-card-bg/10 font-extrabold text-foreground">
                            <td className="py-2 text-foreground">Total</td>
                            <td className="py-2 text-center text-text-muted">{totalCohorts}</td>
                            <td className="py-2 text-center">{totalAllotted}</td>
                            <td className="py-2 text-center text-red-500">{totalNotComing}</td>
                            <td className="py-2 text-center text-indigo-600">{totalActive}</td>
                            <td className="py-2 text-center text-emerald-600">{totalConfirmed}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-card-bg/5 border-t border-card-border px-4 py-3 space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-text-muted">
                        <span>Aarambh Confirmation Rate</span>
                        <span className="text-emerald-600">{progressPercent}% ({totalConfirmed}/{totalActive})</span>
                      </div>
                      <div className="w-full bg-card-border rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-1.5 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Brackets Dashboard */}
        {!loading && !notPublished && cohortsRanked.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cohort Size Brackets (Database Registered)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {/* Bracket <5 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-rose-500 bg-rose-500/5">
                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Bracket &lt; 5</div>
                <div className="text-2xl font-black text-rose-600">{bracketLess5.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                  {bracketLess5.map(item => (
                    <div key={item.cohortName} className="flex items-center justify-between text-[10px] font-bold px-2 py-1 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50">
                      <span>Cohort {item.cohortName}</span>
                      <span className="font-extrabold text-[11px]">{item.registered}/{item.activeTarget}</span>
                    </div>
                  ))}
                  {bracketLess5.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =5 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-orange-500 bg-orange-500/5">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Bracket = 5</div>
                <div className="text-2xl font-black text-orange-600">{bracketEqual5.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                  {bracketEqual5.map(item => (
                    <div key={item.cohortName} className="flex items-center justify-between text-[10px] font-bold px-2 py-1 rounded bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/50">
                      <span>Cohort {item.cohortName}</span>
                      <span className="font-extrabold text-[11px]">{item.registered}/{item.activeTarget}</span>
                    </div>
                  ))}
                  {bracketEqual5.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =6 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-amber-500 bg-amber-500/5">
                <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Bracket = 6</div>
                <div className="text-2xl font-black text-amber-600">{bracketEqual6.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                  {bracketEqual6.map(item => (
                    <div key={item.cohortName} className="flex items-center justify-between text-[10px] font-bold px-2 py-1 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50">
                      <span>Cohort {item.cohortName}</span>
                      <span className="font-extrabold text-[11px]">{item.registered}/{item.activeTarget}</span>
                    </div>
                  ))}
                  {bracketEqual6.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket =7 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-emerald-500 bg-emerald-500/5">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Bracket = 7</div>
                <div className="text-2xl font-black text-emerald-600">{bracketEqual7.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                  {bracketEqual7.map(item => (
                    <div key={item.cohortName} className="flex items-center justify-between text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50">
                      <span>Cohort {item.cohortName}</span>
                      <span className="font-extrabold text-[11px]">{item.registered}/{item.activeTarget}</span>
                    </div>
                  ))}
                  {bracketEqual7.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>

              {/* Bracket >7 */}
              <div className="glass-card p-4 flex flex-col gap-2 border-t-4 border-t-indigo-500 bg-indigo-500/5">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Bracket &gt; 7</div>
                <div className="text-2xl font-black text-indigo-600">{bracketMore7.length} <span className="text-xs font-normal text-text-muted">cohorts</span></div>
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[140px] scrollbar-thin">
                  {bracketMore7.map(item => (
                    <div key={item.cohortName} className="flex items-center justify-between text-[10px] font-bold px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                      <span>Cohort {item.cohortName}</span>
                      <span className="font-extrabold text-[11px]">{item.registered}/{item.activeTarget}</span>
                    </div>
                  ))}
                  {bracketMore7.length === 0 && <span className="text-[10px] text-text-muted italic">None</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demographics Charts */}
        {!loading && !notPublished && grandRegisteredCount > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
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

        {/* Course-Wise Gender Balance (3 Pie Charts) */}
        {!loading && !notPublished && grandRegisteredCount > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v10l8-4" />
                <path d="M12 12l-6 8" />
              </svg>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Course-Wise Gender Distribution</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* B.Tech Gender Balance */}
              {(() => {
                const total = btechMales + btechFemales;
                const malePct = total > 0 ? Math.round((btechMales / total) * 100) : 0;
                const femalePct = total > 0 ? 100 - malePct : 0;
                const conicBg = total > 0 
                  ? `conic-gradient(#3b82f6 0% ${malePct}%, #ec4899 ${malePct}% 100%)`
                  : `conic-gradient(#e2e8f0 0% 100%)`;
                return (
                  <div className="glass-card p-5 flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xs font-black text-foreground uppercase tracking-wider">B.Tech Gender</h3>
                    <div className="relative w-28 h-28 rounded-full shrink-0 flex items-center justify-center shadow-inner border border-card-border" style={{ background: conicBg }}>
                      <div className="absolute w-20 h-20 rounded-full bg-card-bg flex flex-col items-center justify-center border border-card-border">
                        <span className="text-xl font-black text-foreground">{total}</span>
                        <span className="text-[8px] font-bold text-text-muted uppercase">B.Tech</span>
                      </div>
                    </div>
                    <div className="w-full space-y-1.5 text-left text-xs font-semibold">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-blue-500 shrink-0"></div>
                          <span className="text-text-muted">Male</span>
                        </div>
                        <span className="font-bold text-foreground">{btechMales} ({malePct}%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-pink-500 shrink-0"></div>
                          <span className="text-text-muted">Female</span>
                        </div>
                        <span className="font-bold text-foreground">{btechFemales} ({femalePct}%)</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* BBA Gender Balance */}
              {(() => {
                const total = bbaMales + bbaFemales;
                const malePct = total > 0 ? Math.round((bbaMales / total) * 100) : 0;
                const femalePct = total > 0 ? 100 - malePct : 0;
                const conicBg = total > 0 
                  ? `conic-gradient(#3b82f6 0% ${malePct}%, #ec4899 ${malePct}% 100%)`
                  : `conic-gradient(#e2e8f0 0% 100%)`;
                return (
                  <div className="glass-card p-5 flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xs font-black text-foreground uppercase tracking-wider">BBA Gender</h3>
                    <div className="relative w-28 h-28 rounded-full shrink-0 flex items-center justify-center shadow-inner border border-card-border" style={{ background: conicBg }}>
                      <div className="absolute w-20 h-20 rounded-full bg-card-bg flex flex-col items-center justify-center border border-card-border">
                        <span className="text-xl font-black text-foreground">{total}</span>
                        <span className="text-[8px] font-bold text-text-muted uppercase">BBA</span>
                      </div>
                    </div>
                    <div className="w-full space-y-1.5 text-left text-xs font-semibold">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-blue-500 shrink-0"></div>
                          <span className="text-text-muted">Male</span>
                        </div>
                        <span className="font-bold text-foreground">{bbaMales} ({malePct}%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-pink-500 shrink-0"></div>
                          <span className="text-text-muted">Female</span>
                        </div>
                        <span className="font-bold text-foreground">{bbaFemales} ({femalePct}%)</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* B.Des Gender Balance */}
              {(() => {
                const total = bdesMales + bdesFemales;
                const malePct = total > 0 ? Math.round((bdesMales / total) * 100) : 0;
                const femalePct = total > 0 ? 100 - malePct : 0;
                const conicBg = total > 0 
                  ? `conic-gradient(#3b82f6 0% ${malePct}%, #ec4899 ${malePct}% 100%)`
                  : `conic-gradient(#e2e8f0 0% 100%)`;
                return (
                  <div className="glass-card p-5 flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xs font-black text-foreground uppercase tracking-wider">B.Des Gender</h3>
                    <div className="relative w-28 h-28 rounded-full shrink-0 flex items-center justify-center shadow-inner border border-card-border" style={{ background: conicBg }}>
                      <div className="absolute w-20 h-20 rounded-full bg-card-bg flex flex-col items-center justify-center border border-card-border">
                        <span className="text-xl font-black text-foreground">{total}</span>
                        <span className="text-[8px] font-bold text-text-muted uppercase">B.Des</span>
                      </div>
                    </div>
                    <div className="w-full space-y-1.5 text-left text-xs font-semibold">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-blue-500 shrink-0"></div>
                          <span className="text-text-muted">Male</span>
                        </div>
                        <span className="font-bold text-foreground">{bdesMales} ({malePct}%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-pink-500 shrink-0"></div>
                          <span className="text-text-muted">Female</span>
                        </div>
                        <span className="font-bold text-foreground">{bdesFemales} ({femalePct}%)</span>
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
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cluster Progress Overview</h2>
            </div>
            
            <div className="glass-card overflow-hidden border border-card-border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-5 py-3.5">Cluster Name</th>
                      <th className="px-5 py-3.5 text-center">Total Allotment</th>
                      <th className="px-5 py-3.5 text-center">Not Coming / Continuing</th>
                      <th className="px-5 py-3.5 text-center">Registered Number</th>
                      <th className="px-5 py-3.5 text-center">Pending</th>
                      <th className="px-5 py-3.5 text-center">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border font-semibold">
                    {clusterStats.map(c => {
                      const notComingOrContinuing = c.notContinuing + c.notComing;
                      const pending = c.total - notComingOrContinuing - c.registered;
                      return (
                        <tr key={c.clusterName} className="hover:bg-background/30 transition-colors">
                          <td className="px-5 py-3.5 text-foreground font-extrabold">Cluster {c.clusterName}</td>
                          <td className="px-5 py-3.5 text-center text-foreground">{c.total}</td>
                          <td className="px-5 py-3.5 text-center text-red-500">{notComingOrContinuing}</td>
                          <td className="px-5 py-3.5 text-center text-emerald-600">{c.registered}</td>
                          <td className="px-5 py-3.5 text-center text-amber-500">{pending}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3 justify-center">
                              <div className="w-24 bg-card-border/60 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${c.percent}%` }}></div>
                              </div>
                              <span className="text-[10px] text-text-muted font-bold w-8 text-right">{c.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Registration Daily Velocity */}
        {!loading && !notPublished && activeDays.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
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
            <div className="flex items-center gap-2.5 pb-1 justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a6 6 0 0 0-6 6v3.5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5V8a6 6 0 0 0-6-6z" />
              </svg>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Cohort Leaderboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Podium */}
              <div className="md:col-span-2 grid grid-cols-3 gap-2 sm:gap-3 items-end">
                {/* 2nd */}
                {cohortsRanked[1] && (
                  <div className="glass-card p-2 sm:p-4 flex flex-col items-center border-t-4 border-t-slate-400 relative h-[140px] sm:h-[170px]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-400 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">2</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-400 shrink-0 mt-2">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-amber-500 shrink-0 mt-2 animate-bounce">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-700 shrink-0 mt-2">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
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