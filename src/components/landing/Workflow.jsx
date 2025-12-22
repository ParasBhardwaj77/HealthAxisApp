import { Calendar, CheckCircle, Video, FileText, ArrowRight } from 'lucide-react';

export default function Workflow() {
  const steps = [
    { icon: Calendar, title: 'Book Online', desc: 'Patient selects a specialty, doctor, and convenient time slot.' },
    { icon: CheckCircle, title: 'Confirmation', desc: 'Instant confirmation via SMS/Email with appointment details.' },
    { icon: Video, title: 'Consultation', desc: 'Secure in-person or video visit with the doctor.' },
    { icon: FileText, title: 'Records Updated', desc: 'Prescriptions and notes are instantly saved to digital records.' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A seamless experience from booking to billing.
          </p>
        </div>

        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, i) => (
                    <div key={i} className="text-center bg-white dark:bg-dark-800 p-6 rounded-2xl md:bg-transparent md:dark:bg-transparent">
                        <div className="w-24 h-24 mx-auto bg-white dark:bg-dark-900 border-4 border-gray-100 dark:border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm z-10 relative">
                            <step.icon className="w-10 h-10 text-primary-500" />
                            <div className="absolute top-0 right-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-sm">
                                {i + 1}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
