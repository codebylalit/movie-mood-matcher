import React from "react";
import SeoLandingPage from "../components/SeoLandingPage";

const UrlShortener: React.FC = () => (
  <SeoLandingPage
    path="/url-shortener"
    title="URL Shortener | Shortify"
    description="Use Shortify as a clean URL shortener for custom short URLs, fast sharing, and QR code generation."
    keywords={[
      "URL Shortener",
      "Free URL Shortener",
      "Custom Short URL",
      "Link Shortener",
      "QR Code Generator",
    ]}
    heading="URL Shortener for clean, shareable links"
    intro={[
      "Shortify turns long, messy URLs into short links that are easier to read, copy, and share across every channel.",
      "It keeps the workflow simple: paste a link, generate a custom short URL, and share a QR code when you need offline access.",
    ]}
    highlights={[
      {
        title: "Simple link shortening",
        text: "Create short links in seconds without changing the way you work.",
      },
      {
        title: "Custom short URLs",
        text: "Keep your links branded, tidy, and easy for audiences to trust.",
      },
      {
        title: "Share everywhere",
        text: "Use QR codes and short links together for print, mobile, and social sharing.",
      },
    ]}
    steps={[
      {
        title: "Paste your long link",
        text: "Drop in the destination you want to shorten and keep the original URL safe in your browser.",
      },
      {
        title: "Generate the short URL",
        text: "Shortify creates a concise link that is easier to send in messages, bios, and documents.",
      },
      {
        title: "Track and reuse",
        text: "Reuse the same short link and revisit your saved links any time you need them again.",
      },
    ]}
    faqs={[
      {
        question: "What makes Shortify a good URL shortener?",
        answer:
          "It keeps the flow fast and lightweight while still giving you clean short links, local storage, and QR code support.",
      },
      {
        question: "Can I create a custom short URL?",
        answer:
          "Yes. Shortify is built for custom short URL creation that is easy to share and easy to remember.",
      },
      {
        question: "Does it work on mobile?",
        answer:
          "Yes. The interface is responsive, so the URL shortener works well on small and large screens.",
      },
    ]}
    relatedLinks={[
      {
        label: "Free URL Shortener",
        to: "/free-url-shortener",
        description: "A keyword-focused overview of the free shortening tool.",
      },
      {
        label: "QR Code Generator",
        to: "/qr-code-generator",
        description:
          "Generate scannable QR codes for the same shortened links.",
      },
      {
        label: "Bitly Alternative",
        to: "/bitly-alternative",
        description: "See why Shortify works as a simple Bitly alternative.",
      },
      {
        label: "Open the tool",
        to: "/",
        description: "Go directly to the main shortening interface.",
      },
    ]}
    breadcrumbItems={[
      { name: "Home", path: "/" },
      { name: "URL Shortener", path: "/url-shortener" },
    ]}
  />
);

export default UrlShortener;
