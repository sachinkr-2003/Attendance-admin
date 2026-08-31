import React, { useState } from 'react';
import { LifeBuoy, Search, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';

const initialTickets = [
  { id: 'TKT-1001', empId: 'EMP-012', name: 'Ankita Joshi', issue: 'App crashing on login', status: 'Open', priority: 'High', date: '31 Aug, 10:15 AM' },
  { id: 'TKT-1002', empId: 'EMP-044', name: 'Rohit Verma', issue: 'Salary deduction anomaly', status: 'In Progress', priority: 'Medium', date: '30 Aug, 03:45 PM' },
  { id: 'TKT-1003', empId: 'EMP-005', name: 'Vikram Singh', issue: 'New ID card requested', status: 'Resolved', priority: 'Low', date: '28 Aug, 11:20 AM' },
];

const Helpdesk = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolve = (ticket) => {
    Swal.fire({
      title: `Resolve Ticket ${ticket.id}?`,
      text: "Mark this support ticket as successfully resolved.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Resolve',
      confirmButtonColor: '#2563eb'
    }).then((res) => {
      if(res.isConfirmed) {
        setTickets(tickets.map(t => t.id === ticket.id ? {...t, status: 'Resolved'} : t));
        Swal.fire({title: 'Resolved!', icon: 'success', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false});
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Support Helpdesk</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Manage and resolve employee support tickets.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="SEARCH TICKETS..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 bg-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            </div>
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Active Tickets</h2>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Ticket No</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Employee</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Issue / Request</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] border-r border-gray-200">Status</th>
              <th className="px-4 py-3 uppercase tracking-widest text-[11px] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredTickets.map((t, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <span className="text-xs font-bold text-gray-900">{t.id}</span>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">{t.date}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                   <p className="text-xs font-bold text-gray-900">{t.name}</p>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.empId}</p>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                   <div className="flex items-center gap-2">
                       <MessageSquare size={14} className="text-gray-400" />
                       <span className="text-xs font-bold text-gray-700">{t.issue}</span>
                   </div>
                   <div className={`mt-1 inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold border tracking-widest ${t.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : t.priority === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{t.priority} Priority</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest border ${t.status === 'Open' ? 'text-blue-700 border-blue-200 bg-blue-50' : t.status === 'In Progress' ? 'text-amber-700 border-amber-200 bg-amber-50' : 'text-emerald-700 border-emerald-200 bg-emerald-50'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {t.status !== 'Resolved' ? (
                    <button onClick={() => handleResolve(t)} className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 hover:underline">Mark Resolved</button>
                  ) : (
                     <CheckCircle2 size={16} className="text-emerald-600 inline-block" />
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
export default Helpdesk;
