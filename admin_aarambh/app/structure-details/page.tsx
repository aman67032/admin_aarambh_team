'use client';

import Loader from '../components/Loader';
import PlasmaWave from '../components/PlasmaWave';



import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { useApp } from '../context/AppContext';





interface StudentInfo {

  _id: string;

  name: string;

  applicationNo: string;

  course: string;

  gender: string;

  region: string;

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



export default function StructureDetailsPage() {

  const { user } = useApp();

  const [data, setData] = useState<ClusterInfo[]>([]);

  const [loading, setLoading] = useState(true);

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





  useEffect(() => {

    const fetchAllocations = async () => {

      try {

        const res = await fetch('/api/status/cohort-allocations');

        if (res.ok) {

          const result = await res.json();

          if (result && typeof result === 'object' && 'allocations' in result) {

            setData(result.allocations);

            setNotPublished(!!result.notPublished);

          } else {

            setData(result);

          }

        }

      } catch (err) {

        console.error('Error fetching allocations:', err);

      } finally {

        setLoading(false);

      }

    };

    fetchAllocations();

  }, []);



  return (

    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between fun-bg-pattern relative overflow-hidden">      
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>

      {/* Header */}

      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-card-border/60 z-50 transition-all">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">

            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-12 object-contain" />

            <div className="w-[1px] h-6 bg-card-border/60"></div>

            <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh logo" className="h-16 object-contain" />

            <div className="flex flex-col hidden sm:flex">

              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>

              <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">JKLU</span>

            </div>

          </Link>



          <Link

            href={backLink.href}

            className="px-5 py-2.5 bg-background/80 hover:bg-card-border/60 text-foreground text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"

          >

            ← {backLink.label}

          </Link>

        </div>

      </header>



      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-8">

        <div className="text-center space-y-2 max-w-2xl mx-auto">

          <h1 className="text-3xl font-black font-outfit tracking-tight text-foreground leading-none">

            Cluster Cohort Allocations

          </h1>

          <p className="text-xs text-text-muted font-semibold leading-relaxed">

            Detailed view of Cluster Heads, Cohorts Leaders, and students assigned under them for the orientation program.

          </p>

        </div>



        {loading ? (

          <div className="min-h-[40vh] flex items-center justify-center">

            <Loader scale={0.6} label="Loading structure details..." />

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

          <div className="space-y-12">

            {data.map((cluster) => {

              return (

                <div key={cluster.clusterName} className="glass-card overflow-hidden">

                  

                  {/* Cluster Header */}

                  <div className="p-6 bg-card-bg/50 border-b border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-black font-outfit text-foreground">

                        Cluster {cluster.clusterName} Head

                      </h2>

                      <p className="text-sm font-extrabold text-primary mt-1">

                        Coordinator: {cluster.head || 'To be assigned'}

                      </p>

                    </div>

                  </div>



                  {/* Cohorts under Cluster */}

                  <div className="p-6 space-y-8 divide-y divide-card-border">

                    {cluster.cohorts.map((cohort, idx) => (

                      <div key={cohort.cohortName} className={`pt-6 ${idx === 0 ? 'pt-0' : ''}`}>

                        

                        {/* Cohort Leader Details */}

                        {(() => {

                          const males = cohort.students.filter(s => s.gender.toLowerCase() === 'male').length;

                          const females = cohort.students.filter(s => s.gender.toLowerCase() === 'female').length;

                          const btech = cohort.students.filter(s => s.course === 'B.Tech').length;

                          const bba = cohort.students.filter(s => s.course === 'BBA').length;

                          const bdes = cohort.students.filter(s => s.course === 'B.Des').length;



                          return (

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 bg-card-bg/50/50 p-4 rounded-2xl border border-card-border/60/30">

                              <div>

                                <h3 className="text-md font-extrabold font-outfit text-foreground">

                                  Cohort Leader: {cohort.leaderName}

                                </h3>

                                <span className="text-xs font-bold text-text-muted block mt-0.5">

                                  Leads Cohort {cohort.cohortName}

                                </span>

                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[10px] font-bold uppercase tracking-wider">

                                  <span className="text-indigo-600">

                                    Gender: {males} M / {females} F

                                  </span>

                                  <span className="text-text-muted/60">|</span>

                                  <span className="text-emerald-600">

                                    B.Tech: {btech} • BBA: {bba} • B.Des: {bdes}

                                  </span>

                                </div>

                              </div>

                              <span className="text-xs bg-background/80 px-3 py-1 rounded-full font-bold text-text-muted self-start sm:self-center">

                                {cohort.students.length} Allocated Students

                              </span>

                            </div>

                          );

                        })()}



                        {/* Students list */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {cohort.students.map((student) => (

                            <div key={student._id} className="p-4 bg-white border border-card-border/60 hover:border-primary/20 rounded-2xl shadow-sm transition-all flex justify-between items-center">

                              <div>

                                <div className="text-xs font-extrabold text-foreground">{student.name}</div>

                                <div className="text-[10px] text-text-muted font-bold uppercase mt-1 tracking-wider">

                                  {student.applicationNo} • {student.course}

                                </div>

                              </div>

                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-background/80 text-text-muted capitalize">

                                {student.gender.toLowerCase()}

                              </span>

                            </div>

                          ))}

                          {cohort.students.length === 0 && (

                            <div className="col-span-2 text-center text-xs text-text-muted italic py-4">

                              No students allocated to this cohort yet.

                            </div>

                          )}

                        </div>



                      </div>

                    ))}

                    {cluster.cohorts.length === 0 && (

                      <div className="text-center text-xs text-text-muted italic py-6">

                        No cohorts assigned under Cluster {cluster.clusterName}.

                      </div>

                    )}

                  </div>



                </div>

              );

            })}

          </div>

        )}

      </main>



      {/* Footer */}

      <footer className="py-8 border-t border-card-border/60 text-center text-xs font-bold text-text-muted">

        <div>JK Lakshmipat University, Jaipur © 2026</div>

      </footer>

    </div>

  );

}

