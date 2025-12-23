import { useState } from "react";
import Table from "../../components/Table";
import { Button } from "../../components/ui/Button";
import { Calendar, Search, Clock, User, Filter } from "lucide-react";

const initialAppointmentsData = [
  {
    id: 1,
    patient: "Alice Smith",
    doctor: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    date: "Oct 24, 2024",
    time: "09:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Robert Jones",
    doctor: "Dr. Michael Brown",
    specialty: "Orthopedics",
    date: "Oct 24, 2024",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Maria Garcia",
    doctor: "Dr. Emily Chen",
    specialty: "Pediatrics",
    date: "Oct 25, 2024",
    time: "02:00 PM",
    status: "Cancelled",
  },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300";
    }
  };

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
        actions={false}
        showEdit={false}
        showDelete={false}
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
              <select
                value={apt.status}
                onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                className={`px-3 py-1 text-xs font-bold rounded-full border border-transparent outline-none cursor-pointer transition-all ${getStatusColor(
                  apt.status
                )}`}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 hover:text-primary-900"
              >
                Details
              </Button>
            </td>
          </>
        )}
      />
    </div>
  );
}
