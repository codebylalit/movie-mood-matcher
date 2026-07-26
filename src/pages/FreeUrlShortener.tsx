import React from "react";
import SeoLandingPage from "../components/SeoLandingPage";

const FreeUrlShortener: React.FC = () => (
  <SeoLandingPage
    path="/free-url-shortener"
    title="Free URL Shortener | Shortify"
    description="Try a free URL shortener with custom short URLs, QR code creation, and a simple Bitly alternative workflow."
    keywords={[
      "Free URL Shortener",
      "URL Shortener",
      "Link Shortener",
      "Custom Short URL",
      "Bitly Alternative",
    ]}
    heading="Free URL Shortener built for fast sharing"
    intro={[
      "If you want a free URL shortener that does the basics well, Shortify gives you a quick way to shorten links without unnecessary clutter.",
      "It is a practical option for creators, marketers, and anyone who wants a Bitly alternative with QR code support built in.",
    ]}
    highlights={[
      {
        title: "Free to use",
        text: "Shortify keeps the process simple and accessible for everyday link shortening.",
      },
      {
        title: "Privacy-friendly",
        text: "Your links and local preferences stay in the browser for a lightweight experience.",
      },
      {
        title: "QR-ready",
        text: "Every short link can also become a QR code for offline campaigns and print materials.",
      },
    ]}
    steps={[
      {
        title: "Paste the URL",
        text: "Enter the long destination you want to shorten.",
      },
      {
        title: "Shorten for free",
        text: "Generate a clean short URL in just a few seconds.",
      },
      {
        title: "Share with confidence",
        text: "Copy the link, scan the QR code, or revisit it later from your saved history.",
      },
    ]}
    faqs={[
      {
        question: "Is Shortify really free?",
        answer:
          "Yes. The main shortener flow is free to use and stays lightweight in the browser.",
      },
      {
        question: "Why use a free URL shortener instead of a long link?",
        answer:
          "Short links are easier to read, share, and track across social, email, and offline channels.",
      },
      {
        question: "Can I keep my links organized?",
        answer:
          "Yes. Shortify stores your recent links locally so you can revisit them when needed.",
      },
    ]}
    relatedLinks={[
      {
        label: "URL Shortener",
        to: "/url-shortener",
        description: "See the core shortener feature in detail.",
      },
      {
        label: "QR Code Generator",
        to: "/qr-code-generator",
        description: "Create QR codes from the same short links.",
      },
      {
        label: "Bitly Alternative",
        to: "/bitly-alternative",
        description: "See how Shortify compares as a Bitly alternative.",
      },
      {
        label: "Go to home",
        to: "/",
        description: "Open the main Shortify tool and start shortening.",
      },
    ]}
    breadcrumbItems={[
      { name: "Home", path: "/" },
      { name: "Free URL Shortener", path: "/free-url-shortener" },
    ]}
  />
);

export default FreeUrlShortener;
