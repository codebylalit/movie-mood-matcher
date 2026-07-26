import React from "react";
import SeoLandingPage from "../components/SeoLandingPage";

const BitlyAlternative: React.FC = () => (
  <SeoLandingPage
    path="/bitly-alternative"
    title="Bitly Alternative | Shortify"
    description="Shortify is a clean Bitly alternative with free URL shortening, QR code generation, and custom short URL support."
    keywords={[
      "Bitly Alternative",
      "Free URL Shortener",
      "URL Shortener",
      "QR Code Generator",
      "Custom Short URL",
    ]}
    heading="A simple Bitly alternative with more control"
    intro={[
      "Shortify is a practical Bitly alternative for people who want a simple URL shortener without extra complexity.",
      "It combines short links, QR codes, and browser-based storage so you can move fast and keep your workflow tidy.",
    ]}
    highlights={[
      {
        title: "Straightforward experience",
        text: "Focus on shortening links instead of learning a heavier platform.",
      },
      {
        title: "Custom short URLs",
        text: "Create custom short URLs that are easy to share across channels.",
      },
      {
        title: "Built-in QR support",
        text: "Use QR codes to extend the reach of your same shortened link.",
      },
    ]}
    steps={[
      {
        title: "Enter your link",
        text: "Paste a long URL into the main Shortify tool.",
      },
      {
        title: "Generate a short URL",
        text: "Create a clean link that works as a fast Bitly alternative.",
      },
      {
        title: "Reuse and share",
        text: "Keep the short link handy for campaigns, presentations, and social posts.",
      },
    ]}
    faqs={[
      {
        question: "Why choose Shortify over Bitly?",
        answer:
          "Shortify keeps the experience lightweight, free, and easy to use while still giving you short links and QR codes.",
      },
      {
        question: "Is this good for custom short URLs?",
        answer:
          "Yes. Shortify is built for concise, memorable short links that are easy to share.",
      },
      {
        question: "Can I use it as a general link shortener?",
        answer:
          "Yes. It works as a general URL shortener, a QR code generator, and a Bitly alternative in one app.",
      },
    ]}
    relatedLinks={[
      {
        label: "URL Shortener",
        to: "/url-shortener",
        description: "See the core shortener feature in detail.",
      },
      {
        label: "Free URL Shortener",
        to: "/free-url-shortener",
        description: "Use Shortify for no-cost link shortening.",
      },
      {
        label: "QR Code Generator",
        to: "/qr-code-generator",
        description: "Combine short links with QR codes.",
      },
      {
        label: "Open the tool",
        to: "/",
        description: "Go back to the main shortening interface.",
      },
    ]}
    breadcrumbItems={[
      { name: "Home", path: "/" },
      { name: "Bitly Alternative", path: "/bitly-alternative" },
    ]}
  />
);

export default BitlyAlternative;
