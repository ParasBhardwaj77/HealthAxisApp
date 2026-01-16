import { X, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function SaaSFeatures() {
  return (
    <section className="py-24 bg-white dark:bg-dark-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stop Managing Healthcare the <span className="text-red-500 line-through decoration-4 decoration-red-500/30">Hard Way</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Replace scattered spreadsheets and manual calls with a unified, intelligent operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* The Old Way */}
          <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-3xl opacity-70 hover:opacity-100 transition-opacity">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="p-2 bg-red-100 text-red-600 rounded-lg"><X className="w-5 h-5" /></span>
                The Old Way
            </h3>
            <ul className="space-y-4">
                {['Fragmented patient records', 'Endless phone tag for scheduling', 'Manual billing errors', 'Zero data insights'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
          </div>

          {/* The HealthAxis Way */}
          <div className="bg-primary-600 dark:bg-primary-900 p-8 rounded-3xl shadow-xl shadow-primary-500/20 text-white transform md:scale-105 border-4 border-white dark:border-dark-700">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="p-2 bg-white/20 text-white rounded-lg"><Check className="w-5 h-5" /></span>
                The HealthAxis Way
            </h3>
            <ul className="space-y-4 mb-8">
                {['Unified digital health records', 'Instant online booking', 'Automated invoicing', 'Real-time analytics & KPIs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary-50">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                        </div>
                        {item}
                    </li>
                ))}
            </ul>
            <Link to="/login">
                <Button variant="secondary" className="w-full bg-white text-primary-700 hover:bg-gray-50 border-none">
                    Switch to Modern Healthcare <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
