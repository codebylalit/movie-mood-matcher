import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full font-sans mt-auto py-6 px-4 border-t border-darkslate/10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-darkslate/90 text-base">
      {/* Left: Built with love */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>Built with</span>
        <HeartIcon className="w-5 h-5 text-mustard" aria-label="love" />
        <span>by Shortify Team</span>
      </div>

      {/* Center: Policy Links */}
      <div className="flex gap-6 text-darkslate/80 text-base">
        <Link to="/privacy" className="hover:text-mustard transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-mustard transition-colors">
          Terms of Service
        </Link>
        <Link to="/about" className="hover:text-mustard transition-colors">
          About Us
        </Link>
      </div>

      {/* Right: Copyright */}
      <div className="text-darkslate/60 text-sm whitespace-nowrap">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold text-darkslate">Shortify</span>. All rights
        reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
