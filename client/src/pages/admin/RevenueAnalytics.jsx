import { useState, useEffect } from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import StatCard from "../../components/StatCard";

export default function RevenueAnalytics() {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    revenueByDate: {},
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");

  const fetchRevenue = async (range) => {
    try {
      setLoading(true);
      const url = range
        ? `${API_ENDPOINTS.ADMIN.REVENUE}?range=${range}`
        : API_ENDPOINTS.ADMIN.REVENUE;
      const res = await fetchWithAuth(url);
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
    fetchRevenue(timeRange);
  }, [timeRange]);

  // Prepare graph data
  const graphData = Object.entries(revenueData.revenueByDate || {})
    .sort((a, b) => {
      if (timeRange === "today") return a[0].localeCompare(b[0]); // Sort times like 10:00, 11:00
      return new Date(a[0]) - new Date(b[0]); // Sort dates
    })
    .map(([key, amount]) => {
      let displayLabel = key;
      if (timeRange !== "today") {
        const date = new Date(key);
        displayLabel = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      return {
        label: displayLabel,
        amount,
        originalKey: key,
      };
    });

  const maxAmount = Math.max(...graphData.map((d) => d.amount), 1);

  // Point calculations for line graph
  const points = graphData
    .map((d, i) => {
      const x = (i / (graphData.length - 1 || 1)) * 100;
      const y = 100 - (d.amount / maxAmount) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${revenueData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
            Revenue Trend
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-50 dark:bg-dark-700 border-none rounded-lg text-sm px-3 py-1 focus:ring-0 text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="week">Past 7 Days</option>
            <option value="month">Past Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Loading chart...
          </div>
        ) : graphData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No revenue data for this period.
          </div>
        ) : (
          <div className="h-64 w-full relative pt-4 pl-8 pb-8">
            {/* Y-Axis Label */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Revenue ($)
            </div>

            {/* Y-Axis Values */}
            <div className="absolute left-0 top-4 bottom-8 w-8 flex flex-col justify-between text-xs text-gray-400 px-1 border-r border-gray-300 dark:border-gray-600">
              <span>${maxAmount}</span>
              <span>${Math.round(maxAmount * 0.75)}</span>
              <span>${Math.round(maxAmount * 0.5)}</span>
              <span>${Math.round(maxAmount * 0.25)}</span>
              <span>$0</span>
            </div>

            {/* Chart Area */}
            <div className="absolute left-10 right-0 top-4 bottom-8">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                {/* Grid lines - Horizontal */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    className="text-gray-400"
                  />
                ))}

                {/* Grid lines - Vertical */}
                {[0, 20, 40, 60, 80, 100].map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="100"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    className="text-gray-400"
                  />
                ))}

                {/* Gradient */}
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(var(--color-primary-500))"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(var(--color-primary-500))"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,100 ${points
                    .split(" ")
                    .map((p) => "L" + p)
                    .join(" ")} L100,100 Z`}
                  fill="url(#gradient)"
                  className="transition-all duration-500 ease-in-out"
                />
                <polyline
                  fill="none"
                  stroke="rgb(var(--color-primary-500))"
                  strokeWidth="2"
                  points={points}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Points as 'x' or cross marks to match image style somewhat, or stick to dots */}
                {graphData.map((d, i) => {
                  const x = (i / (graphData.length - 1 || 1)) * 100;
                  const y = 100 - (d.amount / maxAmount) * 100;
                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r="2"
                        fill="white"
                        stroke="rgb(var(--color-primary-500))"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="hover:r-3 transition-all cursor-pointer z-10"
                      >
                        <title>
                          ${d.amount} - {d.label}
                        </title>
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* X Axis Arrow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="absolute bottom-[-4px] right-[-4px] w-0 h-0 border-t-4 border-t-transparent border-l-[8px] border-l-gray-300 dark:border-l-gray-600 border-b-4 border-b-transparent"></div>

              {/* Y Axis Arrow (Top) handled by div border, adding arrow head */}
              <div className="absolute top-[-4px] left-[-9px] w-0 h-0 border-l-4 border-l-transparent border-b-[8px] border-b-gray-300 dark:border-b-gray-600 border-r-4 border-r-transparent"></div>
            </div>

            {/* X-Axis Labels */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-between text-xs text-gray-500 pt-2">
              {graphData.map(
                (d, i) =>
                  (graphData.length < 10 ||
                    i % Math.ceil(graphData.length / 6) === 0) && (
                    <div
                      key={i}
                      className="absolute transform -translate-x-1/2"
                      style={{
                        left: `${(i / (graphData.length - 1 || 1)) * 100}%`,
                      }}
                    >
                      {d.label}
                    </div>
                  )
              )}
            </div>

            {/* X-Axis Title */}
            <div className="absolute bottom-[-20px] left-10 right-0 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
              Date / Time
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
