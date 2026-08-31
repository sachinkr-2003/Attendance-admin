import React, { useState } from 'react';
import { Search, MonitorSmartphone, ShieldAlert, Check, X, Smartphone, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const initialDevices = [];

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState(initialDevices);

  const filtered = devices.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAction = (id, action) => {
    if (action === 'Approve') {
      Swal.fire({ title: 'Approve Device', text: 'This device will be allowed to punch attendance.', icon: 'question', showCancelButton: true, confirmButtonText: 'Approve', confirmButtonColor: '#10b981' })
        .then(res => {
          if(res.isConfirmed) {
            setDevices(devices.map(d => d.id === id ? {...d, status: 'Approved'} : d));
            Swal.fire({title: 'Approved', icon: 'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false});
          }
        });
    } else {
      Swal.fire({ title: 'Block Device', text: 'Are you sure? They will not be able to login from this device.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Block', confirmButtonColor: '#ef4444' })
        .then(res => {
          if(res.isConfirmed) {
            setDevices(devices.map(d => d.id === id ? {...d, status: 'Blocked'} : d));
            Swal.fire({title: 'Blocked', icon: 'info', toast:true, position:'top-end', timer:2000, showConfirmButton:false});
          }
        });
    }
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Device Approvals</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Master Hardware Database</p>
        </div>
        <div className="px-4 py-2 border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs">
           {devices.filter(d => d.status === 'Pending').length} Pending Requests
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={16} className="text-gray-400" /></div>
            <input type="text" placeholder="Search employee..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-gray-300 text-sm focus:ring-blue-500 block pl-10 p-2 outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Employee Details</th>
                <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Hardware Info</th>
                <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Timestamp</th>
                <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-center uppercase tracking-widest text-[11px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.map((req, idx) => (
                <tr key={req.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <p className="font-bold text-gray-900 text-[13.5px]">{req.name}</p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{req.empId}</p>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <p className="font-bold text-gray-800 text-[12px]">{req.model}</p>
                     <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-0.5">{req.os}</p>
                  </td>
                  <td className="px-4 py-3 font-bold text-xs text-gray-800 border-r border-gray-200 whitespace-nowrap">{req.timestamp}</td>
                  <td className="px-4 py-3 border-r border-gray-200 text-center whitespace-nowrap">
                     {req.status === 'Approved' && <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Approved</span>}
                     {req.status === 'Blocked' && <span className="text-red-700 font-bold text-xs"><XCircle size={12} className="inline mr-1 text-red-500"/>Blocked</span>}
                     {req.status === 'Pending' && <span className="text-amber-600 font-bold text-xs"><AlertTriangle size={12} className="inline mr-1 text-amber-500"/>Pending</span>}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-center gap-3 text-xs font-bold">
                         <button onClick={() => handleAction(req.id, 'Approve')} className="text-emerald-700 hover:underline">Approve</button>
                         <span className="text-gray-300">|</span>
                         <button onClick={() => handleAction(req.id, 'Block')} className="text-red-700 hover:underline">Block</button>
                      </div>
                    ) : <span className="text-xs font-bold text-gray-400 italic">Resolved</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Devices;