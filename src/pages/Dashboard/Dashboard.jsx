import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserX, ClockAlert, 
  Plane, Home, Timer, Activity,
  MoreVertical, Calendar, ChevronRight,
  Building2, Briefcase
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie, LineChart, Line
} from 'recharts';

import Swal from 'sweetalert2';

const weeklyData = [];
const monthlyData = [];
const deptData = [];

const StatCard = ({ title, value, subtitle, icon: Icon, colorBg, colorText, trend, trendValue }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 transition-all relative group hover:border-gray-400">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-8 h-8 flex items-center justify-center border border-gray-200 ${colorBg} ${colorText}`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
      
      <div className="mt-2">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-end gap-2 mt-1 mb-1">
          <h2 className="text-3xl font-bold text-gray-900 leading-none tracking-tight">{value}</h2>
          {trend && (
            <span className={`text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 border ${trend === 'up' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
              {trend === 'up' ? '+' : ''}{trendValue}
            </span>
          )}
        </div>
        <p className="text-[11px] font-bold text-gray-400 mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [chartView, setChartView] = useState('weekly');
  const [stats, setStats] = useState({ totalWorkforce: '-', markedPresent: '-', totalAbsent: '-', lateArrivals: '-' });

  useEffect(() => {
    // Simulated mock fetch reset to zeros
    setTimeout(() => {
      setStats({
        totalWorkforce: '0',
        markedPresent: '0',
        totalAbsent: '0',
        lateArrivals: '0'
      });
    }, 800);
  }, []);

  const handleExport = () => {
    Swal.fire({
      title: 'Generating Report',
      text: 'Compiling dashboard analytics into PDF...',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    }).then(() => {
      Swal.fire({ title: 'Export Complete!', text: 'Your file has been downloaded.', icon: 'success', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
    });
  };

  return (
    <div className="pb-10 space-y-4">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-gray-300">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
            Welcome back. Here is your organization's attendance at a glance.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 border border-gray-300 text-gray-700">
            <Calendar size={14} className="text-gray-500"/>
            <span className="text-[11px] font-bold uppercase tracking-widest">Oct 24, 2026</span>
          </div>
          <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold border border-blue-700 uppercase tracking-widest transition-none">
            Export Content
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Flat Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Workforce" value={stats.totalWorkforce} subtitle="Active in system" 
          icon={Users} colorBg="bg-blue-50" colorText="text-blue-700"
        />
        <StatCard 
          title="Marked Present" value={stats.markedPresent} subtitle="82% of workforce" 
          icon={UserCheck} colorBg="bg-emerald-50" colorText="text-emerald-700"
          trend="up" trendValue="+4.2%"
        />
        <StatCard 
          title="Total Absent" value={stats.totalAbsent} subtitle="Requires attention" 
          icon={UserX} colorBg="bg-red-50" colorText="text-red-700"
          trend="down" trendValue="-1.5%"
        />
        <StatCard 
          title="Late Arrivals" value={stats.lateArrivals} subtitle="After 09:45 AM" 
          icon={ClockAlert} colorBg="bg-orange-50" colorText="text-orange-700"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Left Column (Main Charts) */}
        <div className="xl:col-span-2 space-y-4">
          
          {/* Main Chart */}
          <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Attendance Trends</h3>
              </div>
              <div className="flex bg-white border border-gray-300 text-[10px] font-bold uppercase tracking-widest divide-x divide-gray-300">
                <button onClick={() => setChartView('weekly')} className={`px-3 py-1 ${chartView === 'weekly' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}>Weekly</button>
                <button onClick={() => setChartView('monthly')} className={`px-3 py-1 ${chartView === 'monthly' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}>Monthly</button>
              </div>
            </div>
            
            <div className="p-4 w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartView === 'weekly' ? weeklyData : monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} horizontal={true} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={{stroke: '#d1d5db'}} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 700}} />
                  <RechartsTooltip 
                    cursor={{stroke: '#e5e7eb', strokeWidth: 1}}
                    contentStyle={{backgroundColor: '#fff', borderRadius: '0', border: '1px solid #d1d5db', padding: '8px 12px'}}
                    itemStyle={{fontWeight: 700, fontSize: '11px', textTransform: 'uppercase'}}
                    labelStyle={{color: '#6b7280', fontWeight: 700, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em'}}
                  />
                  <Legend iconType="square" iconSize={8} wrapperStyle={{fontSize: '10px', paddingTop: '15px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}} />
                  <Line type="monotone" dataKey="present" name="Present Today" stroke="#2563eb" strokeWidth={2} dot={{r: 3, strokeWidth: 2, fill: '#fff'}} rounded="false" />
                  <Line type="monotone" dataKey="absent" name="Absent / Late" stroke="#dc2626" strokeWidth={2} dot={{r: 3, strokeWidth: 2, fill: '#fff'}} rounded="false" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clean Small Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Dynamic blocks await backend connection */}
            {[
              { label: 'On Leave', val: '0', icon: Plane, text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
              { label: 'WFH', val: '0', icon: Home, text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' },
              { label: 'Overtime', val: '0', icon: Timer, text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
              { label: 'In Office', val: '0', icon: Briefcase, text: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' }
            ].map((st, i) => (
              <div key={i} className={`bg-white p-4 border border-gray-300 flex items-center gap-3 border-l-4 ${st.border}`}>
                <div className={`p-2 bg-gray-50 text-gray-500 border border-gray-200`}>
                  <st.icon size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 leading-none">{st.val}</h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{st.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-4">
          
          {/* Target Score Clean Card */}
          <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-blue-600" /> Average Score
              </h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">On Track</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-end gap-1 mb-4">
                <h2 className="text-4xl font-bold text-gray-900 tracking-tighter">0<span className="text-2xl text-gray-400 font-normal">%</span></h2>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  <span>Current Performance</span>
                  <span className="text-gray-900">Target: 95%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-blue-600 h-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Clean Box */}
          <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50/50">
               <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">By Department</h3>
            </div>
            <div className="h-48 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <RechartsTooltip 
                    contentStyle={{borderRadius: '0', border: '1px solid #d1d5db', fontSize: '11px', fontWeight: 'bold'}} 
                  />
                  <Pie
                    data={deptData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="present"
                    stroke="none"
                  >
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#2563eb', '#16a34a', '#d97706', '#7c3aed', '#dc2626'][index % 5]} />
                    ))}
                  </Pie>
                  <Legend iconType="square" wrapperStyle={{fontSize: '10px', fontWeight: 'bold', textTransform:'uppercase'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Violations Simple */}
          <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Recent Violations</h3>
              <button className="text-blue-700 text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            <div className="p-0 divide-y divide-gray-200">
              {[
                // Clean empty violation list
              ].map((item, i) => (
                <div key={i} className="flex flex-row items-center justify-between p-4 bg-white hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs border border-gray-300">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">{item.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${item.badge}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;