'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useApp } from '../../context/AppContext';

interface ArrivalInfo {
  isFromJaipur?: boolean;
  jaipurArea?: string;
  wantsBus?: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  transportMode?: string;
  pickupPoint?: string;
  city?: string;
  place?: string;
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
  const [filterType, setFilterType] = useState<'All' | 'WantsBus' | 'NoBus'>('All');
  const [filterDate, setFilterDate] = useState('All');
  const [filterTime, setFilterTime] = useState('All');

  // Extract unique dates and times from declarations
  const uniqueDates = Array.from(new Set(declarations.map(d => d.arrivalInfo?.arrivalDate).filter(Boolean))).sort();
  const uniqueTimes = Array.from(new Set(declarations.map(d => d.arrivalInfo?.arrivalTime).filter(Boolean))).sort();

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
  const wantsBusCount = declarations.filter(d => d.arrivalInfo.wantsBus).length;
  const noBusCount = totalCount - wantsBusCount;

  // Filter declarations
  const filteredDeclarations = declarations.filter(item => {
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(query);
      const appMatch = item.applicationNo.toLowerCase().includes(query);
      const cohortMatch = item.cohort.toLowerCase().includes(query);
      const cityMatch = (item.arrivalInfo.city || '').toLowerCase().includes(query);
      const placeMatch = (item.arrivalInfo.place || '').toLowerCase().includes(query);
      if (!nameMatch && !appMatch && !cohortMatch && !cityMatch && !placeMatch) return false;
    }

    // Type filter
    if (filterType === 'WantsBus' && !item.arrivalInfo.wantsBus) return false;
    if (filterType === 'NoBus' && item.arrivalInfo.wantsBus) return false;

    // Date filter
    if (filterDate !== 'All' && item.arrivalInfo.arrivalDate !== filterDate) return false;

    // Time filter
    if (filterTime !== 'All' && item.arrivalInfo.arrivalTime !== filterTime) return false;

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-primary/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Total Declarations</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-foreground">{loading ? '...' : totalCount}</span>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold">Submissions</span>
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
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Self Transport Arrivals</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-indigo-500">{loading ? '...' : noBusCount}</span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 border border-indigo-200/25 px-2 py-0.5 rounded-md font-bold">Self Transport</span>
          </div>
        </div>
      </div>

      {/* Daily & Time Slot Arrival Distribution */}
      {!loading && declarations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Arrival Breakdown */}
          <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-card-border pb-2.5">
              <span className="text-xs">📅</span>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">
                Daily Arrival Distribution
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const dailyCounts: Record<string, number> = {};
                declarations.forEach(d => {
                  const date = d.arrivalInfo?.arrivalDate || 'Not Declared';
                  dailyCounts[date] = (dailyCounts[date] || 0) + 1;
                });

                return Object.keys(dailyCounts)
                  .sort((a, b) => {
                    if (a === 'Not Declared') return 1;
                    if (b === 'Not Declared') return -1;
                    return a.localeCompare(b);
                  })
                  .map(date => (
                    <div key={date} className="bg-background border border-card-border px-4 py-3 rounded-xl flex flex-col justify-between hover:border-primary/20 transition-all">
                      <span className="text-[10px] font-bold text-text-muted truncate">{date}</span>
                      <span className="text-xl font-black text-primary mt-1">
                        {dailyCounts[date]} <span className="text-[9px] font-normal text-text-muted">students</span>
                      </span>
                    </div>
                  ));
              })()}
            </div>
          </div>

          {/* Time Slot Breakdown */}
          <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-card-border pb-2.5">
              <span className="text-xs">⏰</span>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">
                Time Slot Distribution
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const timeCounts: Record<string, number> = {};
                declarations.forEach(d => {
                  const time = d.arrivalInfo?.arrivalTime || 'Not Declared';
                  timeCounts[time] = (timeCounts[time] || 0) + 1;
                });

                return Object.keys(timeCounts)
                  .sort((a, b) => {
                    if (a === 'Not Declared') return 1;
                    if (b === 'Not Declared') return -1;
                    return a.localeCompare(b);
                  })
                  .map(time => (
                    <div key={time} className="bg-background border border-card-border px-4 py-3 rounded-xl flex flex-col justify-between hover:border-primary/20 transition-all">
                      <span className="text-[10px] font-bold text-text-muted truncate">{time}</span>
                      <span className="text-xl font-black text-primary mt-1">
                        {timeCounts[time]} <span className="text-[9px] font-normal text-text-muted">students</span>
                      </span>
                    </div>
                  ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-card-bg border border-card-border p-5 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
              Search Declarations
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search name, roll no, cohort, city, or place..."
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
              {(['All', 'WantsBus', 'NoBus'] as const).map(type => {
                let label = type as string;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-card-border/50 pt-4">
          {/* Date Filter */}
          <div>
            <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
              Filter by Arrival Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-xs outline-none transition-all font-semibold cursor-pointer"
            >
              <option value="All">All Dates</option>
              {uniqueDates.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
              Filter by Time slot / Interval
            </label>
            <select
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-xs outline-none transition-all font-semibold cursor-pointer"
            >
              <option value="All">All Time Intervals</option>
              {uniqueTimes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
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
                  <th className="px-5 py-3.5">City & Boarding Place</th>
                  <th className="px-5 py-3.5">Bus Request</th>
                  <th className="px-5 py-3.5">Pickup Point</th>
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
                    <td className="px-5 py-3.5 truncate max-w-[200px]">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.arrivalInfo.city || 'N/A'}</div>
                      <div className="text-[10px] text-text-muted font-semibold">{item.arrivalInfo.place || 'N/A'}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${
                        item.arrivalInfo.wantsBus
                          ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {item.arrivalInfo.wantsBus ? 'Yes (Wants Bus)' : 'No (Self)'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {item.arrivalInfo.wantsBus && item.arrivalInfo.pickupPoint ? (
                        <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border bg-indigo-500/15 text-indigo-600 border-indigo-500/20">
                          {item.arrivalInfo.pickupPoint}
                        </span>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{item.arrivalInfo.arrivalDate || 'N/A'}</div>
                        <div className="text-[10px] text-text-muted font-semibold">{item.arrivalInfo.arrivalTime || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold">{item.arrivalInfo.transportMode || 'N/A'}</td>
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
