import { Calendar, Shield, Activity, CreditCard, Video, Bell } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    desc: 'AI-powered appointment management that optimizes doctor availability and reduces wait times.'
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    desc: 'Secure portals for Admins, Doctors, Receptionists, and Patients with granular permission controls.'
  },
  {
    icon: Activity,
    title: 'Digital Records',
    desc: 'Centralized Electronic Health Records (EHR) accessible instantly by authorized medical staff.'
  },
  {
    icon: CreditCard,
    title: 'Automated Billing',
    desc: 'Generate invoices, track payments, and manage insurance claims with just a few clicks.'
  },
  {
    icon: Video,
    title: 'Telemedicine',
    desc: 'Integrated HD video consultations allowing doctors to treat patients remotely and securely.'
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    desc: 'Instant notifications for appointment reminders, test results, and critical updates.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            A Complete Operating System for Healthcare
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built with modularity in mind, HealthAxis scales from small clinics to multi-specialty hospitals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
