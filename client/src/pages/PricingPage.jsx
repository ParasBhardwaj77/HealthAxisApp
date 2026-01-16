import { Check, X } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for small clinics getting started',
    features: [
      'Up to 5 users',
      'Basic appointment scheduling',
      'Patient records management',
      'Email support',
      'Mobile app access',
      'Basic reporting'
    ],
    limitations: [
      'No telemedicine',
      'No advanced analytics',
      'Limited storage (5GB)'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'Ideal for growing practices',
    features: [
      'Up to 25 users',
      'Advanced scheduling',
      'Telemedicine included',
      'Priority support',
      'Advanced analytics',
      'Unlimited storage',
      'Custom branding',
      'API access',
      'Automated billing'
    ],
    limitations: [],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Ultimate',
    price: '$299',
    period: 'per month',
    description: 'For large hospitals and multi-location practices',
    features: [
      'Unlimited users',
      'Everything in Pro',
      'Multi-location management',
      '24/7 phone support',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solution',
      'Advanced security features',
      'Compliance reporting',
      'Training & onboarding'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Choose the Right Plan for Your Practice
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Flexible pricing options designed to scale with your healthcare organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-dark-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.popular
                    ? 'border-primary-500 dark:border-primary-400 scale-105 md:scale-110 relative'
                    : 'border-gray-100 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <Link to="/register" className="block mb-8">
                    <Button
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500 dark:text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Need a custom solution? We're here to help.
            </p>
            <Link to="/contact">
              <Button variant="secondary">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

