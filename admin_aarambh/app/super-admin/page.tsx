'use client';

import Loader from '../components/Loader';



import React, { useEffect, useState } from 'react';

import { api, DistributionStats } from '../lib/api';

import Link from 'next/link';



export default function SuperAdminDashboard() {

  const [stats, setStats] = useState<DistributionStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [adminOverview, setAdminOverview] = useState<any>(null);

  const [distCheck, setDistCheck] = useState<any>(null);

  const [notContinuing, setNotContinuing] = useState<any[]>([]);

  const [aarambhData, setAarambhData] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'performance' | 'correctness' | 'not-continuing' | 'aarambh-verification' | 'registration-slots'>('performance');
  const [bookingDate, setBookingDate] = useState('2026-07-22');
  const [bookingCourse, setBookingCourse] = useState('all');
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [expandedSlots, setExpandedSlots] = useState<Record<string, boolean>>({});

  const fetchBookingData = async (date: string, course: string) => {
    setBookingsLoading(true);
    try {
      const url = `/api/timeslot/admin/all?date=${date}${course !== 'all' ? `&course=${encodeURIComponent(course)}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setBookingData(data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'registration-slots') {
      fetchBookingData(bookingDate, bookingCourse);
    }
  }, [activeTab, bookingDate, bookingCourse]);

  const [studentsPublished, setStudentsPublished] = useState(false);

  const [toggling, setToggling] = useState(false);
  const [backingUp, setBackingUp] = useState(false);



  // Filtering for Aarambh Verification

  const [searchQuery, setSearchQuery] = useState('');

  const [clusterFilter, setClusterFilter] = useState('ALL');

  const [regFilter, setRegFilter] = useState('ALL');



  const handleBackupDatabase = async () => {
    setBackingUp(true);
    try {
      const res = await api.admin.backupDatabase();
      if (res.success) {
        alert(res.message || 'Database backup completed successfully!');
      }
    } catch (error: any) {
      console.error('Failed to backup database:', error);
      alert('Failed to backup database: ' + error.message);
    } finally {
      setBackingUp(false);
    }
  };

  const handleTogglePublished = async () => {

    setToggling(true);

    try {

      const res = await api.admin.updateSettings(!studentsPublished);

      if (res.success) {

        setStudentsPublished(res.studentsPublished);

      }

    } catch (error) {

      console.error('Failed to update publication status:', error);

      alert('Failed to update publication status.');

    } finally {

      setStudentsPublished(prev => prev); // refresh state

      setToggling(false);

    }

  };



  useEffect(() => {

    const fetchStats = async () => {

      try {

        const distStats = await api.distribution.getStats();

        setStats(distStats);

        

        const overview = await api.admin.getOverview();

        setAdminOverview(overview);



        const checkData = await api.admin.getDistributionCheck();

        setDistCheck(checkData);



        const notContData = await api.admin.getNotContinuing();

        setNotContinuing(notContData);



        const aarambhVerificationData = await api.admin.getAarambhVerification();

        setAarambhData(aarambhVerificationData);



        // Fetch global settings

        const settings = await api.admin.getSettings();

        setStudentsPublished(settings.studentsPublished);

      } catch (error) {

        console.error('Failed to load stats:', error);

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, []);



  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <Loader scale={0.7} label="Loading super admin dashboard..." />

      </div>

    );

  }



  const hasStudents = stats && stats.totalStudents > 0;



  // Filter student registrations for Aarambh Verification

  const filteredAarambhStudents = (aarambhData?.students || []).filter((s: any) => {

    const matchesSearch = 

      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

      s.applicationNo.toLowerCase().includes(searchQuery.toLowerCase());

    

    const matchesCluster = clusterFilter === 'ALL' || s.cluster === clusterFilter;

    

    const matchesReg = regFilter === 'ALL' || 

      (regFilter === 'REGISTERED' && s.registeredOnPortal) ||

      (regFilter === 'PENDING' && !s.registeredOnPortal);



    return matchesSearch && matchesCluster && matchesReg;

  });



  return (

    <div className="space-y-8">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Super Admin Dashboard</h1>

          <p className="text-sm text-text-muted font-semibold mt-1">Manage student orientation cohorts and team alignment.</p>

        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">

          <div className="flex items-center gap-3 bg-white border border-card-border px-4 py-2 rounded-full shadow-sm">

            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Publish List to Team</span>

            <button

              onClick={handleTogglePublished}

              disabled={toggling}

              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${

                studentsPublished ? 'bg-indigo-600' : 'bg-card-border/60'

              }`}

            >

              <span

                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${

                  studentsPublished ? 'translate-x-6' : 'translate-x-1'

                }`}

              />

            </button>

          </div>

          <div className="flex gap-3">

            <Link

              href="/super-admin/distribution"

              className="px-5 py-2.5 rounded-full text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-md transition-all cursor-pointer"

            >

              Manage Distribution

            </Link>

            <Link

              href="/super-admin/email"

              className="px-5 py-2.5 rounded-full text-xs font-bold bg-background/80 hover:bg-card-border/60 text-foreground transition-all cursor-pointer"

            >

              Email System

            </Link>

          </div>

        </div>

      </div>



      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Distributed</span>

          <div className="flex items-baseline gap-2 mt-4">

            <span className="text-4xl font-extrabold font-outfit text-foreground">{stats?.totalStudents || 0}</span>

            <span className="text-xs text-text-muted font-semibold">students</span>

          </div>

        </div>



        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">North Region</span>

          <div className="flex items-baseline gap-2 mt-4">

            <span className="text-4xl font-extrabold font-outfit text-foreground">{stats?.northCount || 0}</span>

            <span className="text-xs text-text-muted font-semibold">students</span>

          </div>

        </div>



        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">South Region</span>

          <div className="flex items-baseline gap-2 mt-4">

            <span className="text-4xl font-extrabold font-outfit text-foreground">{stats?.southCount || 0}</span>

            <span className="text-xs text-text-muted font-semibold">students</span>

          </div>

        </div>



        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Verification Rate</span>

          <div className="flex items-baseline gap-2 mt-4">

            <span className="text-4xl font-extrabold font-outfit text-foreground">

              {adminOverview?.summary?.verificationRate ? Math.round(adminOverview.summary.verificationRate) : 0}%

            </span>

            <span className="text-xs text-text-muted font-semibold">

              ({adminOverview?.summary?.verified || 0} verified)

            </span>

          </div>

        </div>

      </div>



      {!hasStudents ? (

        /* Empty State */

        <div className="glass-card p-12 text-center flex flex-col items-center max-w-2xl mx-auto mt-8">

          <div className="w-20 h-20 rounded-full bg-card-bg/50 flex items-center justify-center mb-6 text-4xl animate-bounce-subtle">

            📁

          </div>

          <h2 className="text-2xl font-extrabold text-foreground font-outfit">No Students Uploaded Yet</h2>

          <p className="text-text-muted font-semibold text-sm max-w-md mt-2 mb-6">

            Upload the registration CSV containing new student details. The system will automatically classify and distribute them across cohorts.

          </p>

          <Link

            href="/super-admin/distribution"

            className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-100 transition-all cursor-pointer flex items-center gap-2"

          >

            Upload CSV & Distribute

            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>

            </svg>

          </Link>

        </div>

      ) : (

        <div className="space-y-6">

          {/* Tabs */}

          <div className="flex border-b border-card-border gap-6">

            <button

              onClick={() => setActiveTab('performance')}

              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

                activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

              }`}

            >

              Clusters Performance

            </button>

            <button

              onClick={() => setActiveTab('correctness')}

              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

                activeTab === 'correctness' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

              }`}

            >

              Distribution Correctness ({distCheck?.stats?.warningCohorts || 0} Warnings)

            </button>

            <button

              onClick={() => setActiveTab('not-continuing')}

              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

                activeTab === 'not-continuing' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

              }`}

            >

              Not Continuing Panel ({notContinuing.length})

            </button>

            <button

              onClick={() => setActiveTab('aarambh-verification')}

              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

                activeTab === 'aarambh-verification' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

              }`}

            >

              Aarambh Portal Verification

            </button>

            <button

              onClick={() => setActiveTab('registration-slots')}

              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

                activeTab === 'registration-slots' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

              }`}

            >

              Registration Slots

            </button>

          </div>



          {/* Active Tab Panel */}

          {activeTab === 'performance' && (

            <div className="space-y-6 animate-fade-in">

              <h2 className="text-xl font-extrabold font-outfit text-foreground">Clusters Performance Summary</h2>

              

              <div className="glass-card overflow-hidden border border-card-border shadow-sm">

                <div className="overflow-x-auto">

                  <table className="w-full text-left border-collapse text-xs">

                    <thead>

                      <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[10px]">

                        <th className="px-5 py-3.5">Cluster Name</th>

                        <th className="px-5 py-3.5">Head</th>

                        <th className="px-5 py-3.5 text-center">Total Allotment</th>

                        <th className="px-5 py-3.5 text-center">Not Coming / Continuing</th>

                        <th className="px-5 py-3.5 text-center">Registered Number</th>

                        <th className="px-5 py-3.5 text-center">Pending</th>

                        <th className="px-5 py-3.5 text-center">Calls</th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-card-border font-semibold">

                      {adminOverview?.clusters?.map((cluster: any) => {

                        const pending = cluster.total - cluster.notContinuing - cluster.confirmedJklu;

                        return (

                          <tr key={cluster.cluster} className="hover:bg-background/30 transition-colors">

                            <td className="px-5 py-3.5 text-foreground font-extrabold">Cluster {cluster.cluster}</td>

                            <td className="px-5 py-3.5 text-foreground">{cluster.headName}</td>

                            <td className="px-5 py-3.5 text-center text-foreground">{cluster.total}</td>

                            <td className="px-5 py-3.5 text-center text-red-500">{cluster.notContinuing}</td>

                            <td className="px-5 py-3.5 text-center text-emerald-600">{cluster.confirmedJklu}</td>

                            <td className="px-5 py-3.5 text-center text-amber-500">{pending}</td>

                            <td className="px-5 py-3.5 text-center text-text-muted">{cluster.calls}</td>

                          </tr>

                        );

                      })}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}



          {activeTab === 'correctness' && (() => {

            const cohorts = distCheck?.cohorts || [];

            let totalBtech = 0, totalBba = 0, totalBdes = 0;

            let totalMales = 0, totalFemales = 0;

            let totalNorth = 0, totalSouth = 0;

            let overallStudents = 0;



            cohorts.forEach((c: any) => {

              totalBtech += c.btech;

              totalBba += c.bba;

              totalBdes += c.bdes;

              totalMales += c.males;

              totalFemales += c.females;

              if (c.isSouth) {

                totalSouth += c.total;

              } else {

                totalNorth += c.total;

              }

              overallStudents += c.total;

            });



            const getPercent = (count: number, total: number) => {

              if (!total) return 0;

              return Math.round((count / total) * 100);

            };



            return (

              <div className="space-y-6 animate-fade-in">

                <div className="glass-card p-6 border-l-4 border-l-primary space-y-6">

                  <div>

                    <h3 className="text-lg font-extrabold text-foreground font-outfit">Distribution Quality Status: {distCheck?.stats?.status}</h3>

                    <p className="text-xs text-text-muted font-semibold mt-1">

                      Analyzing course ratios (North should be BTech/BBA/BDes mixed) and gender ratios (approaching 50/50) per cohort.

                    </p>

                  </div>



                  {/* Overall Ratios Summary Card */}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-card-border/60 font-semibold text-xs text-text-muted">

                    <div className="space-y-2">

                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Regional Score</span>

                      <div className="space-y-1">

                        <div className="flex justify-between">

                          <span>North:</span>

                          <span className="text-foreground font-bold">{totalNorth} ({getPercent(totalNorth, overallStudents)}%)</span>

                        </div>

                        <div className="flex justify-between">

                          <span>South:</span>

                          <span className="text-foreground font-bold">{totalSouth} ({getPercent(totalSouth, overallStudents)}%)</span>

                        </div>

                      </div>

                    </div>



                    <div className="space-y-2">

                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Overall Gender Ratio</span>

                      <div className="space-y-1">

                        <div className="flex justify-between">

                          <span>Male:</span>

                          <span className="text-foreground font-bold">{totalMales} ({getPercent(totalMales, overallStudents)}%)</span>

                        </div>

                        <div className="flex justify-between">

                          <span>Female:</span>

                          <span className="text-foreground font-bold">{totalFemales} ({getPercent(totalFemales, overallStudents)}%)</span>

                        </div>

                      </div>

                    </div>



                    <div className="space-y-2 md:col-span-2">

                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Overall Course Ratio</span>

                      <div className="grid grid-cols-3 gap-2">

                        <div>

                          <span className="block text-text-muted">B.Tech</span>

                          <span className="text-foreground font-bold">{totalBtech} ({getPercent(totalBtech, overallStudents)}%)</span>

                        </div>

                        <div>

                          <span className="block text-text-muted">BBA</span>

                          <span className="text-foreground font-bold">{totalBba} ({getPercent(totalBba, overallStudents)}%)</span>

                        </div>

                        <div>

                          <span className="block text-text-muted">B.Des</span>

                          <span className="text-foreground font-bold">{totalBdes} ({getPercent(totalBdes, overallStudents)}%)</span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>



                <div className="glass-card overflow-hidden">

                  <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse text-sm">

                      <thead>

                        <tr className="bg-card-bg/50 border-b border-card-border text-xs font-bold text-text-muted uppercase">

                          <th className="p-4">Cohort</th>

                          <th className="p-4">Region</th>

                          <th className="p-4">Students</th>

                          <th className="p-4">Course Splits Ratio</th>

                          <th className="p-4">Gender Ratio</th>

                          <th className="p-4">Status</th>

                        </tr>

                      </thead>

                      <tbody className="divide-y divide-card-border font-semibold text-foreground">

                        {cohorts.map((c: any) => (

                          <tr key={c.cohort} className="hover:bg-card-bg/50/50">

                            <td className="p-4 font-bold text-foreground">{c.cohort}</td>

                            <td className="p-4 text-xs">

                              <span className={`px-2 py-0.5 rounded-full font-bold ${

                                c.isSouth ? 'bg-teal-50 text-teal-600' : 'bg-background/80 text-text-muted'

                              }`}>

                                {c.isSouth ? 'South' : 'North'}

                              </span>

                            </td>

                            <td className="p-4">{c.total}</td>

                            <td className="p-4 text-xs font-normal">

                              B.Tech: {getPercent(c.btech, c.total)}% | BBA: {getPercent(c.bba, c.total)}% | B.Des: {getPercent(c.bdes, c.total)}%

                            </td>

                            <td className="p-4 text-xs font-normal">

                              M: {getPercent(c.males, c.total)}% / F: {getPercent(c.females, c.total)}%

                            </td>

                            <td className="p-4">

                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${

                                c.status === 'Correct' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'

                              }`}>

                                {c.status}

                              </span>

                              {c.reasons && c.reasons.length > 0 && (

                                <div className="text-[10px] text-amber-600 font-normal mt-1 space-y-0.5">

                                  {c.reasons.map((r: string, idx: number) => (

                                    <div key={idx}>• {r}</div>

                                  ))}

                                </div>

                              )}

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            );

          })()}



          {activeTab === 'not-continuing' && (

            <div className="glass-card overflow-hidden animate-fade-in">

              <div className="p-6 border-b border-card-border">

                <h3 className="text-lg font-extrabold font-outfit text-foreground">Students Not Continuing Admissions</h3>

                <p className="text-xs text-text-muted font-semibold mt-1">

                  Collected data of students who decided not to continue at JKLU.

                </p>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse text-sm">

                  <thead>

                    <tr className="bg-card-bg/50 border-b border-card-border text-xs font-bold text-text-muted uppercase">

                      <th className="p-4">Student Name</th>

                      <th className="p-4">Application No</th>

                      <th className="p-4">Course</th>

                      <th className="p-4">Cohort</th>

                      <th className="p-4">Contact Info</th>

                      <th className="p-4">Reason Note</th>

                      <th className="p-4">Reported By</th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-card-border font-semibold text-foreground">

                    {notContinuing.map((s: any) => (

                      <tr key={s._id} className="hover:bg-card-bg/50/50">

                        <td className="p-4 font-bold text-foreground">{s.name}</td>

                        <td className="p-4">{s.applicationNo}</td>

                        <td className="p-4">{s.course}</td>

                        <td className="p-4 font-bold">{s.cohort}</td>

                        <td className="p-4 text-xs font-normal">

                          <div>Phone: {s.mobile}</div>

                          <div>Email: {s.email}</div>

                        </td>

                        <td className="p-4 text-xs text-text-muted font-normal max-w-[200px] leading-relaxed">

                          {s.confirmationNote || 'No explanation provided.'}

                        </td>

                        <td className="p-4 text-xs font-normal text-text-muted">

                          {s.confirmedBy ? s.confirmedBy.name : 'Cluster Head'}

                        </td>

                      </tr>

                    ))}

                    {notContinuing.length === 0 && (

                      <tr>

                        <td colSpan={7} className="p-6 text-center text-text-muted font-bold">No students marked as not continuing.</td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}



          {activeTab === 'aarambh-verification' && (

            <div className="space-y-6 animate-fade-in">

              {/* Stats cards for verification */}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="glass-card p-6 flex flex-col justify-between">

                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Evaluated</span>

                  <div className="text-2xl font-extrabold font-outfit text-foreground mt-2">

                    {aarambhData?.summary?.totalStudents || 0}

                  </div>

                </div>

                <div className="glass-card p-6 flex flex-col justify-between">

                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Registered on Portal</span>

                  <div className="text-2xl font-extrabold font-outfit text-emerald-600 mt-2">

                    {aarambhData?.summary?.registered || 0}

                  </div>

                </div>

                <div className="glass-card p-6 flex flex-col justify-between">

                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Pending Registration</span>

                  <div className="text-2xl font-extrabold font-outfit text-amber-600 mt-2">

                    {aarambhData?.summary?.notRegistered || 0}

                  </div>

                </div>

                <div className="glass-card p-6 flex flex-col justify-between">

                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Registration Rate</span>

                  <div className="text-2xl font-extrabold font-outfit text-indigo-600 mt-2">

                    {Math.round(aarambhData?.summary?.registrationRate || 0)}%

                  </div>

                </div>

              </div>



              {/* Filtering and search controls */}

              <div className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="flex-1">

                  <input

                    type="text"

                    value={searchQuery}

                    onChange={(e) => setSearchQuery(e.target.value)}

                    placeholder="Search by student name or application number..."

                    className="w-full px-4 py-2.5 bg-card-bg/50 border border-card-border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-foreground font-semibold"

                  />

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <select

                    value={clusterFilter}

                    onChange={(e) => setClusterFilter(e.target.value)}

                    className="px-3 py-2 bg-card-bg/50 border border-card-border rounded-2xl text-xs text-foreground font-semibold focus:outline-none animate-none"

                  >

                    <option value="ALL">All Clusters</option>

                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(c => (

                      <option key={c} value={c}>Cluster {c}</option>

                    ))}

                  </select>

                  <select

                    value={regFilter}

                    onChange={(e) => setRegFilter(e.target.value)}

                    className="px-3 py-2 bg-card-bg/50 border border-card-border rounded-2xl text-xs text-foreground font-semibold focus:outline-none animate-none"

                  >

                    <option value="ALL">All Statuses</option>

                    <option value="REGISTERED">Registered</option>

                    <option value="PENDING">Pending Portal</option>

                  </select>

                </div>

              </div>



              {aarambhData?.usingFallback && (

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-xs font-semibold flex items-center gap-2">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-amber-600 shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>

                  <span>Showing deterministic verification cache. Direct connection to external Firebase failed ({aarambhData.fallbackReason || 'Access Denied'}).</span>

                </div>

              )}



              {/* Verification Table */}

              <div className="glass-card overflow-hidden">

                <div className="overflow-x-auto">

                  <table className="w-full text-left border-collapse text-sm">

                    <thead>

                      <tr className="bg-card-bg/50 border-b border-card-border text-xs font-bold text-text-muted uppercase">

                        <th className="p-4">Student Name</th>

                        <th className="p-4">Application No</th>

                        <th className="p-4">Cohort</th>

                        <th className="p-4">Cluster</th>

                        <th className="p-4">Registered on Portal</th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-card-border font-semibold text-foreground">

                      {filteredAarambhStudents?.map((s: any) => (

                        <tr key={s._id} className="hover:bg-card-bg/50/50">

                          <td className="p-4 font-bold text-foreground">{s.name}</td>

                          <td className="p-4 font-mono text-xs">{s.applicationNo}</td>

                          <td className="p-4 font-bold">{s.cohort}</td>

                          <td className="p-4">Cluster {s.cluster}</td>

                          <td className="p-4">

                            {s.registeredOnPortal ? (

                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">

                                ✓ Registered

                              </span>

                            ) : (

                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">

                                ✗ Pending

                              </span>

                            )}

                          </td>

                        </tr>

                      ))}

                      {filteredAarambhStudents?.length === 0 && (

                        <tr>

                          <td colSpan={5} className="p-6 text-center text-text-muted font-bold">

                            No students match the criteria.

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}

          {activeTab === 'registration-slots' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Card */}
              <div className="bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm text-center space-y-2">
                <h2 className="text-2xl font-black text-foreground font-outfit uppercase tracking-wider">Registration Slot Bookings</h2>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">July 22 - 24 Slot Reservation & Desk Status</p>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-2" />
              </div>

              {/* Controls: Date Tabs and Course Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-4">
                {/* Date tabs */}
                <div className="flex gap-2">
                  {['2026-07-22', '2026-07-23', '2026-07-24'].map((dateStr) => {
                    const dayLabel = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setBookingDate(dateStr)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          bookingDate === dateStr
                            ? 'bg-primary text-white shadow-md font-extrabold'
                            : 'bg-card-bg/40 border border-card-border text-text-muted hover:bg-card-bg'
                        }`}
                      >
                        {dayLabel} (July)
                      </button>
                    );
                  })}
                </div>

                {/* Course Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-muted">Course:</span>
                  <select
                    value={bookingCourse}
                    onChange={(e) => setBookingCourse(e.target.value)}
                    className="bg-card-bg border border-card-border text-foreground px-3 py-1.5 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all"
                  >
                    <option value="all">All Courses</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="BBA">BBA</option>
                  </select>
                </div>
              </div>

              {/* Loading Indicator */}
              {bookingsLoading ? (
                <div className="min-h-[30vh] flex items-center justify-center">
                  <Loader scale={0.5} label="Loading slot details..." />
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 flex flex-col justify-between">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Booked Students</span>
                      <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{bookingData?.total || 0}</div>
                    </div>
                    <div className="glass-card p-6 flex flex-col justify-between">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">B.Tech Bookings</span>
                      <div className="text-3xl font-extrabold font-outfit text-indigo-600 mt-2">
                        {Object.values(bookingData?.grouped || {}).flat().filter((b: any) => b.course === 'B.Tech').length}
                      </div>
                    </div>
                    <div className="glass-card p-6 flex flex-col justify-between">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">BBA Bookings</span>
                      <div className="text-3xl font-extrabold font-outfit text-violet-600 mt-2">
                        {Object.values(bookingData?.grouped || {}).flat().filter((b: any) => b.course === 'BBA').length}
                      </div>
                    </div>
                  </div>

                  {/* Slots List */}
                  <div className="space-y-4">
                    {bookingData?.grouped && Object.keys(bookingData.grouped).length > 0 ? (
                      Object.keys(bookingData.grouped).sort().map((timeSlot) => {
                        const slotBookings = bookingData.grouped[timeSlot] || [];
                        const capacity = 16;
                        const bookedCount = slotBookings.length;
                        const occupancyPercent = Math.min(100, Math.round((bookedCount / capacity) * 100));
                        const isExpanded = !!expandedSlots[timeSlot];
                        
                        return (
                          <div 
                            key={timeSlot} 
                            className="bg-card-bg border border-card-border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                          >
                            {/* Slot Summary */}
                            <div 
                              onClick={() => setExpandedSlots(prev => ({ ...prev, [timeSlot]: !prev[timeSlot] }))}
                              className="px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-card-bg/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">⏰</span>
                                <div>
                                  <h4 className="text-sm font-extrabold text-foreground font-outfit">{timeSlot}</h4>
                                  <p className="text-[10px] text-text-muted font-bold uppercase mt-0.5">
                                    {bookedCount} Students Booked
                                  </p>
                                </div>
                              </div>

                              {/* Progress bar in header */}
                              <div className="flex items-center gap-4 w-full md:w-64">
                                <div className="w-full bg-card-border rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-primary h-2 transition-all duration-500" 
                                    style={{ width: `${occupancyPercent}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-foreground whitespace-nowrap">
                                  {bookedCount} / {capacity}
                                </span>
                              </div>
                            </div>

                            {/* Expandable Booking Details */}
                            {isExpanded && (
                              <div className="border-t border-card-border p-4 bg-card-bg/10 animate-slideDown">
                                <div className="overflow-x-auto rounded-xl border border-card-border">
                                  <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                      <tr className="bg-card-bg/60 border-b border-card-border text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                        <th className="p-3">Application No</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Course</th>
                                        <th className="p-3 text-center">Desk Number</th>
                                        <th className="p-3 text-center">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-card-border/50 font-bold text-foreground">
                                      {slotBookings.map((b: any) => (
                                        <tr key={b._id} className="hover:bg-card-bg/20">
                                          <td className="p-3 text-primary">{b.applicationNo}</td>
                                          <td className="p-3 text-foreground font-extrabold">{b.name}</td>
                                          <td className="p-3 text-text-muted">{b.course}</td>
                                          <td className="p-3 text-center">
                                            <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black">
                                              Desk {b.deskNumber}
                                            </span>
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                              b.status === 'booked'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                              {b.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
                        <span className="text-4xl">📅</span>
                        <h4 className="text-base font-bold text-foreground">No bookings recorded for this date/filter.</h4>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          )}

        </div>

      )}

    </div>

  );

}

