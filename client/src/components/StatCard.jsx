import { TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  onClick,
}) {
  const colorStyles = {
    primary:
      "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400",
    teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300",
        onClick && "cursor-pointer active:scale-[0.98] transition-all"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={clsx("p-3 rounded-2xl", colorStyles[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div
            className={clsx(
              "flex items-center text-xs font-medium px-2 py-1 rounded-full",
              trend === "up"
                ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                : "text-red-600 bg-red-50 dark:bg-red-900/20"
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
}
