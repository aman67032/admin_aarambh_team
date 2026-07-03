'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

interface BedInfo {
  sno: number;
  bed: string;
  isOccupied: boolean;
  occupiedByCohort: string | null;
  occupiedByName?: string;
  occupiedByAppNo?: string;
}

interface RoomInfo {
  room: string;
  floor: string;
  beds: BedInfo[];
}

export default function HostelManagementPage() {
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
      
      // The backend returns isOccupied and occupiedByCohort.
      // We will also fetch team members details or extract from the db.
      // Wait, in /api/hostel/rooms/:hostelName we can check if the database includes allottedToName.
      // Let's verify what the backend returns:
      // occupiedByCohort: bed.allottedTo ? (bed.allottedToName || 'Reserved') : null
      // Let's modify the backend /api/hostel/rooms/:hostelName to also return allottedToAppNo so we can see their roll number!
      // Wait, does the backend already do that?
      // Yes, in routes/hostel.js line 119:
      // occupiedByCohort: bed.allottedTo ? (bed.allottedToName || 'Reserved') : null
      // But wait! We can update the backend to return allottedToAppNo and allottedToName separately to the admin!
      // Actually, let's check: does the backend already return these fields?
      // Let's look at lines 104-124 in routes/hostel.js:
      // bedsMap[roomKey].beds.push({
      //   sno: bed.sno,
      //   bed: bed.bed,
      //   isOccupied: !!bed.allottedTo,
      //   occupiedByCohort: bed.allottedTo ? (bed.allottedToName || 'Reserved') : null
      // });
      // Yes! It returns occupiedByCohort which contains the student's name!
      // Let's update the backend /rooms/:hostelName to return the student's roll number too so the admin gets the full details!
      // This is extremely helpful! Let's do that right after.
      
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
        
        // Search match (student name or roll number/cohort)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground font-outfit uppercase tracking-wider">
            Hostel Management
          </h1>
          <p className="text-text-muted text-xs mt-1">
            Real-time room allotment and occupancy manager for boys & girls hostels.
          </p>
        </div>
        
        {/* Hostel Selector Tabs */}
        <div className="flex bg-card-bg/60 border border-card-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveHostel('BH-1')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer font-outfit ${
              activeHostel === 'BH-1'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            BH-1 (Boys Hostel)
          </button>
          <button
            onClick={() => setActiveHostel('GH-2')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer font-outfit ${
              activeHostel === 'GH-2'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            GH-2 (Girls Hostel)
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card-bg/40 border border-card-border/50 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total Beds</span>
          <span className="text-2xl font-extrabold text-foreground font-outfit mt-2">{loading ? '...' : totalBeds}</span>
        </div>
        <div className="bg-card-bg/40 border border-card-border/50 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Occupied Beds</span>
          <span className="text-2xl font-extrabold text-red-500 font-outfit mt-2">{loading ? '...' : occupiedBeds}</span>
        </div>
        <div className="bg-card-bg/40 border border-card-border/50 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Vacant Beds</span>
          <span className="text-2xl font-extrabold text-green-500 font-outfit mt-2">{loading ? '...' : vacantBeds}</span>
        </div>
        <div className="bg-card-bg/40 border border-card-border/50 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Occupancy Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-primary font-outfit">{loading ? '...' : `${occupancyRate}%`}</span>
            <span className="text-[10px] text-text-muted">filled</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-card-bg/60 border border-card-border p-4 rounded-2xl flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1.5 font-outfit">
            Search Student Name
          </label>
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-card-border rounded-xl text-foreground text-xs outline-none focus:border-primary placeholder:text-text-muted/40 font-outfit"
          />
        </div>

        {/* Floor selector */}
        <div className="w-full md:w-48">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1.5 font-outfit">
            Floor Level
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-card-border rounded-xl text-foreground text-xs outline-none focus:border-primary font-outfit"
          >
            {floors.map(f => (
              <option key={f} value={f}>{f === 'All' ? 'All Floors' : `${f} Floor`}</option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="w-full md:w-48">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1.5 font-outfit">
            Bed Availability
          </label>
          <div className="flex border border-card-border p-0.5 rounded-xl bg-background">
            {(['All', 'Occupied', 'Vacant'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setOccupancyFilter(filter)}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer font-outfit ${
                  occupancyFilter === filter
                    ? 'bg-primary text-white shadow-sm'
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
        <div className="py-20 flex justify-center">
          <Loader scale={0.6} label="Loading rooms and allotments..." />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl text-sm font-semibold">
          {error}
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="py-20 text-center text-text-muted text-sm font-outfit">
          No rooms match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.room}
              className="bg-card-bg/60 border border-card-border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-card-border/80 hover:shadow-md"
            >
              {/* Room Header */}
              <div className="flex items-center justify-between border-b border-card-border pb-3">
                <span className="text-md font-extrabold text-foreground font-outfit">Room {room.room}</span>
                <span className="px-2 py-0.5 bg-card-bg border border-card-border text-[9px] font-bold text-text-muted uppercase rounded-md font-outfit">
                  {room.floor} Floor
                </span>
              </div>

              {/* Beds list */}
              <div className="space-y-3">
                {room.beds.map((bed) => (
                  <div
                    key={bed.sno}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-4 ${
                      bed.isOccupied
                        ? 'bg-red-500/5 border-red-500/15'
                        : 'bg-green-500/5 border-green-500/15'
                    }`}
                  >
                    {/* Bed Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground font-outfit">{bed.bed}</span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            bed.isOccupied ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                      
                      {bed.isOccupied ? (
                        <div className="text-[10px] text-foreground font-bold mt-1 truncate">
                          👤 {bed.occupiedByCohort}
                          {bed.occupiedByAppNo && (
                            <span className="text-text-muted font-normal block mt-0.5 ml-3.5">
                              #{bed.occupiedByAppNo}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider mt-1 block">
                          Vacant
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    {bed.isOccupied && (
                      <button
                        onClick={() => handleVacateBed(bed.sno, room.room, bed.bed)}
                        disabled={vacatingSno === bed.sno}
                        className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-[9px] font-extrabold rounded-lg transition-all cursor-pointer font-outfit uppercase tracking-wider shrink-0"
                      >
                        {vacatingSno === bed.sno ? 'Vacating...' : 'Vacate'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
