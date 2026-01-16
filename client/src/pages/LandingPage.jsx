import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import SaaSFeatures from '../components/landing/SaaSFeatures';
import Features from '../components/landing/Features';
import RoleTabs from '../components/landing/RoleTabs';
import Telemedicine from '../components/landing/Telemedicine';
import Workflow from '../components/landing/Workflow';
import TechStack from '../components/landing/TechStack';
import Developers from '../components/landing/Developers';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      <Hero />
      <SaaSFeatures />
      <Features />
      <RoleTabs />
      <Telemedicine />
      <Workflow />
      <TechStack />
      <Developers />
      <Footer />
    </div>
  );
}
