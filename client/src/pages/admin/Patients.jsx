import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { Button } from "../../components/ui/Button";
import { UserPlus, Search } from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.ADMIN.PATIENTS);

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();

      const mappedPatients = data.map((patient) => ({
        id: patient.id,
        name: patient.fullName || "Unknown",
        email: patient.email || "No Email",
        age: patient.age || "N/A",
        gender: patient.gender || "N/A",
        lastVisit: patient.lastVisit || "N/A",
      }));
      setPatients(mappedPatients);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete ${patientToDelete.name}?`)
    ) {
      try {
        const response = await fetchWithAuth(
          `${API_BASE_URL}/admin/patients/${patientToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPatients(patients.filter((p) => p.id !== patientToDelete.id));
        } else {
          alert("Failed to delete patient");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Error deleting patient");
      }
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-4">Loading patients...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patients
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and manage patient records
          </p>
        </div>
        <Link to="/admin/add-user" state={{ role: "Patient" }}>
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
            placeholder="Search patients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      <Table
        headers={["Patient Name", "Email", "Age", "Gender"]}
        data={filteredPatients}
        actions
        onDelete={handleDelete}
        showEdit={false}
        renderRow={(patient) => (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {patient.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {patient.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {patient.age}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {patient.gender}
            </td>
          </>
        )}
      />
    </div>
  );
}
