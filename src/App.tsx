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

const App: React.FC = () => (
  <Router>
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-vanilla via-mustard/15 to-vanilla text-darkslate transition-colors duration-300 dark:from-darkslate dark:via-darkslate/95 dark:to-darkslate dark:text-vanilla p-4 sm:p-8">
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
          {/* Catch-all route for shortened URLs */}
          <Route path="/s/*" element={<Shortify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
