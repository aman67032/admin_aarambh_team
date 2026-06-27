'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Student } from '../lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [distCheck, setDistCheck] = useState<any>(null);
  const [notContinuing, setNotContinuing] = useState<Student[]>([]);
  const [aarambhData, setAarambhData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'performance' | 'correctness' | 'not-continuing' | 'aarambh-verification'>('performance');
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
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
        </div>
        <div className="h-96 bg-slate-200 rounded-3xl mt-6"></div>
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
          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Admin Command Center</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Monitor Cluster Heads performance, check student distribution metrics, and manage students not continuing.
          </p>
        </div>
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="text-5xl">🔒</div>
          <h2 className="text-xl font-bold text-slate-800">Student Lists Not Published Yet</h2>
          <p className="text-slate-500 max-w-md">
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
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Admin Command Center</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          Monitor Cluster Heads performance, check student distribution metrics, and manage students not continuing.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Students</span>
          <div className="text-3xl font-extrabold font-outfit text-slate-900 mt-2">{summary?.totalStudents || 0}</div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Verified (Doc Check)</span>
          <div className="text-3xl font-extrabold font-outfit text-slate-900 mt-2">
            {summary?.verified || 0} <span className="text-sm font-semibold text-slate-400">({Math.round(summary?.verificationRate || 0)}%)</span>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Calls Logged</span>
          <div className="text-3xl font-extrabold font-outfit text-slate-900 mt-2">{summary?.totalCalls || 0}</div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmed Aarambh</span>
          <div className="text-3xl font-extrabold font-outfit text-slate-900 mt-2 text-emerald-600">
            {summary?.confirmedAarambh || 0} <span className="text-sm font-semibold text-slate-400">({Math.round(summary?.confirmationRate || 0)}%)</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-card-border gap-6">
        <button
          onClick={() => setActiveTab('performance')}
          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
          }`}
        >
          Cluster Heads Performance
        </button>
        <button
          onClick={() => setActiveTab('correctness')}
          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'correctness' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
          }`}
        >
          Distribution Correctness ({distCheck?.stats?.warningCohorts || 0} Warnings)
        </button>
        <button
          onClick={() => setActiveTab('aarambh-verification')}
          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'aarambh-verification' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
          }`}
        >
          AARAMBH Verification ({aarambhData?.summary?.registered || 0} Registered)
        </button>
        <button
          onClick={() => setActiveTab('not-continuing')}
          className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'not-continuing' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
          }`}
        >
          Not Continuing Panel ({notContinuing.length})
        </button>
      </div>

      {/* Active Tab Panel */}
      {activeTab === 'performance' && (
        /* Performance Table */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
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
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {overview?.clusters?.map((cluster: any) => (
                  <tr 
                    key={cluster.cluster} 
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors group hover:bg-indigo-50/30"
                    onClick={() => router.push(`/admin/cluster/${cluster.cluster}`)}
                  >
                    <td className="p-4 font-bold text-slate-900">Cluster {cluster.cluster}</td>
                    <td className="p-4">{cluster.headName}</td>
                    <td className="p-4">{cluster.total}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        cluster.verified === cluster.total && cluster.total > 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {cluster.verified} / {cluster.total}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{cluster.calls} calls</td>
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
                <h3 className="text-lg font-extrabold text-slate-900 font-outfit">Distribution Quality Status: {distCheck?.stats?.status}</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Analyzing course ratios (North should be BTech/BBA/BDes mixed) and gender ratios (approaching 50/50) per cohort.
                </p>
              </div>

              {/* Overall Ratios Summary Card */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 font-semibold text-xs text-slate-600">
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Regional Score</span>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>North:</span>
                      <span className="text-slate-800 font-bold">{totalNorth} ({getPercent(totalNorth, overallStudents)}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>South:</span>
                      <span className="text-slate-800 font-bold">{totalSouth} ({getPercent(totalSouth, overallStudents)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Gender Ratio</span>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Male:</span>
                      <span className="text-slate-800 font-bold">{totalMales} ({getPercent(totalMales, overallStudents)}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Female:</span>
                      <span className="text-slate-800 font-bold">{totalFemales} ({getPercent(totalFemales, overallStudents)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Course Ratio</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="block text-slate-400">B.Tech</span>
                      <span className="text-slate-800 font-bold">{totalBtech} ({getPercent(totalBtech, overallStudents)}%)</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">BBA</span>
                      <span className="text-slate-800 font-bold">{totalBba} ({getPercent(totalBba, overallStudents)}%)</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">B.Des</span>
                      <span className="text-slate-800 font-bold">{totalBdes} ({getPercent(totalBdes, overallStudents)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Cohort</th>
                      <th className="p-4">Region</th>
                      <th className="p-4">Students</th>
                      <th className="p-4">Course Splits Ratio</th>
                      <th className="p-4">Gender Ratio</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {cohorts.map((c: any) => (
                      <tr key={c.cohort} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{c.cohort}</td>
                        <td className="p-4 text-xs">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            c.isSouth ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-600'
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
            <h3 className="text-lg font-extrabold font-outfit text-slate-800">Students Not Continuing Admissions</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Collected data of students who decided not to continue at JKLU.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Application No</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Cohort</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Reason Note</th>
                  <th className="p-4">Reported By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {notContinuing.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">{s.name}</td>
                    <td className="p-4">{s.applicationNo}</td>
                    <td className="p-4">{s.course}</td>
                    <td className="p-4 font-bold">{s.cohort}</td>
                    <td className="p-4 text-xs font-normal">
                      <div>Phone: {s.mobile}</div>
                      <div>Email: {s.email}</div>
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-normal max-w-[200px] leading-relaxed">
                      {s.confirmationNote || 'No explanation provided.'}
                    </td>
                    <td className="p-4 text-xs font-normal text-slate-400">
                      {s.confirmedBy ? (s.confirmedBy as any).name : 'Cluster Head'}
                    </td>
                  </tr>
                ))}
                {notContinuing.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-400 font-bold">No students marked as not continuing.</td>
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
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Evaluated</span>
              <div className="text-2xl font-extrabold font-outfit text-slate-900 mt-2">
                {aarambhData?.summary?.totalStudents || 0}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered on Portal</span>
              <div className="text-2xl font-extrabold font-outfit text-emerald-600 mt-2">
                {aarambhData?.summary?.registered || 0}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Registration</span>
              <div className="text-2xl font-extrabold font-outfit text-amber-600 mt-2">
                {aarambhData?.summary?.notRegistered || 0}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registration Rate</span>
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-semibold"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={clusterFilter}
                onChange={(e) => setClusterFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 font-semibold focus:outline-none animate-none"
              >
                <option value="ALL">All Clusters</option>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(c => (
                  <option key={c} value={c}>Cluster {c}</option>
                ))}
              </select>
              <select
                value={regFilter}
                onChange={(e) => setRegFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 font-semibold focus:outline-none animate-none"
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
                  <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Application No</th>
                    <th className="p-4">Cohort</th>
                    <th className="p-4">Cluster</th>
                    <th className="p-4">Registered on Portal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {filteredAarambhStudents?.map((s: any) => (
                    <tr key={s._id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">{s.name}</td>
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
                      <td colSpan={5} className="p-6 text-center text-slate-400 font-bold">
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
    </div>
  );
}
