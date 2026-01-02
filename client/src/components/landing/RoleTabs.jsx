import { useState } from 'react';
import { LayoutDashboard, Stethoscope, ClipboardList, User } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../../components/ui/Button';

const roles = [
  { id: 'admin', label: 'Admin', icon: LayoutDashboard },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  { id: 'receptionist', label: 'Receptionist', icon: ClipboardList },
  { id: 'patient', label: 'Patient', icon: User },
];

const previews = {
  admin: {
    title: 'Complete Command Center',
    desc: 'Oversee entire hospital operations, manage staff, analyze revenue, and track patient flow from a single, powerful dashboard.',
    features: ['Real-time Analytics', 'Staff Management', 'Financial Reports'],
    color: 'bg-primary-500'
  },
  doctor: {
    title: 'Focused Clinical Workflow',
    desc: 'View appointments, access patient history, prescribe medication, and join video consultations without navigating complex menus.',
    features: ['Appointment Timeline', 'Digital Prescriptions', 'Patient History'],
    color: 'bg-teal-500'
  },
  receptionist: {
    title: 'Efficient Front Desk',
    desc: 'Streamline patient registration, manage the waiting room, and handle billing inquiries faster than ever before.',
    features: ['Quick Registration', 'Calendar Management', 'Invoice Generation'],
    color: 'bg-purple-500'
  },
  patient: {
    title: 'Your Health in Your Hands',
    desc: 'Book appointments, view test results, pay bills, and consult with doctors from the comfort of your home.',
    features: ['Online Booking', 'Medical Records', 'Secure Payments'],
    color: 'bg-blue-500'
  }
};

export default function RoleTabs() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <section id="roles" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Every Role
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tailored experiences for every stakeholder in the healthcare ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Tabs Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={clsx(
                  'flex items-center p-4 rounded-2xl transition-all duration-300 text-left group',
                  activeTab === role.id 
                    ? 'bg-gray-50 dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-gray-700' 
                    : 'hover:bg-gray-50 dark:hover:bg-dark-800/50'
                )}
              >
                <div className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors',
                  activeTab === role.id ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-dark-600'
                )}>
                  <role.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={clsx('font-bold font-lg transition-colors', activeTab === role.id ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400')}>{role.label}</h3>
                  <p className="text-sm text-gray-400">View dashboard</p>
                </div>
              </button>
            ))}
          </div>

          {/* Preview Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-50 dark:bg-dark-800 rounded-[2rem] p-8 md:p-12 border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all duration-500">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white dark:bg-dark-900 text-xs font-bold shadow-sm mb-4 uppercase tracking-wider">
                        {roles.find(r => r.id === activeTab).label} View
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{previews[activeTab].title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl text-lg leading-relaxed">{previews[activeTab].desc}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {previews[activeTab].features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                                {feat}
                            </div>
                        ))}
                    </div>

                    <a href={`/${activeTab}`} className="inline-block">
                        <Button>Launch {roles.find(r => r.id === activeTab).label} Demo</Button>
                    </a>
                </div>

                {/* Abstract Background Decoration */}
                <div className={clsx('absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-10 blur-3xl transition-colors duration-500', previews[activeTab].color)}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
