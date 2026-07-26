import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shortify from "./pages/ShortUrl";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";
import BuyMeACoffee from "./pages/BuyMeACoffee";
import MyLinks from "./pages/MyLinks";
import TimeComponent from "./pages/Time";
import UrlShortener from "./pages/UrlShortener";
import FreeUrlShortener from "./pages/FreeUrlShortener";
import QrCodeGenerator from "./pages/QrCodeGenerator";
import BitlyAlternative from "./pages/BitlyAlternative";

const App: React.FC = () => (
  <Router>
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-vanilla via-mustard/15 to-vanilla text-darkslate transition-colors duration-300 dark:from-darkslate dark:via-darkslate/95 dark:to-darkslate dark:text-vanilla p-4 sm:p-8">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-mustard focus:px-4 focus:py-2 focus:text-darkslate focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Shortify />} />
          <Route path="/my-links" element={<MyLinks />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy-me" element={<BuyMeACoffee />} />
          <Route path="/time" element={<TimeComponent />} />
          <Route path="/url-shortener" element={<UrlShortener />} />
          <Route path="/free-url-shortener" element={<FreeUrlShortener />} />
          <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
          <Route path="/bitly-alternative" element={<BitlyAlternative />} />
          {/* Catch-all route for shortened URLs */}
          <Route path="/s/*" element={<Shortify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
