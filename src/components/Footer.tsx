import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full font-sans mt-auto pt-5 -mb-4 pb-1 px-4 border-t border-darkslate/10 dark:border-vanilla/10 transition-colors duration-300">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-darkslate/90 dark:text-vanilla/90 text-responsive-base">
      {/* Left: Built with love */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>Built with</span>
        <HeartIcon
          className="w-5 h-5 text-mustard dark:text-vanilla"
          aria-label="love"
        />
        <span>by Shortify Team</span>
      </div>

      {/* Center: Policy Links */}
      <div className="flex gap-6 text-darkslate/80 dark:text-vanilla/80 text-responsive-base">
        <Link
          to="/privacy"
          className="hover:text-mustard dark:hover:text-vanilla transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms"
          className="hover:text-mustard dark:hover:text-vanilla transition-colors"
        >
          Terms of Service
        </Link>
        <Link
          to="/about"
          className="hover:text-mustard dark:hover:text-vanilla transition-colors"
        >
          About Us
        </Link>
      </div>

      {/* Right: Copyright */}
      <div className="text-darkslate/60 dark:text-vanilla/60 text-responsive-sm whitespace-nowrap">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold text-darkslate dark:text-vanilla">
          Shortify
        </span>
        . All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
