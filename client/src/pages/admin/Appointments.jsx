import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { Button } from "../../components/ui/Button";
import { Calendar, Search, Clock, User, Filter } from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.ADMIN.APPOINTMENTS);

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      const mappedAppointments = data.map((apt) => {
        const dt = apt.dateTime ? new Date(apt.dateTime) : null;
        return {
          id: apt.id,
          patient: apt.patientName || "Unknown Patient",
          doctor: apt.doctorName || "Unknown Doctor",
          specialty: apt.specialty || "General",
          date: dt ? dt.toLocaleDateString() : "N/A",
          time: dt
            ? dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "N/A",
          status: apt.status || "UPCOMING",
        };
      });
      setAppointments(mappedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (appointmentToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete the appointment for ${appointmentToDelete.patient}?`
      )
    ) {
      try {
        const response = await fetchWithAuth(
          `${API_BASE_URL}/admin/appointments/${appointmentToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAppointments(
            appointments.filter((apt) => apt.id !== appointmentToDelete.id)
          );
        } else {
          alert("Failed to delete appointment");
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Error deleting appointment");
      }
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case "UPCOMING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "CANCELED":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (loading) return <div className="p-4">Loading appointments...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointments
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage clinic schedules and status
          </p>
        </div>
        <Button variant="secondary">
          <Filter className="w-4 h-4 mr-2" />
          Filter View
        </Button>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      <Table
        headers={["Patient", "Doctor", "Date & Time", "Status"]}
        data={filteredAppointments}
        actions={true}
        onDelete={handleDelete}
        showEdit={false}
        showDelete={true}
        renderRow={(apt) => (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-dark-900 text-gray-400 mr-3">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {apt.patient}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 dark:text-white font-medium">
                {apt.doctor}
              </div>
              <div className="text-xs text-gray-500">{apt.specialty}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{apt.date}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {apt.time}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                  apt.status
                )}`}
              >
                {apt.status}
              </span>
            </td>
          </>
        )}
      />
    </div>
  );
}
