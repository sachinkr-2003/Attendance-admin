import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Edit, CheckCircle2, Gift } from 'lucide-react';
import Swal from 'sweetalert2';

const initialHolidays = [
  { id: 'HOL-01', name: 'Republic Day', date: '26 Jan 2026', day: 'Monday', type: 'National', status: 'Passed' },
  { id: 'HOL-02', name: 'Holi', date: '04 Mar 2026', day: 'Wednesday', type: 'Festival', status: 'Passed' },
  { id: 'HOL-03', name: 'Independence Day', date: '15 Aug 2026', day: 'Saturday', type: 'National', status: 'Passed' },
  { id: 'HOL-04', name: 'Diwali', date: '08 Nov 2026', day: 'Sunday', type: 'Festival', status: 'Upcoming' },
  { id: 'HOL-05', name: 'Christmas Day', date: '25 Dec 2026', day: 'Friday', type: 'Festival', status: 'Upcoming' },
];

const Holidays = () => {
  const [holidays, setHolidays] = useState(initialHolidays);

  const handleAddModal = () => {
    Swal.fire({
      title: 'Add New Holiday',
      html: `
        <div class="text-left space-y-3 mt-4">
          <input type="text" id="swal-name" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm" placeholder="Holiday Title">
          <input type="date" id="swal-date" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm">
          <select id="swal-type" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm">
            <option value="Festival">Festival</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add to Calendar',
      confirmButtonColor: '#2563eb',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const date = document.getElementById('swal-date').value;
        if (!name || !date) Swal.showValidationMessage('Title and Date are required');
        return { name, date, type: document.getElementById('swal-type').value };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setHolidays([...holidays, { id: `HOL-99`, name: result.value.name, date: result.value.date, day: 'Custom', type: result.value.type, status: 'Upcoming' }]);
        Swal.fire('Added', 'The holiday has been added to the calendar.', 'success');
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Remove Holiday?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setHolidays(holidays.filter(h => h.id !== id));
        Swal.fire({title:'Deleted!', icon:'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false});
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Holiday Calendar 2026</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Master Holiday Database</p>
        </div>
        <button onClick={handleAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700">
          <Plus size={14} strokeWidth={2.5} /> NEW HOLIDAY
        </button>
      </div>

      {/* Main Grid Card */}
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">All Planned Holidays</h2>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Date & Day</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Holiday Name</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Type</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {holidays.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <p className="text-sm font-bold text-gray-600">No holidays found</p>
                  </td>
                </tr>
              ) : holidays.map((holiday, idx) => (
                <tr key={holiday.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <div className="flex flex-col gap-0.5">
                       <span className="font-bold text-gray-900 text-[13px]">{holiday.date}</span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{holiday.day}</span>
                     </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <p className="font-bold text-gray-900 text-[13.5px]">{holiday.name}</p>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${holiday.type === 'National' ? 'text-amber-700' : 'text-purple-700'}`}>
                       {holiday.type}
                     </span>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap text-center">
                    {holiday.status === 'Upcoming' ? (
                       <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Upcoming</span>
                    ) : (
                       <span className="text-gray-400 font-bold text-xs italic">Passed</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button 
                      onClick={() => handleDelete(holiday.id)}
                      className="text-red-600 hover:underline text-xs font-bold"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Setup */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">
            ROWS: {holidays.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Holidays;