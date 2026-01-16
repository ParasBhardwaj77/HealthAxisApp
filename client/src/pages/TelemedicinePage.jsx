import { Video, Shield, Clock, Globe, Users, CheckCircle } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import Telemedicine from '../components/landing/Telemedicine';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access healthcare professionals anytime, anywhere, without leaving your home.'
  },
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'End-to-end encryption ensures your medical consultations remain completely private and secure.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with specialists worldwide, breaking down geographical barriers to quality care.'
  },
  {
    icon: Users,
    title: 'Family Consultations',
    description: 'Include family members in consultations for better care coordination and understanding.'
  },
  {
    icon: CheckCircle,
    title: 'Integrated Records',
    description: 'All consultation notes and prescriptions are automatically added to your digital health records.'
  },
  {
    icon: Video,
    title: 'HD Quality',
    description: 'Crystal clear video and audio quality for accurate diagnosis and effective communication.'
  }
];

const useCases = [
  {
    title: 'Follow-up Consultations',
    description: 'Perfect for routine check-ins and medication adjustments without the need for in-person visits.'
  },
  {
    title: 'Mental Health Support',
    description: 'Access therapists and counselors from the comfort and privacy of your own space.'
  },
  {
    title: 'Chronic Disease Management',
    description: 'Regular monitoring and consultations for conditions like diabetes, hypertension, and more.'
  },
  {
    title: 'Second Opinions',
    description: 'Get expert second opinions from specialists without traveling long distances.'
  }
];

export default function TelemedicinePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <Telemedicine />

      <section className="py-24 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Telemedicine Platform?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience healthcare reimagined with our comprehensive telemedicine solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-dark-900 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perfect For
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover how telemedicine can transform your healthcare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of healthcare providers and patients using our telemedicine platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg">Start Free Trial</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

