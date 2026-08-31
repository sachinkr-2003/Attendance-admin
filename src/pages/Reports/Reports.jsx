import React from 'react';
import { FileBarChart, Download, FileSpreadsheet, FileText, Filter } from 'lucide-react';
import Swal from 'sweetalert2';

const Reports = () => {
  const handleDownload = (type) => {
    Swal.fire({
      title: 'Generating Report',
      text: 'Compiling database records into '+type,
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    }).then(() => {
      Swal.fire('Complete', 'Report downloaded successfully to your device.', 'success');
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Reports Module</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Export analytical data and attendance sheets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50/50">
               <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Export Month-end Data</h3>
            </div>
            
            <div className="p-4 space-y-0 divide-y divide-gray-200">
              <div className="flex justify-between items-center py-4">
                <div className="flex gap-3 items-center">
                   <div className="text-gray-500"><FileSpreadsheet size={24}/></div>
                   <div><p className="font-bold text-gray-900 text-sm">Attendance Master (CSV)</p><p className="text-[11px] text-gray-500 uppercase">All shifts, punch in/out</p></div>
                </div>
                <button onClick={()=>handleDownload('CSV')} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-xs font-bold border border-gray-300 transition-colors"><Download size={14}/> EXPORT</button>
              </div>

              <div className="flex justify-between items-center py-4">
                <div className="flex gap-3 items-center">
                   <div className="text-gray-500"><FileText size={24}/></div>
                   <div><p className="font-bold text-gray-900 text-sm">Leave Ledger (PDF)</p><p className="text-[11px] text-gray-500 uppercase">Full leave balance history</p></div>
                </div>
                <button onClick={()=>handleDownload('PDF')} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-xs font-bold border border-gray-300 transition-colors"><Download size={14}/> EXPORT</button>
              </div>
            </div>
         </div>
         
         <div className="bg-white border border-gray-300 p-8 flex flex-col justify-center items-center text-center">
            <FileBarChart size={40} className="text-blue-500 mb-4" />
            <h3 className="font-bold text-xl text-gray-900 mb-2 tracking-tight">Automated MIS Scheduler</h3>
            <p className="text-sm font-medium text-gray-500 mb-6 max-w-sm">Schedule automatic dumps direct to your email inbox every 1st of the month.</p>
            <button onClick={() => Swal.fire('Coming Soon', 'MIS scheduling will be unlocked soon.', 'info')} className="px-5 py-2 bg-blue-600 text-white font-bold text-xs uppercase border border-blue-700 hover:bg-blue-700 transition-colors">Configure Scheduler</button>
         </div>
      </div>
    </div>
  );
};
export default Reports;