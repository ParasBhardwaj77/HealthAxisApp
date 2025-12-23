import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  Settings, 
  FileText, 
  LogOut,
  Activity,
  Stethoscope,
  ClipboardList
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const menus = {
  Admin: [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
    { name: 'Patients', path: '/admin/patients', icon: Users },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ],
  Doctor: [
    { name: 'Dashboard', path: '/doctor', icon: LayoutDashboard },
    { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
    { name: 'Patients', path: '/doctor/patients', icon: Users },
    { name: 'Prescriptions', path: '/doctor/prescriptions', icon: ClipboardList },
  ],
  Receptionist: [
    { name: 'Dashboard', path: '/receptionist', icon: LayoutDashboard },
    { name: 'Calendar', path: '/receptionist/calendar', icon: Calendar },
    { name: 'Registration', path: '/receptionist/register', icon: UserPlus },
    { name: 'Billing', path: '/receptionist/billing', icon: FileText },
  ],
  Patient: [
    { name: 'My Health', path: '/patient', icon: Activity },
    { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Records', path: '/patient/records', icon: FileText },
  ]
};

export default function Sidebar({ role }) {
  const sidebarRef = useRef(null);
  const links = menus[role] || menus.Patient;
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(sidebarRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside ref={sidebarRef} className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <Activity className="w-6 h-6 text-primary-500 mr-2" />
        <span className="font-bold text-lg text-gray-900 dark:text-white">HealthAxis</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 animate-fade-in">{role} Menu</p>
        </div>
        <nav className="space-y-1 px-2">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin' || item.path === '/doctor' || item.path === '/receptionist' || item.path === '/patient'}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-gray-200'}
              `}
            >
              <item.icon className="mr-3 h-5 w-5 transition-colors duration-200" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
        </button>
      </div>
    </aside>
  );
}

