import React from "react";
import { NavLink } from "react-router-dom";
import {
  LinkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Contact", to: "/contact" },
  { name: "About", to: "/about" },
//   { name: "Privacy", to: "/privacy" },
//   { name: "Terms", to: "/terms" },
];

const Navbar: React.FC = () => (
  <nav className="sticky top-4 z-30 flex justify-center w-full">
    <div className="w-full max-w-5xl flex items-center justify-between bg-white/90 border border-darkslate/20 shadow-lg rounded-full px-4 py-2 gap-2">
      {/* Logo and brand */}
      <div className="flex items-center gap-2 pl-2">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-mustard text-darkslate shadow border border-darkslate/10">
          <LinkIcon className="w-5 h-5" />
        </span>
        <span className="text-lg font-bold text-darkslate select-none">
          Shortify
        </span>
      </div>
      {/* Nav links */}
      <ul className="flex-1 flex justify-center gap-2 sm:gap-6 items-center">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold transition-colors duration-150 text-darkslate hover:bg-mustard/30 hover:text-darkslate/90 text-sm sm:text-base ${
                  isActive ? "bg-mustard text-darkslate shadow font-bold" : ""
                }`
              }
              end={link.to === "/"}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* CTA Button */}
      <NavLink
        to="/buy-me"
        className="ml-2 px-5 py-2 bg-white border-2 border-mustard text-darkslate font-bold rounded-full shadow hover:bg-mustard hover:text-white transition text-sm sm:text-base"
      >
        Buy Me a Coffee
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
