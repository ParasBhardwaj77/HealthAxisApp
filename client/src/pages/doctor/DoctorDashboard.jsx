import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Calendar,
  Users,
  X,
  User,
  FileText,
  Loader2,
  Clock,
  ChevronDown,
  Eye,
} from "lucide-react";
import StatCard from "../../components/StatCard";
import { Button } from "../../components/ui/Button";
import { API_ENDPOINTS, fetchWithAuth, API_BASE_URL } from "../../api/config";
import { useEffect } from "react";

const patientsData = [
  {
    id: 1,
    name: "Alice Smith",
    age: 32,
    gender: "Female",
    lastVisit: "Oct 24, 2024",
  },
  {
    id: 2,
    name: "Robert Jones",
    age: 45,
    gender: "Male",
    lastVisit: "Oct 22, 2024",
  },
  {
    id: 3,
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    lastVisit: "Sep 15, 2024",
  },
  {
    id: 4,
    name: "David Brown",
    age: 52,
    gender: "Male",
    lastVisit: "Oct 20, 2024",
  },
  {
    id: 5,
    name: "Emma Wilson",
    age: 29,
    gender: "Female",
    lastVisit: "Oct 18, 2024",
  },
];

export default function DoctorDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [isPatientsModalOpen, setIsPatientsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("today"); // "today" or "all"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Doctor",
    totalPatients: 0,
    totalReports: 0,
  });
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const navigate = useNavigate();

  const fetchAppointments = async (currentView) => {
    try {
      setLoading(true);
      const endpoint =
        currentView === "today"
          ? API_ENDPOINTS.DOCTOR.TODAY_APPOINTMENTS
          : API_ENDPOINTS.DOCTOR.ALL_APPOINTMENTS;

      const res = await fetchWithAuth(endpoint);
      if (res.ok) {
        const data = await res.json();
        let filteredData = data;

        if (currentView === "today") {
          filteredData = data
            .filter(
              (app) =>
                app.status.toUpperCase() === "UPCOMING" ||
                app.status.toUpperCase() === "CONFIRMED"
            )
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        } else {
          // Sort all appointments: future ones first (ascending), then past ones (descending)
          const now = new Date();
          filteredData = data.sort((a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);

            // If both are in the future, sort ascending (closest first)
            if (dateA > now && dateB > now) return dateA - dateB;
            // If both are in the past, sort descending (most recent first)
            if (dateA <= now && dateB <= now) return dateB - dateA;
            // Future appointments come before past ones
            return dateA > now ? -1 : 1;
          });
        }
        setAppointments(filteredData);
      }
    } catch (err) {
      console.error("Fetch appointments error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      console.log("[DoctorDashboard] Fetching patients...");
      const res = await fetchWithAuth(`${API_BASE_URL}/doctor/patients`);
      console.log("[DoctorDashboard] Patients response status:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("[DoctorDashboard] Patients data:", data);
        setPatients(data);
      } else {
        console.error(
          "[DoctorDashboard] Failed to fetch patients, status:",
          res.status
        );
      }
    } catch (error) {
      console.error("[DoctorDashboard] Failed to fetch patients:", error);
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch doctor info for greeting
        const meRes = await fetchWithAuth(`${API_BASE_URL}/doctor/me`);
        if (meRes.ok) {
          const meData = await meRes.json();
          setDoctorInfo({
            name: meData.fullName,
            totalPatients: meData.patientCount,
            totalReports: meData.totalReports,
          });
        }
        await fetchAppointments(view);
      } catch (err) {
        console.error("Initial fetch error:", err);
      }
    };

    fetchInitialData();
  }, [view]);

  const handleConsult = (patient) => {
    navigate(`/doctor/video-call/${patient.id}`);
  };

  const [completedConsultations, setCompletedConsultations] = useState([
    { id: 1, name: "Alice Smith", date: "Oct 24, 2024", duration: "12:45" },
    { id: 2, name: "Robert Jones", date: "Oct 24, 2024", duration: "08:30" },
  ]);

  const handleUploadClick = (patientId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png"; // Accept common formats
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("patientId", patientId);

          const token = localStorage.getItem("token");
          const res = await fetch(API_ENDPOINTS.REPORTS.UPLOAD, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (res.ok) {
            alert(`Report "${file.name}" uploaded successfully!`);
          } else {
            console.error("Upload failed", await res.text());
            alert("Failed to upload report.");
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert("Error uploading report.");
        }
      }
    };
    input.click();
  };

  const [viewReportsModalOpen, setViewReportsModalOpen] = useState(false);
  const [selectedPatientReports, setSelectedPatientReports] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [loadingReports, setLoadingReports] = useState(false);

  const handleViewReports = async (patient) => {
    setSelectedPatientName(patient.fullName);
    setViewReportsModalOpen(true);
    setLoadingReports(true);
    try {
      const res = await fetchWithAuth(
        API_ENDPOINTS.REPORTS.GET_PATIENT_REPORTS(patient.id)
      );
      if (res.ok) {
        const data = await res.json();
        setSelectedPatientReports(data);
      } else {
        console.error("Failed to fetch reports");
        setSelectedPatientReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setSelectedPatientReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleDoctorDownload = (report) => {
    const link = document.createElement("a");
    link.href = API_ENDPOINTS.REPORTS.DOWNLOAD(report.id);
    link.setAttribute("download", report.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctor's Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Have a nice day, {doctorInfo.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={(appointments?.length || 0).toString()}
          icon={Calendar}
          trend="up"
          trendValue="Normal"
          color="primary"
        />
        <StatCard
          title="Total Patients"
          value={(doctorInfo?.totalPatients || 0).toString()}
          icon={Users}
          color="teal"
          onClick={() => {
            setIsPatientsModalOpen(true);
            fetchPatients();
          }}
        />
        <StatCard
          title="Total Reports"
          value={(doctorInfo?.totalReports || 0).toString()}
          icon={FileText}
          trend="down"
          trendValue="Urgent"
          color="primary"
          onClick={() => {
            setIsPendingModalOpen(true);
            fetchPatients();
          }}
        />
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 group"
            >
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {view === "today" ? "Today's Schedule" : "All Appointments"}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-all ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-40 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    setView("today");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-dark-700 ${
                    view === "today"
                      ? "text-primary-600 bg-primary-50/50 dark:bg-primary-900/10"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Today's Schedule
                </button>
                <button
                  onClick={() => {
                    setView("all");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-dark-700 ${
                    view === "all"
                      ? "text-primary-600 bg-primary-50/50 dark:bg-primary-900/10"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  All Appointments
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p>Loading schedule...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-center border-2 border-dashed border-gray-100 dark:border-gray-700/50 rounded-3xl">
              <Calendar className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium text-lg">
                {view === "today"
                  ? "No appointments for today"
                  : "No appointments found"}
              </p>
              <p className="text-sm">
                {view === "today"
                  ? "Enjoy your free time!"
                  : "You don't have any appointments yet."}
              </p>
            </div>
          ) : (
            appointments.map((apt, i) => {
              const appTime = new Date(apt.dateTime).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <div
                  key={apt.id}
                  className="flex items-center p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-28 text-sm font-semibold text-gray-500 dark:text-gray-400 flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {appTime}
                    </div>
                    {view === "all" && (
                      <div className="text-[10px] text-gray-400 mt-1 pl-5 font-normal">
                        {new Date(apt.dateTime).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {apt.patientName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {view === "today" ? "General Checkup" : "Consultation"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      className="rounded-full px-4 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/video-call/${apt.id}`);
                      }}
                    >
                      Start Call
                    </Button>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        apt.status === "Completed" || apt.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-primary-100 text-primary-700"
                      }`}
                    >
                      {apt.status}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Select Patient for Consultation
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {patientsData.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                          {patient.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="px-6 rounded-full"
                      onClick={() => handleConsult(patient)}
                    >
                      Consult
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-dark-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Reports Modal */}
      {isPendingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Upload Reports
              </h2>
              <button
                onClick={() => setIsPendingModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {loadingPatients ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
              ) : patients.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No patients found
                </div>
              ) : (
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                            {patient.fullName}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.age} years • {patient.gender}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-4 rounded-full border-primary-500 text-primary-500 hover:bg-primary-50"
                          onClick={() => handleUploadClick(patient.id)}
                        >
                          Upload
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="px-2 rounded-full text-gray-400 hover:text-teal-600 hover:bg-teal-50"
                          onClick={() => handleViewReports(patient)}
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-dark-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsPendingModalOpen(false)}
                className="rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Total Patients Modal */}
      {isPatientsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Total Patients
              </h2>
              <button
                onClick={() => setIsPatientsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {loadingPatients ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
              ) : patients.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No patients found
                </div>
              ) : (
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                            {patient.fullName}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.age} years • {patient.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-dark-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsPatientsModalOpen(false)}
                className="rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Patient Reports Modal */}
      {viewReportsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Reports for {selectedPatientName}
              </h2>
              <button
                onClick={() => setViewReportsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {loadingReports ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
              ) : selectedPatientReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No reports found for this patient.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedPatientReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                            {report.fileName}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(report.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-primary-500"
                        onClick={() => handleDoctorDownload(report)}
                      >
                        <Users className="w-4 h-4 mr-2" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-dark-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setViewReportsModalOpen(false)}
                className="rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
