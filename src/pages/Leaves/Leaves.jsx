import React, { useState } from 'react';
import { 
  Calendar, Check, X, Search, Filter,
  Clock, CheckCircle2, XCircle, FileText,
  AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';

const initialLeaves = [];

const Leaves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Pending', 'Approved', 'Rejected'

  const filteredData = leaves.filter(leave => {
    const matchesSearch = leave.name.toLowerCase().includes(searchTerm.toLowerCase()) || leave.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || leave.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (action, leaveRequest) => {
    if (action === 'approve') {
      Swal.fire({
        title: 'Approve Leave?',
        text: `You are approving ${leaveRequest.days} day(s) leave for ${leaveRequest.name}.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Yes, Approve'
      }).then((result) => {
        if (result.isConfirmed) {
          setLeaves(leaves.map(l => l.id === leaveRequest.id ? { ...l, status: 'Approved' } : l));
          Swal.fire({ title: 'Approved!', text: 'Leave request has been approved and user notified.', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
        }
      });
    } else if (action === 'reject') {
      Swal.fire({
        title: 'Reject Leave',
        input: 'textarea',
        inputLabel: 'Reason for rejection (Optional)',
        inputPlaceholder: 'Type reason here...',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Reject Request'
      }).then((result) => {
        if (result.isConfirmed) {
          setLeaves(leaves.map(l => l.id === leaveRequest.id ? { ...l, status: 'Rejected' } : l));
          Swal.fire({ title: 'Rejected', text: 'Leave request was denied.', icon: 'info', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
        }
      });
    }
  };
 
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Approved</span>;
      case 'Rejected':
        return <span className="text-red-700 font-bold text-xs"><XCircle size={12} className="inline mr-1 text-red-500"/>Rejected</span>;
      default:
        return <span className="text-amber-600 font-bold text-xs"><Clock size={12} className="inline mr-1 text-amber-500"/>Pending</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case 'Sick Leave': return 'text-rose-700';
      case 'Casual Leave': return 'text-blue-700';
      case 'Paid Leave': return 'text-purple-700';
      case 'Unpaid Leave': return 'text-orange-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Leave Approvals</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
            Employee Leave Workflow
          </p>
        </div>
        
        <button 
          onClick={() => Swal.fire('Leave Policies', 'This section will allow admins to set Paid/Sick leave quotas per employee role in the next update.', 'info')}
          className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 text-xs font-bold border border-gray-300 hover:bg-gray-200"
        >
          <FileText size={14} /> LEAVE POLICIES
        </button>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-300 bg-white">
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Pending Requests</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">{leaves.filter(l => l.status === 'Pending').length}</h3>
        </div>
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Approved Today</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">12</h3>
        </div>
        <div className="p-4 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">On Leave Today</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">5</h3>
        </div>
      </div>

      {/* Main Grid Card */}
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row justify-between items-center bg-gray-50/50 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Employee name or ID..."
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block pl-10 p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-white rounded-none border border-gray-300 w-full md:w-auto text-xs font-bold divide-x divide-gray-300">
             {['All', 'Pending', 'Approved', 'Rejected'].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setFilterStatus(mode)}
                  className={`px-4 py-2 transition-all uppercase ${filterStatus === mode ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {mode} {mode !== 'All' && `(${leaves.filter(l => l.status === mode).length})`}
                </button>
             ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Employee Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Leave Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Date & Duration</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
                     <p className="text-sm font-bold text-gray-600">No leave requests found</p>
                  </td>
                </tr>
              ) : filteredData.map((leave, idx) => (
                <tr key={leave.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-bold text-gray-900 text-[13.5px]">{leave.name}</p>
                      <p className="text-[10px] font-bold text-gray-600 uppercase">{leave.empId}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 w-[280px]">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${getTypeBadge(leave.type)}`}>
                        {leave.type}
                      </span>
                      <p className="text-[12px] font-medium text-gray-700 leading-tight line-clamp-2 pr-4" title={leave.reason}>
                        {leave.reason}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <div className="flex flex-col gap-0.5">
                       <span className="font-bold text-gray-900 text-xs">{leave.from} &rarr; {leave.to}</span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Duration: {leave.days} Day(s)</span>
                     </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap text-center">
                     {getStatusBadge(leave.status)}
                  </td>

                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {leave.status === 'Pending' ? (
                      <div className="flex items-center justify-center gap-3 text-xs font-bold">
                        <button 
                          onClick={() => handleAction('approve', leave)}
                          className="text-emerald-700 hover:underline"
                        >
                          Approve
                        </button>
                        <span className="text-gray-300">|</span>
                        <button 
                          onClick={() => handleAction('reject', leave)}
                          className="text-red-700 hover:underline"
                        >
                          Reject
                        </button>
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
            ROWS: {filteredData.length} / {leaves.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leaves;