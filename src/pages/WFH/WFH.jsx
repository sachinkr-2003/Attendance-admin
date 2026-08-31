import React, { useState } from 'react';
import { Search, Home, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import Swal from 'sweetalert2';

const initialWfh = [];

const WFH = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState(initialWfh);

  const handleAction = (id, action) => {
    Swal.fire({
      title: action === 'Approve' ? 'Approve WFH?' : 'Reject WFH?',
      icon: action === 'Approve' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: action,
      confirmButtonColor: action === 'Approve' ? '#10b981' : '#ef4444'
    }).then((res) => {
      if(res.isConfirmed) {
        setRequests(requests.map(r => r.id === id ? {...r, status: action === 'Approve' ? 'Approved' : 'Rejected'} : r));
        Swal.fire({title: 'Updated', icon: 'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false});
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
           <h1 className="text-xl font-bold text-gray-900 tracking-tight">Work From Home (WFH)</h1>
           <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Review WFH punch-in requests.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">WFH Requests</h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Employee Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Date</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Reason</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <p className="text-sm font-bold text-gray-600">No requests found</p>
                  </td>
                </tr>
              ) : requests.map((req, idx) => (
                <tr key={req.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <p className="font-bold text-gray-900 text-[13.5px]">{req.name}</p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{req.id}</p>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <span className="font-bold text-gray-900 text-[12px]">{req.date}</span>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 w-[280px]">
                     <p className="text-[12px] font-medium text-gray-700 leading-tight">
                        {req.reason}
                     </p>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-center whitespace-nowrap">
                    {req.status === 'Pending' ? (
                       <span className="text-amber-600 font-bold text-xs"><Clock size={12} className="inline mr-1 text-amber-500"/>Pending</span>
                    ) : req.status === 'Approved' ? (
                       <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Approved</span>
                    ) : (
                       <span className="text-red-700 font-bold text-xs"><XCircle size={12} className="inline mr-1 text-red-500"/>Rejected</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-center gap-3 text-xs font-bold">
                        <button onClick={() => handleAction(req.id, 'Approve')} className="text-emerald-700 hover:underline">Approve</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => handleAction(req.id, 'Reject')} className="text-red-700 hover:underline">Reject</button>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 italic">Action Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Setup */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">
            ROWS: {requests.length}
          </span>
        </div>
      </div>
    </div>
  );
};
export default WFH;