import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Doctors from './pages/admin/Doctors';
import AdminPatients from './pages/admin/Patients';
import AdminAppointments from './pages/admin/Appointments';
import AdminSettings from './pages/admin/Settings';
import AddUser from './pages/admin/AddUser';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';

import LandingPage from './pages/LandingPage';

const Register = () => <div className="p-8 text-center bg-white dark:bg-dark-800 rounded-3xl">Register Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Routes (Protected in real app) */}
        <Route path="/admin" element={<DashboardLayout role="Admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="add-user" element={<AddUser />} />
        </Route>
        
        <Route path="/doctor" element={<DashboardLayout role="Doctor" />}>
            <Route index element={<DoctorDashboard />} />
        </Route>

        <Route path="/receptionist" element={<DashboardLayout role="Receptionist" />}>
            <Route index element={<ReceptionistDashboard />} />
        </Route>

        <Route path="/patient" element={<DashboardLayout role="Patient" />}>
            <Route index element={<PatientDashboard />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
