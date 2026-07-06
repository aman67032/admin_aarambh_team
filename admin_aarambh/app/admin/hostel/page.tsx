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
  hasFilledForm?: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  checkedIn?: boolean;
  checkedInTime?: string | null;
  memberId?: string | null;
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

  // Form details map from database
  const [forms, setForms] = useState<Record<string, any>>({});
  const [bulkDownloading, setBulkDownloading] = useState(false);

  // Check-in and arrival states
  const [checkingInSno, setCheckingInSno] = useState<number | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editArrivalDate, setEditArrivalDate] = useState('');
  const [editArrivalTime, setEditArrivalTime] = useState('');
  const [savingArrivalMemberId, setSavingArrivalMemberId] = useState<string | null>(null);

  // Selected student print state
  const [printData, setPrintData] = useState<{
    studentName: string;
    rollNo: string;
    course: string;
    email: string;
    mobile: string;
    hostel: string;
    room: string;
    bed: string;
    parentName: string;
    parentContact: string;
    parentEmail: string;
    address: string;
    parentGuardian2?: string;
    parent2Contact?: string;
    parent2Email?: string;
  } | null>(null);

  // Dynamically load html2pdf script
  const loadHtml2Pdf = () => {
    return new Promise((resolve) => {
      if ((window as any).html2pdf) {
        resolve((window as any).html2pdf);
        return;
      }
      const script = document.createElement('script');
      script.src = '/html2pdf.bundle.min.js';
      script.onload = () => resolve((window as any).html2pdf);
      document.body.appendChild(script);
    });
  };

  const fetchHostelData = async (hostel: 'BH-1' | 'GH-2') => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch submitted forms
      const formsRes = await fetch('/api/hostel/forms');
      const formsData = await formsRes.json();
      const formsMap: Record<string, any> = {};
      if (formsRes.ok && formsData.success) {
        formsData.forms.forEach((f: any) => {
          const normKey = f.rollNo.toUpperCase().replace(/[\/\.\s-]/g, '').trim();
          formsMap[normKey] = f;
        });
        setForms(formsMap);
      }

      // 2. Fetch rooms
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

  // Trigger download of Short Stay Form for a student
  const triggerSingleDownload = async (bed: BedInfo, roomName: string, floorName: string, type: 'stay' = 'stay') => {
    if (!bed.occupiedByAppNo) return;
    const normKey = bed.occupiedByAppNo.toUpperCase().replace(/[\/\.\s-]/g, '').trim();
    const form = forms[normKey];
    if (!form) {
      alert('Stay permission details have not been submitted by this student yet.');
      return;
    }

    const dataToPrint = {
      studentName: bed.occupiedByCohort || 'N/A',
      rollNo: bed.occupiedByAppNo,
      course: form.studentId?.position || 'Volunteer',
      email: form.studentId?.email || 'N/A',
      mobile: form.studentContact || form.studentId?.mobile || 'N/A',
      hostel: activeHostel,
      room: roomName,
      bed: bed.bed,
      parentName: form.parentName,
      parentContact: form.parentContact,
      parentEmail: form.parentEmail || '',
      address: form.address,
      parentGuardian2: form.parentGuardian2 || '',
      parent2Contact: form.parent2Contact || '',
      parent2Email: form.parent2Email || ''
    };

    setPrintData(dataToPrint);

    setTimeout(async () => {
      try {
        const html2pdf = (await loadHtml2Pdf()) as any;
        const opt = {
          margin: 0.5,
          filename: `Short_Stay_Form_${dataToPrint.studentName.replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const element = document.getElementById('admin-short-stay-template');
        if (element) {
          element.style.display = 'block';
          await html2pdf().from(element).set(opt).save();
          element.style.display = 'none';
        }
      } catch (error) {
        console.error('PDF generation error:', error);
      } finally {
        setPrintData(null);
      }
    }, 150);
  };

  // Trigger bulk download of all forms
  const triggerBulkDownload = async () => {
    const validBeds: any[] = [];
    rooms.forEach(room => {
      room.beds.forEach(bed => {
        if (bed.isOccupied && bed.occupiedByAppNo) {
          const normKey = bed.occupiedByAppNo.toUpperCase().replace(/[\/\.\s-]/g, '').trim();
          const form = forms[normKey];
          if (form) {
            validBeds.push({
              studentName: bed.occupiedByCohort || 'N/A',
              rollNo: bed.occupiedByAppNo,
              course: form.studentId?.position || 'Volunteer',
              email: form.studentId?.email || 'N/A',
              mobile: form.studentContact || form.studentId?.mobile || 'N/A',
              hostel: activeHostel,
              room: room.room,
              bed: bed.bed,
              parentName: form.parentName,
              parentContact: form.parentContact,
              parentEmail: form.parentEmail || '',
              address: form.address,
              parentGuardian2: form.parentGuardian2 || '',
              parent2Contact: form.parent2Contact || '',
              parent2Email: form.parent2Email || ''
            });
          }
        }
      });
    });

    if (validBeds.length === 0) {
      alert('No stay permission forms have been submitted yet in this hostel block.');
      return;
    }

    setBulkDownloading(true);

    const printContainer = document.createElement('div');
    printContainer.id = 'bulk-print-container';
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '-9999px';
    printContainer.style.width = '8.5in';
    printContainer.style.backgroundColor = '#ffffff';
    printContainer.style.color = '#000000';
    document.body.appendChild(printContainer);

    validBeds.forEach((item, idx) => {
      const stayDiv = document.createElement('div');
      stayDiv.style.padding = '40px';
      stayDiv.style.fontFamily = 'serif';
      stayDiv.style.fontSize = '12px';
      stayDiv.style.lineHeight = '1.6';
      stayDiv.style.backgroundColor = '#fff';
      stayDiv.style.color = '#000';
      stayDiv.style.pageBreakAfter = 'always';
      stayDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
          <img src="/JKLU%20Logo.png" alt="JKLU Logo" style="height: 50px;" />
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 18px; font-weight: bold;">JK LAKSHMIPAT UNIVERSITY</h2>
            <span style="font-size: 10px; color: #666;">OFFICE OF STUDENT AFFAIRS</span>
          </div>
        </div>
        <h3 style="text-align: center; font-size: 14px; font-weight: bold; text-decoration: underline; margin-bottom: 25px; text-transform: uppercase;">
          Hostel Stay Permission Form (Short Stay)
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tbody>
            <tr>
              <td style="width: 35%; padding: 6px 0; font-weight: bold;">Student Name:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.studentName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Roll No:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.rollNo}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Programme / Position:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.course}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Contact No:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.mobile}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">JKLU Mail ID:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Parent Name:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.parentName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Parent Contact No:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.parentContact}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Address:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.address}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Purpose of stay:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px;">Aarambh 2026 Organizing Team Duty</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Approved By:</td>
              <td style="border-bottom: 1px dotted #000; padding: 6px 5px; font-weight: bold;">Mr. Deepak Sogani (Head-Student Affairs)</td>
            </tr>
          </tbody>
        </table>
        <h4 style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; text-transform: uppercase;">
          Room Allotment Details (To be filled by Wardens)
        </h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tbody>
            <tr>
              <td style="width: 20%; padding: 6px 0; font-weight: bold;">Hostel Block:</td>
              <td style="width: 30%; border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.hostel}</td>
              <td style="width: 20%; padding: 6px 0; font-weight: bold; text-align: center;">Room No:</td>
              <td style="width: 30%; border-bottom: 1px dotted #000; padding: 6px 5px;">\${item.room}</td>
            </tr>
          </tbody>
        </table>
        <h4 style="font-size: 12px; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">
          Undertaking
        </h4>
        <p style="margin: 0 0 20px 0; text-align: justify; font-size: 10px; line-height: 1.5;">
          I hereby declare that I have checked all the items in the room and found them in proper condition at the time of allotment. I understand that I am responsible for maintaining the room and its inventory during my stay. In case of any loss, damage, or missing item, I shall be liable to bear the cost as decided by the hostel authorities.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px;">
          <tbody>
            <tr>
              <td style="width: 50%; padding-bottom: 25px; font-weight: bold;">Check In Date: _________________</td>
              <td style="width: 50%; padding-bottom: 25px; font-weight: bold; padding-left: 20px;">Time: _________________</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding-bottom: 35px;">Student Signature: _________________</td>
              <td style="font-weight: bold; padding-bottom: 35px; padding-left: 20px;">Warden Signature: _________________</td>
            </tr>
            <tr>
              <td style="padding-bottom: 25px; font-weight: bold;">Check Out Date: _________________</td>
              <td style="width: 50%; padding-bottom: 25px; font-weight: bold; padding-left: 20px;">Time: _________________</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Student Signature: _________________</td>
              <td style="font-weight: bold; padding-left: 20px;">Warden Signature: _________________</td>
            </tr>
          </tbody>
        </table>
      `;

      const consentDiv = document.createElement('div');
      consentDiv.style.padding = '40px';
      consentDiv.style.fontFamily = 'serif';
      consentDiv.style.fontSize = '11px';
      consentDiv.style.lineHeight = '1.5';
      consentDiv.style.backgroundColor = '#fff';
      consentDiv.style.color = '#000';
      if (idx < validBeds.length - 1) {
        consentDiv.style.pageBreakAfter = 'always';
      }
      consentDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
          <img src="/JKLU%20Logo.png" alt="JKLU Logo" style="height: 40px;" />
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 15px; font-weight: bold;">JK LAKSHMIPAT UNIVERSITY</h2>
            <span style="font-size: 8px; color: #666;">ANNEXURE - B</span>
          </div>
        </div>
        
        <div style="background-color: #333; color: #fff; text-align: center; padding: 5px; font-weight: bold; margin-bottom: 12px; font-size: 11px; text-transform: uppercase; border-radius: 4px;">
          Consent Form for Parent(s)/Guardian
        </div>

        <div style="margin-bottom: 10px;">
          <h4 style="margin: 0 0 3px 0; font-weight: bold; text-decoration: underline;">University Entry-Exit Procedures</h4>
          <ul style="margin: 0; padding-left: 15px; list-style-type: disc;">
            <li>Students are not permitted to leave the campus between 10:00 PM and 6:00 AM.</li>
            <li>Between 6:00 AM and 10:00 PM, students may move in and out of the campus freely.</li>
            <li>For outstation travel, students must apply for leave via email to the Hostel Warden or submit a leave form at least four hours prior to the scheduled departure to avoid inconvenience.</li>
          </ul>
        </div>

        <div style="margin-bottom: 12px;">
          <h4 style="margin: 0 0 3px 0; font-weight: bold; text-decoration: underline;">Night Attendance</h4>
          <ul style="margin: 0; padding-left: 15px; list-style-type: disc;">
            <li>Night attendance must be marked between 10:00 PM and 10:30 PM.</li>
            <li>In case a student fails to mark attendance, the hostel authorities will inform the concerned guardian.</li>
            <li>Repeated failure to mark attendance will attract disciplinary action, including fines.</li>
          </ul>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
          <tbody>
            <tr>
              <td style="width: 20%; padding: 4px 0; font-weight: bold;">1- Student Name:</td>
              <td style="border-bottom: 1px dotted #000; padding: 4px 5px;" colspan="3">\${item.studentName}</td>
            </tr>
            <tr>
              <td style="width: 15%; padding: 4px 0; font-weight: bold;">2- Roll NO:</td>
              <td style="width: 25%; border-bottom: 1px dotted #000; padding: 4px;">\${item.rollNo}</td>
              <td style="width: 25%; padding: 4px 0; font-weight: bold; text-align: center;">3- Hostel Block:</td>
              <td style="width: 35%; border-bottom: 1px dotted #000; padding: 4px;">\${item.hostel}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">4- Room No.:</td>
              <td style="border-bottom: 1px dotted #000; padding: 4px;" colspan="3">\${item.room}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Parent/Guardian 1:</td>
              <td style="border-bottom: 1px dotted #000; padding: 4px;" colspan="3">\${item.parentName}</td>
            </tr>
            \${item.parentGuardian2 ? '<tr><td style="padding: 4px 0; font-weight: bold;">Parent/Guardian 2:</td><td style="border-bottom: 1px dotted #000; padding: 4px;" colspan="3">' + item.parentGuardian2 + '</td></tr>' : ''}
          </tbody>
        </table>

        <p style="margin: 0 0 8px 0; text-align: justify; font-size: 9.5px;">
          I/we have read and clearly understood the University's <strong>ENTRY-EXIT PROCEDURES</strong>.
        </p>
        <p style="margin: 0 0 8px 0; text-align: justify; font-size: 9.5px;">
          I/We give my/our consent to university that my/our ward be allowed to check-in and check-out of the University Campus for overnight stay out of the campus, warden office will take prior approval from us. (Please tick):
        </p>
        <p style="margin: 0 0 8px 0; font-style: italic; font-weight: bold; font-size: 9.5px;">
          [Yes] (I/We also agree to submit our permission for night-out via email to wardenboys@jklu.edu.in / wardengirls@jklu.edu.in)
        </p>
        <p style="margin: 0 0 12px 0; font-size: 8.5px; text-align: justify; border-left: 2px solid #666; padding-left: 8px; color: #444;">
          The request must be submitted latest by 6:00 PM on the day of the student's night-out. If a student is found absent (staying outside the campus) without prior information or approval from the Hostel Warden, the University reserves the right to take appropriate disciplinary action as per rules.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tbody>
            <tr>
              <td style="width: 50%; padding-bottom: 15px; font-weight: bold;">Signature of Parent/Guardian: _________________</td>
              <td style="width: 50%; padding-bottom: 15px; font-weight: bold; padding-left: 20px;">Date: \${new Date().toLocaleDateString('en-GB')}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 15px; font-weight: bold;">Mobile 1: \${item.parentContact}</td>
              <td style="padding-bottom: 15px; font-weight: bold; padding-left: 20px;">Mobile 2: \${item.parent2Contact || '_________________'}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 25px; font-weight: bold;">Email 1: \${item.parentEmail || '_________________'}</td>
              <td style="padding-bottom: 25px; font-weight: bold; padding-left: 20px;">Email 2: \${item.parent2Email || '_________________'}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">(Signature of Student)</td>
              <td style="font-weight: bold; padding-left: 20px; text-align: right;">(Signature of Hostel Warden)</td>
            </tr>
          </tbody>
        </table>
      `;

      printContainer.appendChild(stayDiv);
      printContainer.appendChild(consentDiv);
    });

    try {
      const html2pdf = (await loadHtml2Pdf()) as any;
      const opt = {
        margin: 0.5,
        filename: `All_Short_Stay_Forms_${activeHostel}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().from(printContainer).set(opt).save();
    } catch (err) {
      console.error('Error generating bulk PDF:', err);
    } finally {
      document.body.removeChild(printContainer);
      setBulkDownloading(false);
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

  const handleCheckIn = async (bedSno: number, memberId: string, name: string) => {
    if (!confirm(`Are you sure you want to check in ${name}?`)) {
      return;
    }
    
    setCheckingInSno(bedSno);
    try {
      const res = await fetch('/api/hostel/member/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to check in.');
      }
      
      // Refresh list
      fetchHostelData(activeHostel);
    } catch (err: any) {
      alert(err.message || 'An error occurred during check in.');
    } finally {
      setCheckingInSno(null);
    }
  };

  const handleSaveArrival = async (memberId: string) => {
    setSavingArrivalMemberId(memberId);
    try {
      const res = await fetch('/api/hostel/member/arrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
          arrivalDate: editArrivalDate,
          arrivalTime: editArrivalTime
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save arrival details.');
      }
      
      setEditingMemberId(null);
      fetchHostelData(activeHostel);
    } catch (err: any) {
      alert(err.message || 'An error occurred saving arrival details.');
    } finally {
      setSavingArrivalMemberId(null);
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
          <div className="flex items-center gap-2 mt-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase">
              Hostel Command Center
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
            Monitor real-time bed occupancy, search team allotments, and manage checkout actions.
          </p>
        </div>
        
        {/* Bulk Download & Hostel Selector Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <button
            onClick={triggerBulkDownload}
            disabled={bulkDownloading || loading}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
          >
            {bulkDownloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              <>
                📥 Download All Stay Forms (${Object.keys(forms).length} Filled)
              </>
            )}
          </button>

          <div className="flex bg-card-bg border border-card-border p-1.5 rounded-2xl w-fit shadow-inner">
            <button
              onClick={() => setActiveHostel('BH-1')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider flex items-center gap-1.5 ${
                activeHostel === 'BH-1'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              👨‍💻 BH-1
            </button>
            <button
              onClick={() => setActiveHostel('GH-2')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-outfit uppercase tracking-wider flex items-center gap-1.5 ${
                activeHostel === 'GH-2'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              👩‍💻 GH-2
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Beds */}
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-primary/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Total Bed Slots</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-foreground">{loading ? '...' : totalBeds}</span>
            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold">Capacity</span>
          </div>
        </div>

        {/* Occupied Beds */}
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-red-500/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Occupied Beds</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-red-500">{loading ? '...' : occupiedBeds}</span>
            <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-md font-bold">Filled</span>
          </div>
        </div>

        {/* Vacant Beds */}
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-green-500/20 transition-all duration-300">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Vacant Beds</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-green-500">{loading ? '...' : vacantBeds}</span>
            <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-md font-bold">Available</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-primary/20 transition-all duration-300">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                className="bg-card-bg border border-card-border rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 hover:border-card-border/90 hover:shadow-lg relative overflow-hidden"
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
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-300 hover:shadow-sm ${
                          bed.isOccupied
                            ? 'bg-background border-card-border/80'
                            : 'bg-green-500/[0.02] border-dashed border-green-500/20'
                        }`}
                      >
                        {/* Bed Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar or vacant icon */}
                          {bed.isOccupied ? (
                            <div className="w-8 h-8 sm:w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs sm:text-sm shrink-0">
                              {firstLetter}
                            </div>
                          ) : (
                            <div className="w-8 h-8 sm:w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xs shrink-0">
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
                                
                                {/* Arrival details rendering */}
                                <div className="mt-1.5 text-[10px] text-text-muted">
                                  {editingMemberId && editingMemberId === bed.memberId ? (
                                    <div className="flex flex-col gap-1 mt-1 p-1.5 bg-card-border/10 rounded-lg border border-card-border/30">
                                      <div className="flex gap-1.5 items-center">
                                        <input
                                          type="text"
                                          placeholder="DD-MM-YYYY"
                                          value={editArrivalDate}
                                          onChange={(e) => setEditArrivalDate(e.target.value)}
                                          className="px-1.5 py-0.5 bg-background border border-card-border text-[10px] rounded focus:outline-none focus:ring-1 focus:ring-primary w-28"
                                        />
                                      </div>
                                      <div className="flex gap-1.5 justify-end">
                                        <button
                                          onClick={() => setEditingMemberId(null)}
                                          className="px-2 py-0.5 bg-card-border/30 hover:bg-card-border/50 text-text-muted rounded text-[9px] font-bold transition-all"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleSaveArrival(bed.memberId!)}
                                          disabled={savingArrivalMemberId === bed.memberId}
                                          className="px-2 py-0.5 bg-primary hover:bg-primary-dark text-white rounded text-[9px] font-bold transition-all"
                                        >
                                          {savingArrivalMemberId === bed.memberId ? 'Saving...' : 'Save'}
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-semibold text-text-muted">Arrival:</span>
                                      {bed.arrivalDate ? (() => {
                                        let isMissed = false;
                                        try {
                                          const parts = bed.arrivalDate.split('-');
                                          if (parts.length === 3) {
                                            const day = parseInt(parts[0], 10);
                                            const month = parseInt(parts[1], 10) - 1;
                                            const year = parseInt(parts[2], 10);
                                            const arrDate = new Date(year, month, day);
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            isMissed = !bed.checkedIn && today > arrDate;
                                          }
                                        } catch (e) {
                                          console.error("Error parsing date:", e);
                                        }

                                        return (
                                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide border ${
                                            isMissed 
                                              ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                              : 'bg-primary/10 text-primary border-primary/20'
                                          }`}>
                                            {bed.arrivalDate}
                                          </span>
                                        );
                                      })() : (
                                        <span className="text-text-muted italic">Not specified</span>
                                      )}
                                      {user?.role === 'super_admin' && bed.memberId && (
                                        <button
                                          onClick={() => {
                                            setEditingMemberId(bed.memberId!);
                                            setEditArrivalDate(bed.arrivalDate || '');
                                            setEditArrivalTime(''); // Time is no longer used/edited
                                          }}
                                          className="text-primary hover:text-primary-dark transition-all font-bold cursor-pointer text-[10px]"
                                          title="Edit Arrival Date"
                                        >
                                          ✏️
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Check-In Status rendering */}
                                <div className="mt-1 text-[10px] font-semibold">
                                  {bed.checkedIn ? (
                                    <span className="text-green-500">
                                      ✓ Checked In: {bed.checkedInTime ? new Date(bed.checkedInTime).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                                    </span>
                                  ) : (
                                    <span className="text-amber-500">
                                      ✗ Not Checked In
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-green-500 font-extrabold uppercase mt-0.5 block tracking-wider leading-none">
                                + Available Slot
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 shrink-0 sm:justify-end">
                          {bed.isOccupied && (
                            <>
                              {/* Check In Button */}
                              {!bed.checkedIn && bed.memberId && (
                                <button
                                  onClick={() => handleCheckIn(bed.sno, bed.memberId!, bed.occupiedByCohort || '')}
                                  disabled={checkingInSno === bed.sno}
                                  className="px-2 py-0.5 sm:py-1 bg-green-500/15 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 text-[8px] sm:text-[9px] font-black rounded-md transition-all cursor-pointer uppercase tracking-wider"
                                  title="Check In Member"
                                >
                                  {checkingInSno === bed.sno ? '...' : 'Check In 🔑'}
                                </button>
                              )}
                              {forms[bed.occupiedByAppNo?.toUpperCase().replace(/[\/\.\s-]/g, '') || ''] ? (
                                <button
                                  onClick={() => triggerSingleDownload(bed, room.room, room.floor, 'stay')}
                                  className="px-2 py-0.5 sm:py-1 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 text-[8px] sm:text-[9px] font-black rounded-md transition-all cursor-pointer uppercase tracking-wider"
                                  title="Download Short Stay Form"
                                >
                                  Stay Form 📥
                                </button>
                              ) : (
                                <span className="px-2 py-0.5 sm:py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] sm:text-[9px] font-bold rounded-md uppercase tracking-wider" title="Stay details form pending">
                                  Pending ⏳
                                </span>
                              )}
                              {user?.role === 'super_admin' && (
                                <button
                                  onClick={() => handleVacateBed(bed.sno, room.room, bed.bed)}
                                  disabled={vacatingSno === bed.sno}
                                  className="px-2 py-0.5 sm:py-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-[8px] sm:text-[9px] font-black rounded-md transition-all cursor-pointer uppercase tracking-wider"
                                  title="Vacate Bed Slot"
                                >
                                  {vacatingSno === bed.sno ? '...' : 'Vacate'}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden Templates for Single Print/Downloads */}
      {printData && (
        <div style={{ display: 'none' }}>
          {/* Admin Single Short Stay Form */}
          <div id="admin-short-stay-template" style={{ padding: '40px', fontFamily: 'serif', color: '#000', backgroundColor: '#fff', fontSize: '12px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
              <img src="/JKLU%20Logo.png" alt="JKLU Logo" style={{ height: '50px' }} />
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>JK LAKSHMIPAT UNIVERSITY</h2>
                <span style={{ fontSize: '10px', color: '#666' }}>OFFICE OF STUDENT AFFAIRS</span>
              </div>
            </div>
            <h3 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '25px', textTransform: 'uppercase' }}>
              Hostel Stay Permission Form (Short Stay)
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <tbody>
                <tr>
                  <td style={{ width: '35%', padding: '6px 0', fontWeight: 'bold' }}>Student Name:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.studentName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Roll No:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.rollNo}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Programme / Position:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.course}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Contact No:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.mobile}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>JKLU Mail ID:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Parent Name:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.parentName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Parent Contact No:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.parentContact}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Address:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.address}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Purpose of stay:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px' }}>Aarambh 2026 Organizing Team Duty</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Approved By:</td>
                  <td style={{ borderBottom: '1px dotted #000', padding: '6px 5px', fontWeight: 'bold' }}>Mr. Deepak Sogani (Head-Student Affairs)</td>
                </tr>
              </tbody>
            </table>
            
            <h4 style={{ fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
              Room Allotment Details (To be filled by Wardens)
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <tbody>
                <tr>
                  <td style={{ width: '20%', padding: '6px 0', fontWeight: 'bold' }}>Hostel Block:</td>
                  <td style={{ width: '30%', borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.hostel}</td>
                  <td style={{ width: '20%', padding: '6px 0', fontWeight: 'bold', textAlign: 'center' }}>Room No:</td>
                  <td style={{ width: '30%', borderBottom: '1px dotted #000', padding: '6px 5px' }}>{printData.room}</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', textTransform: 'uppercase' }}>
              Undertaking
            </h4>
            <p style={{ margin: '0 0 20px 0', textAlign: 'justify', fontSize: '10px', lineHeight: '1.5' }}>
              I hereby declare that I have checked all the items in the room and found them in proper condition at the time of allotment. I understand that I am responsible for maintaining the room and its inventory during my stay. In case of any loss, damage, or missing item, I shall be liable to bear the cost as decided by the hostel authorities.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '11px' }}>
              <tbody>
                <tr>
                  <td style={{ width: '50%', paddingBottom: '25px', fontWeight: 'bold' }}>Check In Date: _________________</td>
                  <td style={{ width: '50%', paddingBottom: '25px', fontWeight: 'bold', paddingLeft: '20px' }}>Time: _________________</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', paddingBottom: '35px' }}>Student Signature: _________________</td>
                  <td style={{ fontWeight: 'bold', paddingBottom: '35px', paddingLeft: '20px' }}>Warden Signature: _________________</td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: '25px', fontWeight: 'bold' }}>Check Out Date: _________________</td>
                  <td style={{ width: '50%', paddingBottom: '25px', fontWeight: 'bold', paddingLeft: '20px' }}>Time: _________________</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Student Signature: _________________</td>
                  <td style={{ fontWeight: 'bold', paddingLeft: '20px' }}>Warden Signature: _________________</td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      )}
    </div>
  );
}
