import React from 'react';
import { IndianRupee, Download, TrendingUp, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const Payroll = () => {
  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Payroll Integration</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Linked directly with LOP (Loss of Pay).</p>
        </div>
        <button onClick={() => Swal.fire('Generating...', 'Exporting Payroll XML', 'info')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700">
          <Download size={14} /> DOWNLOAD PAYSHEETS
        </button>
      </div>

      <div className="p-10 bg-white border border-gray-300 flex flex-col justify-center items-center text-center">
         <div className="mb-4">
           <IndianRupee size={48} className="text-gray-300 mx-auto" />
         </div>
         <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payroll Engine</h2>
         <p className="text-sm text-gray-500 font-medium max-w-md mx-auto mb-6">The fully functional salary, PF calculation, and Tax (TDS) deduction engine is under active development. Meanwhile, use the "Reports" module to export master attendance.</p>
         <div className="text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-amber-700 bg-amber-50 px-4 py-2 border border-amber-300">
           <AlertCircle size={14} /> Slated for Q4 Backend Release
         </div>
      </div>
    </div>
  );
};
export default Payroll;