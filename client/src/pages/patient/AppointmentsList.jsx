import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Search,
  MapPin,
  Clock,
  Video,
} from "lucide-react";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import Table from "../../components/Table";

export default function AppointmentsList({ onBack }) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetchWithAuth(API_ENDPOINTS.PATIENT.MY_APPOINTMENTS);

        if (!res.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await res.json();
        const mappedAppointments = data.map((app) => {
          const dateObj = new Date(app.dateTime);
          return {
            id: app.id,
            doctor: app.doctorName,
            specialty: "General", // Backend doesn't provide specialty in list yet
            type: "General Checkup",
            date: dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status:
              app.status.charAt(0).toUpperCase() +
              app.status.slice(1).toLowerCase(), // Capitalize
          };
        });
        setAppointments(mappedAppointments);
      } catch (err) {
        console.error(err);
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleCancelClick = (id) => {
    setAppointmentToCancel(id);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_ENDPOINTS.PATIENT.APPOINTMENTS}/${appointmentToCancel}/cancel`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        setAppointments(
          appointments.map((app) =>
            app.id === appointmentToCancel
              ? { ...app, status: "Canceled" }
              : app
          )
        );
      } else {
        const errorMsg = await res.text();
        alert(`Failed to cancel: ${errorMsg}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while canceling the appointment.");
    } finally {
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };

  const statusOrder = {
    Upcoming: 1,
    Confirmed: 1.5,
    Canceled: 2,
    Completed: 3,
  };

  const filteredAppointments = appointments
    .filter(
      (app) =>
        app.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(
      (a, b) => (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Appointments
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your appointment history and upcoming visits
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by doctor or appointment type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-10">Loading appointments...</div>
      )}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!loading && !error && (
        <Table
          headers={["Appointment", "Doctor", "Date & Time", "Status"]}
          data={filteredAppointments}
          actions={false}
          renderRow={(app) => (
            <>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {app.type}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {app.doctor}
                </div>
                <div className="text-xs text-gray-500">{app.specialty}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{app.date}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {app.time}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === "Upcoming"
                      ? "bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                      : app.status === "Confirmed" || app.status === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : app.status === "Canceled"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {(app.status === "Upcoming" || app.status === "Confirmed") && (
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => navigate(`/patient/video-call/${app.id}`)}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Appointment
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelClick(app.id)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </td>
            </>
          )}
        />
      )}

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Cancel Appointment
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
              >
                Go Back
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700 border-none"
                onClick={confirmCancel}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
