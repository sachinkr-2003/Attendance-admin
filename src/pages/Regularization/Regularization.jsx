import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const initialRequests = [
  { id: 'REG-501', empId: 'EMP-019', name: 'Alok Sharma', date: '30 Aug 2026', type: 'Missed Out-Punch', oldTime: '18:00 (Missing)', newTime: '18:30', reason: 'Forgot to punch out due to client call', status: 'Pending' },
  { id: 'REG-502', empId: 'EMP-022', name: 'Sneha Patil', date: '29 Aug 2026', type: 'Late In-Punch', oldTime: '10:15', newTime: '09:00', reason: 'Biometric device offline, arrived on time', status: 'Pending' },
  { id: 'REG-503', empId: 'EMP-007', name: 'Rajiv Kapoor', date: '28 Aug 2026', type: 'Missed In-Punch', oldTime: '09:00 (Missing)', newTime: '09:15', reason: 'Card forgotten', status: 'Approved' },
];

const Regularization = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = requests.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (request, isApprove) => {
    Swal.fire({
      title: isApprove ? 'Approve Request?' : 'Reject Request?',
      text: isApprove ? `Time will be modified to ${request.newTime}` : 'Attendance will remain unchanged.',
      icon: isApprove ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: isApprove ? 'Yes, Approve' : 'Yes, Reject',
      confirmButtonColor: isApprove ? '#16a34a' : '#dc2626'
    }).then((res) => {
      if(res.isConfirmed) {
        setRequests(requests.map(r => r.id === request.id ? {...r, status: isApprove ? 'Approved' : 'Rejected'} : r));
        Swal.fire({title: isApprove ? 'Approved!' : 'Rejected', icon: 'success', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false});
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Regularization Approvals</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Review and approve missed punches & time corrections.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="SEARCH REQUESTS..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 bg-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            </div>
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pending Corrections</h2>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Req ID</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Employee</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Correction Detail</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Reason</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <span className="text-xs font-bold text-gray-900">{r.id}</span>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">{r.date}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                   <p className="text-xs font-bold text-gray-900">{r.name}</p>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{r.empId}</p>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                   <div className="flex items-center gap-2">
                       <Clock size={14} className="text-gray-400" />
                       <span className="text-[11px] uppercase tracking-widest font-bold text-blue-700">{r.type}</span>
                   </div>
                   <div className="mt-1 text-xs font-medium text-gray-600">
                      <span className="line-through text-red-400">{r.oldTime}</span> &rarr; <span className="font-bold text-emerald-600">{r.newTime}</span>
                   </div>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                   <p className="text-xs font-medium text-gray-700">{r.reason}</p>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {r.status === 'Pending' ? (
                    <div className="flex items-center justify-end gap-3 text-[10px] uppercase font-bold tracking-widest">
                        <button onClick={() => handleAction(r, true)} className="text-emerald-700 hover:underline">Approve</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => handleAction(r, false)} className="text-red-700 hover:underline">Reject</button>
                    </div>
                  ) : (
                     <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest border ${r.status === 'Approved' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-red-700 border-red-200 bg-red-50'}`}>
                        {r.status}
                     </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Regularization;
