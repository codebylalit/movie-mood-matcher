import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using Movie Mood, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
          <p className="leading-relaxed">
            Movie Mood is a mood-based movie recommendation platform that helps users discover films based on their emotional state and preferences. We provide personalized movie suggestions, mood analysis, and the ability to save favorites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
          <p className="leading-relaxed mb-4">
            Users of Movie Mood agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide accurate information when using our services</li>
            <li>Use the service in a manner consistent with all applicable laws</li>
            <li>Maintain the confidentiality of their account information</li>
            <li>Not misuse or abuse the service or its features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
          <p className="leading-relaxed">
            All content on Movie Mood, including but not limited to text, graphics, logos, and software, is the property of Movie Mood or its content suppliers and is protected by international copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Privacy Policy</h2>
          <p className="leading-relaxed">
            Your use of Movie Mood is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed">
            Movie Mood provides its service on an "as is" and "as available" basis. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these terms at any time. We will notify users of any material changes through our website or via email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
          <p className="leading-relaxed">
            For questions about these Terms of Service, please contact us at visonovaofficial@gmail.com
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 