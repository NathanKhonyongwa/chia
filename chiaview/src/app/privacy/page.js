import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p>We may collect information about you in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number when you register, contact us, or subscribe to our newsletter.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, operating system, and pages visited.</li>
              <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your browsing experience.</li>
              <li><strong>Form Data:</strong> Information submitted through contact forms, registration, or other interactive features.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responding to your inquiries and providing customer support</li>
              <li>Sending newsletters and updates (with your consent)</li>
              <li>Improving our website and user experience</li>
              <li>Analyzing website traffic and user behavior</li>
              <li>Complying with legal obligations</li>
              <li>Protecting against fraudulent or malicious activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, email delivery, and other functions. These third parties have their own privacy policies governing their use of your information. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data</li>
              <li>Right to opt-out of marketing communications</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
            <p>
              Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may limit some functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be effective immediately upon posting to our website. Your continued use of the website signifies your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact us
              </Link>
              . We'll respond to your inquiry within 10 business days.
            </p>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex gap-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
