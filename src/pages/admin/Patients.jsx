import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { Button } from '../../components/ui/Button';
import { UserPlus, Search } from 'lucide-react';

const initialPatientsData = [
  { id: 1, name: 'Alice Smith', age: 32, gender: 'Female', lastVisit: 'Oct 24, 2024', status: 'Admitted' },
  { id: 2, name: 'Robert Jones', age: 45, gender: 'Male', lastVisit: 'Oct 22, 2024', status: 'Discharged' },
  { id: 3, name: 'Maria Garcia', age: 28, gender: 'Female', lastVisit: 'Sep 15, 2024', status: 'Outpatient' },
];

export default function AdminPatients() {
  const [patients, setPatients] = useState(initialPatientsData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (patientToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${patientToDelete.name}?`)) {
        setPatients(patients.filter(p => p.id !== patientToDelete.id));
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">View and manage patient records</p>
        </div>
        <Link to="/admin/add-user" state={{ role: 'Patient' }}>
            <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
            </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none"
            />
        </div>
      </div>

      <Table 
        headers={['Patient Name', 'Age', 'Gender', 'Last Visit']}
        data={filteredPatients}
        actions
        onDelete={handleDelete}
        showEdit={false}
        renderRow={(patient) => (
            <>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{patient.lastVisit}</td>
            </>
        )}
      />
    </div>
  );
}
