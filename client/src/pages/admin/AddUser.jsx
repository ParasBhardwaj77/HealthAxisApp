import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import { Button } from "../../components/ui/Button";
import { ChevronLeft, User, Mail, Lock, Users, Calendar } from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "Patient");
  const { setIsLoading, isLoading: globalLoading } = useLoading();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    specialization: "General Medicine",
    age: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        role === "Doctor"
          ? `${API_BASE_URL}/admin/doctor`
          : `${API_BASE_URL}/admin/patient`;

      const payload =
        role === "Doctor"
          ? {
              fullName: form.fullName,
              email: form.email,
              password: form.password,
              specialization: form.specialization,
            }
          : {
              fullName: form.fullName,
              email: form.email,
              password: form.password,
              age: form.age,
              gender: form.gender,
            };

      const res = await fetchWithAuth(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create user");
      }

      navigate("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New User
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create a new account for Doctor or Patient
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {["Patient", "Doctor"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  role === r
                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600 dark:text-primary-400 ring-1 ring-primary-500"
                    : "bg-white dark:bg-dark-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Age & Gender - Patient Only */}
            {role === "Patient" && (
              <>
                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      required
                      type="number"
                      placeholder="25"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white appearance-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Doctor only */}
          {role === "Doctor" && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Specialization
              </label>
              <select
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white appearance-none"
              >
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={globalLoading}>
              {globalLoading ? "Creating User..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
