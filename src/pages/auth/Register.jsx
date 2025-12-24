import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { User, Mail, Lock, UserCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    navigate("/patient");
  };

  return (
    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        Create Account
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
        Join HealthAxis today
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Create Account
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
