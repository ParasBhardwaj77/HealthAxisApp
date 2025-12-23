import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export default function Login() {
  return (
    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="admin@healthaxis.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Button
            type="button"
            onClick={() => (window.location.href = "/admin")}
            className="w-full text-[10px] px-1"
            variant="secondary"
          >
            Admin Demo
          </Button>
          <Button
            type="button"
            onClick={() => (window.location.href = "/doctor")}
            className="w-full text-[10px] px-1"
            variant="secondary"
          >
            Doctor Demo
          </Button>
          <Button
            type="button"
            onClick={() => (window.location.href = "/patient")}
            className="w-full text-[10px] px-1"
            variant="secondary"
          >
            Patient Demo
          </Button>
        </div>
        <Button
          className="w-full mt-4"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/admin";
          }}
        >
          Sign In
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
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
