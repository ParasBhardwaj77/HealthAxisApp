import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ChevronLeft, User, Mail, Phone, Lock, Upload } from 'lucide-react';

export default function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || 'Patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New User</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create a new account for Doctor, Patient, or Receptionist</p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {['Patient', 'Doctor', 'Receptionist'].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  role === r
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600 dark:text-primary-400 ring-1 ring-primary-500'
                    : 'bg-white dark:bg-dark-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Fields based on Role */}
          {role === 'Doctor' && (
             <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white appearance-none">
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          )}

          {/* Avatar Upload */}
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-dark-900/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Click to upload profile picture</p>
            <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/admin')} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Creating User...' : 'Create Account'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
