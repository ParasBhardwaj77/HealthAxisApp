import { Quote, Star } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const successStories = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    organization: 'City General Hospital',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    quote: 'HealthAxis transformed our hospital operations. Patient wait times decreased by 40%, and our staff efficiency increased dramatically. The telemedicine feature has been a game-changer during peak hours.',
    metrics: '40% reduction in wait times'
  },
  {
    name: 'Dr. James Anderson',
    role: 'Family Physician',
    organization: 'Anderson Family Clinic',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    quote: 'As a small practice, we needed something affordable yet powerful. HealthAxis delivered beyond our expectations. The automated billing alone saves us 10 hours per week.',
    metrics: '10 hours saved weekly'
  },
  {
    name: 'Maria Rodriguez',
    role: 'Practice Manager',
    organization: 'Coastal Medical Group',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    quote: 'The patient portal has revolutionized how we interact with our patients. They can book appointments, view records, and pay bills seamlessly. Patient satisfaction scores are at an all-time high.',
    metrics: '95% patient satisfaction'
  },
  {
    name: 'Dr. Emily Chen',
    role: 'Pediatrician',
    organization: 'Children\'s Health Center',
    image: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    quote: 'The digital records system is intuitive and comprehensive. I can access patient history instantly, which helps me provide better care. The telemedicine feature is especially valuable for follow-ups.',
    metrics: '60% faster consultations'
  },
  {
    name: 'Robert Thompson',
    role: 'IT Director',
    organization: 'Regional Healthcare Network',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    quote: 'Implementation was smooth, and the support team was exceptional. We integrated HealthAxis across 5 locations in just 2 months. The centralized management dashboard is exactly what we needed.',
    metrics: '5 locations integrated'
  },
  {
    name: 'Dr. Michael Brown',
    role: 'Cardiologist',
    organization: 'Heart & Vascular Institute',
    image: 'https://i.pravatar.cc/150?img=6',
    rating: 5,
    quote: 'The appointment scheduling system is brilliant. It optimizes my calendar automatically, reducing no-shows by 30%. I can focus on what matters most - patient care.',
    metrics: '30% fewer no-shows'
  },
  {
    name: 'Lisa Wang',
    role: 'Administrator',
    organization: 'Metro Urgent Care',
    image: 'https://i.pravatar.cc/150?img=7',
    rating: 5,
    quote: 'HealthAxis streamlined our entire workflow. From patient registration to billing, everything is automated. Our staff can now handle twice the patient volume with the same team.',
    metrics: '2x patient capacity'
  },
  {
    name: 'Dr. David Kim',
    role: 'Orthopedic Surgeon',
    organization: 'Advanced Orthopedics',
    image: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    quote: 'The reporting and analytics features provide insights I never had before. I can track patient outcomes, identify trends, and make data-driven decisions to improve care quality.',
    metrics: 'Enhanced care quality'
  },
  {
    name: 'Jennifer Martinez',
    role: 'Nurse Manager',
    organization: 'Community Health Center',
    image: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    quote: 'Our nurses love the mobile app. They can update patient records on the go, receive real-time alerts, and communicate with doctors instantly. It has improved our response time significantly.',
    metrics: '50% faster response'
  },
  {
    name: 'Dr. Amanda White',
    role: 'Dermatologist',
    organization: 'Skin Care Specialists',
    image: 'https://i.pravatar.cc/150?img=10',
    rating: 5,
    quote: 'Telemedicine has opened new possibilities for our practice. We can now serve patients in remote areas, and the image sharing feature is perfect for dermatology consultations.',
    metrics: 'Expanded reach'
  },
  {
    name: 'Thomas Johnson',
    role: 'CEO',
    organization: 'Wellness Medical Group',
    image: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    quote: 'The ROI has been incredible. We\'ve reduced operational costs by 25% while improving patient satisfaction. HealthAxis pays for itself through efficiency gains alone.',
    metrics: '25% cost reduction'
  },
  {
    name: 'Dr. Patricia Lee',
    role: 'Internal Medicine',
    organization: 'Downtown Medical Associates',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    quote: 'The security features give us peace of mind. HIPAA compliance is built-in, and we\'ve never had a data breach. Our patients trust us more because they know their data is safe.',
    metrics: 'Zero security incidents'
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
          
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Trusted by Healthcare Professionals Worldwide
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how HealthAxis is transforming healthcare delivery across practices of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-primary-500 dark:text-primary-400 mb-4" />
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic">
                  "{story.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{story.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{story.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{story.organization}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {story.metrics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Thousands of Satisfied Healthcare Providers
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Start your success story with HealthAxis today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

