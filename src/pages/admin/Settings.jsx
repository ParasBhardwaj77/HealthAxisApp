import { Button } from '../../components/ui/Button';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage system configurations</p>
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clinic Name</label>
                    <input type="text" defaultValue="HealthAxis Clinic" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
                    <input type="email" defaultValue="admin@healthaxis.com" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900" />
                </div>
            </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notifications</h3>
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-primary-600 focus:ring-primary-500" />
                    <span className="text-gray-700 dark:text-gray-300">Email notifications for new appointments</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                    <span className="text-gray-700 dark:text-gray-300">SMS notifications for patients</span>
                </label>
            </div>
        </div>

        <div className="pt-4 flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
