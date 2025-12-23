import { Calendar, Users } from "lucide-react";
import StatCard from "../../components/StatCard";
import { Button } from "../../components/ui/Button";

export default function DoctorDashboard() {
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
          <Button>Start Consultation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
