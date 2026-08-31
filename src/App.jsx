import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';

// Pages Import
import Login from './pages/Auth/Login';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Attendance from './pages/Attendance/Attendance';
import Offices from './pages/Offices/Offices';
import Shifts from './pages/Shifts/Shifts';
import Leaves from './pages/Leaves/Leaves';
import Holidays from './pages/Holidays/Holidays';
import WFH from './pages/WFH/WFH';
import Devices from './pages/Devices/Devices';
import FaceVerification from './pages/FaceVerification/FaceVerification';
import Reports from './pages/Reports/Reports';
import Payroll from './pages/Payroll/Payroll';
import Announcements from './pages/Announcements/Announcements';
import Documents from './pages/Documents/Documents';
import Roles from './pages/Roles/Roles';
import AuditLogs from './pages/AuditLogs/AuditLogs';
import Settings from './pages/Settings/Settings';
import Helpdesk from './pages/Helpdesk/Helpdesk';
import Regularization from './pages/Regularization/Regularization';
import Overtime from './pages/Overtime/Overtime';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="regularization" element={<Regularization />} />
          <Route path="overtime" element={<Overtime />} />
          <Route path="offices" element={<Offices />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="wfh" element={<WFH />} />
          <Route path="devices" element={<Devices />} />
          <Route path="face-verification" element={<FaceVerification />} />
          <Route path="helpdesk" element={<Helpdesk />} />
          <Route path="reports" element={<Reports />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="documents" element={<Documents />} />
          <Route path="roles" element={<Roles />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
