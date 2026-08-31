import React from 'react';
import { History, Shield, Smartphone, Globe } from 'lucide-react';
import Swal from 'sweetalert2';

const AuditLogs = () => {
  const logs = [
    { text: 'Super Admin updated Shift "Night Shift"', time: '10 mins ago', type: 'system', user: 'admin' },
    { text: 'Manish Tiwari (EMP-009) forced Face Matrix retake by Admin', time: '1 hr ago', type: 'security', user: 'admin' },
    { text: 'Employee Ankita Joshi edited profile from App', time: 'Today, 09:30 AM', type: 'app', user: 'user' },
    { text: 'Priya Singh approved device login (iPhone 13)', time: 'Yesterday', type: 'security', user: 'admin' }
  ];

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">System Audit Logs</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Track all administrative and security actions in the system.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Action Ledger</h2>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Timestamp</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Actor</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Module/Type</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px]">Action Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {logs.map((L, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{L.time}</p>
                </td>
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <p className="text-xs font-bold text-gray-900">{L.user === 'admin' ? 'SYSTEM ADMIN' : 'EMPLOYEE'}</p>
                </td>
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${L.type === 'security' ? 'text-red-700' : L.type === 'app' ? 'text-blue-700' : 'text-gray-700'}`}>
                    {L.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                     <div className="text-gray-400">
                       {L.type === 'security' ? <Shield size={14}/> : L.type === 'app' ? <Smartphone size={14}/> : <Globe size={14}/>}
                     </div>
                     <p className="text-sm font-medium text-gray-900">{L.text}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AuditLogs;