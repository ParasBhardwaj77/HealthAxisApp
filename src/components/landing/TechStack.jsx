import { Code2, Database, ShieldCheck, Globe, Server, Lock } from 'lucide-react';

const technologies = [
  { icon: Code2, name: 'React', desc: 'Modern UI Library' },
  { icon: Globe, name: 'Tailwind CSS', desc: 'Utility-First Styling' },
  { icon: Server, name: 'Node.js', desc: 'Backend Runtime' },
  { icon: Database, name: 'PostgreSQL', desc: 'Relational Database' },
  { icon: ShieldCheck, name: 'JWT Auth', desc: 'Secure Access' },
  { icon: Lock, name: 'WebRTC', desc: 'Encrypted Video' },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powered by Modern Tech
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built with an enterprise-grade stack for performance and security.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, i) => (
            <div key={i} className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gray-50 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4 text-primary-500">
                <tech.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tech.name}</h3>
              <p className="text-xs text-center text-gray-500">{tech.desc}</p>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-16 bg-white dark:bg-dark-800 rounded-3xl p-8 max-w-4xl mx-auto border-2 border-primary-100 dark:border-primary-900/30 flex flex-col md:flex-row items-center gap-8 shadow-lg">
             <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 flex-shrink-0">
                <ShieldCheck className="w-10 h-10" />
             </div>
             <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise-Grade Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Your data is safe with us. We use industry-standard encryption, regular security audits, and strict access controls to ensure HIPAA compliance and patient privacy.
                </p>
             </div>
        </div>
      </div>
    </section>
  );
}
