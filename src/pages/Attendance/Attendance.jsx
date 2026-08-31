import React, { useState } from 'react';
import { 
  Search, Filter, Calendar as CalendarIcon, Download, 
  MapPin, Clock, Edit, CheckCircle2, XCircle, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';

const attendanceData = [
  { id: 'EMP-001', name: 'Rahul Sharma', department: 'IT', date: '31 Aug 2026', checkIn: '09:05 AM', checkOut: '06:15 PM', hours: '9h 10m', status: 'Present', inLocation: 'Office - Delhi', outLocation: 'Office - Delhi', avatar: 'R' },
  { id: 'EMP-002', name: 'Priya Singh', department: 'HR', date: '31 Aug 2026', checkIn: '09:20 AM', checkOut: '06:30 PM', hours: '9h 10m', status: 'Late', inLocation: 'Office - Mumbai', outLocation: 'Office - Mumbai', avatar: 'P' },
  { id: 'EMP-003', name: 'Amit Kumar', department: 'Sales', date: '31 Aug 2026', checkIn: '-', checkOut: '-', hours: '0h 0m', status: 'Absent', inLocation: '-', outLocation: '-', avatar: 'A' },
  { id: 'EMP-004', name: 'Sneha Gupta', department: 'Design', date: '31 Aug 2026', checkIn: '09:00 AM', checkOut: '02:00 PM', hours: '5h 0m', status: 'Half Day', inLocation: 'Work From Home', outLocation: 'Work From Home', avatar: 'S' },
  { id: 'EMP-005', name: 'Vikram Singh', department: 'IT', date: '31 Aug 2026', checkIn: '08:50 AM', checkOut: '06:05 PM', hours: '9h 15m', status: 'Present', inLocation: 'Office - Bangalore', outLocation: 'Office - Bangalore', avatar: 'V' },
  { id: 'EMP-006', name: 'Neha Verma', department: 'Marketing', date: '31 Aug 2026', checkIn: '09:45 AM', checkOut: '07:00 PM', hours: '9h 15m', status: 'Late', inLocation: 'Client Visit', outLocation: 'Office - Pune', avatar: 'N' },
  { id: 'EMP-007', name: 'Rajiv Kapoor', department: 'Finance', date: '31 Aug 2026', checkIn: '09:01 AM', checkOut: '06:01 PM', hours: '9h 0m', status: 'Present', inLocation: 'Office - Delhi', outLocation: 'Office - Delhi', avatar: 'R' },
  { id: 'EMP-008', name: 'Pooja Agarwal', department: 'HR', date: '31 Aug 2026', checkIn: '09:35 AM', checkOut: '06:45 PM', hours: '9h 10m', status: 'Late', inLocation: 'Office - Delhi', outLocation: 'Office - Delhi', avatar: 'P' },
  { id: 'EMP-009', name: 'Manish Tiwari', department: 'Sales', date: '31 Aug 2026', checkIn: '08:45 AM', checkOut: '07:30 PM', hours: '10h 45m', status: 'Present', inLocation: 'Client Visit - Noida', outLocation: 'Client Visit - Gurugram', avatar: 'M' },
  { id: 'EMP-010', name: 'Kavita Das', department: 'Support', date: '31 Aug 2026', checkIn: '10:15 AM', checkOut: '07:15 PM', hours: '9h 0m', status: 'Late', inLocation: 'Work From Home', outLocation: 'Work From Home', avatar: 'K' },
  { id: 'EMP-011', name: 'Rohan Mehta', department: 'IT', date: '31 Aug 2026', checkIn: '-', checkOut: '-', hours: '0h 0m', status: 'Absent', inLocation: '-', outLocation: '-', avatar: 'R' },
  { id: 'EMP-012', name: 'Ankita Joshi', department: 'Design', date: '31 Aug 2026', checkIn: '08:55 AM', checkOut: '01:30 PM', hours: '4h 35m', status: 'Half Day', inLocation: 'Office - Mumbai', outLocation: 'Office - Mumbai', avatar: 'A' },
  { id: 'EMP-013', name: 'Deepak Chawla', department: 'Finance', date: '31 Aug 2026', checkIn: '08:30 AM', checkOut: '05:30 PM', hours: '9h 0m', status: 'Present', inLocation: 'Office - Bangalore', outLocation: 'Office - Bangalore', avatar: 'D' },
];

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date('2026-08-31'));

  // Filtering Logic
  const filteredData = attendanceData.filter(record => 
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdjustClick = (record) => {
    Swal.fire({
      title: 'Adjust Attendance',
      html: `
        <div class="text-sm text-left mt-2">
          <p><strong>Employee:</strong> ${record.name} (${record.id})</p>
          <p class="mt-2">Enter corrected punch times below:</p>
          <input type="time" class="swal2-input !w-auto" value="09:00"> to \u00A0
          <input type="time" class="swal2-input !w-auto" value="18:00">
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Save Adjustment',
      confirmButtonColor: '#2563eb',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ title: 'Saved!', text: 'Attendance record updated successfully.', icon: 'success', confirmButtonColor: '#10b981' });
      }
    });
  };

  const handleFilterClick = () => {
    Swal.fire({
      title: 'Filter Records',
      text: 'Filter by Department, Shift, or Status',
      icon: 'question',
      input: 'select',
      inputOptions: { 'IT': 'IT', 'HR': 'HR', 'Sales': 'Sales', 'Late': 'Late Employees' },
      inputPlaceholder: 'Select filter criteria',
      showCancelButton: true,
      confirmButtonColor: '#2563eb'
    });
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Present':
        return <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>{status}</span>;
      case 'Late':
        return <span className="text-amber-700 font-bold text-xs"><AlertCircle size={12} className="inline mr-1 text-amber-500"/>{status}</span>;
      case 'Absent':
        return <span className="text-red-600 font-bold text-xs"><XCircle size={12} className="inline mr-1 text-red-500"/>{status}</span>;
      case 'Half Day':
        return <span className="text-blue-700 font-bold text-xs"><Clock size={12} className="inline mr-1 text-blue-500"/>{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Attendance Log</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
            Daily Workforce Timesheet
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 text-xs font-bold border border-gray-300 hover:bg-gray-200">
            <Download size={14} /> EXPORT CSV
          </button>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-300 bg-white">
        {[
          { title: 'Total Present', count: '145', color: 'border-r border-gray-200' },
          { title: 'Late Arrivals', count: '12', color: 'border-r border-gray-200' },
          { title: 'Half Days', count: '5', color: 'border-r border-gray-200' },
          { title: 'Absent / On Leave', count: '13', color: '' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 ${stat.color} text-center`}>
            <p className="text-[10px] font-bold text-gray-500 uppercase">{stat.title}</p>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.count}</h3>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Date Selector */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
               <button onClick={() => changeDate(-1)} className="p-2 text-gray-500 hover:text-gray-700 border-r border-gray-200 transition-colors hover:bg-gray-50"><ChevronLeft size={18} /></button>
               <div className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-700 min-w-[140px] justify-center cursor-default">
                  <CalendarIcon size={16} className="text-blue-600" />
                  {currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
               </div>
               <button onClick={() => changeDate(1)} className="p-2 text-gray-500 hover:text-gray-700 border-l border-gray-200 transition-colors hover:bg-gray-50"><ChevronRight size={18} /></button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employee..."
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-9 p-2.5 shadow-sm outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter */}
            <button onClick={handleFilterClick} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm w-full md:w-auto">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Employee ID</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Name</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Check In</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Check Out</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Work Hours</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500 overflow-hidden">
                     <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
                     <p className="text-sm font-bold text-gray-600">No records found</p>
                     <p className="text-xs mt-1">Try adjusting your search criteria</p>
                  </td>
                </tr>
              ) : filteredData.map((record, idx) => (
                <tr key={record.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <span className="font-bold text-gray-800 text-xs">{record.id}</span>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <p className="font-bold text-gray-900 text-xs">{record.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{record.department}</p>
                  </td>
                  
                  <td className="px-4 py-3 text-center border-r border-gray-200">
                    <StatusBadge status={record.status} />
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900 text-xs">{record.checkIn}</span>
                      {record.checkIn !== '-' && (
                        <span className="text-[9px] text-gray-500 uppercase">
                          {record.inLocation}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900 text-xs">{record.checkOut}</span>
                      {record.checkOut !== '-' && (
                        <span className="text-[9px] text-gray-500 uppercase">
                          {record.outLocation}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 font-bold text-xs text-gray-800">
                    {record.hours}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleAdjustClick(record)} className="text-xs font-bold text-blue-600 hover:underline">
                      [ Edit ]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">
            ROWS: {filteredData.length} / {attendanceData.length}
          </span>
          <div className="flex items-center gap-1 text-xs">
             <button className="px-3 py-1 bg-white border border-gray-300 text-gray-500" disabled>PREV</button>
             <button className="px-3 py-1 bg-white border border-gray-300 text-gray-500" disabled>NEXT</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Attendance;