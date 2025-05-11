import React from 'react';
import AdSense from '../components/AdSense';

const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

      <div className="bg-gray-800 rounded-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using MovieMood, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>
        </section>

        <AdSense
          slot="3579124680"
          format="auto"
          className="my-8"
        />

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
          <p className="text-gray-300 leading-relaxed">
            MovieMood provides a movie recommendation service based on user moods and preferences.
            We utilize The Movie Database (TMDB) API to provide movie information and recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            You agree to use MovieMood only for lawful purposes and in a way that does not infringe
            the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Do not attempt to gain unauthorized access to our services</li>
            <li>Do not use our service for any unlawful purposes</li>
            <li>Do not transmit any harmful code or malware</li>
            <li>Do not attempt to modify, adapt, or hack the service</li>
          </ul>
        </section>

        <AdSense
          slot="4680235791"
          format="auto"
          className="my-8"
        />

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Privacy Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            Your use of MovieMood is also governed by our Privacy Policy. Please review our Privacy
            Policy, which also governs the site and informs users of our data collection practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
          <p className="text-gray-300 leading-relaxed">
            MovieMood is provided "as is" without any representations or warranties, express or implied.
            We make no representations or warranties in relation to this website or the information and
            materials provided on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify these terms at any time. We do so by posting and drawing
            attention to the updated terms on the site. Your decision to continue to visit and make
            use of the site after such changes have been made constitutes your formal acceptance of
            the new Terms of Service.
          </p>
        </section>

        <AdSense
          slot="5791346802"
          format="auto"
          className="my-8"
        />

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about these Terms, please contact us at support@moviemood.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 