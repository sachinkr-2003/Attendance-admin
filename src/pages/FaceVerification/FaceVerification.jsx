import React, { useState } from 'react';
import { Camera, ScanFace, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

const initialFaces = [
  { id: 'FV-01', name: 'Puneet Singh', empId: 'EMP-023', score: '99.4%', status: 'Verified', date: '10 Aug 2026' },
  { id: 'FV-02', name: 'Riya Patel', empId: 'EMP-014', score: '74.2%', status: 'Low Confidence', date: '31 Aug 2026' },
  { id: 'FV-03', name: 'Manish Tiwari', empId: 'EMP-009', score: 'N/A', status: 'Pending', date: '-' },
  { id: 'FV-04', name: 'Sneha Gupta', empId: 'EMP-004', score: '98.1%', status: 'Verified', date: '01 Jun 2025' }
];

const FaceVerification = () => {
  const [faces, setFaces] = useState(initialFaces);

  const handleAction = (id, action) => {
    Swal.fire({
      title: action === 'Approve' ? 'Force Approve?' : 'Request Retake?',
      text: action === 'Approve' ? 'Manually approve this face vector for attendance?' : 'Drop existing vector and force employee to re-register face on next app open?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#2563eb'
    }).then(res => {
      if(res.isConfirmed) {
        setFaces(faces.map(f => f.id === id ? {...f, status: action === 'Approve' ? 'Verified' : 'Pending', score: action === 'Approve' ? 'Manual' : 'N/A'} : f));
        Swal.fire({title: 'Updated', icon: 'success', toast:true, position:'top-end', timer:2000, showConfirmButton:false});
      }
    });
  };

  return (
    <div className="pb-10 space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border border-gray-300">
        <div>
           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Face Verification</h1>
           <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Master Biometric Database</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Verification Status</h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Employee Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Match Score</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Last Scanned</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {faces.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                     <p className="text-sm font-bold text-gray-600">No records found</p>
                  </td>
                </tr>
              ) : faces.map((face, idx) => (
                <tr key={face.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200 w-64 whitespace-nowrap">
                     <p className="font-bold text-gray-900 text-[13.5px]">{face.name}</p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{face.empId}</p>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <span className={`text-[12px] font-black ${face.status === 'Low Confidence' ? 'text-amber-600' : 'text-gray-900'}`}>{face.score}</span>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200 whitespace-nowrap">
                     <span className="text-[12px] font-bold text-gray-700">{face.date}</span>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-center whitespace-nowrap">
                    {face.status === 'Verified' && <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Verified</span>}
                    {face.status === 'Pending' && <span className="text-gray-500 font-bold text-xs"><Camera size={12} className="inline mr-1"/>Pending</span>}
                    {face.status === 'Low Confidence' && <span className="text-amber-600 font-bold text-xs"><AlertTriangle size={12} className="inline mr-1 text-amber-500"/>Low Confidence</span>}
                  </td>

                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-3 text-xs font-bold">
                       {face.status !== 'Verified' && (
                         <>
                           <button onClick={()=>handleAction(face.id, 'Approve')} className="text-emerald-700 hover:underline">Force Accept</button>
                           <span className="text-gray-300">|</span>
                         </>
                       )}
                       <button onClick={()=>handleAction(face.id, 'Retake')} className="text-blue-700 hover:underline">Retake Scan</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">ROWS: {faces.length}</span>
        </div>
      </div>
    </div>
  );
};
export default FaceVerification;