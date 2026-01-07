import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import { API_BASE_URL, fetchWithAuth } from "../api/config";
import { useLoading } from "../context/LoadingContext";

export default function DashboardLayout({ role }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOnLeave, setIsOnLeave] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role"); // ADMIN, DOCTOR, PATIENT from backend

  // Role Validation Shield
  useEffect(() => {
    if (!token || !storedRole) {
      console.warn(
        "[RoleShield] No token or role found. Redirecting to login."
      );
      navigate("/login");
      return;
    }

    // Decode JWT for diagnostics (safe, public info)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("[RoleShield] Session Diagnostic:", {
        storedRole,
        routeRole: role,
        tokenSubject: payload.sub,
        tokenRole: payload.role,
        isExpired: payload.exp * 1000 < Date.now(),
      });
    } catch (e) {
      console.error("[RoleShield] Failed to decode token:", e.message);
    }

    // Standardize comparison (e.g., "Doctor" vs "DOCTOR")
    if (storedRole.toUpperCase() !== role.toUpperCase()) {
      console.warn(
        `[RoleShield] Unauthorized access attempt. Route role: ${role}, Stored role: ${storedRole}`
      );
      // Redirect to user's correct dashboard
      const correctPath = `/${storedRole.toLowerCase()}`;
      navigate(correctPath);
    }
  }, [token, storedRole, role, navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch current doctor leave status
  useEffect(() => {
    if (role.toUpperCase() !== "DOCTOR" || !token) return;

    const fetchLeaveStatus = async () => {
      const apiUrl = `${API_BASE_URL}/doctor/me`;

      try {
        setIsLoading(true);
        const res = await fetchWithAuth(apiUrl);

        if (res.status === 403) {
          console.error(
            "[Dashboard] 403 Forbidden. Possible role/token mismatch."
          );
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setIsOnLeave(Boolean(data.onLeave));
        }
      } catch (err) {
        console.error("[Dashboard] Fetch error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveStatus();
  }, [role, token]);

  // Update leave status
  const updateLeaveStatus = async (newStatus) => {
    try {
      setIsLoading(true);
      await fetchWithAuth(`${API_BASE_URL}/doctor/leave?onLeave=${newStatus}`, {
        method: "PUT",
      });
      setIsOnLeave(newStatus);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || role,
    email:
      localStorage.getItem("userEmail") ||
      `${role.toLowerCase()}@healthaxis.com`,
  });

  // Fetch true profile data from backend
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      let endpoint = "";
      if (role === "Admin") endpoint = "/admin/me";
      else if (role === "Doctor") endpoint = "/doctor/me";
      else if (role === "Patient") endpoint = "/patient/me";

      if (!endpoint) return;

      try {
        setIsLoading(true);
        const res = await fetchWithAuth(`${API_BASE_URL}${endpoint}`);
        if (res.ok) {
          const data = await res.json();
          // Both DoctorStatsResponse and PatientProfileResponse have fullName or similar
          const freshName = data.fullName || data.name || role;
          const freshEmail = data.email || profile.email;

          setProfile({ name: freshName, email: freshEmail });

          // Sync localStorage for other components
          localStorage.setItem("userName", freshName);
          localStorage.setItem("userEmail", freshEmail);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard profile", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [role, token]);

  const userName = profile.name;
  const userEmail = profile.email;

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
            >
              {userName ? userName[0].toUpperCase() : "U"}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase">
                    {role} Profile
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {userName}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {userEmail}
                  </p>
                </div>

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
