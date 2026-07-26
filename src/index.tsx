import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

const GA4_ID = process.env.REACT_APP_GA4_ID;

const GoogleAnalyticsBootstrap: React.FC = () => {
  React.useEffect(() => {
    if (!GA4_ID) {
      return;
    }

    const existingScript = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"]`,
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(script);
    }

    const analyticsWindow = window as Window & { dataLayer: unknown[] };
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];

    function gtag(...args: unknown[]) {
      analyticsWindow.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", GA4_ID, { anonymize_ip: true });
  }, []);

  return null;
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <GoogleAnalyticsBootstrap />
        <App />
        <Analytics />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
