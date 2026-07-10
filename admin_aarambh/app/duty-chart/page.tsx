'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Loader from '../components/Loader';
import PlasmaWave from '../components/PlasmaWave';
import {
  MASTER_SCHEDULE,
  SOCIAL_MEDIA_TEAM,
  SOCIAL_MEDIA_SHIFTS,
  SOCIAL_MEDIA_ROTATIONS,
  PHOTO_VOLUNTEERS,
  PHOTO_ASSIGNMENTS,
  FOOD_RECORDS,
  MEDIA_RECORDS,
  TEAM_MEMBERS_DB,
  TeamMemberDB
} from '../lib/dutyChartData';

type TabType = 'personal' | 'master' | 'social_media' | 'photography' | 'media' | 'food';

export default function PublicDutyChartPage() {
  const [rollNumber, setRollNumber] = useState<string>('');
  const [matchedMember, setMatchedMember] = useState<TeamMemberDB | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [selectedDayKey, setSelectedDayKey] = useState<string>('DAY1');

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setMatchedMember(null);

    const inputRoll = rollNumber.trim().toLowerCase();
    if (!inputRoll) {
      setErrorMsg('Please enter your Roll Number.');
      return;
    }

    // Lookup in TEAM_MEMBERS_DB
    const found = TEAM_MEMBERS_DB.find(
      m => m.rollNo.toLowerCase().trim() === inputRoll || 
           m.rollNo.toLowerCase().replace(/[-\s]/g, '') === inputRoll.replace(/[-\s]/g, '')
    );

    if (found) {
      setMatchedMember(found);
      setActiveTab('personal');
    } else {
      setErrorMsg('Roll Number not found in volunteer roster. Please double-check or contact your Cluster Head.');
    }
  };

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
  const matchesQuery = (text: string, nameToMatch: string) => {
    if (!text || !nameToMatch) return false;
    const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const cleanName = nameToMatch.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

    const textTokens = cleanText.split(/\s+/).filter(t => t.length >= 3);
    const nameTokens = cleanName.split(/\s+/).filter(t => t.length >= 3);

    if (nameTokens.length === 0 || textTokens.length === 0) {
      return text.toLowerCase().includes(nameToMatch.toLowerCase());
    }

    // 1. First name must fuzzy-match something in the cell text
    const firstName = nameTokens[0];
    const hasFirstMatch = textTokens.some(tTok => isFuzzyWordMatch(tTok, firstName));
    if (!hasFirstMatch) return false;

    // 2. If both sides have a last name, prevent false cross-surname matches
    const commonLastNames = ['singh', 'sharma', 'gupta', 'kumar', 'jain', 'agarwal', 'rathore', 'chhabra', 'garhwal', 'tanwar', 'vyas', 'bisht', 'suwalka', 'chauhan', 'malvi', 'shah', 'sabnani', 'choudhary', 'mundra', 'yadav', 'srivastava', 'goswami', 'lalwani', 'katiyar', 'mishra', 'agrawal', 'dosi', 'asnani', 'bhardwaj', 'saxena', 'pancholi', 'singhi', 'saraf', 'chaurasia', 'somani', 'bang', 'bothra', 'vijayvergia', 'sehgal', 'saini', 'dayaramani'];

    if (nameTokens.length > 1 && textTokens.length > 1) {
      const dbLastName = nameTokens[1];
      for (const cellTok of textTokens.slice(1)) {
        if (commonLastNames.includes(cellTok)) {
          if (!isFuzzyWordMatch(cellTok, dbLastName)) return false;
        }
      }
    }

    return true;
  };

  // Compile matched member's schedule across all rosters
  const getPersonalSchedule = () => {
    if (!matchedMember) return null;
    const name = matchedMember.name;
    const email = matchedMember.email;

    const personalMaster: Array<{ day: string; time: string; event: string; role: string }> = [];
    const personalSocial: Array<{ type: string; details: string }> = [];
    const personalPhoto: Array<{ slot: string; duty: string }> = [];
    const personalFood: Array<{ date: string; timeSlot: string; hostel: string; details: string }> = [];
    const personalMedia: Array<{ day: string; details: string }> = [];

    // 1. Search Master Schedule
    Object.entries(MASTER_SCHEDULE).forEach(([dayKey, dayData]) => {
      dayData.events.forEach(ev => {
        Object.entries(ev.duties).forEach(([committee, volunteers]) => {
          if (matchesQuery(volunteers, name) || (email && volunteers.toLowerCase().includes(email.split('@')[0]))) {
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
      if (matchesQuery(shift.name, name)) {
        personalSocial.push({
          type: 'Social Media Shift',
          details: `${shift.shift} — Primary: ${shift.primary} | Secondary: ${shift.secondary}`
        });
      }
    });
    // Check rotations
    SOCIAL_MEDIA_ROTATIONS.forEach(rot => {
      if (matchesQuery(rot.preLunch, name) || matchesQuery(rot.postLunch, name) || matchesQuery(rot.dcSupport, name)) {
        personalSocial.push({
          type: `Social Media Rotation — ${rot.day}`,
          details: `Pre-Lunch: ${rot.preLunch} | Post-Lunch: ${rot.postLunch} | DC Support: ${rot.dcSupport}`
        });
      }
    });

    // 3. Search Photography
    PHOTO_ASSIGNMENTS.forEach(pa => {
      Object.entries(pa.assignments).forEach(([volName, duty]) => {
        if (matchesQuery(volName, name) && duty.toLowerCase() !== 'rest') {
          personalPhoto.push({
            slot: pa.slot,
            duty: duty
          });
        }
      });
    });

    // 4. Search Food & Accommodation
    FOOD_RECORDS.forEach(fr => {
      if (matchesQuery(fr.volunteers, name)) {
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
      if (matchesQuery(mr.volunteers, name)) {
        personalMedia.push({
          day: mr.day,
          details: `${mr.timeSlot} (${mr.duration}) — Volunteers: ${mr.volunteers}`
        });
      }
    });

    return {
      master: personalMaster,
      social: personalSocial,
      photo: personalPhoto,
      food: personalFood,
      media: personalMedia
    };
  };

  const personalData = getPersonalSchedule();
  const hasPersonalResults = personalData && (
    personalData.master.length > 0 ||
    personalData.social.length > 0 ||
    personalData.photo.length > 0 ||
    personalData.food.length > 0 ||
    personalData.media.length > 0
  );

  const getCommitteeDescription = (position: string) => {
    const pos = position.toLowerCase();
    if (pos.includes('cohort leader')) {
      return {
        title: '🌟 Cohort Leader Responsibilities',
        desc: 'As a Cohort Leader, you are the primary point of contact for your cohort of students. Guide them to venues, ensure attendance, resolve queries, and coordinate with your Cluster Head.'
      };
    }
    if (pos.includes('cluster head')) {
      return {
        title: '👑 Cluster Head Responsibilities',
        desc: 'As a Cluster Head, you supervise a cluster of cohorts. Oversee and guide your Cohort Leaders, handle escalations, verify student registrations, and coordinate with the main organizing committee.'
      };
    }
    if (pos.includes('technical')) {
      return {
        title: '💻 Technical Committee Responsibilities',
        desc: 'Responsible for managing audio-visual (AV) setups, microphones, speakers, stage lighting, laptops, presentations, and technical requirements across all venues (Seminar Hall, Auditorium, Central Plaza).'
      };
    }
    if (pos.includes('feedback') || pos.includes('registration')) {
      return {
        title: '📝 Feedback & Registration Committee Responsibilities',
        desc: 'Responsible for student check-ins, registration desks, distribution of welcome kits, ID cards, and coordinating feedback forms/surveys after orientation sessions.'
      };
    }
    if (pos.includes('social media')) {
      return {
        title: '📱 Social Media Committee Responsibilities',
        desc: 'Responsible for capturing content, managing official social media handles, posting live updates, stories, reels, and maintaining high digital engagement throughout Aarambh 2026.'
      };
    }
    if (pos.includes('photography')) {
      return {
        title: '📸 Photography Committee Responsibilities',
        desc: 'Responsible for professional photography and videography coverage of all major sessions, student interactions, performances, and venue setups. Coordinate with the Media team for uploads.'
      };
    }
    if (pos.includes('media')) {
      return {
        title: '🎥 Media Committee Responsibilities',
        desc: 'Manage press coordination, news coverage, photography curation, content drafting, and writing daily newsletters/press releases for Aarambh 2026.'
      };
    }
    if (pos.includes('food') || pos.includes('accommodation') || pos.includes('hospitality')) {
      return {
        title: '🍽️ Food & Accommodation Committee Responsibilities',
        desc: 'Manage hostel arrival receptions, mess entry coordination, room keys distribution, hospitality for guests, and help desk services for new students at BH-1 and GH-2.'
      };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground flex flex-col justify-between font-outfit">
      {/* Decorative background plasma wave */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>

      <header className="sticky top-0 bg-card-bg/70 backdrop-blur-md border-b border-card-border z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-primary uppercase tracking-wider">Aarambh &apos;26</span>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 border border-card-border hover:border-primary text-text-muted hover:text-foreground text-xs font-bold rounded-xl uppercase tracking-wider transition-all"
          >
            Admin Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 z-10 max-w-7xl mx-auto w-full">
        {!matchedMember ? (
          /* LOGIN CARD - ROLL NUMBER ONLY */
          <div className="w-full max-w-md glass-card p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                Volunteer Schedule Portal
              </span>
              <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Duty Roster Lookup</h1>
              <p className="text-xs text-text-muted font-bold">
                Enter your Roll Number to instantly load your shifts and schedules.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2">
                ⚠️ <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023-BTECH-045"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-background/50 border border-card-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card-bg transition-all text-foreground font-semibold placeholder:text-text-muted/30"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                🔍 View My Duties
              </button>
            </form>
          </div>
        ) : (
          /* PERSONALIZED SCHEDULE PANEL */
          <div className="w-full space-y-6">
            {/* Header info */}
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {matchedMember.position || 'Volunteer'}
                </span>
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mt-1.5">{matchedMember.name}</h2>
                <div className="text-xs text-text-muted font-bold mt-0.5">
                  Roll No: <span className="font-mono text-foreground font-black">{matchedMember.rollNo}</span> | Email: {matchedMember.email}
                </div>
              </div>
              <button
                onClick={() => {
                  setMatchedMember(null);
                  setRollNumber('');
                }}
                className="px-4 py-2 bg-card-border hover:bg-card-border-hover text-text-muted hover:text-foreground text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer w-fit"
              >
                🚪 Sign Out
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-card-border overflow-x-auto gap-2 pb-1.5 scrollbar-none">
              {[
                { id: 'personal', label: 'My Personal Shifts' },
                { id: 'master', label: 'Full Master Schedule' },
                { id: 'social_media', label: 'Social Media Roster' },
                { id: 'photography', label: 'Photography' },
                { id: 'media', label: 'Media Shifts' },
                { id: 'food', label: 'Food & Hostel' }
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

            {/* TAB CONTENTS */}

            {/* TAB: PERSONAL */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                {matchedMember && getCommitteeDescription(matchedMember.position) && (
                  <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-2">
                    <h3 className="text-xs font-black uppercase text-primary tracking-wider">
                      {getCommitteeDescription(matchedMember.position)?.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed font-semibold">
                      {getCommitteeDescription(matchedMember.position)?.desc}
                    </p>
                  </div>
                )}

                {!hasPersonalResults ? (
                  <div className="py-16 text-center text-text-muted text-sm border border-dashed border-card-border rounded-2xl bg-card-bg/25">
                    No active shift assignments were found in the duty spreadsheets for &quot;{matchedMember.name}&quot;.
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
                            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
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
                          📸 Photography Coverage Assignments
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {personalData.photo.map((p, idx) => (
                            <div key={idx} className="p-3.5 bg-background border border-card-border rounded-xl flex items-center justify-between text-xs">
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
                          🍽️ Food & Hostel Shifts
                        </h3>
                        <div className="divide-y divide-card-border">
                          {personalData.food.map((f, idx) => (
                            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                              <div>
                                <div className="font-extrabold text-foreground">{f.timeSlot || 'Attendance'}</div>
                                <div className="text-[10px] text-text-muted font-bold mt-0.5">{f.date}</div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className={`px-2.5 py-0.5 border rounded text-[9px] font-extrabold uppercase tracking-wide ${f.hostel === 'GH' ? 'bg-pink-500/10 border-pink-500/20 text-pink-600' : 'bg-blue-500/10 border-blue-500/20 text-blue-600'}`}>
                                  {f.hostel} HOSTEL DUTY
                                </span>
                                <div className="text-[10px] font-semibold text-text-muted mt-1">Partners: {f.details}</div>
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
                          🎥 Media Committee Duty Slots
                        </h3>
                        <div className="divide-y divide-card-border">
                          {personalData.media.map((mr, idx) => (
                            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs">
                              <span className="font-extrabold text-foreground">{mr.details}</span>
                              <span className="text-[10px] text-text-muted font-bold mt-0.5 shrink-0">{mr.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Media Matches */}
                    {personalData.social.length > 0 && (
                      <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
                        <h3 className="text-xs font-black uppercase text-violet-500 tracking-wider">
                          📱 Social Media Shifts & Rotations
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
                  </div>
                )}
              </div>
            )}

            {/* TAB: MASTER SCHEDULE */}
            {activeTab === 'master' && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2.5">
                  {Object.keys(MASTER_SCHEDULE).map(dayKey => (
                    <button
                      key={dayKey}
                      onClick={() => setSelectedDayKey(dayKey)}
                      className={`px-3 py-2 border rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${selectedDayKey === dayKey ? 'bg-amber-500/10 border-amber-500 text-amber-600 shadow-sm' : 'bg-card-bg border-card-border text-text-muted hover:text-foreground'}`}
                    >
                      {dayKey} (Jul {dayKey === 'DAY1' ? '14' : dayKey === 'DAY2' ? '15' : dayKey === 'DAY3' ? '16' : dayKey === 'DAY4' ? '17' : dayKey === 'DAY5' ? '18' : dayKey === 'DAY6' ? '19' : dayKey === 'DAY7' ? '20' : '21'})
                    </button>
                  ))}
                </div>

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

            {/* TAB: SOCIAL MEDIA */}
            {activeTab === 'social_media' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            {/* TAB: PHOTOGRAPHY */}
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

            {/* TAB: MEDIA */}
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

            {/* TAB: FOOD */}
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
      </main>

      <footer className="py-6 border-t border-card-border text-[10px] font-bold text-text-muted z-10 bg-card-bg/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 Team Aarambh. All Rights Reserved.</span>
          <span>Built by Antigravity</span>
        </div>
      </footer>
    </div>
  );
}
