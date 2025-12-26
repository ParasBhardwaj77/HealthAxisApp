import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Registration failed");
      }

      // success → go to login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        Create Account
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
        Join HealthAxis today
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            autoComplete="name"
            className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email Address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            autoComplete="email"
            className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary-600 font-bold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
