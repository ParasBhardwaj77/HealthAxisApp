import { useState, useEffect, useRef } from 'react';
import { Activity, Target, Users, Award } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import Developers from '../components/landing/Developers';
import { useCounter } from '../hooks/useCounter';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To revolutionize healthcare delivery by providing innovative, accessible, and secure technology solutions that empower healthcare providers and improve patient outcomes worldwide.'
  },
  {
    icon: Users,
    title: 'Our Vision',
    description: 'To become the leading healthcare technology platform, connecting patients and providers seamlessly while maintaining the highest standards of security, privacy, and care quality.'
  },
  {
    icon: Award,
    title: 'Our Values',
    description: 'We are committed to innovation, integrity, and inclusivity. We believe in making quality healthcare accessible to everyone, regardless of location or background.'
  }
];

const stats = [
  { number: '10,000+', label: 'Active Users', value: 10000, suffix: '+' },
  { number: '500+', label: 'Healthcare Facilities', value: 500, suffix: '+' },
  { number: '1M+', label: 'Patients Served', value: 1000000, suffix: '+' },
  { number: '99.9%', label: 'Uptime', value: 99.9, suffix: '%' }
];

// Helper function to format numbers
const formatNumber = (num, suffix) => {
  if (suffix === '%') {
    return `${num.toFixed(1)}${suffix}`;
  } else if (num >= 1000000) {
    const millions = num / 1000000;
    return `${millions === Math.floor(millions) ? millions : millions.toFixed(1)}M${suffix}`;
  } else if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands === Math.floor(thousands) ? thousands : thousands.toFixed(1)}K${suffix}`;
  } else {
    return `${Math.floor(num).toLocaleString()}${suffix}`;
  }
};

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Call all hooks at the top level
  const count1 = useCounter(stats[0].value, 2000, isVisible);
  const count2 = useCounter(stats[1].value, 2000, isVisible);
  const count3 = useCounter(stats[2].value, 2000, isVisible);
  const count4 = useCounter(stats[3].value, 2000, isVisible);

  const counts = [count1, count2, count3, count4];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-primary-500 p-3 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <span className="font-bold text-3xl text-gray-900 dark:text-white tracking-tight">HealthAxis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're on a mission to transform healthcare through innovative technology solutions.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                HealthAxis was founded with a simple yet powerful vision: to make quality healthcare accessible to everyone, everywhere. 
                We recognized that healthcare providers were struggling with outdated systems, fragmented workflows, and limited access 
                to modern technology solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our team of experienced developers, healthcare professionals, and technology enthusiasts came together to build a 
                comprehensive healthcare operating system that addresses these challenges head-on. We've combined cutting-edge 
                technology with deep healthcare domain expertise to create a platform that truly serves the needs of modern 
                healthcare organizations.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, HealthAxis powers healthcare delivery for practices ranging from small clinics to large hospital networks, 
                helping them streamline operations, improve patient care, and reduce costs. We're proud of what we've built, but 
                we're even more excited about the future of healthcare technology.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          <div ref={statsRef} className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-700 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {formatNumber(counts[index], stat.suffix)}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Developers />

      <Footer />
    </div>
  );
}

