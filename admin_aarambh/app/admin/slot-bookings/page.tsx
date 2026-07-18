'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useApp } from '../../context/AppContext';

export default function AdminSlotBookingsPage() {
  const { user } = useApp();
  const [bookingDate, setBookingDate] = useState('2026-07-22');
  const [bookingCourse, setBookingCourse] = useState('all');
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingsLoading, setBookingsLoading] = useState(true);
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
    fetchBookingData(bookingDate, bookingCourse);
  }, [bookingDate, bookingCourse]);

  return (
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
  );
}
