import React from 'react';
import AdSense from '../components/AdSense';

const Privacy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how MovieMood collects,
            uses, and protects your personal information when you use our website and services.
          </p>
        </div>

        <AdSense
          slot="9135780246"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Email address (when you subscribe or contact us)</li>
              <li>Movie preferences and favorites</li>
              <li>Mood selections and viewing history</li>
              <li>Feedback and correspondence</li>
            </ul>
          </div>
        </div>

        <AdSense
          slot="0246891357"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide and improve our movie recommendation service</li>
              <li>Personalize your movie discovery experience</li>
              <li>Communicate with you about our services</li>
              <li>Analyze and improve our website performance</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
          <p className="text-gray-300 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our website and
            hold certain information. Cookies are files with small amounts of data which may include
            an anonymous unique identifier.
          </p>
        </div>

        <AdSense
          slot="1357902468"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement appropriate security measures to protect your personal information.
            However, please note that no method of transmission over the Internet or electronic
            storage is 100% secure.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
          <p className="text-gray-300 leading-relaxed">
            We use The Movie Database (TMDB) API and other third-party services to provide movie
            information. These services may collect information about you independently. We
            recommend reviewing their privacy policies.
          </p>
        </div>

        <AdSense
          slot="2468013579"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at
            privacy@moviemood.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 