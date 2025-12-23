import { useState } from 'react';
import Table from '../../components/Table';
import { Button } from '../../components/ui/Button';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';

const initialAppointmentsData = [
  { id: 1, patient: 'Alice Smith', doctor: 'Dr. Sarah Wilson', date: 'Oct 24, 2024', time: '09:30 AM', status: 'Confirmed' },
  { id: 2, patient: 'Robert Jones', doctor: 'Dr. Michael Brown', date: 'Oct 24, 2024', time: '11:00 AM', status: 'Pending' },
  { id: 3, patient: 'Maria Garcia', doctor: 'Dr. Emily Chen', date: 'Oct 25, 2024', time: '02:00 PM', status: 'Cancelled' },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(initialAppointmentsData);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
        data={appointments}
        actions
        showEdit={false}
        showDelete={false}
        renderRow={(apt) => (
            <>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{apt.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border outline-none cursor-pointer ${getStatusColor(apt.status)}`}
                    >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </td>
            </>
        )}
      />
    </div>
  );
}
