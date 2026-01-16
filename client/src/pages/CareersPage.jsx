import { Mail, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Button } from '../components/ui/Button';

export default function CareersPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the email to a backend
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Careers at HealthAxis
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join us in transforming healthcare through innovative technology.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 dark:border-gray-700 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
              We're Not Currently Hiring
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
              Thank you for your interest in joining the HealthAxis team! We're not actively recruiting at the moment, 
              but we're always looking for talented individuals who share our passion for healthcare technology.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
              If you'd like to be notified when we have open positions, please submit your email below. We'll reach out 
              as soon as opportunities become available.
            </p>

            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 dark:text-green-400 font-semibold">
                  Thank you! We'll notify you when positions become available.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button type="submit" className="whitespace-nowrap">
                    <Mail className="w-4 h-4 mr-2" />
                    Notify Me
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-3xl p-8 border border-primary-100 dark:border-primary-900/30">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              What We Look For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                <span>Passion for healthcare and technology</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                <span>Strong problem-solving skills</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                <span>Collaborative mindset</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                <span>Commitment to quality and security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

