import { Calendar, FileText, CreditCard, Clock, Plus } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { Button } from '../../components/ui/Button';

export default function PatientDashboard() {
  const records = [
    { date: 'Oct 15, 2024', doctor: 'Dr. Sarah Wilson', type: 'Blood Test Results', status: 'Available' },
    { date: 'Sep 22, 2024', doctor: 'Dr. Michael Brown', type: 'X-Ray Report', status: 'Available' },
    { date: 'Aug 10, 2024', doctor: 'Dr. Emily Chen', type: 'General Checkup', status: 'Available' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Health</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back, John Doe</p>
        </div>
        <Button>
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Upcoming Visit" value="2 Days" icon={Calendar} color="primary" />
        <StatCard title="Pending Reports" value="1" icon={FileText} color="orange" />
        <StatCard title="Due Payment" value="$150" icon={CreditCard} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Upcoming Appointments</h3>
            <div className="relative pl-8 border-l border-gray-200 dark:border-gray-700 space-y-8">
                <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-dark-800"></div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl border border-primary-100 dark:border-primary-900/30">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">General Checkup</h4>
                                <p className="text-sm text-gray-500">with Dr. Sarah Wilson</p>
                            </div>
                            <span className="bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Oct 26, 09:30 AM
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Regular monthly health checkup and blood pressure monitoring.</p>
                    </div>
                </div>

                <div className="relative opacity-60">
                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-dark-800"></div>
                    <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-2xl">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">Dental Cleaning</h4>
                                <p className="text-sm text-gray-500">with Dr. Lisa Ray</p>
                            </div>
                            <span className="bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Nov 12, 02:00 PM
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Medical Records */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Records</h3>
                <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
                {records.map((record, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{record.type}</h4>
                            <p className="text-xs text-gray-500">{record.date}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-primary-500">
                            <Clock className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary-500 rounded-2xl text-white text-center">
                <p className="font-bold text-lg mb-1">$150.00</p>
                <p className="text-primary-100 text-xs mb-3">Outstanding Balance</p>
                <Button variant="secondary" className="w-full bg-white text-primary-600 border-none h-8 text-xs">Pay Now</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
