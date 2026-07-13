'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  MASTER_SCHEDULE,
  SOCIAL_MEDIA_TEAM,
  SOCIAL_MEDIA_SHIFTS,
  SOCIAL_MEDIA_ROTATIONS,
  PHOTO_VOLUNTEERS,
  PHOTO_ASSIGNMENTS,
  FOOD_RECORDS,
  MEDIA_RECORDS,
  DISCIPLINE_RECORDS,
  REGISTRATION_RECORDS
} from '../../lib/dutyChartData';

type TabType = 'master' | 'social_media' | 'photography' | 'media' | 'food';

export default function DutyChartPage() {
  const { theme } = useApp();
  const isDark = theme === 'fun';

  const [activeTab, setActiveTab] = useState<TabType>('master');
  const [selectedDayKey, setSelectedDayKey] = useState<string>('DAY0');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Clean and parse search query
  const query = searchQuery.trim().toLowerCase();

  // Edit distance calculation for fuzzy matching
  const getEditDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            )
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const isFuzzyWordMatch = (w1: string, w2: string): boolean => {
    if (w1 === w2) return true;
    if (w1.startsWith(w2) && w1.length - w2.length <= 3) return true;
    if (w2.startsWith(w1) && w2.length - w1.length <= 3) return true;
    const len = Math.max(w1.length, w2.length);
    const dist = getEditDistance(w1, w2);
    if (len <= 4) return dist <= 1;
    if (len <= 7) return dist <= 1;
    return dist <= 2;
  };

  // Helper to check if a volunteer name matches the query
  const matchesQuery = (text: string) => {
    if (!text || !query) return false;
    const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const textTokens = cleanText.split(/\s+/).filter(t => t.length >= 3);
    const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length >= 3);

    if (queryTokens.length === 0 || textTokens.length === 0) {
      return text.toLowerCase().includes(query.toLowerCase());
    }

    // 1. First name (queryTokens[0]) must fuzzy-match something in the cell
    const firstToken = queryTokens[0];
    const hasFirstMatch = textTokens.some(tTok => isFuzzyWordMatch(tTok, firstToken));
    if (!hasFirstMatch) return false;

    // 2. If both sides have a last name, prevent false cross-matches
    const commonLastNames = ['singh', 'sharma', 'gupta', 'kumar', 'jain', 'agarwal', 'rathore', 'chhabra', 'garhwal', 'tanwar', 'vyas', 'bisht', 'suwalka', 'chauhan', 'malvi', 'shah', 'sabnani', 'choudhary', 'mundra', 'yadav', 'srivastava', 'goswami', 'lalwani', 'katiyar', 'mishra', 'agrawal', 'dosi', 'asnani', 'bhardwaj', 'saxena', 'pancholi', 'singhi', 'saraf', 'chaurasia', 'somani', 'bang', 'bothra', 'vijayvergia', 'sehgal', 'saini', 'dayaramani'];

    if (queryTokens.length > 1 && textTokens.length > 1) {
      const dbLastName = queryTokens[1];
      for (const cellTok of textTokens.slice(1)) {
        if (commonLastNames.includes(cellTok)) {
          if (!isFuzzyWordMatch(cellTok, dbLastName)) return false;
        }
      }
    }

    return true;
  };

  // Perform global lookup search for a volunteer across all schedules
  const getPersonalSchedule = () => {
    if (!query) return null;

    const personalMaster: Array<{ day: string; time: string; event: string; role: string }> = [];
    const personalSocial: Array<{ type: string; details: string }> = [];
    const personalPhoto: Array<{ slot: string; duty: string }> = [];
    const personalFood: Array<{ date: string; timeSlot: string; hostel: string; details: string }> = [];
    const personalMedia: Array<{ day: string; details: string }> = [];

    // 1. Search Master Schedule
    Object.entries(MASTER_SCHEDULE).forEach(([dayKey, dayData]) => {
      dayData.events.forEach(ev => {
        Object.entries(ev.duties).forEach(([committee, volunteers]) => {
          if (matchesQuery(volunteers)) {
            personalMaster.push({
              day: dayData.label,
              time: ev.time,
              event: ev.event,
              role: `${committee} Duty`
            });
          }
        });
      });
    });

    // 2. Search Social Media
    // Check shifts
    SOCIAL_MEDIA_SHIFTS.forEach(shift => {
      if (matchesQuery(shift.name)) {
        personalSocial.push({
          type: 'Social Media Shift',
          details: `${shift.shift} — Primary: ${shift.primary} | Secondary: ${shift.secondary}`
        });
      }
    });
    // Check rotations
    SOCIAL_MEDIA_ROTATIONS.forEach(rot => {
      if (matchesQuery(rot.preLunch) || matchesQuery(rot.postLunch) || matchesQuery(rot.dcSupport)) {
        personalSocial.push({
          type: `Social Media Rotation — ${rot.day}`,
          details: `Pre-Lunch: ${rot.preLunch} | Post-Lunch: ${rot.postLunch} | DC Support: ${rot.dcSupport}`
        });
      }
    });

    // 3. Search Photography
    PHOTO_ASSIGNMENTS.forEach(pa => {
      Object.entries(pa.assignments).forEach(([volName, duty]) => {
        if (matchesQuery(volName) && duty.toLowerCase() !== 'rest') {
          personalPhoto.push({
            slot: pa.slot,
            duty: duty
          });
        }
      });
    });

    // 4. Search Food & Accommodation
    FOOD_RECORDS.forEach(fr => {
      if (matchesQuery(fr.volunteers)) {
        personalFood.push({
          date: fr.date,
          timeSlot: fr.timeSlot,
          hostel: fr.hostel,
          details: fr.volunteers
        });
      }
    });

    // 5. Search Media PDF Records
    MEDIA_RECORDS.forEach(mr => {
      if (matchesQuery(mr.volunteers)) {
        personalMedia.push({
          day: mr.day,
          details: `${mr.timeSlot} (${mr.duration}) — Volunteers: ${mr.volunteers}`
        });
      }
    });

    // 6. Search Discipline & Patrolling Records
    const personalDiscipline: Array<{ day: string; timeSlot: string; event: string; venue: string; zone: string }> = [];
    DISCIPLINE_RECORDS.forEach(dr => {
      if (matchesQuery(dr.volunteer)) {
        personalDiscipline.push({
          day: dr.day,
          timeSlot: dr.timeSlot,
          event: dr.event,
          venue: dr.venue,
          zone: dr.zone
        });
      }
    });

    // 7. Search Registration & Feedback Records
    const personalRegistration: Array<{ day: string; timeSlot: string; event: string; venue: string }> = [];
    REGISTRATION_RECORDS.forEach(rr => {
      if (matchesQuery(rr.volunteer)) {
        personalRegistration.push({
          day: rr.day,
          timeSlot: rr.timeSlot,
          event: rr.event,
          venue: rr.venue
        });
      }
    });

    return {
      master: personalMaster,
      social: personalSocial,
      photo: personalPhoto,
      food: personalFood,
      media: personalMedia,
      discipline: personalDiscipline,
      registration: personalRegistration
    };
  };

  const personalData = getPersonalSchedule();
  const hasPersonalResults = personalData && (
    personalData.master.length > 0 ||
    personalData.social.length > 0 ||
    personalData.photo.length > 0 ||
    personalData.food.length > 0 ||
    personalData.media.length > 0 ||
    personalData.discipline.length > 0 ||
    personalData.registration.length > 0
  );

  return (
    <div className="space-y-8 pb-12 font-outfit text-slate-800 dark:text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-card-border pb-6 print:hidden">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Command Duty Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase mt-2.5">
            Aarambh Volunteer Duty Charts
          </h1>
          <p className="text-text-muted text-xs mt-1 max-w-xl">
            Real-time volunteer rosters, shift assignments, and daily rotations across all event committees.
          </p>
        </div>
      </div>

      {/* Global Search / Personal Lookup Box */}
      <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm print:hidden">
        <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
          🔍 Find Your Personal Duty Schedule (Lookup by Volunteer Name)
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type your name here to search duties... (e.g. Samridhi, Aryan, Akshat, Krish)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-xs outline-none transition-all placeholder:text-text-muted/40 font-semibold"
          />
          <span className="absolute left-3.5 top-3.5 text-xs text-text-muted">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 px-2 py-1 bg-card-border/50 text-text-muted hover:text-foreground text-[10px] font-bold rounded-lg uppercase transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* PERSONAL LOOKUP RESULTS BLOCK */}
      {query && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Personal Duty Roster Results for &quot;{searchQuery}&quot;
            </h2>
          </div>

          {!hasPersonalResults ? (
            <div className="py-12 text-center text-text-muted text-sm border border-dashed border-card-border rounded-2xl bg-card-bg/20">
              No active duties found matching the name &quot;{searchQuery}&quot; in any committee.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {/* Master Schedule Matches */}
              {personalData.master.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-amber-500 tracking-wider">
                    📍 Event Ceremony & General Duties
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.master.map((m, idx) => (
                      <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{m.event || 'General Orientation Duty'}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{m.day}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded text-[9px] font-extrabold uppercase tracking-wide">
                            {m.role}
                          </span>
                          <div className="font-mono font-bold mt-1 text-[10px]">{m.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photography Matches */}
              {personalData.photo.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-indigo-500 tracking-wider">
                    📸 Photography Coverage
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {personalData.photo.map((p, idx) => (
                      <div key={idx} className="p-3 bg-background border border-card-border rounded-xl flex items-center justify-between text-xs">
                        <span className="font-bold text-text-muted">{p.slot}</span>
                        <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {p.duty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food & Accommodation Matches */}
              {personalData.food.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-emerald-500 tracking-wider">
                    🍽️ Food & Accommodation Shifts
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.food.map((f, idx) => (
                      <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{f.timeSlot || 'Attendance'}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{f.date}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`px-2.5 py-0.5 border rounded text-[9px] font-extrabold uppercase tracking-wide ${f.hostel === 'GH' ? 'bg-pink-500/10 border-pink-500/20 text-pink-600' : 'bg-blue-500/10 border-blue-500/20 text-blue-600'}`}>
                            {f.hostel} HOSTEL DUTY
                          </span>
                          <div className="text-[10px] font-semibold text-text-muted mt-1">Duty Partners: {f.details}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Matches */}
              {personalData.media.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-rose-500 tracking-wider">
                    🎥 Media Team Shifts
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.media.map((mr, idx) => (
                      <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{mr.details}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{mr.day}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media Matches */}
              {personalData.social.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-violet-500 tracking-wider">
                    📱 Social Media Rotation
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.social.map((s, idx) => (
                      <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{s.details}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{s.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discipline & Patrolling Matches */}
              {personalData.discipline.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-sky-500 tracking-wider">
                    🛡️ Discipline & Patrolling Duties
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.discipline.map((d, idx) => (
                      <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{d.zone}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{d.day} | Event: {d.event}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="px-2 py-0.5 bg-sky-500/10 border border-sky-500/20 text-sky-600 rounded text-[9px] font-extrabold uppercase tracking-wide">
                            {d.venue}
                          </span>
                          <div className="font-mono font-bold mt-1 text-[10px]">{d.timeSlot}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration & Feedback Matches */}
              {personalData.registration.length > 0 && (
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase text-teal-500 tracking-wider">
                    📝 Registration & Feedback Shifts
                  </h3>
                  <div className="divide-y divide-card-border">
                    {personalData.registration.map((r, idx) => (
                      <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-extrabold text-foreground">{r.event}</div>
                          <div className="text-[10px] text-text-muted font-bold mt-0.5">{r.day}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded text-[9px] font-extrabold uppercase tracking-wide">
                            {r.venue}
                          </span>
                          <div className="font-mono font-bold mt-1 text-[10px]">{r.timeSlot}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* STANDARD TAB VIEW SCHEDULES */}
      {!query && (
        <div className="space-y-6">
          {/* Roster Tabs selection */}
          <div className="flex border-b border-card-border overflow-x-auto gap-2 pb-1.5 scrollbar-none print:hidden">
            {[
              { id: 'master', label: 'Master Schedule' },
              { id: 'social_media', label: 'Social Media' },
              { id: 'photography', label: 'Photography' },
              { id: 'media', label: 'Media Committee' },
              { id: 'food', label: 'Food & Accommodation' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-foreground hover:bg-card-bg'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: MASTER SCHEDULE */}
          {activeTab === 'master' && (
            <div className="space-y-6">
              {/* Day selection tabs */}
              <div className="flex flex-wrap gap-2.5 justify-start print:hidden">
                {Object.entries(MASTER_SCHEDULE).map(([dayKey, dayData]) => (
                  <button
                    key={dayKey}
                    onClick={() => setSelectedDayKey(dayKey)}
                    className={`px-3 py-2 border rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${selectedDayKey === dayKey ? 'bg-amber-500/10 border-amber-500 text-amber-600 shadow-sm' : 'bg-card-bg border-card-border text-text-muted hover:text-foreground'}`}
                  >
                    {dayKey === 'DAY0' ? 'DAY0' : dayKey} ({dayKey === 'DAY0' ? 'Mon 13 Jul' : dayKey === 'DAY1' ? 'Jul 14' : dayKey === 'DAY2' ? 'Jul 15' : dayKey === 'DAY3' ? 'Jul 16' : dayKey === 'DAY4' ? 'Jul 17' : dayKey === 'DAY5' ? 'Jul 18' : dayKey === 'DAY6' ? 'Jul 19' : dayKey === 'DAY7' ? 'Jul 20' : 'Jul 21'})
                  </button>
                ))}
              </div>

              {/* Day Details */}
              {(() => {
                const day = MASTER_SCHEDULE[selectedDayKey];
                return (
                  <div className="space-y-4">
                    <div className="bg-card-bg border-l-4 border-l-amber-500 p-4 rounded-xl shadow-sm">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600">{day.label}</h2>
                    </div>

                    <div className="bg-card-bg border border-card-border rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[10px]">
                              <th className="px-5 py-3.5 w-1/4">Time</th>
                              <th className="px-5 py-3.5 w-1/3">Event / Venue</th>
                              <th className="px-5 py-3.5">Committee Roster Duties</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-card-border font-semibold text-foreground">
                            {day.events.map((ev, idx) => (
                              <tr key={idx} className="hover:bg-background/20 transition-colors">
                                <td className="px-5 py-4 font-mono font-bold text-amber-600 align-top">{ev.time}</td>
                                <td className="px-5 py-4 align-top">
                                  <div className="font-extrabold text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{ev.event}</div>
                                </td>
                                <td className="px-5 py-4 align-top">
                                  {Object.keys(ev.duties).length === 0 ? (
                                    <span className="text-text-muted italic text-[10px]">No duties assigned / Free for all</span>
                                  ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                                      {Object.entries(ev.duties).map(([comm, v]) => (
                                        <div key={comm} className="p-2 bg-background border border-card-border rounded-lg">
                                          <span className="font-black text-slate-500 uppercase block tracking-wider mb-0.5">{comm}</span>
                                          <span className="font-bold text-slate-800 dark:text-slate-200">{v}</span>
                                        </div>
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
            </div>
          )}

          {/* TAB 2: SOCIAL MEDIA */}
          {activeTab === 'social_media' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Team structure */}
              <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
                <h2 className="text-xs font-black uppercase text-violet-500 tracking-widest pb-2 border-b border-card-border">
                  📱 Social Media Team
                </h2>
                <div className="space-y-3">
                  {SOCIAL_MEDIA_TEAM.map((member, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3.5 bg-background border border-card-border rounded-xl">
                      <span className="font-bold">{member.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${member.role === 'Team Leader' ? 'bg-violet-500/10 border-violet-500/20 text-violet-600' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Columns: Shift rotations */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
                  <h2 className="text-xs font-black uppercase text-violet-500 tracking-widest pb-2 border-b border-card-border">
                    ⏰ Shift Structure Definition
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SOCIAL_MEDIA_SHIFTS.map((shift, idx) => (
                      <div key={idx} className="p-3.5 bg-background border border-card-border rounded-xl space-y-2 text-xs">
                        <div className="font-black text-violet-600 uppercase tracking-wider">{shift.shift}</div>
                        <div className="font-extrabold text-foreground">Volunteer: {shift.name}</div>
                        <div className="text-[10px] text-text-muted mt-1">
                          Primary: {shift.primary} <br />
                          Secondary: {shift.secondary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
                  <h2 className="text-xs font-black uppercase text-violet-500 tracking-widest pb-2 border-b border-card-border">
                    📅 Day Wise Shift Rotations
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-card-border">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[9px]">
                          <th className="px-4 py-2.5">Rotation Day</th>
                          <th className="px-4 py-2.5">Pre-Lunch Shift</th>
                          <th className="px-4 py-2.5">Post-Lunch Shift</th>
                          <th className="px-4 py-2.5">DC Support</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-card-border font-semibold">
                        {SOCIAL_MEDIA_ROTATIONS.map((rot, idx) => (
                          <tr key={idx} className="hover:bg-background/20 transition-colors">
                            <td className="px-4 py-3 font-bold text-violet-600">{rot.day}</td>
                            <td className="px-4 py-3 text-foreground">{rot.preLunch}</td>
                            <td className="px-4 py-3 text-foreground">{rot.postLunch}</td>
                            <td className="px-4 py-3 text-text-muted">{rot.dcSupport}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOGRAPHY */}
          {activeTab === 'photography' && (
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xs font-black uppercase text-indigo-500 tracking-widest pb-2 border-b border-card-border">
                📸 Photography Volunteer Coverage Chart
              </h2>
              <div className="overflow-x-auto border border-card-border rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[9px]">
                      <th className="px-4 py-3 sticky left-0 bg-card-bg z-10">Shift / Date</th>
                      {PHOTO_VOLUNTEERS.map(v => (
                        <th key={v} className="px-4 py-3 min-w-[120px]">{v}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border font-semibold">
                    {PHOTO_ASSIGNMENTS.map((pa, idx) => (
                      <tr key={idx} className="hover:bg-background/20 transition-colors">
                        <td className="px-4 py-3 font-bold text-indigo-600 sticky left-0 bg-card-bg z-10 border-r border-card-border/50">{pa.slot}</td>
                        {PHOTO_VOLUNTEERS.map(v => {
                          const duty = pa.assignments[v] || 'Rest';
                          const isRest = duty.toLowerCase() === 'rest';
                          return (
                            <td key={v} className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${isRest ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600'}`}>
                                {duty}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA COMMITTEE */}
          {activeTab === 'media' && (
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xs font-black uppercase text-rose-500 tracking-widest pb-2 border-b border-card-border">
                🎥 Media Shift Roster Details
              </h2>
              <div className="overflow-x-auto border border-card-border rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[9px]">
                      <th className="px-4 py-3">Day / Date</th>
                      <th className="px-4 py-3">Time Slot</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Volunteers on Duty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border font-semibold">
                    {MEDIA_RECORDS.map((mr, idx) => (
                      <tr key={idx} className="hover:bg-background/20 transition-colors">
                        <td className="px-4 py-3 font-bold text-rose-600">{mr.day}</td>
                        <td className="px-4 py-3 text-foreground">{mr.timeSlot}</td>
                        <td className="px-4 py-3 text-text-muted font-mono">{mr.duration}</td>
                        <td className="px-4 py-3 text-foreground">{mr.volunteers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FOOD & ACCOMMODATION */}
          {activeTab === 'food' && (
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xs font-black uppercase text-emerald-500 tracking-widest pb-2 border-b border-card-border">
                🍽️ Hostel Mess & BH / GH Reception Shifts
              </h2>
              <div className="overflow-x-auto border border-card-border rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-card-bg border-b border-card-border text-text-muted font-bold uppercase tracking-wider text-[9px]">
                      <th className="px-4 py-3">Arrival Date</th>
                      <th className="px-4 py-3">Time Slot</th>
                      <th className="px-4 py-3">Hostel Block</th>
                      <th className="px-4 py-3">Volunteers on Duty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border font-semibold">
                    {FOOD_RECORDS.map((fr, idx) => (
                      <tr key={idx} className="hover:bg-background/20 transition-colors">
                        <td className="px-4 py-3 font-bold text-emerald-600">{fr.date || '-'}</td>
                        <td className="px-4 py-3 text-foreground">{fr.timeSlot || 'Attendance'}</td>
                        <td className="px-4 py-3 text-foreground">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${fr.hostel === 'GH' ? 'bg-pink-500/10 border-pink-500/20 text-pink-600' : 'bg-blue-500/10 border-blue-500/20 text-blue-600'}`}>
                            {fr.hostel} HOSTEL
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground">{fr.volunteers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
