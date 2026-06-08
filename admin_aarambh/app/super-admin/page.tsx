'use client';

import React, { useEffect, useState } from 'react';
import { api, DistributionStats } from '../lib/api';
import Link from 'next/link';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<DistributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminOverview, setAdminOverview] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const distStats = await api.distribution.getStats();
        setStats(distStats);
        
        const overview = await api.admin.getOverview();
        setAdminOverview(overview);
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

  const hasStudents = stats && stats.totalStudents > 0;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Super Admin Dashboard</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">Manage student orientation cohorts and team alignment.</p>
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
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            Email System
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Distributed</span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-extrabold font-outfit text-slate-900">{stats?.totalStudents || 0}</span>
            <span className="text-xs text-text-muted font-semibold">students</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">North Region</span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-extrabold font-outfit text-slate-900">{stats?.northCount || 0}</span>
            <span className="text-xs text-text-muted font-semibold">students</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">South Region</span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-extrabold font-outfit text-slate-900">{stats?.southCount || 0}</span>
            <span className="text-xs text-text-muted font-semibold">students</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Verification Rate</span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-extrabold font-outfit text-slate-900">
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
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-4xl animate-bounce-subtle">
            📁
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">No Students Uploaded Yet</h2>
          <p className="text-slate-500 font-semibold text-sm max-w-md mt-2 mb-6">
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
        /* Detailed Cluster Table / Cards */
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold font-outfit text-slate-900">Clusters Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminOverview?.clusters?.map((cluster: any) => (
              <div key={cluster.cluster} className="glass-card p-6 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-outfit text-slate-800">Cluster {cluster.cluster}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ['I', 'J', 'K', 'L'].includes(cluster.cluster)
                        ? 'bg-teal-50 text-teal-600'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {['I', 'J', 'K', 'L'].includes(cluster.cluster) ? 'South BTech' : 'North Pool'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm font-semibold">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Head:</span>
                      <span className="text-slate-800">{cluster.headName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Allocated:</span>
                      <span className="text-slate-800">{cluster.total} students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Verified:</span>
                      <span className="text-slate-800">{cluster.verified} / {cluster.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confirmed:</span>
                      <span className="text-slate-800 text-emerald-600">{cluster.confirmedAarambh} (Aarambh)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Call Logs: {cluster.calls}</span>
                  <span className="text-red-500">Not Continuing: {cluster.notContinuing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
