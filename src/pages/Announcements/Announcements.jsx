import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Send } from 'lucide-react';
import Swal from 'sweetalert2';

const initialAnnouncements = [
  { id: 'AN-01', title: 'Diwali Bonus Disbursed', date: '01 Nov 2026', msg: 'All employees are informed that the Diwali bonus has been credited.', priority: 'High' },
  { id: 'AN-02', title: 'Server Maintenance', date: '30 Aug 2026', msg: 'The app will be down for 2 hours tonight for maintenance.', priority: 'Medium' }
];

const Announcements = () => {
  const [list, setList] = useState(initialAnnouncements);

  const handleAdd = () => {
    Swal.fire({
      title: 'New Announcement',
      html: `
        <div class="text-left space-y-3 mt-4">
          <input type="text" id="swal-title" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm" placeholder="Notice Title">
          <textarea id="swal-msg" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm h-24" placeholder="Type the message here to broadcast to all app users..."></textarea>
          <select id="swal-priority" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm">
            <option value="High">High (Push Notification)</option>
            <option value="Medium">Medium (App Inbox)</option>
            <option value="Low">Low</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Broadcast',
      confirmButtonColor: '#2563eb',
      preConfirm: () => {
        const title = document.getElementById('swal-title').value;
        const msg = document.getElementById('swal-msg').value;
        if (!title || !msg) Swal.showValidationMessage('Title and message required');
        return { title, msg, priority: document.getElementById('swal-priority').value };
      }
    }).then((res) => {
      if (res.isConfirmed) {
        setList([{ id: `AN-99`, title: res.value.title, msg: res.value.msg, priority: res.value.priority, date: 'Right Now' }, ...list]);
        Swal.fire('Broadcasted', 'Announcement sent to all users.', 'success');
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'Delete?', text: 'Remove this announcement?', icon: 'warning', showCancelButton: true }).then(res => {
      if(res.isConfirmed) setList(list.filter(item => item.id !== id));
    });
  }

  return (
    <div className="pb-10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Announcements</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">Broadcast notices directly to the employee mobile app.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700"><Megaphone size={14} /> NEW BROADCAST</button>
      </div>

      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Broadcast History</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {list.map(item => (
          <div key={item.id} className="p-6 relative group">
             <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider border ${item.priority === 'High' ? 'text-red-700 border-red-200 bg-red-50' : 'text-blue-700 border-blue-200 bg-blue-50'}`}>{item.priority} Priority</span>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 text-xs font-bold hover:underline">Delete</button>
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{item.title}</h3>
             <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">{item.date}</p>
             <p className="text-sm text-gray-700 font-medium leading-relaxed bg-gray-50 border border-gray-300 p-4">{item.msg}</p>
             <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-4"><Send size={14}/> Successfully Delivered</div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
export default Announcements;