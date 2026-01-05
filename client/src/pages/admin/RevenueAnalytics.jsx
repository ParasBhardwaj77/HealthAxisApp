import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import StatCard from "../../components/StatCard";

export default function RevenueAnalytics() {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    revenueByDate: {},
  });
  const [loading, setLoading] = useState(true);

  const fetchRevenue = async () => {
    try {
      const res = await fetchWithAuth(API_ENDPOINTS.ADMIN.REVENUE);
      if (res.ok) {
        const data = await res.json();
        setRevenueData(data);
      }
    } catch (error) {
      console.error("Failed to fetch revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  // Prepare graph data
  const graphData = Object.entries(revenueData.revenueByDate || {})
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount,
    }));

  const maxAmount = Math.max(...graphData.map((d) => d.amount), 1); // Avoid div by zero

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Revenue Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Track your earnings and financial performance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${revenueData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
        {/* Could add meaningful sub-stats here later like "This Month" etc. */}
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
          Revenue Trend
        </h3>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Loading chart...
          </div>
        ) : graphData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No revenue data available yet.
          </div>
        ) : (
          <div className="h-64 flex items-end gap-4 overflow-x-auto pb-4">
            {graphData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group min-w-[60px]"
              >
                <div
                  className="w-full bg-primary-100 dark:bg-primary-900/30 rounded-t-xl relative group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors"
                  style={{ height: `${(item.amount / maxAmount) * 200}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${item.amount}
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
