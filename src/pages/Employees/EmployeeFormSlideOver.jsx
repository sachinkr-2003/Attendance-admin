import React, { useState } from 'react';
import { X, Save, Upload, User, Briefcase, DollarSign, Camera, Key } from 'lucide-react';
import { employeeAPI } from '../../services/api';
import Swal from 'sweetalert2';

const EmployeeFormSlideOver = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '', name: '', email: '', phone: '', password: '', department: 'IT & Engineering', designation: ''
  });

  const handleSubmit = async () => {
    if(!formData.employeeId || !formData.name || !formData.password) {
      Swal.fire('Missing Details', 'Emp ID, Name and Password are required', 'warning');
      return;
    }
    setLoading(true);
    try {
      await employeeAPI.create(formData);
      Swal.fire('Success', 'Employee Account Created Successfully', 'success');
      onClose(); // close panel
    } catch (e) {
      Swal.fire('Error', e.response?.data?.message || 'Failed to create employee', 'error');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Blurred Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity auto-close"
        onClick={onClose}
      />
      
      {/* Centered Modal Panel */}
      <div className="relative max-w-[600px] w-full max-h-[95vh] bg-white shadow-2xl rounded-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-black/5">
          
          {/* Beautiful Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
            <div>
              <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">Add New Employee</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Please fill in the required employee details.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 bg-gray-50/30 overflow-hidden flex flex-col">
            
            {/* Apple-style Segmented Tabs */}
            <div className="px-6 py-3 bg-white border-b border-gray-100">
              <div className="flex p-1 bg-gray-100/80 rounded-xl space-x-1">
                {[
                  { id: 'personal', label: 'Personal', icon: User },
                  { id: 'job', label: 'Employment', icon: Briefcase },
                  { id: 'account', label: 'App Access', icon: Key },
                  { id: 'payroll', label: 'Payroll & Docs', icon: DollarSign }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-[13px] font-semibold rounded-lg transition-all duration-200
                      ${activeTab === tab.id 
                        ? 'bg-white text-blue-600 shadow-sm border border-gray-200/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
                  >
                    <tab.icon size={14} strokeWidth={2.5} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inner Content */}
            <div className="p-6 flex-1">
              <form className="space-y-4">
                
                {activeTab === 'personal' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    
                    {/* Modern Photo Upload Container */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="relative w-16 h-16 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <Camera size={20} className="text-gray-400 group-hover:text-blue-500" />
                        <div className="absolute inset-0 bg-blue-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">Profile Photo</h4>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5 mb-1.5">Max 2MB square image.</p>
                        <button type="button" className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">Choose file...</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[12px] font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="e.g. Rahul Sharma" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[12px] font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full text-sm font- medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="admin@domain.com" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[12px] font-bold text-gray-700 mb-1">Mobile</label>
                        <input type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="+91 9876543210" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'job' && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                     <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                      <select onChange={e => setFormData({...formData, department: e.target.value})} className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all text-gray-700">
                        <option>IT</option>
                        <option>HR</option>
                        <option>Sales & Marketing</option>
                      </select>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
                      <input type="text" onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="e.g. Lead Designer" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Date of Joining</label>
                      <input type="date" className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all text-gray-700" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Assigned Shift</label>
                      <select className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all text-gray-700">
                        <option>Standard: 09:00 - 18:00</option>
                        <option>Evening: 14:00 - 23:00</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Reporting Manager</label>
                      <select className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all text-gray-700">
                        <option>None</option>
                        <option>Anil Kapoor</option>
                        <option>Sneha Singh</option>
                      </select>
                    </div>
                    <div className="col-span-2 text-xs text-gray-400 mt-1">
                      <p>Note: Department setting affects app features mapping.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
                      <Key size={20} className="shrink-0 mt-0.5 text-blue-600" />
                      <div>
                        <h4 className="text-[13px] font-bold">Mobile App Credentials</h4>
                        <p className="text-[11px] mt-0.5 text-blue-700">Set the Login ID and Password the employee will use to log into the Employee Flutter App.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 lg:col-span-1">
                        <label className="block text-[12px] font-bold text-gray-700 mb-1">App Login ID (Emp Code) <span className="text-red-500">*</span></label>
                        <input type="text" onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full text-sm font-bold text-blue-700 bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="e.g. SVG-1001" />
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <label className="block text-[12px] font-bold text-gray-700 mb-1">Set Password <span className="text-red-500">*</span></label>
                        <input type="text" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="Set temporary password" />
                      </div>
                      
                      <div className="col-span-2 mt-2">
                         <label className="flex items-center gap-3 p-3 border border-gray-200 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                           <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                           <div>
                             <p className="text-[12px] font-bold text-gray-900">Allow Mobile App Access</p>
                             <p className="text-[11px] text-gray-500">Employee can instantly sign into the app upon creation.</p>
                           </div>
                         </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'payroll' && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Base Salary</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-500 font-bold">₹</span>
                        <input type="number" className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="6,00,000" />
                      </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">Account No.</label>
                      <input type="text" className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="Bank Account" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">PAN Number</label>
                      <input type="text" className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 uppercase outline-none transition-all placeholder-gray-400" placeholder="ABCDE1234F" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1">UAN Number</label>
                      <input type="text" className="w-full text-sm font-medium bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder-gray-400" placeholder="EPF/UAN" />
                    </div>
                  </div>
                )}
                {/* Form Buttons - Pushed up below content */}
                <div className="pt-5 mt-2 flex items-center justify-end gap-3 border-t border-gray-200 border-dashed">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-1.5 px-6 py-2 text-[13px] font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                    <Save size={16} strokeWidth={2.5} />
                    {loading ? 'Processing...' : 'Save Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmployeeFormSlideOver;
