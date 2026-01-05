import { Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.ADMIN.ACTIVITIES);
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View all system activities and logs
        </p>
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : activities.length > 0 ? (
            activities.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-2xl transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full shrink-0">
                  <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
