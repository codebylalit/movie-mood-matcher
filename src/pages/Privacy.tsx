import React from "react";
import SeoHead from "../components/SeoHead";
import { createBreadcrumbSchema } from "../seo/seo";

const Privacy: React.FC = () => (
  <main
    id="main-content"
    className="max-w-2xl mx-auto px-4 py-16 font-sans text-darkslate dark:text-vanilla"
  >
    <SeoHead
      title="Privacy Policy | Shortify"
      description="Read Shortify's privacy policy for the free URL shortener and QR code generator."
      keywords={[
        "Privacy Policy",
        "Free URL Shortener",
        "QR Code Generator",
        "Shortify",
      ]}
      path="/privacy"
      schema={[
        createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]),
      ]}
    />
    <h1 className="text-3xl font-extrabold text-darkslate dark:text-vanilla mb-6 font-sans">
      Privacy Policy
    </h1>
    <div className="space-y-6 text-darkslate/90 dark:text-vanilla/90 text-base">
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
  </main>
);

export default Privacy;
