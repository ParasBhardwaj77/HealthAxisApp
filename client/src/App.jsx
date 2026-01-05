import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Doctors from "./pages/admin/Doctors";
import AdminPatients from "./pages/admin/Patients";
import AdminAppointments from "./pages/admin/Appointments";
import AdminSettings from "./pages/admin/Settings";
import AddUser from "./pages/admin/AddUser";
import RecentActivity from "./pages/admin/RecentActivity";
import AdminReports from "./pages/admin/Reports";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/AppointmentsList";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentCancel from "./pages/payment/PaymentCancel";
import PatientReports from "./pages/patient/ReportsList";
import DoctorSettings from "./pages/doctor/Settings";
import PatientSettings from "./pages/patient/Settings";
import VideoCall from "./pages/doctor/VideoCall";
import Register from "./pages/auth/Register";

import LandingPage from "./pages/LandingPage";

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
          <Route path="recent-activity" element={<RecentActivity />} />
          <Route path="recent-activity" element={<RecentActivity />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/doctor" element={<DashboardLayout role="Doctor" />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="settings" element={<DoctorSettings />} />
          <Route path="video-call/:id" element={<VideoCall />} />
        </Route>

        <Route path="/patient" element={<DashboardLayout role="Patient" />}>
          <Route index element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="reports" element={<PatientReports />} />
          <Route path="settings" element={<PatientSettings />} />
          <Route path="video-call/:id" element={<VideoCall />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
