import Table from '../../components/Table';
import { Button } from '../../components/ui/Button';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';

const appointmentsData = [
  { id: 1, patient: 'Alice Smith', doctor: 'Dr. Sarah Wilson', date: 'Oct 24, 2024', time: '09:30 AM', status: 'Confirmed' },
  { id: 2, patient: 'Robert Jones', doctor: 'Dr. Michael Brown', date: 'Oct 24, 2024', time: '11:00 AM', status: 'Pending' },
  { id: 3, patient: 'Maria Garcia', doctor: 'Dr. Emily Chen', date: 'Oct 25, 2024', time: '02:00 PM', status: 'Cancelled' },
];

export default function AdminAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage clinic schedules</p>
        </div>
        <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter View
        </Button>
      </div>

      <Table 
        headers={['Patient', 'Doctor', 'Date', 'Time', 'Status']}
        data={appointmentsData}
        actions
        renderRow={(apt) => (
            <>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{apt.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {apt.status}
                    </span>
                </td>
            </>
        )}
      />
    </div>
  );
}
