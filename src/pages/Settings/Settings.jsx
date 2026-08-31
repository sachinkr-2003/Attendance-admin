import React from 'react';
import { Settings2, Save, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Settings = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    Swal.fire({ title: 'Preferences Saved', icon: 'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logging out...',
      icon: 'info',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    }).then(() => {
      navigate('/login');
    });
  };

  const handleImageUpload = () => {
    Swal.fire({
      title: 'Update Profile Photo',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      },
      showCancelButton: true,
      confirmButtonText: 'Upload',
      confirmButtonColor: '#2563eb'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Uploaded Successfuly!',
          text: 'Your new avatar is saved and will reflect shortly.',
          icon: 'success',
          toast: true, position: 'top-end', timer: 3000, showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Configure global application preferences.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold border border-emerald-800"><Save size={14} /> UPDATE SETTINGS</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-300">
           <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex items-center gap-2">
               <Settings2 size={16} className="text-gray-500"/>
               <h3 className="font-bold text-gray-700 text-[11px] uppercase tracking-widest">Application Defaults</h3>
           </div>
           
           <div className="p-6 space-y-5">
             <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Company Name</label>
               <input type="text" className="w-full bg-gray-50 border border-gray-300 p-2.5 text-sm font-bold text-gray-900 focus:outline-none" value="SVG Solutions" readOnly />
             </div>
             <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Timezone</label>
               <input type="text" className="w-full bg-gray-50 border border-gray-300 p-2.5 text-sm font-bold text-gray-900 focus:outline-none" value="Asia/Kolkata (IST)" readOnly />
             </div>
             <div className="flex items-center justify-between p-4 bg-white border border-gray-300">
               <div>
                  <p className="font-bold text-gray-900 text-sm">Force Face Authentication</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mt-0.5 tracking-widest">Require face match on every check-in</p>
               </div>
               <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-none border-gray-400 focus:ring-0" defaultChecked />
             </div>
           </div>
        </div>

        <div className="bg-white border border-gray-300 text-center flex flex-col items-center justify-center p-8">
           <div className="w-32 h-32 border-4 border-gray-200 mb-4 relative overflow-hidden bg-gray-50 group cursor-pointer transition-colors hover:border-blue-400" onClick={handleImageUpload}>
              <img src="https://ui-avatars.com/api/?name=System+Admin&background=2563eb&color=fff&size=200&bold=true" alt="Profile Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera className="text-white" size={24} />
              </div>
           </div>
           <h3 className="font-bold text-xl text-gray-900 tracking-tight">Administrator</h3>
           <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold mb-8 mt-1">admin@svgsolutions.com</p>
           
           <button onClick={handleLogout} className="flex items-center justify-center w-full max-w-[240px] gap-2 bg-white text-red-700 hover:bg-gray-50 transition-colors px-6 py-2.5 text-xs tracking-widest font-bold border border-red-200"><LogOut size={14}/> SYSTEM SIGN OUT</button>
        </div>
      </div>
    </div>
  );
};
export default Settings;