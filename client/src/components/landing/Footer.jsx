import { Activity, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                     <div className="bg-primary-500 p-1.5 rounded-lg">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">HealthAxis</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                    A comprehensive healthcare operating system designed to simplify hospital management and improve patient care.
                </p>
                <div className="flex gap-4">
                    <a href="" className="p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="" className="p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="" className="p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="" className="p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="" className="p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-gray-600 dark:text-gray-400">
                        <Instagram className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Links */}
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li><Link to="/features" className="hover:text-primary-500">Features</Link></li>
                    <li><Link to="/pricing" className="hover:text-primary-500">Pricing</Link></li>
                    <li><Link to="/telemedicine" className="hover:text-primary-500">Telemedicine</Link></li>
                    <li><Link to="/success-stories" className="hover:text-primary-500">Success Stories</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li><Link to="/about" className="hover:text-primary-500">About Us</Link></li>
                    <li><Link to="/careers" className="hover:text-primary-500">Careers</Link></li>
                    <li><Link to="/blog" className="hover:text-primary-500">Blog</Link></li>
                    <li><Link to="/contact" className="hover:text-primary-500">Contact</Link></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} HealthAxis. All rights reserved.</p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
                <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</Link>
            </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-800 inline-block px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                ⚠️ Built for learning and demonstration purposes only.
            </p>
        </div>
      </div>
    </footer>
  );
}
