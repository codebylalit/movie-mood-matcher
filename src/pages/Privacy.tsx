import React from "react";

const Privacy: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-16 font-sans">
    <h1 className="text-3xl font-extrabold text-darkslate mb-6 font-sans">
      Privacy Policy
    </h1>
    <div className="space-y-6 text-darkslate/90 text-base">
      <p>
        <b>Shortify</b> values your privacy. We do not track, sell, or share
        your personal data. All URLs you shorten are stored only in your browser
        and never sent to our servers.
      </p>
      <div>
        <h2 className="font-bold text-lg mb-2">What We Collect</h2>
        <ul className="list-disc ml-6">
          <li>
            Shortened URLs and click counts are stored locally in your browser.
          </li>
          <li>We do not collect or store any personal information.</li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Cookies & Local Storage</h2>
        <p>
          We use your browser's local storage to save your links and
          preferences. No data is sent to any server.
        </p>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Third-Party Services</h2>
        <p>We do not use third-party analytics or advertising services.</p>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Your Rights</h2>
        <p>
          You have full control over your data. You can clear your browser
          storage at any time to remove all your links and preferences.
        </p>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Contact</h2>
        <p>
          If you have questions about privacy, please visit our{" "}
          <a href="/contact" className="text-mustard underline">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;
