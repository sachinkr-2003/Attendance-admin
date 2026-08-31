import React from 'react';
import { FileUp, Folder, FileText, Trash2, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const Documents = () => {
  const handleDelete = () => Swal.fire({ title: 'Delete file?', icon: 'error', showCancelButton:true, confirmButtonColor: '#ef4444' });

  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Documents Vault</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Store and share company policies, offers and KYC.</p>
        </div>
        <button onClick={()=>Swal.fire('Upload', 'Select file to upload...', 'question')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700"><FileUp size={14} /> UPLOAD FILE</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="p-4 bg-white border border-gray-300 flex justify-between items-center group">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 border border-gray-300 text-gray-500 flex items-center justify-center bg-gray-50"><FileText size={20}/></div>
               <div><p className="font-bold text-gray-900 text-sm">HR_Policy_2026.pdf</p><p className="text-[10px] uppercase text-gray-500 font-bold">2.4 MB • Shared with All</p></div>
            </div>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 text-xs font-bold hover:underline transition-colors">Delete</button>
         </div>
         
         <div className="p-4 bg-white border border-gray-300 flex justify-between items-center group">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 border border-gray-300 text-gray-500 flex items-center justify-center bg-gray-50"><FileText size={20}/></div>
               <div><p className="font-bold text-gray-900 text-sm">Holiday_List.pdf</p><p className="text-[10px] uppercase text-gray-500 font-bold">1.1 MB • Shared with All</p></div>
            </div>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 text-xs font-bold hover:underline transition-colors">Delete</button>
         </div>
      </div>
    </div>
  );
};
export default Documents;