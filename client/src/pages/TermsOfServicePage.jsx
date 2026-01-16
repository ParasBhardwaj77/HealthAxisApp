import { FileText } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 15, 2026
            </p>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-700 prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By accessing or using HealthAxis ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, you may not use the Platform. These Terms apply to all users, including 
                healthcare providers, patients, administrators, and other authorized personnel.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                HealthAxis is a comprehensive healthcare management platform that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Electronic Health Records (EHR) management</li>
                <li>Appointment scheduling and management</li>
                <li>Telemedicine and video consultation services</li>
                <li>Billing and payment processing</li>
                <li>Patient portal and communication tools</li>
                <li>Administrative and reporting features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To use certain features of the Platform, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information promptly</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You agree not to use the Platform to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Violate any applicable laws, regulations, or healthcare standards</li>
                <li>Infringe upon intellectual property rights or privacy rights</li>
                <li>Transmit malicious code, viruses, or harmful software</li>
                <li>Attempt to gain unauthorized access to the Platform or other accounts</li>
                <li>Interfere with or disrupt Platform operations or security</li>
                <li>Use the Platform for any fraudulent or illegal purpose</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Collect or harvest information about other users without consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Healthcare Information and HIPAA Compliance</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                HealthAxis is designed to comply with the Health Insurance Portability and Accountability Act (HIPAA) and other 
                applicable healthcare privacy laws. However, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Ensuring your use of the Platform complies with HIPAA and applicable regulations</li>
                <li>Obtaining necessary patient consents and authorizations</li>
                <li>Maintaining appropriate Business Associate Agreements where required</li>
                <li>Using the Platform only for legitimate healthcare purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Medical Disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong>IMPORTANT:</strong> HealthAxis is a technology platform and does not provide medical advice, diagnosis, or treatment. 
                The Platform facilitates communication and data management between healthcare providers and patients but does not replace 
                professional medical judgment.
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Healthcare providers are solely responsible for medical decisions and patient care</li>
                <li>Patients should always consult qualified healthcare professionals for medical advice</li>
                <li>In case of medical emergencies, contact emergency services immediately</li>
                <li>We are not liable for any medical outcomes or decisions made using the Platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                The Platform, including its software, design, content, and trademarks, is owned by HealthAxis and protected by 
                intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Platform 
                in accordance with these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You retain ownership of data and content you submit to the Platform but grant us a license to use, store, and 
                process such content as necessary to provide the Platform services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Payment Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you subscribe to paid services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>You are responsible for all applicable taxes</li>
                <li>We reserve the right to change pricing with 30 days' notice</li>
                <li>Failure to pay may result in service suspension or termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Service Availability and Modifications</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We strive to maintain Platform availability but do not guarantee uninterrupted or error-free service. We reserve 
                the right to modify, suspend, or discontinue any aspect of the Platform at any time. We will provide reasonable 
                notice of significant changes that affect your use of the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>HEALTHAXIS IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
                <li>WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
                <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE PREVIOUS 12 MONTHS</li>
                <li>WE ARE NOT LIABLE FOR MEDICAL OUTCOMES OR HEALTHCARE DECISIONS</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Indemnification</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You agree to indemnify and hold harmless HealthAxis, its affiliates, and their officers, directors, employees, 
                and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your 
                use of the Platform, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Termination</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Platform immediately, without prior notice, for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Request by law enforcement or regulatory authorities</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Upon termination, your right to use the Platform ceases immediately. We may delete your account and data in 
                accordance with our data retention policies and legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                These Terms are governed by the laws of the State of California, United States. Any disputes arising from these 
                Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the rules of 
                the American Arbitration Association, except where prohibited by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be communicated via email or Platform 
                notification. Your continued use of the Platform after changes become effective constitutes acceptance of the 
                updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">HealthAxis Legal Department</p>
                <p className="text-gray-600 dark:text-gray-400">Email: legal@healthaxis.com</p>
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

