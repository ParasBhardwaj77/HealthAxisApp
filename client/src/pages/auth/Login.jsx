import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { API_ENDPOINTS } from "../../api/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      // Store JWT + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (data.role === "DOCTOR") {
        window.location.href = "/doctor";
      } else if (data.role === "PATIENT") {
        window.location.href = "/patient";
      } else {
        throw new Error("Unknown user role");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="admin@healthaxis.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit */}
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-primary-600 font-medium hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
