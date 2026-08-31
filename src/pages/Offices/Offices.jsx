import React, { useState } from 'react';
import { 
  Building2, Search, Plus, MapPin, Navigation, 
  Trash2, Edit, AlertCircle, CheckCircle2, ShieldAlert,
  Clock, XCircle
} from 'lucide-react';
import Swal from 'sweetalert2';

const initialOffices = [
  { id: 'OFF-01', name: 'Delhi Headquarters', city: 'New Delhi', address: 'Connaught Place, Block H', lat: '28.6315', lng: '77.2167', radius: '100m', time: '09:00 AM - 06:00 PM', status: 'Active' },
  { id: 'OFF-02', name: 'Mumbai Branch', city: 'Mumbai', address: 'Bandra Kurla Complex', lat: '19.0596', lng: '72.8659', radius: '50m', time: '10:00 AM - 07:00 PM', status: 'Active' },
  { id: 'OFF-03', name: 'Pune Tech Center', city: 'Pune', address: 'Hinjewadi IT Park, Phase 1', lat: '18.5913', lng: '73.7389', radius: '200m', time: '09:00 AM - 06:00 PM', status: 'Inactive' },
  { id: 'OFF-04', name: 'Bangalore Hub', city: 'Bangalore', address: 'Electronic City', lat: '12.8452', lng: '77.6602', radius: '150m', time: '09:00 AM - 06:00 PM', status: 'Active' }
];

const Offices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [offices, setOffices] = useState(initialOffices);

  // Filtering Logic
  const filteredData = offices.filter(office => 
    office.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    office.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOffice = () => {
    Swal.fire({
      title: 'Add New Office',
      html: `
        <div class="text-left space-y-4 mt-2">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Branch Name</label>
            <input type="text" id="swal-name" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Noida Center">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">City / Region</label>
            <input type="text" id="swal-city" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Noida">
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Geo-fence Radius</label>
                <select id="swal-radius" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none">
                   <option value="50m">50 Meters</option>
                   <option value="100m" selected>100 Meters</option>
                   <option value="200m">200 Meters</option>
                   <option value="500m">500 Meters</option>
                </select>
             </div>
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Office Timing</label>
                <input type="text" id="swal-time" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none" value="09:00 AM - 06:00 PM">
             </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Latitude</label>
                <input type="text" id="swal-lat" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none" placeholder="28.1234">
             </div>
             <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Longitude</label>
                <input type="text" id="swal-lng" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none" placeholder="77.1234">
             </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Office',
      confirmButtonColor: '#2563eb',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const city = document.getElementById('swal-city').value;
        if (!name || !city) Swal.showValidationMessage('Name and City are required');
        return { name, city, radius: document.getElementById('swal-radius').value, time: document.getElementById('swal-time').value, lat: document.getElementById('swal-lat').value || '0.0000', lng: document.getElementById('swal-lng').value || '0.0000' }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setOffices([
          { id: `OFF-${Math.floor(Math.random() * 99)}`, name: result.value.name, city: result.value.city, address: 'Pending Assignment', lat: result.value.lat, lng: result.value.lng, radius: result.value.radius, time: result.value.time, status: 'Active' },
          ...offices
        ]);
        Swal.fire({ title: 'Success!', text: 'New Office has been configured.', icon: 'success', confirmButtonColor: '#10b981' });
      }
    });
  };

  const handleAction = (action, office) => {
    if (action === 'delete') {
      Swal.fire({
        title: 'Delete Office?',
        text: `Are you sure you want to remove ${office.name}? All mapped employees will lose geo-fence tracking.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Yes, Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          setOffices(offices.filter(o => o.id !== office.id));
          Swal.fire('Deleted!', 'The office has been removed.', 'success');
        }
      });
    } else if (action === 'map') {
      Swal.fire({
        title: 'Location Coordinates',
        html: `
          <div class="flex flex-col gap-3 mt-3 items-center">
             <div class="px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Latitude</span>
                <span class="text-xl font-black text-gray-800 tracking-tight">${office.lat}</span>
             </div>
             <div class="px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Longitude</span>
                <span class="text-xl font-black text-gray-800 tracking-tight">${office.lng}</span>
             </div>
             <div class="flex items-center gap-2 text-sm font-bold text-blue-600 mt-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Navigation size={16} /> Geo-fence Radius set to ${office.radius}
             </div>
          </div>
        `,
        confirmButtonColor: '#2563eb'
      });
    } else if (action === 'status') {
      setOffices(offices.map(o => o.id === office.id ? { ...o, status: o.status === 'Active' ? 'Inactive' : 'Active' } : o));
      Swal.fire({ title: 'Status Updated', text: `${office.name} is now ${office.status === 'Active' ? 'Inactive' : 'Active'}.`, icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
    }
  };

  return (
    <div className="pb-10 space-y-4">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Geofence Locations</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Master Offices Database</p>
        </div>
        <button onClick={handleAddOffice} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700">
          <Plus size={14} strokeWidth={2.5} /> NEW OFFICE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-300 bg-white">
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Total Branches</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">{offices.length}</h3>
        </div>
        <div className="p-4 border-r border-gray-200 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Active Geo-fences</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">{offices.filter(o => o.status === 'Active').length}</h3>
        </div>
        <div className="p-4 text-center">
             <p className="text-[10px] font-bold text-gray-500 uppercase">Out of Radius Violations</p>
             <h3 className="text-xl font-bold text-gray-900 mt-1">24</h3>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-300 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search offices by name or city..."
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block pl-10 p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Branch Details</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Geo-fence Setup</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200">Shift Hours</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 overflow-hidden">
                     <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
                     <p className="text-sm font-bold text-gray-600">No offices found</p>
                     <p className="text-xs mt-1">Try a different search team.</p>
                  </td>
                </tr>
              ) : filteredData.map((office, idx) => (
                <tr key={office.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-bold text-gray-900 text-[13px]">{office.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{office.id} • {office.city}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold text-gray-900 uppercase">RADIUS: {office.radius}</span>
                      <button onClick={() => handleAction('map', office)} className="text-[10px] text-blue-600 hover:underline w-fit">
                        [ View Coordinates ]
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-xs font-bold text-gray-800">
                     {office.time}
                  </td>

                  <td className="px-4 py-3 border-r border-gray-200 text-center">
                     <button onClick={() => handleAction('status', office)}>
                        {office.status === 'Active' ? (
                          <span className="text-emerald-700 font-bold text-xs"><CheckCircle2 size={12} className="inline mr-1 text-emerald-500"/>Active</span>
                        ) : (
                          <span className="text-gray-500 font-bold text-xs"><XCircle size={12} className="inline mr-1"/>Inactive</span>
                        )}
                     </button>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-bold">
                      <button className="text-blue-600 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button onClick={() => handleAction('delete', office)} className="text-red-600 hover:underline">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-bold">
            ROWS: {filteredData.length} / {offices.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Offices;