'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface CohortInfo {
  cohortName: string;
  leaderName: string;
}

interface ClusterInfo {
  clusterName: string;
  head: string | null;
  cohorts: CohortInfo[];
}

export default function PublicHomePage() {
  const [structure, setStructure] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await fetch('/api/status/structure');
        if (res.ok) {
          const data = await res.json();
          setStructure(data);
        }
      } catch (err) {
        console.error('Error fetching structure:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStructure();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] fun-bg-pattern flex flex-col justify-between">
      
      {/* Navbar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-primary font-outfit">Aarambh &apos;26</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">JK Lakshmipat University</span>
          </div>

          <Link
            href="/login"
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            Sign In to Portal
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Body content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        {/* Banner Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-indigo-50 text-3xl rounded-2xl flex items-center justify-center mx-auto animate-float">
            🎓
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-slate-900 leading-none">
            JKLU Orientation Cohorts & Clusters
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-semibold leading-relaxed">
            Welcome to the Aarambh 2026 orientation structure overview. Browse our 12 clusters and 50 cohorts led by university student leaders and coordinators.
          </p>
        </div>

        {loading ? (
          /* Loader */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-3xl"></div>
            ))}
          </div>
        ) : (
          /* Clusters Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {structure.map((cluster) => {
              const isSouth = ['I', 'J', 'K', 'L'].includes(cluster.clusterName);
              return (
                <div key={cluster.clusterName} className="glass-card p-6 border border-slate-100 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                      <span className="text-2xl font-black font-outfit text-slate-800">
                        Cluster {cluster.clusterName}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        isSouth ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {isSouth ? 'South BTech' : 'North Pool'}
                      </span>
                    </div>

                    {/* Cluster Head name */}
                    <div className="mb-4">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Cluster Head</span>
                      <span className="text-sm font-extrabold text-slate-800">{cluster.head || 'To be assigned'}</span>
                    </div>

                    {/* Cohorts under cluster */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Cohorts & Leaders</span>
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {cluster.cohorts.map((cohort) => (
                          <div key={cohort.cohortName} className="flex justify-between items-center text-xs py-1.5 px-3 bg-slate-50/50 rounded-xl font-semibold text-slate-600 border border-slate-100/30">
                            <span className="font-extrabold text-slate-800">{cohort.cohortName}</span>
                            <span className="truncate max-w-[150px]" title={cohort.leaderName}>{cohort.leaderName}</span>
                          </div>
                        ))}
                        {cluster.cohorts.length === 0 && (
                          <span className="text-xs italic text-slate-400 font-normal">No cohorts assigned yet.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
