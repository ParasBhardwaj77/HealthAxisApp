import { Activity } from 'lucide-react';

const mockActivities = [
  { id: 1, text: 'Dr. Sarah updated patient record', time: '2 mins ago', type: 'update' },
  { id: 2, text: 'New patient registration: John Doe', time: '15 mins ago', type: 'new' },
  { id: 3, text: 'Appointment scheduled: Dr. Emily Chen', time: '45 mins ago', type: 'appointment' },
  { id: 4, text: 'Billing statement generated for Invoice #1234', time: '1 hour ago', type: 'billing' },
  { id: 5, text: 'Dr. James Carter updated schedule', time: '2 hours ago', type: 'update' },
  { id: 6, text: 'New appointment request pending', time: '3 hours ago', type: 'appointment' },
  { id: 7, text: 'System backup completed successfully', time: '5 hours ago', type: 'system' },
  { id: 8, text: 'New staff member added: Nurse Joy', time: '1 day ago', type: 'new' },
];

export default function RecentActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">View all system activities and logs</p>
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="space-y-6">
            {mockActivities.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-2xl transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full shrink-0">
                        <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
