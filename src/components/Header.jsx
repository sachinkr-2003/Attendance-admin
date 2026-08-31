import React from 'react';
import { Bell, Search, Menu, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = () => {
  const handleNotifications = () => {
    Swal.fire({
        title: 'System Notifications',
        html: `
            <div class="text-left text-sm mt-3 border-t border-gray-200">
                <div class="py-3 border-b border-gray-100 flex items-start gap-3">
                   <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">?</div>
                   <div>
                       <p class="font-bold text-gray-900">System Update</p>
                       <p class="text-xs text-gray-500 mt-1">Admin panel v2.1 successfully deployed.</p>
                   </div>
                </div>
                <div class="py-3 flex items-start gap-3">
                   <div class="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">!</div>
                   <div>
                       <p class="font-bold text-gray-900">Pending Actions</p>
                       <p class="text-xs text-gray-500 mt-1">There are 3 pending device approval requests.</p>
                   </div>
                </div>
            </div>
        `,
        confirmButtonText: 'Mark all as read',
        confirmButtonColor: '#2563eb',
        showCloseButton: true
    });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-all">
      <div className="flex items-center">
        <button className="md:hidden text-gray-500 hover:text-gray-700 mr-4">
          <Menu size={24} />
        </button>
        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm bg-gray-50/50 uppercase tracking-widest font-bold"
            placeholder="SEARCH..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={handleNotifications} className="relative p-2 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 border border-gray-200">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 bg-red-600 border border-white"></span>
        </button>
        <Link to="/profile" className="w-9 h-9 bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-700 font-bold hover:bg-blue-200 transition-colors cursor-pointer text-xs uppercase tracking-widest">
          SVG
        </Link>
      </div>
    </header>
  );
};

export default Header;
