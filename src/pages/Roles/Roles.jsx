import React, { useState } from 'react';
import { Shield, Plus, Lock, Users, LockOpen } from 'lucide-react';
import Swal from 'sweetalert2';

const initialRoles = [
  { id: 'R-01', name: 'Super Admin', desc: 'Full system access', users: 2, level: 100 },
  { id: 'R-02', name: 'HR Manager', desc: 'Can manage employees, leaves, and attendance', users: 4, level: 80 },
  { id: 'R-03', name: 'Team Lead', desc: 'Can view team attendance and approve WFH', users: 12, level: 50 },
  { id: 'R-04', name: 'Employee', desc: 'App access only', users: 145, level: 10 }
];

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);

  const handleEdit = (r) => {
    Swal.fire('Role Permissions', `The permission matrix for ${r.name} will be added in module V2.`, 'info');
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Role-Based Access (RBAC)</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Manage what your team can see or do in the admin panel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white border border-gray-300 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {roles.map(r => (
          <div key={r.id} className="p-6 relative">
             <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-300">
                    {r.level === 100 ? <Shield size={18}/> : r.level > 50 ? <Lock size={18}/> : <LockOpen size={18}/>}
                 </div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r.id}</div>
             </div>
             
             <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{r.name}</h3>
             <p className="text-xs font-medium text-gray-500 mb-6 h-8">{r.desc}</p>
             
             <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Accounts</span>
                  <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 border border-gray-300">{r.users}</span>
                </div>
                <button onClick={() => handleEdit(r)} className="w-full text-center py-2 text-xs font-bold bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors uppercase tracking-widest">Edit Matrix</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Roles;