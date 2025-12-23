import { Outlet, useNavigate } from "react-router-dom";
import { Activity, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ role }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOnLeave, setIsOnLeave] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const userEmail =
    role === "Admin"
      ? "admin@healthaxis.com"
      : `${role.toLowerCase()}@healthaxis.com`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        <header className="h-16 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between relative z-50">
          <h2 className="font-semibold text-xl capitalize">{role} Dashboard</h2>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-primary-500 transition-all duration-200 focus:outline-none"
              aria-label="User Profile"
            >
              {role ? role[0].toUpperCase() : "U"}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase">
                    {role}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {userEmail}
                  </p>
                </div>

                {role === "Doctor" && (
                  <div
                    className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer"
                    onClick={() => setIsOnLeave(!isOnLeave)}
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      On Leave
                    </span>
                    <button
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isOnLeave
                          ? "bg-primary-600"
                          : "bg-gray-200 dark:bg-dark-600"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isOnLeave ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    navigate(
                      role === "Admin"
                        ? "/admin/settings"
                        : `/${role.toLowerCase()}/settings`
                    );
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                >
                  <SettingsIcon className="w-4 h-4 mr-3 text-gray-400" />
                  Settings
                </button>

                <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
