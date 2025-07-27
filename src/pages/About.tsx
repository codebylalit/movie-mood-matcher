import React from "react";

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-responsive-2xl font-bold text-darkslate mb-6">About Us</h1>
    <div className="space-y-6 text-darkslate/90 text-responsive-base">
      <p>
        Welcome to <b>Shortify</b>! Our mission is to make sharing and
        discovering content easier, faster, and more delightful. Whether you're
        shortening links or exploring new ideas, we're here to help you connect
        and create.
      </p>
      <div>
        <h2 className="font-bold text-responsive-lg mb-2">Our Mission</h2>
        <p>
          We believe in the power of simplicity and accessibility. Shortify is
          designed to provide a seamless, privacy-focused experience for
          everyone—from casual users to professionals.
        </p>
      </div>
      <div>
        <h2 className="font-bold text-responsive-lg mb-2">Our Team</h2>
        <p>
          Shortify was built by a passionate team of creators and developers who
          value transparency, user privacy, and innovation. We are committed to
          continuous improvement and listening to our users.
        </p>
      </div>
      <div>
        <h2 className="font-bold text-responsive-lg mb-2">Our Values</h2>
        <ul className="list-disc ml-6">
          <li>Privacy-first: Your data stays with you.</li>
          <li>Speed and simplicity: Shorten and share links in seconds.</li>
          <li>Accessibility: Easy to use for everyone.</li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Contact Us</h2>
        <p>
          Thank you for being part of our journey. If you have feedback or want
          to get in touch, please visit our{" "}
          <a href="/contact" className="text-mustard hover:underline">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  </div>
);

export default About;
