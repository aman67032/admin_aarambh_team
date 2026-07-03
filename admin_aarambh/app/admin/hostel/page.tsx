'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useApp } from '../../context/AppContext';

interface BedInfo {
  sno: number;
  bed: string;
  isOccupied: boolean;
  occupiedByCohort: string | null;
  occupiedByAppNo?: string | null;
}

interface RoomInfo {
  room: string;
  floor: string;
  beds: BedInfo[];
}

export default function HostelManagementPage() {
  const { user } = useApp();
  const [activeHostel, setActiveHostel] = useState<'BH-1' | 'GH-2'>('BH-1');
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All');
  const [occupancyFilter, setOccupancyFilter] = useState<'All' | 'Occupied' | 'Vacant'>('All');
  
  // Actions state
  const [vacatingSno, setVacatingSno] = useState<number | null>(null);

  const fetchHostelData = async (hostel: 'BH-1' | 'GH-2') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/hostel/rooms/${hostel}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch rooms.');
      }
      setRooms(data.rooms);
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching hostel room allotments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostelData(activeHostel);
  }, [activeHostel]);

  // Handle vacate bed slot
  const handleVacateBed = async (bedSno: number, roomName: string, bedLabel: string) => {
    if (!confirm(`Are you sure you want to vacate Bed ${bedLabel} in Room ${roomName}?`)) {
      return;
    }
    
    setVacatingSno(bedSno);
    try {
      const res = await fetch('/api/hostel/vacate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bedSno })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to vacate bed slot.');
      }
      
      // Refresh list
      fetchHostelData(activeHostel);
    } catch (err: any) {
      alert(err.message || 'An error occurred during vacate.');
    } finally {
      setVacatingSno(null);
    }
  };

  // Stats calculation
  const totalBeds = rooms.reduce((acc, r) => acc + r.beds.length, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.beds.filter(b => b.isOccupied).length, 0);
  const vacantBeds = totalBeds - occupiedBeds;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Filter unique floors
  const floors = ['All', ...Array.from(new Set(rooms.map(r => r.floor)))].sort();

  // Apply filters
  const filteredRooms = rooms
    .map(room => {
      // Filter beds inside room
      const beds = room.beds.filter(bed => {
        // Availability match
        if (occupancyFilter === 'Occupied' && !bed.isOccupied) return false;
        if (occupancyFilter === 'Vacant' && bed.isOccupied) return false;
        
        // Search match (student name or roll number)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const nameMatch = bed.occupiedByCohort && bed.occupiedByCohort.toLowerCase().includes(query);
          const rollMatch = bed.occupiedByAppNo && bed.occupiedByAppNo.toLowerCase().includes(query);
          return !!(nameMatch || rollMatch);
        }
        
        return true;
      });
      
      return { ...room, beds };
    })
    // Filter out rooms that have no matching beds, or don't match selected floor
    .filter(room => {
      if (selectedFloor !== 'All' && room.floor !== selectedFloor) return false;
      return room.beds.length > 0;
    });

  return (
    <div className="space-y-8 pb-12 font-outfit">
      {/* Header and Hostel Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-card-border pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Hostel Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase mt-2.5">
            Hostel Command Center
          </h1>
          <p className="text-text-muted text-xs mt-1 max-w-xl">
            Monitor real-time bed occupancy, search team allotments, and manage checkout actions.
          </p>
        </div>
        
        {/* Hostel Selector Tabs */}
        <div className="flex bg-card-bg/60 border border-card-border p-1.5 rounded-2xl w-fit shadow-inner">
          <button
            onClick={() => setActiveHostel('BH-1')}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider flex items-center gap-2 ${
              activeHostel === 'BH-1'
                ? 'bg-primary text-white shadow-lg'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            👨‍💻 BH-1 (Boys Hostel)
          </button>
          <button
            onClick={() => setActiveHostel('GH-2')}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider flex items-center gap-2 ${
              activeHostel === 'GH-2'
                ? 'bg-primary text-white shadow-lg'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            👩‍💻 GH-2 (Girls Hostel)
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Beds */}
        <div className="bg-gradient-to-br from-card-bg to-card-bg/30 border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-card-border/80 transition-all">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Total Bed Slots</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-foreground">{loading ? '...' : totalBeds}</span>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold">Capacity</span>
          </div>
        </div>

        {/* Occupied Beds */}
        <div className="bg-gradient-to-br from-card-bg to-card-bg/30 border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-card-border/80 transition-all">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Occupied Beds</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-red-500">{loading ? '...' : occupiedBeds}</span>
            <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-md font-bold">Filled</span>
          </div>
        </div>

        {/* Vacant Beds */}
        <div className="bg-gradient-to-br from-card-bg to-card-bg/30 border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-card-border/80 transition-all">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Vacant Beds</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-green-500">{loading ? '...' : vacantBeds}</span>
            <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-md font-bold">Available</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-gradient-to-br from-card-bg to-card-bg/30 border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-card-border/80 transition-all">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Allotment Rate</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-primary">{loading ? '...' : `${occupancyRate}%`}</span>
            <div className="w-16 bg-card-border rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-1.5 transition-all duration-500" 
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-card-bg border border-card-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-5 shadow-sm">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
            Search Team Member
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-card-border focus:border-primary rounded-xl text-foreground text-xs outline-none transition-all placeholder:text-text-muted/40 font-semibold"
            />
            <span className="absolute left-3.5 top-3.5 text-xs text-text-muted">🔍</span>
          </div>
        </div>

        {/* Floor selector */}
        <div className="w-full md:w-56">
          <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
            Floor Level
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-card-border rounded-xl text-foreground text-xs outline-none focus:border-primary font-bold cursor-pointer"
          >
            {floors.map(f => (
              <option key={f} value={f}>{f === 'All' ? 'All Floors' : `${f} Floor`}</option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="w-full md:w-64">
          <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">
            Bed Availability
          </label>
          <div className="flex border border-card-border p-1 rounded-xl bg-background">
            {(['All', 'Occupied', 'Vacant'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setOccupancyFilter(filter)}
                className={`flex-1 py-2 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer uppercase tracking-wider ${
                  occupancyFilter === filter
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of rooms */}
      {loading ? (
        <div className="py-24 flex justify-center">
          <Loader scale={0.6} label="Loading rooms and allotments..." />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl text-sm font-semibold">
          {error}
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="py-24 text-center text-text-muted text-sm border border-dashed border-card-border rounded-2xl bg-card-bg/20">
          No room allotments match the selected search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const occupiedCount = room.beds.filter(b => b.isOccupied).length;
            const totalRoomBeds = room.beds.length;
            const isFull = occupiedCount === totalRoomBeds;
            const isEmpty = occupiedCount === 0;

            let statusBadge = (
              <span className="px-2.5 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                Vacant
              </span>
            );
            if (isFull) {
              statusBadge = (
                <span className="px-2.5 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                  Full ({occupiedCount}/{totalRoomBeds})
                </span>
              );
            } else if (!isEmpty) {
              statusBadge = (
                <span className="px-2.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                  Semi ({occupiedCount}/{totalRoomBeds})
                </span>
              );
            }

            return (
              <div
                key={room.room}
                className="bg-card-bg/60 border border-card-border rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all hover:border-card-border/90 hover:shadow-md relative overflow-hidden"
              >
                {/* Visual indicator bar at the top */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isFull ? 'bg-red-500' : isEmpty ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />

                {/* Room Header */}
                <div className="flex items-center justify-between border-b border-card-border pb-3.5 mt-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-foreground">Room {room.room}</span>
                    <span className="text-[10px] text-text-muted font-bold">({room.floor} Floor)</span>
                  </div>
                  {statusBadge}
                </div>

                {/* Beds list */}
                <div className="space-y-4">
                  {room.beds.map((bed) => {
                    const firstLetter = bed.isOccupied && bed.occupiedByCohort ? bed.occupiedByCohort.charAt(0).toUpperCase() : '?';
                    return (
                      <div
                        key={bed.sno}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                          bed.isOccupied
                            ? 'bg-card-bg/40 border-card-border/80'
                            : 'bg-green-500/[0.02] border-dashed border-green-500/20'
                        }`}
                      >
                        {/* Bed Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar or vacant icon */}
                          {bed.isOccupied ? (
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                              {firstLetter}
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xs shrink-0">
                              🛏️
                            </div>
                          )}

                          <div className="min-w-0">
                            <span className="text-xs font-bold text-foreground block">{bed.bed}</span>
                            {bed.isOccupied ? (
                              <div className="mt-1 min-w-0">
                                <span className="text-[11px] font-extrabold text-foreground truncate block leading-tight">
                                  {bed.occupiedByCohort}
                                </span>
                                {bed.occupiedByAppNo && (
                                  <span className="text-[9px] bg-background border border-card-border text-text-muted px-1.5 py-0.5 rounded-md font-mono mt-1 inline-block font-semibold">
                                    {bed.occupiedByAppNo}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-[10px] text-green-500 font-extrabold uppercase mt-0.5 block tracking-wider leading-none">
                                + Available Slot
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        {bed.isOccupied && user?.role === 'super_admin' && (
                          <button
                            onClick={() => handleVacateBed(bed.sno, room.room, bed.bed)}
                            disabled={vacatingSno === bed.sno}
                            className="px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-[9px] font-black rounded-lg transition-all cursor-pointer uppercase tracking-wider shrink-0"
                            title="Vacate Bed Slot"
                          >
                            {vacatingSno === bed.sno ? 'Vacating...' : 'Vacate'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
