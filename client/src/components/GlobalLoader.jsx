import React from "react";
import { Activity } from "lucide-react";
import { useLoading } from "../context/LoadingContext";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 dark:bg-dark-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

        {/* Animated Logo */}
        <div className="relative bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-500">
          <Activity className="w-12 h-12 text-primary-500 animate-spin-slow ring-offset-8 ring-offset-transparent ring-4 ring-primary-500/10 rounded-full" />
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            Health<span className="text-primary-500">Axis</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
