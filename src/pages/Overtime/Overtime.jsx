import React, { useState } from 'react';
import { Search, Clock, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

const initialOvertimes = [
  { id: 'OT-101', empId: 'EMP-019', name: 'Alok Sharma', date: '30 Aug 2026', hours: '2h 30m', reason: 'Server deployment', status: 'Pending' },
  { id: 'OT-102', empId: 'EMP-022', name: 'Sneha Patil', date: '29 Aug 2026', hours: '4h 00m', reason: 'Client meeting overflow', status: 'Approved' }
];

const Overtime = () => {
  const [requests, setRequests] = useState(initialOvertimes);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = requests.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAction = (request, isApprove) => {
    Swal.fire({
      title: isApprove ? 'Approve Overtime?' : 'Reject Overtime?',
      icon: isApprove ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: isApprove ? 'Yes, Approve' : 'Yes, Reject',
      confirmButtonColor: isApprove ? '#16a34a' : '#dc2626'
    }).then((res) => {
      if(res.isConfirmed) {
        setRequests(requests.map(r => r.id === request.id ? {...r, status: isApprove ? 'Approved' : 'Rejected'} : r));
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Overtime Approvals</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Review employee overtime claims.</p>
        </div>
      </div>
      <div className="bg-white border border-gray-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r">OT ID</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r">Employee</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r">Date & Hours</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r">Reason</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r">Status</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-r font-bold">{r.id}</td>
                <td className="px-4 py-3 border-r font-bold">{r.name} <br/><span className="text-[10px] text-gray-400">{r.empId}</span></td>
                <td className="px-4 py-3 border-r font-bold text-blue-600">{r.date} <br/><span className="text-gray-600">{r.hours}</span></td>
                <td className="px-4 py-3 border-r">{r.reason}</td>
                <td className="px-4 py-3 border-r font-bold">{r.status}</td>
                <td className="px-4 py-3 text-right">
                  {r.status === 'Pending' ? (
                    <div className="flex justify-end gap-2 text-[10px] uppercase font-bold tracking-widest">
                       <button onClick={() => handleAction(r, true)} className="text-emerald-600">Approve</button> | 
                       <button onClick={() => handleAction(r, false)} className="text-red-600">Reject</button>
                    </div>
                  ) : <span>Processed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Overtime;
