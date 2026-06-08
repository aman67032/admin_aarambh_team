'use client';

import React, { useEffect, useState } from 'react';
import { api, Student } from '../lib/api';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [distCheck, setDistCheck] = useState<any>(null);
  const [notContinuing, setNotContinuing] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<'performance' | 'correctness' | 'not-continuing'>('performance');

  const fetchData = async () => {
    setLoading(true);
    try {
      const overviewData = await api.admin.getOverview();
      setOverview(overviewData);

      const checkData = await api.admin.getDistributionCheck();
      setDistCheck(checkData);

      const notContData = await api.admin.getNotContinuing();
      setNotContinuing(notContData);
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
      <div className="flex border-b border-card-border gap-6">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {overview?.clusters?.map((cluster: any) => (
                  <tr key={cluster.cluster} className="hover:bg-slate-50/50">
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
    </div>
  );
}
