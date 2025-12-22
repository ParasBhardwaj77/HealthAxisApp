import { Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';

import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ role }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Sidebar role={role} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        <header className="h-16 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between">
            <h2 className="font-semibold text-xl capitalize">{role} Dashboard</h2>
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
                {role ? role[0].toUpperCase() : 'U'}
            </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
