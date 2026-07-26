import React from "react";
import SeoLandingPage from "../components/SeoLandingPage";

const QrCodeGenerator: React.FC = () => (
  <SeoLandingPage
    path="/qr-code-generator"
    title="QR Code Generator | Shortify"
    description="Generate QR codes from short links with Shortify, a simple QR code generator and URL shortener combined in one app."
    keywords={[
      "QR Code Generator",
      "Free URL Shortener",
      "Link Shortener",
      "Custom Short URL",
      "Bitly Alternative",
    ]}
    heading="QR Code Generator for every short link"
    intro={[
      "Shortify doubles as a QR code generator so you can share a link in a format that works on posters, flyers, packaging, and mobile screens.",
      "Instead of juggling separate tools, you can create a short link once and use it as both a clickable URL and a scannable QR code.",
    ]}
    highlights={[
      {
        title: "One link, two formats",
        text: "Every shortened link can be shared as a URL or scanned as a QR code.",
      },
      {
        title: "Fast visual sharing",
        text: "Great for print campaigns, events, menus, and product labels.",
      },
      {
        title: "Clean branded output",
        text: "Keep your QR workflow tied to short links that are easy to explain.",
      },
    ]}
    steps={[
      {
        title: "Shorten a URL",
        text: "Create the short link you want to distribute.",
      },
      {
        title: "Display the QR code",
        text: "Use the generated QR code for scanning on phones and printed material.",
      },
      {
        title: "Share anywhere",
        text: "Combine short links and QR codes in the same campaign for broader reach.",
      },
    ]}
    faqs={[
      {
        question: "Does Shortify generate QR codes automatically?",
        answer:
          "Yes. The main tool generates a QR code for each shortened URL so you can share both formats.",
      },
      {
        question: "Is this only for web links?",
        answer:
          "The generator is designed for URLs, but you can use any valid web destination you want to share.",
      },
      {
        question: "Can I download the QR code?",
        answer:
          "Yes. Shortify includes QR download actions in the main interface so you can save it for later use.",
      },
    ]}
    relatedLinks={[
      {
        label: "URL Shortener",
        to: "/url-shortener",
        description: "Shorten a link before generating its QR code.",
      },
      {
        label: "Free URL Shortener",
        to: "/free-url-shortener",
        description: "Use the free shortening flow as your starting point.",
      },
      {
        label: "Bitly Alternative",
        to: "/bitly-alternative",
        description: "Pair QR generation with a Bitly alternative workflow.",
      },
      {
        label: "Open the tool",
        to: "/",
        description: "Go back to the main Shortify interface.",
      },
    ]}
    breadcrumbItems={[
      { name: "Home", path: "/" },
      { name: "QR Code Generator", path: "/qr-code-generator" },
    ]}
  />
);

export default QrCodeGenerator;
