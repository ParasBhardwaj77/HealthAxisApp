import { Shield } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 15, 2026
            </p>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-700 prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                HealthAxis ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our healthcare management platform and services.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By using HealthAxis, you agree to the collection and use of information in accordance with this policy. We are committed 
                to maintaining the confidentiality and security of your personal health information in compliance with HIPAA and other 
                applicable healthcare privacy laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Personal Information</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li>Name, email address, phone number, and contact information</li>
                <li>Medical records, health history, and treatment information</li>
                <li>Insurance information and billing details</li>
                <li>Appointment schedules and preferences</li>
                <li>Account credentials and authentication information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                When you use our platform, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
                <li>Usage patterns and platform interactions</li>
                <li>Log files and error reports</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>To provide, maintain, and improve our healthcare services</li>
                <li>To process appointments, prescriptions, and medical records</li>
                <li>To facilitate communication between patients and healthcare providers</li>
                <li>To process payments and manage billing</li>
                <li>To comply with legal obligations and healthcare regulations</li>
                <li>To send important updates and notifications about your care</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Healthcare Providers:</strong> With authorized medical professionals involved in your care</li>
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in platform operations (under strict confidentiality agreements)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Emergency Situations:</strong> To protect health and safety in emergency medical situations</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>HIPAA-compliant infrastructure and practices</li>
                <li>Employee training on data privacy and security</li>
                <li>Multi-factor authentication for account access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal health information</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another healthcare provider</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from non-essential communications</li>
                <li><strong>Complaints:</strong> File a complaint with us or regulatory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and improve our 
                services. You can control cookie preferences through your browser settings, though disabling cookies may affect 
                platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                HealthAxis is not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                new policy on this page and updating the "Last updated" date. Your continued use of HealthAxis after changes 
                become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">HealthAxis Privacy Team</p>
                <p className="text-gray-600 dark:text-gray-400">Email: privacy@healthaxis.com</p>
                <p className="text-gray-600 dark:text-gray-400">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600 dark:text-gray-400">Address: 123 Healthcare Blvd, San Francisco, CA 94102</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

