'use client';

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

  // Total metrics
  let grandTotalStudents = 0;
  let grandRegisteredCount = 0;
  let grandVerifiedCount = 0;

  data.forEach(cluster => {
    cluster.cohorts.forEach(cohort => {
      grandTotalStudents += cohort.students.length;
      cohort.students.forEach(s => {
        if (s.confirmedJklu) grandRegisteredCount++;
        if (s.documentsVerified) grandVerifiedCount++;
      });
    });
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between fun-bg-pattern">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-8 object-contain" />
            <div className="w-[1px] h-6 bg-slate-200"></div>
            <img src="/AARAMBH26_Main logo.png" alt="Aarambh logo" className="h-10 object-contain" />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">JKLU</span>
            </div>
          </Link>

          <Link
            href={backLink.href}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
          >
            ← {backLink.label}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        
        {/* Banner Section */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl font-black font-outfit tracking-tight text-slate-900 leading-none">
            Cohort Registration Tracker
          </h1>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Monitor real-time student registration progress across all cohorts. Share this tracker with your Cohort Leaders.
          </p>
        </div>

        {/* Global Progress Statistics Card */}
        {!loading && !notPublished && grandTotalStudents > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 border-l-4 border-l-primary flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Allocated</span>
              <div className="text-3xl font-black font-outfit text-slate-800 mt-2">{grandTotalStudents} Students</div>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmed Registration (JKLU)</span>
              <div className="text-3xl font-black font-outfit text-emerald-600 mt-2">
                {grandRegisteredCount} <span className="text-sm font-semibold text-slate-400">({getPercent(grandRegisteredCount, grandTotalStudents)}%)</span>
              </div>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-indigo-500 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documents Verified</span>
              <div className="text-3xl font-black font-outfit text-indigo-600 mt-2">
                {grandVerifiedCount} <span className="text-sm font-semibold text-slate-400">({getPercent(grandVerifiedCount, grandTotalStudents)}%)</span>
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
                className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-slate-900 font-semibold"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notPublished && (!user || user.role !== 'super_admin') ? (
          <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
            <div className="text-5xl">🔒</div>
            <h2 className="text-xl font-bold text-slate-800 font-outfit">Student Lists Not Published Yet</h2>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              The student allocation list has not been released by the Super Admin yet. Please check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredData.map((cluster) => (
              <div key={cluster.clusterName} className="space-y-6">
                
                {/* Cluster Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <h2 className="text-2xl font-black font-outfit text-slate-800">
                    Cluster {cluster.clusterName}
                  </h2>
                  <span className="text-xs font-bold text-slate-400">
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
                      <div key={cohort.cohortName} className="glass-card overflow-hidden flex flex-col justify-between border border-slate-100 bg-white">
                        
                        {/* Cohort Header Information */}
                        <div 
                          onClick={() => toggleCohort(cohort.cohortName)}
                          className="p-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-all"
                        >
                          <div className="space-y-1">
                            <h3 className="text-md font-extrabold font-outfit text-slate-800 flex items-center gap-2">
                              Cohort {cohort.cohortName}
                              <span className="text-xs bg-slate-200/60 px-2 py-0.5 rounded-full font-bold text-slate-500">
                                {totalStudents} Students
                              </span>
                            </h3>
                            <span className="text-xs font-bold text-slate-400 block">
                              Leader: {cohort.leaderName}
                            </span>
                          </div>
                          
                          {/* Circle Progress Badge */}
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-black text-emerald-600">
                                {registeredCount} Registered
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">
                                {verifiedCount} Docs Verified
                              </span>
                            </div>
                            <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 h-1">
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
                                      student.notContinuing 
                                        ? 'bg-red-50/50 border-red-100 text-red-700' 
                                        : student.confirmedJklu 
                                        ? 'bg-emerald-50/40 border-emerald-100 text-emerald-800' 
                                        : 'bg-white border-slate-100 text-slate-600'
                                    }`}
                                  >
                                    <div>
                                      <div className="font-extrabold">{student.name}</div>
                                      <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">
                                        {student.applicationNo} • {student.course}
                                      </div>
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="flex flex-wrap gap-1.5 items-center mt-1 sm:mt-0 self-end sm:self-auto">
                                      {student.notContinuing ? (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-700 uppercase">
                                          Not Continuing
                                        </span>
                                      ) : (
                                        <>
                                          {student.documentsVerified && (
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase" title="Documents Verified">
                                              Verified
                                            </span>
                                          )}
                                          {student.confirmedJklu ? (
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 uppercase" title="Registered at JKLU">
                                              Registered
                                            </span>
                                          ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-400 uppercase">
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
                                <div className="text-center text-xs text-slate-400 italic py-4">
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
                <h3 className="text-md font-extrabold text-slate-800 font-outfit mt-4">No matching records found</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Try searching for a different student name, application number, or cohort leader.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 text-center text-xs font-bold text-slate-400">
        <div>JK Lakshmipat University, Jaipur © 2026</div>
      </footer>
    </div>
  );
}
