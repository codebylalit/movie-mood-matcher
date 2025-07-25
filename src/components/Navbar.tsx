import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LinkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Contact", to: "/contact" },
  { name: "About", to: "/about" },
  //   { name: "Privacy", to: "/privacy" },
  //   { name: "Terms", to: "/terms" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
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
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-mustard"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <XMarkIcon className="w-7 h-7 text-darkslate" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-darkslate" />
          )}
        </button>
        {/* Nav links - desktop */}
        <ul className="hidden sm:flex flex-1 justify-center gap-2 sm:gap-6 items-center">
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
        {/* CTA Button - desktop */}
        <NavLink
          to="/buy-me"
          className="hidden sm:inline-block ml-2 px-5 py-2 bg-white border-2 border-mustard text-darkslate font-bold rounded-full shadow hover:bg-mustard hover:text-white transition text-sm sm:text-base"
        >
          Buy Me a Coffee
        </NavLink>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex justify-end sm:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-3/4 max-w-xs bg-white h-full shadow-lg flex flex-col p-6 gap-4 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-mustard"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="w-7 h-7 text-darkslate" />
            </button>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-semibold transition-colors duration-150 text-darkslate hover:bg-mustard/30 hover:text-darkslate/90 text-base ${
                        isActive
                          ? "bg-mustard text-darkslate shadow font-bold"
                          : ""
                      }`
                    }
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              to="/buy-me"
              className="mt-4 px-5 py-2 bg-white border-2 border-mustard text-darkslate font-bold rounded-full shadow hover:bg-mustard hover:text-white transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Buy Me a Coffee
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
