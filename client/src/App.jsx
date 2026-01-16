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
import ForgotPassword from "./pages/auth/ForgotPassword";

import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import TelemedicinePage from "./pages/TelemedicinePage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import AboutUsPage from "./pages/AboutUsPage";
import CareersPage from "./pages/CareersPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/GlobalLoader";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <LoadingProvider>
      <GlobalLoader />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/telemedicine" element={<TelemedicinePage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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

          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
