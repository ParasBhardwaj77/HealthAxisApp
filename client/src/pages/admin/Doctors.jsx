import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import Table from "../../components/Table";
import { Button } from "../../components/ui/Button";
import { UserPlus, Search } from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${API_ENDPOINTS.PATIENT.DOCTORS}`);

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();
      // Map API data to component state structure if necessary
      // Assuming API returns { id, name, specialization, email, status, patientsCount }
      // Adjusting map based on likely API response or sticking to loose mapping
      const mappedDoctors = data.map((doc) => ({
        id: doc.id,
        name: doc.fullName || "Unknown Doctor",
        specialt: doc.specialization || "General",
        email: doc.email || "No Email",
        status: doc.status || "Available",
        patients: doc.patientCount || 0,
      }));
      setDoctors(mappedDoctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (doctorToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete ${doctorToDelete.name}?`)
    ) {
      try {
        setIsLoading(true);
        const response = await fetchWithAuth(
          `${API_BASE_URL}/admin/doctors/${doctorToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setDoctors(
            doctors.filter((doctor) => doctor.id !== doctorToDelete.id)
          );
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Error deleting doctor");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialt === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const uniqueSpecialties = [
    "All Specialties",
    ...new Set(doctors.map((d) => d.specialt)),
  ];

  if (loading) return <div className="p-4">Loading doctors...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctors Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage doctor accounts and schedules
          </p>
        </div>
        <Link to="/admin/add-user" state={{ role: "Doctor" }}>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 outline-none"
        >
          {uniqueSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <Table
        headers={["Doctor Name", "Specialty", "Email", "Status", "Patients"]}
        data={filteredDoctors}
        actions
        showEdit={false}
        onDelete={handleDelete}
        renderRow={(doctor) => (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {doctor.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {doctor.specialt}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {doctor.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  doctor.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doctor.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {doctor.patients}
            </td>
          </>
        )}
      />
    </div>
  );
}
