import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, MoreHorizontal, Download, 
  MapPin, Phone, Mail, Building, Briefcase, CheckCircle2, 
  XCircle, Edit, Trash2, Shield, AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import EmployeeFormSlideOver from './EmployeeFormSlideOver';
import { employeeAPI } from '../../services/api';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Live Employees from Node/MongoDB Backend
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await employeeAPI.getAll();
      // Map MongoDB _id explicitly to id if needed, or just use as is
      const formatted = res.data.map(emp => ({
        ...emp,
        id: emp.employeeId || emp._id, // Map your custom employeeId field
        joinDate: new Date(emp.createdAt).toLocaleDateString('en-IN')
      }));
      setEmployees(formatted);
    } catch (e) {
      console.error("Failed to load employees:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // When form closes, refresh the list to show newly added employee
  const handleFormClose = () => {
    setIsAddFormOpen(false);
    fetchEmployees(); // Trigger a live refresh
  };

  const filteredData = employees.filter(emp => 
    (emp.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (emp.employeeId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (emp.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    Swal.fire({ title: 'Exporting Data', text: 'Generating CSV file of employee records...', icon: 'info', timer: 1500, timerProgressBar: true, showConfirmButton: false });
  };
  
  const handleFilterClick = () => {
    Swal.fire({
      title: 'Advanced Filters', text: 'Filter by Department, Status or Location.', icon: 'question', input: 'select',
      inputOptions: { 'IT': 'IT Dept', 'HR': 'HR Dept', 'Sales': 'Sales Dept', 'Active': 'Active Employees' },
      inputPlaceholder: 'Select filter condition', showCancelButton: true, confirmButtonColor: '#2563eb'
    });
  };

  const handlRowAction = (action, emp) => {
    if (action === 'delete') {
      Swal.fire({ 
        title: 'Delete Employee?', 
        text: `Are you sure you want to remove ${emp.name}? This cannot be undone.`, 
        icon: 'warning', 
        showCancelButton: true, 
        confirmButtonColor: '#ef4444', 
        confirmButtonText: 'Yes, Delete!' 
      }).then(async (result) => {
        if(result.isConfirmed) {
           try {
             await employeeAPI.delete(emp._id);
             Swal.fire('Deleted!', 'Employee removed successfully.', 'success');
             fetchEmployees();
           } catch(e) {
             Swal.fire('Error', 'Failed to delete record.', 'error');
           }
        }
      });
    } else if (action === 'role') {
      Swal.fire({ 
        title: 'Change Role', 
        input: 'text', 
        inputValue: emp.designation, 
        inputLabel: `Update role for ${emp.name}`, 
        showCancelButton: true, 
        confirmButtonColor: '#2563eb' 
      }).then(async (result) => {
        if(result.isConfirmed && result.value) {
           try {
             await employeeAPI.update(emp._id, { designation: result.value });
             Swal.fire('Updated!', 'Role updated successfully.', 'success');
             fetchEmployees();
           } catch(e) {
             Swal.fire('Error', 'Failed to update role.', 'error');
           }
        }
      });
    } else {
      Swal.fire('Coming Soon', 'Edit form interface pending in this view', 'info');
    }
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Employee Directory</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
            Master Employee Personnel Info
          </p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 text-xs font-bold border border-gray-300 hover:bg-gray-200">
            <Download size={14} /> EXPORT CSV
          </button>
          <button 
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700"
          >
            <Plus size={14} /> NEW RECORD
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block pl-10 p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-white border border-gray-300 text-gray-700 text-xs font-bold focus:ring-blue-500 block p-2 min-w-[140px] appearance-none outline-none hidden md:block">
              <option>ALL DEPARTMENTS</option>
              <option>IT</option>
              <option>HR</option>
              <option>Sales</option>
              <option>Design</option>
            </select>
            
            <button onClick={handleFilterClick} className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 text-xs font-bold transition-colors">
              <Filter size={14} />
              FILTERS
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Employee Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Contact Info</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Role Profile</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                   <td colSpan="5" className="px-4 py-8 text-center text-gray-500 font-bold">
                     Loading Employees...
                   </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
                     <p className="text-sm font-bold text-gray-600">No employees found</p>
                     <p className="text-xs mt-1">Adjust your search query to try again.</p>
                  </td>
                </tr>
              ) : filteredData.map((emp, idx) => (
                <tr key={emp.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-gray-900 text-[13px]">{emp.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold">{emp.employeeId} • {emp.joinDate || 'NEW'}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold text-gray-900">{emp.email}</span>
                      <span className="text-[10px] text-gray-600">{emp.phone}</span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-indigo-700">{emp.designation || 'Staff'}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-500">{emp.department}</span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 text-center">
                    {emp.status === 'Active' ? (
                      <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Active</span>
                    ) : (
                      <span className="text-red-600 font-bold text-xs"><XCircle size={12} className="inline mr-1 text-red-500"/>Inactive</span>
                    )}
                  </td>
                  
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-bold">
                      <button onClick={() => handlRowAction('edit', emp)} className="text-blue-600 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button onClick={() => handlRowAction('role', emp)} className="text-indigo-600 hover:underline">Role</button>
                      <span className="text-gray-300">|</span>
                      <button onClick={() => handlRowAction('delete', emp)} className="text-red-600 hover:underline">Del</button>
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
            ROWS: {filteredData.length} / {employees.length}
          </span>
          <div className="flex items-center gap-1 text-xs">
             <button className="px-3 py-1 bg-white border border-gray-300 text-gray-500" disabled>PREV</button>
             <button className="px-3 py-1 bg-white border border-gray-300 text-gray-500" disabled>NEXT</button>
          </div>
        </div>

      </div>
      
      {/* Side Slide Over Form */}
      <EmployeeFormSlideOver isOpen={isAddFormOpen} onClose={handleFormClose} />
    </div>
  );
};

export default Employees;