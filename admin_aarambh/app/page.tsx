'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from './context/AppContext';
import Loader from './components/Loader';
import PlasmaWave from './components/PlasmaWave';


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
  const { user, theme } = useApp();
  const isDark = theme === 'fun';
  const jkluLogo = isDark ? '/white_jklu_logo_upscayl_4x_upscayl-standard-4x.png' : '/JKLU Logo.png';
  const aarambhLogo = isDark ? '/new_logo.png' : '/Aarambh_logo_Final-01.svg';
  const [structure, setStructure] = useState<ClusterInfo[]>([]);
  const [loading, setLoading] = useState(true);

  
  // Search state
  const [searchCity, setSearchCity] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    const query = searchCity.toLowerCase().trim();
    const southKeywords = [
      'andhra', 'telangana', 'karnataka', 'tamil', 'kerala', 'goa', 'puducherry', 'pondicherry',
      'hyderabad', 'bangalore', 'bengaluru', 'chennai', 'coimbatore', 'kochi', 'cochin', 'mysore', 'mysuru',
      'trivandrum', 'thiruvananthapuram', 'amaravati', 'visakhapatnam', 'vizag', 'vijayawada', 'ap', 'ts', 'tn', 'ka', 'kl', 'ga'
    ];

    const isSouth = southKeywords.some(keyword => query.includes(keyword));
    
    if (isSouth) {
      setSearchResult('Based on your location, you belong to the South Region. BTech students will be assigned to Clusters I, J, K, L. BBA/B.Des students will be assigned to Clusters A-H.');
    } else {
      setSearchResult('Based on your location, you belong to the North Region. You will be assigned to Clusters A-H.');
    }
  };

  // Filter structure based on leader search query
  const filteredStructure = structure.map(cluster => {
    const matchesCluster = cluster.clusterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cluster.head && cluster.head.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredCohorts = cluster.cohorts.filter(cohort => 
      cohort.cohortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.leaderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesCluster || filteredCohorts.length > 0) {
      return {
        ...cluster,
        cohorts: matchesCluster ? cluster.cohorts : filteredCohorts
      };
    }
    return null;
  }).filter((c): c is ClusterInfo => c !== null);

  return (
    <div className="min-h-screen bg-background fun-bg-pattern flex flex-col justify-between text-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>
      
      {/* Navbar */}
      <header className="sticky top-0 bg-card-bg/85 backdrop-blur-md border-b border-card-border z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={jkluLogo} alt="JKLU Logo" className="h-12 object-contain animate-pulse" />
            <div className="w-[1px] h-6 bg-card-border"></div>
            <img src={aarambhLogo} alt="Aarambh logo" className="h-16 object-contain" />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>
              <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">JKLU</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/duty-chart"
              className="px-4 py-2 border border-violet-500/20 hover:border-violet-500/50 text-violet-600 bg-violet-500/5 hover:bg-violet-500/10 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
            >
              📅 Volunteer Duty Chart
            </Link>
            <Link
              href="/hostel-booking"
              className="px-4 py-2 border border-primary/20 hover:border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
            >
              🏢 Hostel Room Booking
            </Link>
            {user ? (
              <Link
                href={
                  user.role === 'super_admin'
                    ? '/super-admin'
                    : user.role === 'admin'
                    ? '/admin'
                    : user.role === 'cluster_head'
                    ? '/cluster-head'
                    : user.role === 'cohort_leader'
                    ? '/cohort-leader'
                    : '/login'
                }
                className="px-6 py-2.5 btn-premium text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                Go to Dashboard
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 btn-premium text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                Sign In to Portal
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        
        {/* Banner Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-card-bg border border-card-border rounded-2xl flex items-center justify-center mx-auto animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-foreground leading-none">
            JKLU Orientation Cohorts & Clusters
          </h1>
          <p className="text-sm md:text-base text-text-muted font-semibold leading-relaxed">
            Welcome to the Aarambh 2026 orientation structure overview. Browse our 12 clusters and 50 cohorts led by university student leaders and coordinators.
          </p>
        </div>

        {/* Dynamic Location Finder widget */}
        <div className="glass-card p-6 border border-card-border max-w-2xl mx-auto bg-card-bg/60">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-extrabold text-foreground font-outfit">Find Your Cohort Region</h3>
            <p className="text-xs text-text-muted font-semibold">Enter your city or state name below to check your region allocation guidelines.</p>
          </div>
          <form onSubmit={handleSearchLocation} className="flex gap-2">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="e.g. Jaipur, Hyderabad, Karnataka..."
              className="flex-1 px-4 py-2.5 bg-background/50 border border-card-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-semibold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 btn-premium text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
          {searchResult && (
            <div className="mt-4 p-3.5 bg-background/40 border border-card-border text-xs font-semibold text-foreground rounded-xl shadow-sm flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-primary shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{searchResult}</span>
            </div>
          )}
        </div>

        {/* Clusters Structure Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-card-border pb-4">
            <h2 className="text-2xl font-black font-outfit text-foreground">Structure Configuration</h2>
            <div className="w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Leader, Coordinator, Cohort..."
                className="w-full px-4 py-2 bg-background/50 border border-card-border rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-semibold"
              />
            </div>
          </div>
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <Loader scale={0.7} label="Loading structure configuration..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredStructure.map((cluster) => {
                return (
                  <div key={cluster.clusterName} className="glass-card p-6 border border-card-border flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-card-border">
                        <span className="text-2xl font-black font-outfit text-foreground">
                          Cluster {cluster.clusterName}
                        </span>
                      </div>

                      {/* Cluster Head name */}
                      <div className="mb-4">
                        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Cluster Head</span>
                        <span className="text-sm font-extrabold text-foreground">{cluster.head || 'To be assigned'}</span>
                      </div>

                      {/* Cohorts under cluster */}
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block mb-2">Cohort Leaders</span>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                          {cluster.cohorts.map((cohort) => (
                            <div key={cohort.cohortName} className="flex justify-between items-center text-xs py-1.5 px-3 bg-background/40 rounded-xl font-semibold text-text-muted border border-card-border/50">
                              <span className="font-extrabold text-foreground">{cohort.cohortName}</span>
                              <span className="truncate max-w-[150px]" title={cohort.leaderName}>{cohort.leaderName}</span>
                            </div>
                          ))}
                          {cluster.cohorts.length === 0 && (
                            <span className="text-xs italic text-text-muted font-normal">No cohorts assigned yet.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredStructure.length === 0 && (
                <div className="col-span-full text-center py-12 text-xs font-bold text-text-muted">
                  No matching leaders, cohorts, or coordinators found.
                </div>
              )}
            </div>
          )}
        </div>
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
