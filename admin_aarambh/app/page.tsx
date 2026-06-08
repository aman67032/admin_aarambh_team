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
  
  // Search state
  const [searchCity, setSearchCity] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      q: "What is Aarambh 2026?",
      a: "Aarambh is the official orientation program of JK Lakshmipat University. It marks the beginning of your academic journey and helps you transition smoothly into university life."
    },
    {
      q: "How are student cohorts distributed?",
      a: "Cohorts are distributed automatically based on course and regional criteria. South BTech students are allocated to Clusters I, J, K, and L, while North students and other programs are distributed across Clusters A through H to maintain balanced class ratios."
    },
    {
      q: "Who is my Cohort Leader and how do I contact them?",
      a: "Your cohort leader is a senior student coordinator assigned to guide you. Once the official emails are sent, you will receive your cohort leader's contact number and email directly in your inbox."
    },
    {
      q: "What documents do I need to bring for verification?",
      a: "Please bring your original 10th and 12th marksheets, admission letter, ID proof (Aadhar Card), and passport-size photographs. Your Cohort Leader will verify these documents upon your arrival."
    }
  ];

  const timelineDays = [
    {
      day: "Day 01",
      title: "Welcome & Registrations",
      desc: "Document verification, hostel allotment, and meeting your respective Cohort Leaders."
    },
    {
      day: "Day 02",
      title: "Orientation & Ice Breaking",
      desc: "Vice Chancellor address, departmental introductory workshops, and cohort group tasks."
    },
    {
      day: "Day 03",
      title: "Campus Quest & Culture",
      desc: "An interactive campus exploration quest followed by talent performances and networking."
    },
    {
      day: "Day 04",
      title: "Clubs & Registrations",
      desc: "Academic course enrollment and introduction to student clubs, sports, and cultural wings."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] fun-bg-pattern flex flex-col justify-between">
      
      {/* Navbar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-8 object-contain" />
            <div className="w-[1px] h-6 bg-slate-200"></div>
            <img src="/AARAMBH26_Main logo.png" alt="Aarambh logo" className="h-10 object-contain" />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">JKLU</span>
            </div>
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        
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

        {/* Dynamic Location Finder widget */}
        <div className="glass-card p-6 border border-slate-100 max-w-2xl mx-auto bg-gradient-to-r from-orange-50/50 to-blue-50/50">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-extrabold text-slate-800 font-outfit">Find Your Cohort Region</h3>
            <p className="text-xs text-slate-400 font-semibold">Enter your city or state name below to check your region allocation guidelines.</p>
          </div>
          <form onSubmit={handleSearchLocation} className="flex gap-2">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="e.g. Jaipur, Hyderabad, Karnataka..."
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 font-semibold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-secondary text-white text-xs font-bold rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
          {searchResult && (
            <div className="mt-4 p-3.5 bg-white border border-slate-100 text-xs font-semibold text-slate-700 rounded-xl shadow-sm">
              ℹ️ {searchResult}
            </div>
          )}
        </div>

        {/* Clusters Structure Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black font-outfit text-slate-900 text-center">Structure configuration</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-3xl"></div>
              ))}
            </div>
          ) : (
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
        </div>

        {/* Orientation Highlights Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto pt-6">
          <h2 className="text-2xl font-black font-outfit text-slate-900 text-center">Aarambh &apos;26 Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineDays.map((day, idx) => (
              <div key={idx} className="glass-card p-5 border border-slate-100 hover:scale-[1.02] flex flex-col justify-between">
                <span className="text-3xl font-black font-outfit text-primary/30 block mb-2">{day.day}</span>
                <h4 className="text-sm font-extrabold text-slate-800">{day.title}</h4>
                <p className="text-xs text-slate-400 font-semibold mt-2">{day.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-8 max-w-3xl mx-auto pt-6">
          <h2 className="text-2xl font-black font-outfit text-slate-900 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx} className="glass-card p-4 border border-slate-100 cursor-pointer overflow-hidden transition-all duration-300" onClick={() => setExpandedFaq(isExpanded ? null : idx)}>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-extrabold text-slate-800">{faq.q}</span>
                    <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {isExpanded && (
                    <div className="mt-3 text-xs text-slate-500 font-semibold leading-relaxed border-t border-slate-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 text-center text-xs font-bold text-slate-400">
        <div>JK Lakshmipat University, Jaipur © 2026</div>
      </footer>
    </div>
  );
}
