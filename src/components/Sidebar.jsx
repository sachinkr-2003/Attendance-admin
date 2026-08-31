import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Clock, Building2, CalendarClock, 
  CalendarDays, CalendarHeart, Home, Smartphone, ScanFace, 
  PieChart, Banknote, Megaphone, Files, UserCog, History, Settings, LifeBuoy, HistoryIcon, Watch
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Attendance', path: '/attendance', icon: Clock },
  { name: 'Regularization', path: '/regularization', icon: HistoryIcon },
  { name: 'Overtime', path: '/overtime', icon: Watch },
  { name: 'Offices', path: '/offices', icon: Building2 },
  { name: 'Shifts', path: '/shifts', icon: CalendarClock },
  { name: 'Leaves', path: '/leaves', icon: CalendarDays },
  { name: 'Holidays', path: '/holidays', icon: CalendarHeart },
  { name: 'WFH', path: '/wfh', icon: Home },
  { name: 'Devices', path: '/devices', icon: Smartphone },
  { name: 'Face Verification', path: '/face-verification', icon: ScanFace },
  { name: 'Helpdesk Tickets', path: '/helpdesk', icon: LifeBuoy },
  { name: 'Reports', path: '/reports', icon: PieChart },
  { name: 'Payroll', path: '/payroll', icon: Banknote },
  { name: 'Announcements', path: '/announcements', icon: Megaphone },
  { name: 'Documents', path: '/documents', icon: Files },
  { name: 'Users & Roles', path: '/roles', icon: UserCog },
  { name: 'Audit Logs', path: '/audit-logs', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800 hidden md:flex">
      <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">SVG Admin</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400' 
                    : 'hover:bg-slate-800/50 hover:text-slate-100'
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <UserCog size={20} className="text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
