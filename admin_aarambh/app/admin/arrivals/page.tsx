'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useApp } from '../../context/AppContext';

interface ArrivalInfo {
  isFromJaipur: boolean;
  jaipurArea?: string;
  wantsBus?: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  transportMode?: string;
  pickupPoint?: string;
  declaredAt: string;
}

interface StudentDeclaration {
  _id: string;
  name: string;
  applicationNo: string;
  email: string;
  course: string;
  gender: string;
  cohort: string;
  cluster: string;
  arrivalCode?: string;
  arrivalInfo: ArrivalInfo;
}

export default function AdminArrivalsPage() {
  const { user } = useApp();
  const [declarations, setDeclarations] = useState<StudentDeclaration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Jaipur' | 'Outstation' | 'WantsBus' | 'NoBus'>('All');

  const fetchDeclarations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/arrival/all');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch arrival declarations.');
      }
      setDeclarations(data.declarations || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching arrival declarations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeclarations();
  }, []);

  // Counters
  const totalCount = declarations.length;
  const jaipurCount = declarations.filter(d => d.arrivalInfo.isFromJaipur).length;
  const outstationCount = totalCount - jaipurCount;
  const wantsBusCount = declarations.filter(d => d.arrivalInfo.isFromJaipur && d.arrivalInfo.wantsBus).length;

  // Filter declarations
  const filteredDeclarations = declarations.filter(item => {
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(query);
      const appMatch = item.applicationNo.toLowerCase().includes(query);
      const cohortMatch = item.cohort.toLowerCase().includes(query);
      if (!nameMatch && !appMatch && !cohortMatch) return false;
    }

    // Type filter
    if (filterType === 'Jaipur' && !item.arrivalInfo.isFromJaipur) return false;
    if (filterType === 'Outstation' && item.arrivalInfo.isFromJaipur) return false;
    if (filterType === 'WantsBus' && (!item.arrivalInfo.isFromJaipur || !item.arrivalInfo.wantsBus)) return false;
    if (filterType === 'NoBus' && (!item.arrivalInfo.isFromJaipur || item.arrivalInfo.wantsBus)) return false;

    return true;
  });

  return (
    <div className="space-y-8 pb-12 font-outfit text-slate-800">
      {/* Header and Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-card-border pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Arrival Command Log
          </span>
          <div className="flex items-center gap-2 mt-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase">
              Arrival & Route Center
            </h1>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-wider text-emerald-500 leading-none">
                LIVE
              </span>
            </div>
          </div>
          <p className="text-text-muted text-xs mt-1 max-w-xl">
            Monitor incoming student arrival timetables, Jaipur day-scholar local route areas, and university bus facility demands.
          </p>
        </div>
        <button
          onClick={fetchDeclarations}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-sm w-fit"
        >
          🔄 Refresh Log
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-primary/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Total Declarations</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-foreground">{loading ? '...' : totalCount}</span>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold">Submissions</span>
          </div>
        </div>

        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-emerald-500/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Day Scholars (Jaipur)</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-emerald-500">{loading ? '...' : jaipurCount}</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold">Local</span>
          </div>
        </div>

        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-amber-500/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Bus Facility Requests</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-amber-500">{loading ? '...' : wantsBusCount}</span>
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">University Bus</span>
          </div>
        </div>

        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-indigo-500/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Outstation Arrivals</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-indigo-500">{loading ? '...' : outstationCount}</span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 border border-indigo-200/25 px-2 py-0.5 rounded-md font-bold">Outside Jaipur</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-card-bg border border-card-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-5 shadow-sm">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
            Search Declarations
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by student name, application no, or cohort..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-xs outline-none transition-all placeholder:text-text-muted/40 font-semibold"
            />
            <span className="absolute left-3.5 top-3.5 text-xs text-text-muted">🔍</span>
          </div>
        </div>

        {/* Filter Type Tabs */}
        <div className="w-full md:w-auto">
          <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
            Declaration Category
          </label>
          <div className="flex flex-wrap border border-card-border p-1 rounded-xl bg-background gap-1 sm:gap-0 w-fit">
            {(['All', 'Jaipur', 'Outstation', 'WantsBus', 'NoBus'] as const).map(type => {
              let label = type as string;
              if (type === 'Jaipur') label = 'Jaipur Day Scholars';
              if (type === 'Outstation') label = 'Outstation Arrivals';
              if (type === 'WantsBus') label = 'Wants University Bus';
              if (type === 'NoBus') label = 'Self Transport';
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-2 text-[9px] font-extrabold rounded-lg transition-all cursor-pointer uppercase tracking-wider ${
                    filterType === type
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Declarations List Table */}
      {loading ? (
        <div className="py-24 flex justify-center">
          <Loader scale={0.6} label="Loading arrival logs..." />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl text-sm font-semibold">
          {error}
        </div>
      ) : filteredDeclarations.length === 0 ? (
        <div className="py-24 text-center text-text-muted text-sm border border-dashed border-card-border rounded-2xl bg-card-bg/20">
          No arrival declarations match the selected search filters.
        </div>
      ) : (
        <div className="bg-card-bg border border-card-border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-5 py-3.5">Student Name</th>
                  <th className="px-5 py-3.5">App / Roll No</th>
                  <th className="px-5 py-3.5">Cohort</th>
                  <th className="px-5 py-3.5">Arrival Code</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Local Route Area</th>
                  <th className="px-5 py-3.5">Bus Request / Pickup</th>
                  <th className="px-5 py-3.5">Arrival Date / Time</th>
                  <th className="px-5 py-3.5">Transport Mode</th>
                  <th className="px-5 py-3.5">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border font-semibold text-foreground">
                {filteredDeclarations.map((item) => (
                  <tr key={item._id} className="hover:bg-background/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-primary truncate max-w-[150px]">{item.name}</td>
                    <td className="px-5 py-3.5 font-mono">{item.applicationNo}</td>
                    <td className="px-5 py-3.5">Cohort {item.cohort}</td>
                    <td className="px-5 py-3.5 font-bold font-mono text-indigo-500">{item.arrivalCode || 'N/A'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${
                        item.arrivalInfo.isFromJaipur
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-indigo-500/10 text-indigo-500 border-indigo-200/25'
                      }`}>
                        {item.arrivalInfo.isFromJaipur ? 'Local (Jaipur)' : 'Outstation'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 truncate max-w-[120px]">{item.arrivalInfo.isFromJaipur ? (item.arrivalInfo.jaipurArea || 'N/A') : '-'}</td>
                    <td className="px-5 py-3.5">
                      {item.arrivalInfo.isFromJaipur ? (
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${
                          item.arrivalInfo.wantsBus
                            ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {item.arrivalInfo.wantsBus ? 'Yes (Wants Bus)' : 'No (Self)'}
                        </span>
                      ) : (
                        item.arrivalInfo.pickupPoint ? (
                          <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border bg-indigo-500/15 text-indigo-600 border-indigo-500/20">
                            {item.arrivalInfo.pickupPoint}
                          </span>
                        ) : '-'
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {!item.arrivalInfo.isFromJaipur ? (
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 dark:text-slate-100">{item.arrivalInfo.arrivalDate}</div>
                          <div className="text-[10px] text-text-muted font-semibold">{item.arrivalInfo.arrivalTime}</div>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-5 py-3.5 font-bold">{!item.arrivalInfo.isFromJaipur ? (item.arrivalInfo.transportMode || 'N/A') : '-'}</td>
                    <td className="px-5 py-3.5 text-text-muted text-[10px] font-bold">
                      {new Date(item.arrivalInfo.declaredAt).toLocaleString('en-GB')}
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
}
