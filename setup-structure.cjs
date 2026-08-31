const fs = require('fs');
const path = require('path');

const dirs = [
  'src/layouts',
  'src/components',
  'src/pages/Dashboard',
  'src/pages/Employees',
  'src/pages/Attendance',
  'src/pages/Offices',
  'src/pages/Shifts',
  'src/pages/Leaves',
  'src/pages/Holidays',
  'src/pages/WFH',
  'src/pages/Devices',
  'src/pages/FaceVerification',
  'src/pages/Reports',
  'src/pages/Payroll',
  'src/pages/Announcements',
  'src/pages/Documents',
  'src/pages/Roles',
  'src/pages/AuditLogs',
  'src/pages/Settings'
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const pages = [
  { name: 'Dashboard', filename: 'Dashboard.jsx' },
  { name: 'Employees', filename: 'Employees.jsx' },
  { name: 'Attendance', filename: 'Attendance.jsx' },
  { name: 'Offices', filename: 'Offices.jsx' },
  { name: 'Shifts', filename: 'Shifts.jsx' },
  { name: 'Leaves', filename: 'Leaves.jsx' },
  { name: 'Holidays', filename: 'Holidays.jsx' },
  { name: 'WFH', filename: 'WFH.jsx' },
  { name: 'Devices', filename: 'Devices.jsx' },
  { name: 'Face Verification', filename: 'FaceVerification.jsx', exportName: 'FaceVerification' },
  { name: 'Reports', filename: 'Reports.jsx' },
  { name: 'Payroll', filename: 'Payroll.jsx' },
  { name: 'Announcements', filename: 'Announcements.jsx' },
  { name: 'Documents', filename: 'Documents.jsx' },
  { name: 'Roles', filename: 'Roles.jsx' },
  { name: 'Audit Logs', filename: 'AuditLogs.jsx', exportName: 'AuditLogs' },
  { name: 'Settings', filename: 'Settings.jsx' },
];

pages.forEach(p => {
  const compName = p.exportName || p.name.replace(/ /g, '');
  const content = `import React from 'react';

const ${compName} = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">${p.name}</h1>
        <p className="text-gray-500">Manage ${p.name.toLowerCase()} and related settings.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        <div className="flex items-center justify-center h-full text-gray-400">
          Content for ${p.name} module goes here
        </div>
      </div>
    </div>
  );
};

export default ${compName};`;
  
  const folder = compName;
  const filePath = path.join(__dirname, 'src', 'pages', folder, p.filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
});
console.log('Structure created');
