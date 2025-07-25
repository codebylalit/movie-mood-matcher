import React from "react";

const Terms: React.FC = () => (
  <div className="min-h-screen w-full flex flex-col">
    <div className="max-w-2xl mx-auto px-4 py-16 font-sans flex-1">
      <h1 className="text-3xl font-extrabold text-darkslate mb-6 font-sans">
        Terms and Conditions
      </h1>
      <div className="space-y-6 text-darkslate/90 text-base">
        <p>
          Welcome to <b>Shortify</b>! By accessing or using our service, you
          agree to be bound by these Terms and Conditions. Please read them
          carefully.
        </p>
        <div>
          <h2 className="font-bold text-lg mb-2">1. Use of Service</h2>
          <ul className="list-disc ml-6">
            <li>
              You must use the service in compliance with all applicable laws
              and regulations.
            </li>
            <li>
              You are responsible for any content you create, share, or shorten
              using Shortify.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">2. Prohibited Activities</h2>
          <ul className="list-disc ml-6">
            <li>No spamming, phishing, or distributing malicious content.</li>
            <li>No use of the service for unlawful or harmful purposes.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">3. Intellectual Property</h2>
          <p>
            All content, trademarks, and data on this site, including but not
            limited to software, databases, text, graphics, icons, and
            hyperlinks are the property of or licensed to Shortify.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">4. Disclaimer</h2>
          <p>
            The service is provided "as is" without warranties of any kind. We
            do not guarantee the accuracy, reliability, or availability of the
            service.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">5. Limitation of Liability</h2>
          <p>
            Shortify shall not be liable for any damages arising from the use or
            inability to use the service.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of the service constitutes acceptance of the new
            terms.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">7. Contact</h2>
          <p>
            If you have any questions about these Terms, please visit our{" "}
            <a href="/contact" className="text-mustard underline">
              Contact
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
