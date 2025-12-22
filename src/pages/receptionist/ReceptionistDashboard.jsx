import { Calendar, UserPlus, FileText, Search, ChevronRight, Clock } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { Button } from '../../components/ui/Button';

export default function ReceptionistDashboard() {
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
    '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Wilson', time: '09:30 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Brown', time: '11:00 AM', type: 'Check-up', status: 'Pending' },
    { id: 3, patient: 'Robert Johnson', doctor: 'Dr. Emily Chen', time: '02:00 PM', type: 'Follow-up', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reception Desk</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage appointments and patient registration</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="secondary">
                <FileText className="w-4 h-4 mr-2" />
                New Invoice
            </Button>
            <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Register Patient
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Appointments Today" value="28" icon={Calendar} trend="up" trendValue="+8%" color="primary" />
        <StatCard title="New Registrations" value="12" icon={UserPlus} trend="up" trendValue="+12%" color="teal" />
        <StatCard title="Doctors Available" value="8" icon={Clock} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar / Schedule View */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Today's Schedule</h3>
                <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">October 24, 2024</span>
                </div>
            </div>
            
            <div className="relative">
                {/* Time Slots */}
                <div className="space-y-4">
                    {timeSlots.map((time, i) => {
                        const appointment = appointments.find(apt => apt.time === time);
                        return (
                            <div key={i} className="flex group">
                                <div className="w-20 flex-shrink-0 text-right pr-4 text-xs font-medium text-gray-400 pt-2">{time}</div>
                                <div className="flex-1 min-h-[3rem] border-t border-gray-100 dark:border-gray-700 relative">
                                    {appointment && (
                                        <div className="absolute top-1 left-0 right-4 p-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 cursor-pointer hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{appointment.patient}</p>
                                                    <p className="text-xs text-gray-500">{appointment.type} with {appointment.doctor}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Pending Actions */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Patient Search</h3>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or ID..." 
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Recent Registrations</p>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                                    JS
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Jane Smith</p>
                                    <p className="text-xs text-gray-500">ID: #8492</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-primary-600 p-6 rounded-3xl shadow-lg shadow-primary-500/30 text-white">
                 <h3 className="font-bold text-lg mb-2">Doctor Availability</h3>
                 <p className="text-primary-100 text-sm mb-4">Check which doctors are currently in the clinic.</p>
                 <Button variant="secondary" className="w-full bg-white text-primary-600 border-none hover:bg-gray-50">View Status</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
