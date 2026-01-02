import { Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-dark-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center flex flex-col items-center">
            <div className="p-3 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/20 mb-4">
                <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">HealthAxis</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Smart Hospital Management System</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
