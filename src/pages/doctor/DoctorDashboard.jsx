import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar, Users, X, User, FileText } from "lucide-react";
import StatCard from "../../components/StatCard";
import { Button } from "../../components/ui/Button";

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
  const navigate = useNavigate();

  const handleConsult = (patient) => {
    navigate(`/doctor/video-call/${patient.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctor's Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Have a nice day, Dr. Wilson
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsModalOpen(true)}>
            Start Consultation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value="12"
          icon={Calendar}
          trend="up"
          trendValue="Normal"
          color="primary"
        />
        <StatCard
          title="Total Patients"
          value="1.2k"
          icon={Users}
          color="teal"
        />
        <StatCard
          title="Pending Reports"
          value="5"
          icon={FileText}
          trend="down"
          trendValue="Urgent"
          color="primary"
        />
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Today's Schedule
        </h3>
        <div className="space-y-4">
          {[
            {
              time: "09:00 AM",
              patient: "Alice Smith",
              type: "Check-up",
              status: "Completed",
            },
            {
              time: "10:30 AM",
              patient: "Robert Jones",
              type: "Check-up",
              status: "In Progress",
            },
            {
              time: "11:45 AM",
              patient: " Maria Garcia",
              type: "Check-up",
              status: "Pending",
            },
            {
              time: "02:00 PM",
              patient: "David Brown",
              type: "Check-up",
              status: "Pending",
            },
          ].map((apt, i) => (
            <div
              key={i}
              className="flex items-center p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors cursor-pointer group"
            >
              <div className="flex-shrink-0 w-16 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {apt.time}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {apt.patient}
                </h4>
                <p className="text-xs text-gray-500">{apt.type}</p>
              </div>
              <div
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  apt.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : apt.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {apt.status}
              </div>
            </div>
          ))}
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
    </div>
  );
}
