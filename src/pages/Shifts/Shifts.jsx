import React, { useState } from 'react';
import { 
  Clock, Plus, Search, Moon, Sun, Sunrise, 
  Trash2, Edit, AlertCircle, CheckCircle2, 
  XCircle, Filter
} from 'lucide-react';
import Swal from 'sweetalert2';

const initialShifts = [];

const Shifts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shifts, setShifts] = useState(initialShifts);

  const filteredData = shifts.filter(shift => 
    shift.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shift.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getShiftIcon = (type) => {
    switch(type) {
      case 'Morning': return <Sunrise size={20} className="text-orange-500" />;
      case 'Day': return <Sun size={20} className="text-yellow-500" />;
      case 'Evening': return <Sun size={20} className="text-amber-600" />;
      case 'Night': return <Moon size={20} className="text-indigo-400" />;
      default: return <Clock size={20} className="text-blue-500" />;
    }
  };

  const getShiftBg = (type) => {
    switch(type) {
      case 'Morning': return 'bg-orange-50 border-orange-100';
      case 'Day': return 'bg-yellow-50 border-yellow-100';
      case 'Evening': return 'bg-amber-50 border-amber-100';
      case 'Night': return 'bg-indigo-50 border-indigo-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  const handleCreateShift = () => {
    Swal.fire({
      title: 'Create New Shift',
      html: `
        <div class="text-left space-y-4 mt-2">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Shift Name</label>
            <input type="text" id="swal-name" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Winter Shift">
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Shift Type</label>
                <select id="swal-type" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none">
                   <option value="Day">Day</option>
                   <option value="Morning">Morning</option>
                   <option value="Evening">Evening</option>
                   <option value="Night">Night</option>
                </select>
             </div>
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Grace Period</label>
                <select id="swal-grace" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none">
                   <option value="0 mins">None</option>
                   <option value="5 mins">5 Minutes</option>
                   <option value="15 mins" selected>15 Minutes</option>
                   <option value="30 mins">30 Minutes</option>
                </select>
             </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Start Time</label>
                <input type="time" id="swal-start" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none" value="09:00">
             </div>
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">End Time</label>
                <input type="time" id="swal-end" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none" value="18:00">
             </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Shift',
      confirmButtonColor: '#2563eb',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        if (!name) Swal.showValidationMessage('Shift Name is required');
        
        // Basic time formatting
        const startRaw = document.getElementById('swal-start').value;
        const endRaw = document.getElementById('swal-end').value;
        const formatTime = (time24) => {
           let [h, m] = time24.split(':');
           let ampm = h >= 12 ? 'PM' : 'AM';
           h = h % 12 || 12;
           return `${h}:${m} ${ampm}`;
        };

        return { 
          name, 
          type: document.getElementById('swal-type').value, 
          grace: document.getElementById('swal-grace').value,
          start: formatTime(startRaw),
          end: formatTime(endRaw),
          hours: '9h' 
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setShifts([
          { id: `SH-0${shifts.length + 1}`, ...result.value, status: 'Active' },
          ...shifts
        ]);
        Swal.fire({ title: 'Shift Created!', text: 'The new shift schedule is now available to assign to employees.', icon: 'success', confirmButtonColor: '#10b981' });
      }
    });
  };

  const handleAction = (action, shift) => {
    if (action === 'delete') {
      Swal.fire({
        title: 'Delete Shift?',
        text: `Are you sure? Any employees mapped to ${shift.name} will fall back to the default shift.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Yes, Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          setShifts(shifts.filter(s => s.id !== shift.id));
          Swal.fire('Deleted!', 'The shift has been permanently removed.', 'success');
        }
      });
    } else if (action === 'status') {
      setShifts(shifts.map(s => s.id === shift.id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
      Swal.fire({ title: 'Status Updated', text: `${shift.name} is now ${shift.status === 'Active' ? 'Inactive' : 'Active'}.`, icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
    }
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Shift Configurations</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
            Master Shift Database
          </p>
        </div>
        
        <button onClick={handleCreateShift} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700">
          <Plus size={14} strokeWidth={2.5} /> NEW SHIFT
        </button>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-300 bg-white">
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Total Shifts Configured</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">{shifts.length}</h3>
        </div>
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Active Shift Types</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">{shifts.filter(s => s.status === 'Active').length}</h3>
        </div>
        <div className="p-4 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Config Recommendation</p>
             <h3 className="text-sm font-bold text-blue-600 mt-2">Ensure night shifts cover Day-Crossover</h3>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row justify-between items-center bg-gray-50/50 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by shift name or type..."
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block pl-10 p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Shift Profile</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Timings</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Constraints</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
                     <p className="text-sm font-bold text-gray-600">No shifts found</p>
                  </td>
                </tr>
              ) : filteredData.map((shift, idx) => (
                <tr key={shift.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-bold text-gray-900 text-[13px]">{shift.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{shift.id} • {shift.type}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                       <span className="font-bold text-gray-900 text-xs">{shift.start} to {shift.end}</span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase">DURATION: {shift.hours}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-xs font-bold text-gray-800 uppercase">
                     GRACE: {shift.grace}
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-center">
                     <button onClick={() => handleAction('status', shift)}>
                        {shift.status === 'Active' ? (
                          <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Active</span>
                        ) : (
                          <span className="text-gray-500 font-bold text-xs"><XCircle size={12} className="inline mr-1"/>Inactive</span>
                        )}
                     </button>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-bold">
                      <button className="text-blue-600 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button onClick={() => handleAction('delete', shift)} className="text-red-600 hover:underline">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Setup */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">
            ROWS: {filteredData.length} / {shifts.length}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default Shifts;