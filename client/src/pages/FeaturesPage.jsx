import Navbar from '../components/landing/Navbar';
import Features from '../components/landing/Features';
import TechStack from '../components/landing/TechStack';
import Footer from '../components/landing/Footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      <Features />
      <TechStack />
      <Footer />
    </div>
  );
}

