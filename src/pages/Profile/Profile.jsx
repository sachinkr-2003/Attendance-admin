import React from 'react';
import { User, Mail, Phone, Shield, Edit3, Key, Check } from 'lucide-react';
import Swal from 'sweetalert2';

const Profile = () => {
  const handleUpdate = () => {
    Swal.fire({ title: 'Profile Updated', icon: 'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false });
  };

  return (
    <div className="animate-in fade-in duration-300 pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your administrative account details and password.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Column: Avatar & Basic Info */}
         <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-fit">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
               <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors"><Edit3 size={16}/></button>
            </div>
            <div className="px-6 pb-6 relative">
               <div className="w-24 h-24 bg-white rounded-2xl p-1.5 absolute -top-12 shadow-lg">
                  <div className="w-full h-full bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-3xl">SVG</div>
               </div>
               
               <div className="pt-16">
                  <h2 className="text-xl font-black text-gray-900">System Administrator</h2>
                  <p className="text-sm font-bold text-gray-500 mt-1">admin@svgsolutions.com</p>
                  
                  <div className="mt-6 flex flex-col gap-3">
                     <span className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100"><Shield size={16} className="text-indigo-500"/> Super Admin Role</span>
                     <span className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100"><Phone size={16} className="text-gray-400"/> +91 9988776655</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column: Edit Form & Password */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
               <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><User size={20} className="text-blue-600"/> Personal Information</h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                   <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="System Administrator" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                   <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="+91 9988776655" />
                 </div>
                 <div className="sm:col-span-2">
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address (Cannot be changed)</label>
                   <input type="email" className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-lg p-2.5 text-sm font-medium outline-none cursor-not-allowed" defaultValue="admin@svgsolutions.com" readOnly />
                 </div>
               </div>
               
               <div className="mt-6 flex justify-end">
                  <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2"><Check size={16}/> Save Changes</button>
               </div>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl shadow-sm p-6">
               <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><Key size={20} className="text-rose-600"/> Change Password</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Password</label>
                   <input type="password" className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none" placeholder="••••••••" />
                 </div>
                 <div className="hidden sm:block"></div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                   <input type="password" className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none" placeholder="••••••••" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm New Password</label>
                   <input type="password" className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none" placeholder="••••••••" />
                 </div>
               </div>
               <div className="mt-6 flex justify-end">
                  <button onClick={handleUpdate} className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all border border-rose-700">Update Password</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Profile;
