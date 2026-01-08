import {
  Calendar,
  FileText,
  CreditCard,
  Clock,
  Plus,
  Loader2,
  Video,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatCard from "../../components/StatCard";
import { Button } from "../../components/ui/Button";
import BookAppointment from "./BookAppointment";
import ReportsList from "./ReportsList";
import AppointmentsList from "./AppointmentsList";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import { useState, useEffect } from "react";
import Chatbox from "../../components/Chatbox";

export default function PatientDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isBooking = searchParams.get("action") === "book";

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState({ name: "Patient" });

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [appointmentsRes, reportsRes, profileRes] = await Promise.all([
          fetchWithAuth(API_ENDPOINTS.PATIENT.MY_APPOINTMENTS),
          fetchWithAuth(API_ENDPOINTS.REPORTS.MY),
          fetchWithAuth(API_ENDPOINTS.PATIENT.ME),
        ]);

        if (appointmentsRes.ok) {
          const data = await appointmentsRes.json();
          const upcoming = data
            .filter((app) => app.status.toUpperCase() === "UPCOMING")
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
          setAppointments(upcoming);
        }

        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(reportsData);
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUserProfile({ name: profileData.fullName });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const records = [
    {
      date: "Oct 15, 2024",
      doctor: "Dr. Sarah Wilson",
      type: "Blood Test Results",
      status: "Available",
    },
    {
      date: "Sep 22, 2024",
      doctor: "Dr. Michael Brown",
      type: "X-Ray Report",
      status: "Available",
    },
    {
      date: "Aug 10, 2024",
      doctor: "Dr. Emily Chen",
      type: "General Checkup",
      status: "Available",
    },
  ];

  if (isBooking) {
    return <BookAppointment onBack={() => setSearchParams({})} />;
  }

  const getUpcomingVisitInfo = () => {
    if (appointments.length === 0)
      return { value: "None", label: "No visits scheduled" };
    const nextApp = appointments[0];
    const appDate = new Date(nextApp.dateTime);
    const now = new Date();

    const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const d2 = new Date(
      appDate.getFullYear(),
      appDate.getMonth(),
      appDate.getDate()
    );
    const diffTime = d2 - d1;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    let value = "";
    if (diffDays === 0) value = "Today";
    else if (diffDays === 1) value = "Tomorrow";
    else if (diffDays < 7) value = `${diffDays} Days`;
    else
      value = appDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    return {
      value,
      label: `With ${nextApp.doctorName}`,
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Health
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Welcome back, {userProfile.name}
          </p>
        </div>
        <Button onClick={() => setSearchParams({ action: "book" })}>
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Upcoming Visit"
          value={getUpcomingVisitInfo().value}
          label={getUpcomingVisitInfo().label}
          icon={Calendar}
          color="primary"
          onClick={() => navigate("/patient/appointments")}
        />
        <StatCard
          title="Total Reports"
          value={reports.length.toString()}
          icon={FileText}
          color="orange"
          onClick={() => navigate("/patient/reports")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Upcoming Appointments
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/patient/appointments")}
            >
              View All
            </Button>
          </div>
          <div className="relative pl-8 border-l border-gray-200 dark:border-gray-700 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Loading appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-center">
                <Calendar className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-medium text-lg">No upcoming appointments</p>
                <p className="text-sm">
                  Book a new appointment to see it here.
                </p>
              </div>
            ) : (
              appointments.map((app, index) => {
                const appDate = new Date(app.dateTime);
                const formattedDate = appDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={app.id} className="relative group">
                    <div
                      className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-dark-800 transition-colors ${
                        index === 0
                          ? "bg-primary-500"
                          : "bg-gray-300 dark:bg-gray-600 group-hover:bg-primary-400"
                      }`}
                    ></div>
                    <div
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        index === 0
                          ? "bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-900/30 shadow-sm"
                          : "bg-gray-50 dark:bg-dark-700 border-transparent hover:border-primary-200 dark:hover:border-primary-800"
                      }`}
                      onClick={() => navigate("/patient/appointments")}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            General Checkup
                          </h4>
                          <p className="text-sm text-gray-500">
                            with {app.doctorName}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              className="h-8 rounded-xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/patient/video-call/${app.id}`);
                              }}
                            >
                              <Video className="w-3.5 h-3.5 mr-2" />
                              Join Call
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/patient/appointments");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
                            index === 0
                              ? "bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400"
                              : "bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {formattedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Medical Records */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Recent Reports
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/patient/reports")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No reports found.
              </p>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer group"
                  onClick={() => {
                    // Trigger download
                    const link = document.createElement("a");
                    link.href = API_ENDPOINTS.REPORTS.DOWNLOAD(report.id);
                    link.setAttribute("download", report.fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                      {report.fileName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Uploaded by {report.doctorName} •{" "}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 group-hover:text-primary-500"
                  >
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Chatbox />
    </div>
  );
}
