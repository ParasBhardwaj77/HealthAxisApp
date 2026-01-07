import { useState, useEffect } from "react";
import { useLoading } from "../../context/LoadingContext";
import { Users, UserPlus, Calendar, DollarSign, Activity } from "lucide-react";
import StatCard from "../../components/StatCard";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import RevenueAnalytics from "./RevenueAnalytics";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        setIsLoading(true);
        // Fetching all stats including activities
        const [patientsRes, doctorsRes, appointmentsRes, activitiesRes] =
          await Promise.all([
            fetchWithAuth(API_ENDPOINTS.ADMIN.PATIENTS),
            fetchWithAuth(API_ENDPOINTS.ADMIN.DOCTORS),
            fetchWithAuth(API_ENDPOINTS.ADMIN.APPOINTMENTS),
            fetchWithAuth(API_ENDPOINTS.ADMIN.ACTIVITIES),
          ]);

        const [patients, doctors, appointments, activities] = await Promise.all(
          [
            patientsRes.ok ? patientsRes.json() : [],
            doctorsRes.ok ? doctorsRes.json() : [],
            appointmentsRes.ok ? appointmentsRes.json() : [],
            activitiesRes.ok ? activitiesRes.json() : [],
          ]
        );

        setRecentActivities(activities);

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter(
            (a) => a.status === "UPCOMING"
          ).length,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Welcome back, Administrator
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/add-user">
            <Button>Add New User</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/patients">
          <StatCard
            title="Total Patients"
            value={loading ? "..." : stats.totalPatients.toLocaleString()}
            icon={Users}
            color="primary"
          />
        </Link>
        <Link to="/admin/doctors">
          <StatCard
            title="Total Doctors"
            value={loading ? "..." : stats.totalDoctors.toLocaleString()}
            icon={UserPlus}
            color="teal"
          />
        </Link>
        <Link to="/admin/appointments">
          <StatCard
            title="Total Appointments"
            value={loading ? "..." : stats.totalAppointments.toLocaleString()}
            icon={Calendar}
            color="purple"
          />
        </Link>
        <Link to="/admin/appointments">
          <StatCard
            title="Pending Appointments"
            value={loading ? "..." : stats.pendingAppointments.toLocaleString()}
            icon={Calendar}
            color="orange"
          />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <RevenueAnalytics />
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h3>
          <div className="space-y-6">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-dark-700 rounded-full">
                    <Activity className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent activity found.
              </p>
            )}
          </div>
          <Link to="/admin/recent-activity">
            <Button variant="ghost" className="w-full mt-4 text-sm">
              View All Activity
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
