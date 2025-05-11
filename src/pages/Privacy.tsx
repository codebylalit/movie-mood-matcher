import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p className="leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Movie preferences and ratings</li>
            <li>Mood selections and quiz responses</li>
            <li>Favorite movies and watchlist items</li>
            <li>Account information (if you choose to create an account)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide personalized movie recommendations</li>
            <li>Improve our mood-matching algorithm</li>
            <li>Analyze user preferences and trends</li>
            <li>Communicate with you about updates and features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We strive to protect your data but cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
          <p className="leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
          <p className="leading-relaxed">
            We may use third-party services for analytics, advertising, and other purposes. These services may collect information about your use of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about our Privacy Policy, please contact us through our Contact page or email us at privacy@moviemood.com.
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

export default Privacy; 