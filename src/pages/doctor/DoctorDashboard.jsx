import { Calendar, Users, ClipboardList, Clock } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { Button } from '../../components/ui/Button';

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor's Portal</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Have a nice day, Dr. Wilson</p>
        </div>
        <div className="flex items-center gap-3">
            <Button>Start Consultation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Appointments Today" value="12" icon={Calendar} trend="up" trendValue="Normal" color="primary" />
        <StatCard title="Pending Reports" value="5" icon={ClipboardList} trend="down" trendValue="-2" color="orange" />
        <StatCard title="Total Patients" value="1.2k" icon={Users} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
            <div className="space-y-4">
                {[
                    { time: '09:00 AM', patient: 'Alice Smith', type: 'Check-up', status: 'Completed' },
                    { time: '10:30 AM', patient: 'Robert Jones', type: 'Consultation', status: 'In Progress' },
                    { time: '11:45 AM', patient: 'Maria Garcia', type: 'Follow-up', status: 'Pending' },
                    { time: '02:00 PM', patient: 'David Brown', type: 'Report Review', status: 'Pending' },
                ].map((apt, i) => (
                    <div key={i} className="flex items-center p-4 rounded-2xl bg-gray-50 dark:bg-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors cursor-pointer group">
                        <div className="flex-shrink-0 w-16 text-sm font-semibold text-gray-500 dark:text-gray-400">{apt.time}</div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{apt.patient}</h4>
                            <p className="text-xs text-gray-500">{apt.type}</p>
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                            apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {apt.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Next Patient</h3>
            <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl mb-6">
                <div className="w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-700 dark:text-primary-300">
                    RJ
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Robert Jones</h4>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">Consultation • 10:30 AM</p>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Gender</span>
                    <span className="font-medium dark:text-gray-200">Male</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Age</span>
                    <span className="font-medium dark:text-gray-200">45</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Visit</span>
                    <span className="font-medium dark:text-gray-200">2 weeks ago</span>
                </div>
            </div>
            <div className="mt-6 flex gap-2">
                <Button className="w-full">View History</Button>
                <Button variant="secondary" size="icon"><ClipboardList className="w-4 h-4" /></Button>
            </div>
        </div>
      </div>
    </div>
  );
}
