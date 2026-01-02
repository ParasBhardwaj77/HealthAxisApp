import {
  ArrowLeft,
  User,
  Search,
  Calendar as CalendarIcon,
  CheckCircle,
} from "lucide-react";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import Table from "../../components/Table";

export default function BookAppointment({ onBack }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetchWithAuth(API_ENDPOINTS.PATIENT.DOCTORS);

        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await res.json();
        const mappedDoctors = data.map((doc) => ({
          id: doc.id,
          name: doc.fullName,
          specialty: doc.specialization,
          email: "", // Email not provided in DTO
          availability: doc.status || "Available", // Fallback status
        }));
        setDoctors(mappedDoctors);
      } catch (err) {
        console.error(err);
        setError("Could not load doctors list.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate time slots from 9 AM to 8 PM (Hourly)
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  });

  // Get tomorrow's date for 'min' attribute in YYYY-MM-DD format
  const getTomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      // Convert "09:00 AM" to "09:00:00" format for ISO string
      const [time, modifier] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours === "12") hours = "00";
      if (modifier === "PM") hours = parseInt(hours, 10) + 12;

      const dateTime = `${selectedDate}T${hours}:${minutes}:00`;

      const res = await fetchWithAuth(API_ENDPOINTS.PATIENT.APPOINTMENTS, {
        method: "POST",
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          dateTime: dateTime,
        }),
      });

      if (res.ok) {
        alert(
          `Appointment confirmed with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`
        );
        onBack();
      } else {
        const errorMsg = await res.text();
        alert(`Booking failed: ${errorMsg}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while booking the appointment.");
    }
  };

  if (selectedDoctor) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedDoctor(null);
              setSelectedDate("");
              setSelectedTime("");
            }}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Schedule Appointment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Booking with {selectedDoctor.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Step 1: Date Selection */}
          <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Choose Date
              </h3>
            </div>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <CalendarIcon className="w-8 h-8" />
            </div>

            <div className="space-y-4">
              <input
                type="date"
                min={getTomorrowStr()}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(""); // Reset time when date changes
                }}
                className="w-full px-4 py-4 rounded-2xl border-2 border-primary-100 dark:border-primary-900/30 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-center text-xl font-bold text-primary-600 dark:text-primary-400 cursor-pointer"
              />
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                <p className="text-[10px] text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest">
                  Available from tomorrow onwards
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Time Selection */}
          <div
            className={`bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 transition-all duration-300 ${
              !selectedDate
                ? "opacity-50 grayscale pointer-events-none scale-95"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Choose Time
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-2xl text-sm font-bold transition-all duration-200 border-2 ${
                    selectedTime === time
                      ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105"
                      : "bg-gray-50 dark:bg-dark-900 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Selected Date:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {selectedDate || "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Selected Time:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {selectedTime || "-"}
                </span>
              </div>

              <Button
                className="w-full h-12 text-lg rounded-2xl mt-4"
                disabled={!selectedDate || !selectedTime}
                onClick={handleConfirmBooking}
              >
                Confirm Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Book Appointment
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose a specialist and book your visit
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      {loading && <div className="text-center py-10">Loading doctors...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!loading && !error && (
        <Table
          headers={["Doctor", "Specialty", "Status"]}
          data={filteredDoctors}
          actions={false}
          renderRow={(doctor) => (
            <>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {doctor.name}
                    </div>
                    <div className="text-xs text-gray-500">{doctor.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {doctor.specialty}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doctor.availability === "Available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {doctor.availability}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  size="sm"
                  disabled={doctor.availability !== "Available"}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Book Now
                </Button>
              </td>
            </>
          )}
        />
      )}
    </div>
  );
}
