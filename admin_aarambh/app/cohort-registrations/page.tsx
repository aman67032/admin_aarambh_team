'use client';
import PlasmaWave from '../components/PlasmaWave';

import Loader from '../components/Loader';



import React, { useEffect, useState } from 'react';

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



export default function CohortRegistrationsPage() {

  const { user } = useApp();

  const [data, setData] = useState<ClusterInfo[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const [notPublished, setNotPublished] = useState(false);

  

  const getBackLink = () => {

    if (!user) return { href: '/', label: 'Back to Home' };

    switch (user.role) {

      case 'super_admin':

        return { href: '/super-admin', label: 'Back to Dashboard' };

      case 'admin':

        return { href: '/admin', label: 'Back to Dashboard' };

      case 'cluster_head':

        return { href: '/cluster-head', label: 'Back to Dashboard' };

      case 'cohort_leader':

        return { href: '/cohort-leader', label: 'Back to Dashboard' };

      default:

        return { href: '/', label: 'Back to Home' };

    }

  };



  const backLink = getBackLink();



  const [expandedCohorts, setExpandedCohorts] = useState<Record<string, boolean>>({});



  useEffect(() => {

    const fetchRegistrations = async () => {

      try {

        const res = await fetch('/api/status/cohort-registrations');

        if (res.ok) {

          const result = await res.json();

          let allocationsList = [];

          if (result && typeof result === 'object' && 'allocations' in result) {

            allocationsList = result.allocations;

            setData(result.allocations);

            setNotPublished(!!result.notPublished);

          } else {

            allocationsList = result;

            setData(result);

          }

          

          // Expand all cohorts by default for easy scanning

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

    setExpandedCohorts(prev => ({

      ...prev,

      [cohortName]: !prev[cohortName]

    }));

  };



  const getPercent = (count: number, total: number) => {

    if (!total) return 0;

    return Math.round((count / total) * 100);

  };



  // Helper to filter/search cohorts or students

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



      // If search term matches cohort name or leader name, keep all students, otherwise only matching ones

      const isCohortMatch = 

        cohort.cohortName.toLowerCase().includes(searchTerm.toLowerCase()) ||

        cohort.leaderName.toLowerCase().includes(searchTerm.toLowerCase());



      return {

        ...cohort,

        students: isCohortMatch ? cohort.students : filteredStudents

      };

    }).filter(cohort => cohort.students.length > 0 || cohort.cohortName.toLowerCase().includes(searchTerm.toLowerCase()));



    return {

      ...cluster,

      cohorts: filteredCohorts

    };

  }).filter(cluster => cluster.cohorts.length > 0);



  // Total metrics & Leaderboard calculation

  let grandTotalStudents = 0;

  let grandRegisteredCount = 0;

  let grandVerifiedCount = 0;

  

  const cohortsRanked: Array<{

    cohortName: string;

    leaderName: string;

    clusterName: string;

    total: number;

    registered: number;

    verified: number;

    percentage: number;

    normalizedScore: number;

  }> = [];



  data.forEach(cluster => {

    cluster.cohorts.forEach(cohort => {

      const total = cohort.students.length;

      const registered = cohort.students.filter(s => s.confirmedJklu).length;

      const verified = cohort.students.filter(s => s.documentsVerified).length;

      const percentage = total > 0 ? Math.round((registered / total) * 100) : 0;

      

      // Bayesian average smoothing: assume 2 extra unregistered students to normalize size differences

      const normalizedScore = total > 0 ? (registered / (total + 2)) * 100 : 0;



      grandTotalStudents += total;

      grandRegisteredCount += registered;

      grandVerifiedCount += verified;



      cohortsRanked.push({

        cohortName: cohort.cohortName,

        leaderName: cohort.leaderName,

        clusterName: cluster.clusterName,

        total,

        registered,

        verified,

        percentage,

        normalizedScore

      });

    });

  });



  // Sort cohorts by normalizedScore desc, then absolute count of registered students desc, then alphabetically

  cohortsRanked.sort((a, b) => {

    if (b.normalizedScore !== a.normalizedScore) {

      return b.normalizedScore - a.normalizedScore;

    }

    if (b.registered !== a.registered) {

      return b.registered - a.registered;

    }

    return a.cohortName.localeCompare(b.cohortName);

  });



  return (

    <div className="min-h-screen bg-background flex flex-col justify-between fun-bg-pattern text-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>

      {/* Header */}

      <header className="sticky top-0 bg-card-bg/85 backdrop-blur-md border-b border-card-border z-50 transition-all">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">

            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-12 object-contain animate-pulse" />

            <div className="w-[1px] h-6 bg-card-border"></div>

            <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh logo" className="h-16 object-contain" />

            <div className="flex flex-col hidden sm:flex">

              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>

              <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">JKLU</span>

            </div>

          </Link>



          <Link

            href={backLink.href}

            className="px-5 py-2.5 bg-card-bg border border-card-border hover:bg-background text-foreground text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"

          >

            ← {backLink.label}

          </Link>

        </div>

      </header>



      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-8">

        

        {/* Banner Section */}

        <div className="text-center space-y-3 max-w-2xl mx-auto">

          <h1 className="text-3xl font-black font-outfit tracking-tight text-foreground leading-none">

            Cohort Registration Tracker

          </h1>

          <p className="inline-block bg-primary/10 border border-primary/25 text-primary text-xs font-black px-4 py-1.5 rounded-full shadow-xs leading-relaxed">

            Real-time student registration progress across all cohorts.

          </p>

        </div>



        {/* Global Progress Statistics Card */}

        {!loading && !notPublished && grandTotalStudents > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <div className="glass-card p-6 border-l-4 border-l-primary flex flex-col justify-between">

              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Allocated Students</span>

              <div className="text-3xl font-black font-outfit text-foreground mt-2">{grandTotalStudents}</div>

            </div>

            <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex flex-col justify-between">

              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmed Registration (JKLU)</span>

              <div className="text-3xl font-black font-outfit text-emerald-600 mt-2">

                {grandRegisteredCount}

              </div>

            </div>

            <div className="glass-card p-6 border-l-4 border-l-indigo-500 flex flex-col justify-between">

              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Documents Verified</span>

              <div className="text-3xl font-black font-outfit text-indigo-600 mt-2">

                {grandVerifiedCount}

              </div>

            </div>

          </div>

        )}



        {/* Leaderboard Section */}

        {!loading && !notPublished && cohortsRanked.length > 0 && (

          <div className="max-w-4xl mx-auto space-y-4">

            <div className="flex items-center gap-2 pb-1 justify-center sm:justify-start">

              <span className="text-xl">🏆</span>

              <h2 className="text-sm font-bold text-foreground font-outfit uppercase tracking-wider">

                Cohort Leaderboard

              </h2>

            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Podium Column */}

              <div className="md:col-span-2 grid grid-cols-3 gap-3">

                {/* 2nd Place */}

                {cohortsRanked[1] && (

                  <div className="glass-card p-4 flex flex-col items-center justify-between border-t-4 border-t-slate-400 bg-card-bg relative mt-3 h-[180px]">

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-400 text-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm">

                      2

                    </div>

                    <span className="text-2xl mt-1">🥈</span>

                    <div className="text-center mt-2 w-full">

                      <div className="text-xs font-extrabold text-foreground truncate">Cohort {cohortsRanked[1].cohortName}</div>

                      <div className="text-[9px] text-text-muted font-bold mt-0.5 truncate w-full">{cohortsRanked[1].leaderName}</div>

                    </div>

                    <div className="w-full text-center mt-2 bg-background/50 border border-card-border/60 py-1 rounded-lg">

                      <div className="text-sm font-black text-foreground">{cohortsRanked[1].percentage}%</div>

                      <div className="text-[9px] text-text-muted font-bold">{cohortsRanked[1].registered}/{cohortsRanked[1].total} Reg</div>

                    </div>

                  </div>

                )}



                {/* 1st Place */}

                {cohortsRanked[0] && (

                  <div className="glass-card p-4 flex flex-col items-center justify-between border-t-4 border-t-amber-400 bg-card-bg relative h-[196px] shadow-md">

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm">

                      1

                    </div>

                    <span className="text-3xl">🥇</span>

                    <div className="text-center mt-2 w-full">

                      <div className="text-sm font-black text-foreground truncate">Cohort {cohortsRanked[0].cohortName}</div>

                      <div className="text-[9px] text-text-muted font-bold mt-0.5 truncate w-full">{cohortsRanked[0].leaderName}</div>

                    </div>

                    <div className="w-full text-center mt-2 bg-amber-500/10 py-1 rounded-lg border border-amber-500/20">

                      <div className="text-md font-black text-amber-500">{cohortsRanked[0].percentage}%</div>

                      <div className="text-[9px] text-amber-500/80 font-bold">{cohortsRanked[0].registered}/{cohortsRanked[0].total} Reg</div>

                    </div>

                  </div>

                )}



                {/* 3rd Place */}

                {cohortsRanked[2] && (

                  <div className="glass-card p-4 flex flex-col items-center justify-between border-t-4 border-t-amber-600 bg-card-bg relative mt-5 h-[172px]">

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-amber-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm">

                      3

                    </div>

                    <span className="text-2xl mt-1">🥉</span>

                    <div className="text-center mt-2 w-full">

                      <div className="text-xs font-extrabold text-foreground truncate">Cohort {cohortsRanked[2].cohortName}</div>

                      <div className="text-[9px] text-text-muted font-bold mt-0.5 truncate w-full">{cohortsRanked[2].leaderName}</div>

                    </div>

                    <div className="w-full text-center mt-2 bg-background/50 border border-card-border/60 py-1 rounded-lg">

                      <div className="text-sm font-black text-foreground">{cohortsRanked[2].percentage}%</div>

                      <div className="text-[9px] text-text-muted font-bold">{cohortsRanked[2].registered}/{cohortsRanked[2].total} Reg</div>

                    </div>

                  </div>

                )}

              </div>



              {/* Full Rank list */}

              <div className="glass-card p-4 bg-card-bg flex flex-col justify-between h-[196px]">

                <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2 border-b border-card-border pb-1">

                  All Cohorts Rankings

                </div>

                <div className="overflow-y-auto flex-1 pr-1 space-y-1.5 scrollbar-thin">

                  {cohortsRanked.map((c, idx) => {

                    const isMyCohort = user && user.role === 'cohort_leader' && user.cohort === c.cohortName;

                    return (

                      <div 

                        key={c.cohortName} 

                        className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${

                          isMyCohort 

                            ? 'bg-primary/10 border border-primary/20 font-black text-primary shadow-sm' 

                            : 'bg-background/40 border border-card-border/50 font-semibold text-text-muted'

                        }`}

                      >

                        <div className="flex items-center gap-2 min-w-0">

                          <span className="w-5 text-[10px] font-bold text-text-muted text-center shrink-0">#{idx + 1}</span>

                          <div className="min-w-0">

                            <span className="font-extrabold truncate block text-foreground">Cohort {c.cohortName}</span>

                            <span className="text-[9px] text-text-muted block font-semibold truncate">{c.leaderName}</span>

                          </div>

                        </div>

                        <div className="text-right shrink-0">

                          <span className="font-extrabold text-foreground">{c.percentage}%</span>

                          <span className="text-[9px] text-text-muted block font-semibold">{c.registered}/{c.total}</span>

                        </div>

                      </div>

                    );

                  })}

                </div>

              </div>

            </div>

          </div>

        )}



        {/* Search Widget */}

        {!notPublished && (

          <div className="max-w-2xl mx-auto">

            <div className="relative">

              <input

                type="text"

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

                placeholder="Search by student name, application no, cohort, or leader..."

                className="w-full px-5 py-3 bg-background/50 border border-card-border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-foreground font-semibold"

              />

              {searchTerm && (

                <button 

                  onClick={() => setSearchTerm('')} 

                  className="absolute right-4 top-3 text-text-muted hover:text-foreground font-bold text-sm"

                >

                  ✕

                </button>

              )}

            </div>

          </div>

        )}



        {loading ? (

          <div className="min-h-[40vh] flex items-center justify-center">

            <Loader scale={0.6} label="Loading registration progress..." />

          </div>

        ) : notPublished && (!user || user.role !== 'super_admin') ? (

          <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto">

            <div className="text-5xl">🔒</div>

            <h2 className="text-xl font-bold text-foreground font-outfit">Student Lists Not Published Yet</h2>

            <p className="text-text-muted text-xs font-semibold leading-relaxed">

              The student allocation list has not been released by the Super Admin yet. Please check back later.

            </p>

          </div>

        ) : (

          <div className="space-y-10">

            {filteredData.map((cluster) => (

              <div key={cluster.clusterName} className="space-y-6">

                

                {/* Cluster Header */}

                <div className="flex items-center gap-3 border-b border-card-border pb-3">

                  <h2 className="text-2xl font-black font-outfit text-foreground">

                    Cluster {cluster.clusterName}

                  </h2>

                  <span className="text-xs font-bold text-text-muted">

                    Coordinator: {cluster.head || 'To be assigned'}

                  </span>

                </div>



                {/* Cohorts under Cluster */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {cluster.cohorts.map((cohort) => {

                    const isExpanded = !!expandedCohorts[cohort.cohortName];

                    

                    // Cohort metrics

                    const totalStudents = cohort.students.length;

                    const registeredStudents = cohort.students.filter(s => s.confirmedJklu);

                    const registeredCount = registeredStudents.length;

                    const verifiedCount = cohort.students.filter(s => s.documentsVerified).length;

                    const percentRegistered = getPercent(registeredCount, totalStudents);



                    return (

                      <div key={cohort.cohortName} className="glass-card overflow-hidden flex flex-col justify-between border border-card-border bg-card-bg">

                        

                        {/* Cohort Header Information */}

                        <div 

                          onClick={() => toggleCohort(cohort.cohortName)}

                          className="p-5 bg-card-bg/50 border-b border-card-border flex items-center justify-between gap-4 cursor-pointer hover:bg-background transition-all"

                        >

                          <div className="space-y-1">

                            <h3 className="text-md font-extrabold font-outfit text-foreground flex items-center gap-2">

                              Cohort {cohort.cohortName}

                              <span className="text-xs bg-background border border-card-border px-2 py-0.5 rounded-full font-bold text-text-muted">

                                {totalStudents} Students

                              </span>

                            </h3>

                            <span className="text-xs font-bold text-text-muted block">

                              Leader: {cohort.leaderName}

                            </span>

                          </div>

                          

                          {/* Circle Progress Badge */}

                          <div className="flex items-center gap-3">

                            <div className="flex flex-col items-end">

                              <span className="text-xs font-black text-emerald-600">

                                {registeredCount} Registered

                              </span>

                              <span className="text-[10px] text-text-muted font-bold">

                                {verifiedCount} Docs Verified

                              </span>

                            </div>

                            <svg className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">

                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />

                            </svg>

                          </div>

                        </div>



                        {/* Progress Bar */}

                        <div className="w-full bg-background h-1">

                          <div 

                            className="bg-emerald-500 h-full transition-all duration-500" 

                            style={{ width: `${percentRegistered}%` }}

                          />

                        </div>



                        {/* Students List in Cohort */}

                        {isExpanded && (

                          <div className="p-5 flex-1 flex flex-col justify-between">

                            <div className="space-y-2">

                              {cohort.students.map((student) => {

                                return (

                                  <div 

                                    key={student._id} 

                                    className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 transition-all text-xs font-semibold ${

                                      student.notComingAarambh 

                                        ? 'bg-red-500/10 border-red-500/20 text-red-500' 

                                        : student.notContinuing

                                        ? 'bg-card-bg/500/10 border-slate-500/20 text-text-muted'

                                        : student.confirmedJklu 

                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 

                                        : 'bg-background/40 border-card-border/50 text-text-muted'

                                    }`}

                                  >

                                    <div>

                                      <div className="font-extrabold text-foreground">{student.name}</div>

                                      <div className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">

                                        {student.applicationNo} • {student.course}

                                      </div>

                                    </div>



                                    {/* Status Indicator */}

                                    <div className="flex flex-wrap gap-1.5 items-center mt-1 sm:mt-0 self-end sm:self-auto">

                                      {student.notComingAarambh ? (

                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/25 text-red-500 border border-red-500/25 uppercase">

                                          Not Coming

                                        </span>

                                      ) : student.notContinuing ? (

                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-card-bg/500/25 text-text-muted border border-slate-500/25 uppercase">

                                          Not Continuing

                                        </span>

                                      ) : (

                                        <>

                                          {student.documentsVerified && (

                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-500 border border-indigo-500/20 uppercase" title="Documents Verified">

                                              Verified

                                            </span>

                                          )}

                                          {student.confirmedJklu ? (

                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 uppercase" title="Registered at JKLU">

                                              Registered

                                            </span>

                                          ) : (

                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-card-bg/500/10 text-text-muted border border-slate-500/10 uppercase">

                                              Pending

                                            </span>

                                          )}

                                        </>

                                      )}

                                    </div>

                                  </div>

                                );

                              })}

                              

                              {cohort.students.length === 0 && (

                                <div className="text-center text-xs text-text-muted italic py-4">

                                  No students allocated.

                                </div>

                              )}

                            </div>

                          </div>

                        )}



                      </div>

                    );

                  })}

                </div>



              </div>

            ))}

            

            {filteredData.length === 0 && (

              <div className="glass-card p-12 text-center max-w-md mx-auto">

                <span className="text-3xl">🔍</span>

                <h3 className="text-md font-extrabold text-foreground font-outfit mt-4">No matching records found</h3>

                <p className="text-xs text-text-muted font-semibold mt-1">Try searching for a different student name, application number, or cohort leader.</p>

              </div>

            )}

          </div>

        )}

      </main>



      {/* Footer */}

      <footer className="py-8 border-t border-card-border text-center text-xs font-bold text-text-muted bg-card-bg/40 backdrop-blur-sm">

        <div>JK Lakshmipat University, Jaipur © 2026</div>

      </footer>

    </div>

  );

}

