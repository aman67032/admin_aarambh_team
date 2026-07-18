'use client';

import Loader from '../components/Loader';



import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { api, Student } from '../lib/api';
import { useApp } from '../context/AppContext';
import { shift1Buses, shift2Buses, trekDuties } from '../lib/busRosterData';



export default function AdminDashboard() {
  const { user, loading: appLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!appLoading && user) {
      if (user.email === 'hosteladmin@jklu.edu.in' || user.email === 'kartavya@jklu.edu.in') {
        router.push('/admin/hostel');
      } else if (user.role === 'teammember') {
        router.push('/admin/duty-chart');
      } else if (user.role === 'cohort_leader') {
        router.push('/cohort-leader');
      } else if (user.role === 'cluster_head') {
        router.push('/cluster-head');
      }
    }
  }, [user, appLoading, router]);

  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<any>(null);

  const [distCheck, setDistCheck] = useState<any>(null);

  const [notContinuing, setNotContinuing] = useState<Student[]>([]);

  const [aarambhData, setAarambhData] = useState<any>(null);

  const [batchesData, setBatchesData] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<'performance' | 'correctness' | 'not-continuing' | 'aarambh-verification' | 'batches' | 'bus-trek-slots' | 'registration-slots'>('performance');
  const [busSubTab, setBusSubTab] = useState<'shift1' | 'shift2' | 'trek'>('shift1');
  const [expandedBuses, setExpandedBuses] = useState<Record<string, boolean>>({});
  const toggleBus = (key: string) => {
    setExpandedBuses(prev => ({ ...prev, [key]: !prev[key] }));
  };
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

  const [notPublished, setNotPublished] = useState(false);



  // Filtering for Aarambh Verification

  const [searchQuery, setSearchQuery] = useState('');

  const [clusterFilter, setClusterFilter] = useState('ALL');

  const [regFilter, setRegFilter] = useState('ALL');



  const fetchData = async () => {

    setLoading(true);

    try {

      const overviewData = await api.admin.getOverview();

      setOverview(overviewData);

      setNotPublished(!!overviewData.notPublished);



      const checkData = await api.admin.getDistributionCheck();

      setDistCheck(checkData);



      const notContData = await api.admin.getNotContinuing();

      setNotContinuing(notContData);



      const aarambhVerificationData = await api.admin.getAarambhVerification();

      setAarambhData(aarambhVerificationData);

      const batchesRes = await api.admin.getBatches();
      if (batchesRes && batchesRes.success) {
        setBatchesData(batchesRes.batches);
      }

    } catch (error) {

      console.error('Error fetching admin data:', error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchData();

  }, []);



  if (appLoading || !user || user.email === 'hosteladmin@jklu.edu.in') {
    return (
      <div className="min-h-screen bg-card-bg/50 flex items-center justify-center">
        <Loader scale={0.7} label="Verifying session..." />
      </div>
    );
  }

  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <Loader scale={0.7} label="Loading admin dashboard..." />

      </div>

    );

  }



  const summary = overview?.summary;



  // Filter student registrations

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



  if (notPublished) {

    return (

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Admin Command Center</h1>

          <p className="text-sm text-text-muted font-semibold mt-1">

            Monitor Cluster Heads performance, check student distribution metrics, and manage students not continuing.

          </p>

        </div>

        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">

          <div className="text-5xl">🔒</div>

          <h2 className="text-xl font-bold text-foreground">Student Lists Not Published Yet</h2>

          <p className="text-text-muted max-w-md">

            The student allocation lists have not been released by the Super Admin yet. Please wait until details are finalized.

          </p>

        </div>

      </div>

    );

  }



  return (

    <div className="space-y-8">

      {/* Title */}

      <div>

        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Admin Command Center</h1>

        <p className="text-sm text-text-muted font-semibold mt-1">

          Monitor Cluster Heads performance, check student distribution metrics, and manage students not continuing.

        </p>

      </div>



      {/* Overview Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Students</span>

          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{summary?.totalStudents || 0}</div>

        </div>

        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Verified (Doc Check)</span>

          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">

            {summary?.verified || 0} <span className="text-sm font-semibold text-text-muted">({Math.round(summary?.verificationRate || 0)}%)</span>

          </div>

        </div>

        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Calls Logged</span>

          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{summary?.totalCalls || 0}</div>

        </div>

        <div className="glass-card p-6 flex flex-col justify-between">

          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmed Aarambh</span>

          <div className="text-3xl font-extrabold font-outfit text-foreground mt-2 text-emerald-600">

            {summary?.confirmedAarambh || 0} <span className="text-sm font-semibold text-text-muted">({Math.round(summary?.confirmationRate || 0)}%)</span>

          </div>

        </div>

      </div>



      {/* Tabs */}

      <div className="flex flex-wrap border-b border-card-border gap-6">

        <button

          onClick={() => setActiveTab('performance')}

          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

            activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

          }`}

        >

          Cluster Heads Performance

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

          onClick={() => setActiveTab('aarambh-verification')}

          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

            activeTab === 'aarambh-verification' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

          }`}

        >

          AARAMBH Verification ({aarambhData?.summary?.registered || 0} Registered)

        </button>

        <button

          onClick={() => setActiveTab('not-continuing')}

          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

            activeTab === 'not-continuing' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

          }`}

        >

          Not Continuing & Not Coming Panel ({notContinuing.length})

        </button>

        <button

          onClick={() => setActiveTab('batches')}

          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

            activeTab === 'batches' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

          }`}

        >

          Batch Structure

        </button>

        <button

          onClick={() => setActiveTab('bus-trek-slots')}

          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${

            activeTab === 'bus-trek-slots' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'

          }`}

        >

          Bus & Trek Slots

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

        /* Performance Table */

        <div className="glass-card overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse text-sm">

              <thead>

                <tr className="bg-card-bg/50 border-b border-card-border text-xs font-bold text-text-muted uppercase">

                  <th className="p-4">Cluster</th>

                  <th className="p-4">Cluster Head</th>

                  <th className="p-4">Students Assigned</th>

                  <th className="p-4">Verified</th>

                  <th className="p-4">Calls Logged</th>

                  <th className="p-4">Confirmed (Aarambh)</th>

                  <th className="p-4">Confirmed (JKLU)</th>

                  <th className="p-4">Not Continuing</th>

                  <th className="p-4">Actions</th>

                </tr>

              </thead>

              <tbody className="divide-y divide-card-border font-semibold text-foreground">

                {overview?.clusters?.map((cluster: any) => (

                  <tr 

                    key={cluster.cluster} 

                    className="hover:bg-card-bg/50/50 cursor-pointer transition-colors group hover:bg-indigo-50/30"

                    onClick={() => router.push(`/admin/cluster/${cluster.cluster}`)}

                  >

                    <td className="p-4 font-bold text-foreground">Cluster {cluster.cluster}</td>

                    <td className="p-4">{cluster.headName}</td>

                    <td className="p-4">{cluster.total}</td>

                    <td className="p-4">

                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${

                        cluster.verified === cluster.total && cluster.total > 0

                          ? 'bg-emerald-50 text-emerald-700'

                          : 'bg-background/80 text-foreground'

                      }`}>

                        {cluster.verified} / {cluster.total}

                      </span>

                    </td>

                    <td className="p-4 text-text-muted">{cluster.calls} calls</td>

                    <td className="p-4 text-emerald-600">{cluster.confirmedAarambh}</td>

                    <td className="p-4 text-indigo-600">{cluster.confirmedJklu}</td>

                    <td className="p-4 text-red-500">{cluster.notContinuing}</td>

                    <td className="p-4">

                      <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

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

          /* Distribution Correctness Checker */

          <div className="space-y-6">

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

        /* Not Continuing Students Panel */

        <div className="glass-card overflow-hidden">

          <div className="p-6 border-b border-card-border">

            <h3 className="text-lg font-extrabold font-outfit text-foreground">Students Not Continuing / Not Coming to Aarambh</h3>

            <p className="text-xs text-text-muted font-semibold mt-1">

              Collected data of students who decided not to continue at JKLU or are not coming to Aarambh.

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

                  <th className="p-4">Status / Type</th>

                  <th className="p-4">Reason Note</th>

                  <th className="p-4">Reported By</th>

                </tr>

              </thead>

              <tbody className="divide-y divide-card-border font-semibold text-foreground">

                {notContinuing.map((s) => (

                  <tr 

                    key={s._id} 

                    className={`hover:bg-card-bg/50/50 ${

                      s.notComingAarambh 

                        ? 'bg-red-50/20 text-red-900 border-red-100/50' 

                        : 'bg-card-bg/50/10 text-text-muted border-card-border/60/50'

                    }`}

                  >

                    <td className={`p-4 font-bold ${s.notComingAarambh ? 'text-red-700' : 'text-foreground'}`}>{s.name}</td>

                    <td className="p-4">{s.applicationNo}</td>

                    <td className="p-4">{s.course}</td>

                    <td className="p-4 font-bold">{s.cohort}</td>

                    <td className="p-4 text-xs font-normal">

                      <div>Phone: {s.mobile}</div>

                      <div>Email: {s.email}</div>

                    </td>

                    <td className="p-4">

                      {s.notComingAarambh ? (

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 uppercase">

                          Not Coming (Aarambh)

                        </span>

                      ) : (

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-card-border/60 text-text-muted uppercase">

                          Not Continuing (JKLU)

                        </span>

                      )}

                    </td>

                    <td className="p-4 text-xs font-normal max-w-[200px] leading-relaxed">

                      {s.confirmationNote || 'No explanation provided.'}

                    </td>

                    <td className="p-4 text-xs font-normal">

                      {s.confirmedBy ? (s.confirmedBy as any).name : 'Cluster Head'}

                    </td>

                  </tr>

                ))}

                {notContinuing.length === 0 && (

                  <tr>

                    <td colSpan={8} className="p-6 text-center text-text-muted font-bold">No students marked as not continuing or not coming.</td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      )}



      {activeTab === 'aarambh-verification' && (

        <div className="space-y-6">

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

              <span>⚠️</span>

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

      {activeTab === 'batches' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground font-outfit uppercase tracking-wider">Aarambh &apos;26 Batch Structure</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">14th to 21st July • Attendee Tracking</p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-2" />
          </div>

          {/* Batches 2x2 Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {batchesData.map((batch: any) => {
              const checkInRate = batch.totals.activeAttendees > 0 
                ? Math.round((batch.totals.checkedIn / batch.totals.activeAttendees) * 100) 
                : 0;
              const confirmationRate = batch.totals.activeAttendees > 0 
                ? Math.round((batch.totals.confirmed / batch.totals.activeAttendees) * 100) 
                : 0;

              return (
                <div key={batch.batchName} className="bg-card-bg border border-card-border rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  {/* Header */}
                  <div className="bg-card-bg/50 border-b border-card-border px-5 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-foreground font-outfit">{batch.batchName}</h3>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">
                        {batch.batchName === 'Batch 1' && 'A, E, I'}
                        {batch.batchName === 'Batch 2' && 'B, F, J'}
                        {batch.batchName === 'Batch 3' && 'C, G, K'}
                        {batch.batchName === 'Batch 4' && 'D, H, L'}
                        {' '}• {batch.totals.cohortsCount} Total Cohorts
                      </p>
                    </div>
                    <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold">
                      Active: {batch.totals.activeAttendees}
                    </span>
                  </div>

                  {/* Body Table */}
                  <div className="overflow-x-auto p-4">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-card-border text-[9px] font-bold text-text-muted uppercase tracking-wider">
                          <th className="pb-2">Cluster</th>
                          <th className="pb-2 text-center">Cohorts</th>
                          <th className="pb-2 text-center">Allotted</th>
                          <th className="pb-2 text-center">Not Coming</th>
                          <th className="pb-2 text-center">Active</th>
                          <th className="pb-2 text-center">Confirmed</th>
                          <th className="pb-2 text-center">Checked In</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-card-border/50 font-bold text-foreground">
                        {batch.clusters.map((c: any) => (
                          <tr key={c.clusterName} className="hover:bg-card-bg/30">
                            <td className="py-2.5 font-extrabold text-primary">Cluster {c.clusterName}</td>
                            <td className="py-2.5 text-center text-text-muted">{c.cohortsCount}</td>
                            <td className="py-2.5 text-center">{c.totalAllotted}</td>
                            <td className="py-2.5 text-center text-red-500">{c.notComing}</td>
                            <td className="py-2.5 text-center text-indigo-600">{c.activeAttendees}</td>
                            <td className="py-2.5 text-center text-emerald-600">{c.confirmed}</td>
                            <td className="py-2.5 text-center text-amber-600">{c.checkedIn}</td>
                          </tr>
                        ))}
                        {/* Totals Row */}
                        <tr className="border-t border-card-border bg-card-bg/30 font-extrabold text-foreground">
                          <td className="py-3 text-foreground">Total</td>
                          <td className="py-3 text-center text-text-muted">{batch.totals.cohortsCount}</td>
                          <td className="py-3 text-center">{batch.totals.totalAllotted}</td>
                          <td className="py-3 text-center text-red-500">{batch.totals.notComing}</td>
                          <td className="py-3 text-center text-indigo-600">{batch.totals.activeAttendees}</td>
                          <td className="py-3 text-center text-emerald-600">{batch.totals.confirmed}</td>
                          <td className="py-3 text-center text-amber-600">{batch.totals.checkedIn}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Progress Indicators */}
                  <div className="bg-card-bg/20 border-t border-card-border p-4 space-y-3">
                    {/* Confirmation Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted">
                        <span>Aarambh Confirmation Rate</span>
                        <span className="text-emerald-600">{confirmationRate}% ({batch.totals.confirmed}/{batch.totals.activeAttendees})</span>
                      </div>
                      <div className="w-full bg-card-border rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-1.5 transition-all duration-500" 
                          style={{ width: `${confirmationRate}%` }}
                        />
                      </div>
                    </div>

                    {/* Check-In Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted">
                        <span>Hostel Check-In Progress</span>
                        <span className="text-amber-600">{checkInRate}% ({batch.totals.checkedIn}/{batch.totals.activeAttendees})</span>
                      </div>
                      <div className="w-full bg-card-border rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-amber-500 h-1.5 transition-all duration-500" 
                          style={{ width: `${checkInRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'bus-trek-slots' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground font-outfit uppercase tracking-wider">Bus & Trek Slots Tracker</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Real-time Seat Capacities & Duty Allocations</p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-2" />
          </div>

          {/* Sub Navigation */}
          <div className="flex gap-4 border-b border-card-border pb-2">
            <button
              onClick={() => setBusSubTab('shift1')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                busSubTab === 'shift1' ? 'bg-primary text-white font-extrabold' : 'text-text-muted hover:bg-card-bg/50'
              }`}
            >
              Shift 1 Buses
            </button>
            <button
              onClick={() => setBusSubTab('shift2')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                busSubTab === 'shift2' ? 'bg-primary text-white font-extrabold' : 'text-text-muted hover:bg-card-bg/50'
              }`}
            >
              Shift 2 Buses
            </button>
            <button
              onClick={() => setBusSubTab('trek')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                busSubTab === 'trek' ? 'bg-primary text-white font-extrabold' : 'text-text-muted hover:bg-card-bg/50'
              }`}
            >
              Trek Roster
            </button>
          </div>

          {/* Bus Grid for Shift 1 & 2 */}
          {busSubTab !== 'trek' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {(busSubTab === 'shift1' ? shift1Buses : shift2Buses).map((bus) => {
                const isOverCapacity = bus.empty_seats < 0;
                const isFull = bus.empty_seats === 0;
                const occupancyPercent = Math.min(100, Math.round((bus.total_members / bus.capacity) * 100));
                
                return (
                  <div 
                    key={bus.name} 
                    className={`bg-card-bg border rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 ${
                      isOverCapacity ? 'border-red-200' : 'border-card-border'
                    }`}
                  >
                    {/* Bus Header */}
                    <div className="bg-card-bg/50 border-b border-card-border px-5 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-foreground font-outfit">{bus.name}</h3>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">
                          Capacity: {bus.capacity} Seats
                        </p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${
                        isOverCapacity 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : isFull 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {isOverCapacity ? 'Over Capacity' : isFull ? 'Full' : `${bus.empty_seats} Seats Available`}
                      </span>
                    </div>

                    {/* Bus Details */}
                    <div className="p-5 space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-text-muted">
                          <span>Seat Occupancy</span>
                          <span>{occupancyPercent}% ({bus.total_members}/{bus.capacity})</span>
                        </div>
                        <div className="w-full bg-card-border rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 transition-all duration-500 ${
                              isOverCapacity ? 'bg-red-500' : 'bg-primary'
                            }`} 
                            style={{ width: `${occupancyPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Detail Metrics */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-card-bg/30 border border-card-border/50 p-2.5 rounded-xl">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">New Students</span>
                          <span className="text-base font-extrabold text-foreground font-outfit">{bus.new_students}</span>
                        </div>
                        <div className="bg-card-bg/30 border border-card-border/50 p-2.5 rounded-xl">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Staff & Team</span>
                          <span className="text-base font-extrabold text-foreground font-outfit">{bus.members.length}</span>
                        </div>
                        <div className="bg-card-bg/30 border border-card-border/50 p-2.5 rounded-xl">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Empty Seats</span>
                          <span className={`text-base font-extrabold font-outfit ${isOverCapacity ? 'text-red-500' : 'text-foreground'}`}>{bus.empty_seats}</span>
                        </div>
                      </div>

                      {/* Toggle Collapse Button */}
                      <button
                        onClick={() => toggleBus(`${busSubTab}-${bus.name}`)}
                        className="w-full py-2 bg-card-bg/60 border border-card-border hover:bg-card-bg hover:text-primary rounded-xl text-xs font-bold transition-all text-foreground cursor-pointer flex items-center justify-center gap-1"
                      >
                        {expandedBuses[`${busSubTab}-${bus.name}`] ? 'Hide Passengers ▲' : 'View Passengers ▼'}
                      </button>

                      {/* Passengers Table Collapse */}
                      {expandedBuses[`${busSubTab}-${bus.name}`] && (
                        <div className="border border-card-border rounded-xl overflow-hidden mt-3 animate-slideDown">
                          <table className="w-full text-[11px] text-left border-collapse">
                            <thead>
                              <tr className="bg-card-bg/50 border-b border-card-border text-[9px] font-bold text-text-muted uppercase tracking-wider">
                                <th className="p-2">Type / Cohort</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Phone</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-card-border/50 font-bold text-foreground">
                              {bus.members.map((m, idx) => (
                                <tr key={idx} className="hover:bg-card-bg/30">
                                  <td className="p-2 text-primary">{m.type}</td>
                                  <td className="p-2 text-foreground font-extrabold">{m.name}</td>
                                  <td className="p-2 text-text-muted">{m.phone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Trek Roster Tab */}
          {busSubTab === 'trek' && (
            <div className="space-y-6">
              {/* Group by Trek Category */}
              {Array.from(new Set(trekDuties.map(d => d.group))).map((groupName) => {
                const membersInGroup = trekDuties.filter(d => d.group === groupName);
                
                return (
                  <div key={groupName} className="bg-card-bg border border-card-border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 animate-fadeIn">
                    <div className="bg-card-bg/50 border-b border-card-border px-5 py-4">
                      <h3 className="text-base font-extrabold text-foreground font-outfit uppercase tracking-wider">{groupName}</h3>
                    </div>
                    <div className="overflow-x-auto p-4">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-card-border text-[10px] font-bold text-text-muted uppercase tracking-wider">
                            <th className="pb-2">Shift</th>
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Role / Committee</th>
                            <th className="pb-2">Phone</th>
                            <th className="pb-2">Remarks / Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border/50 font-bold text-foreground">
                          {membersInGroup.map((d, idx) => (
                            <tr key={idx} className="hover:bg-card-bg/30">
                              <td className="py-2.5 text-indigo-600">{d.shift}</td>
                              <td className="py-2.5 font-extrabold text-foreground">{d.name}</td>
                              <td className="py-2.5 text-text-muted">{d.role}</td>
                              <td className="py-2.5 text-foreground">{d.phone}</td>
                              <td className="py-2.5 text-text-muted font-normal italic">{d.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                    const capacity = 16; // default capacity
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

  );

}

