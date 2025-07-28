import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LinkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "My Links", to: "/my-links" },
  { name: "Contact", to: "/contact" },
  { name: "About", to: "/about" },
  //   { name: "Privacy", to: "/privacy" },
  //   { name: "Terms", to: "/terms" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-4 z-30 flex justify-center w-full">
      <div className="w-full max-w-5xl flex items-center justify-between bg-white/90 dark:bg-darkslate/90 border border-darkslate/20 dark:border-vanilla/20 shadow-lg rounded-full px-4 py-2 gap-2 transition-colors duration-300">
        {/* Logo and brand */}
        <NavLink to="/">
          <div className="flex items-center gap-1.5 pl-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-mustard text-darkslate shadow border border-darkslate/10 dark:border-vanilla/10">
              <LinkIcon className="w-5 h-5" />
            </span>
            <span className="text-responsive-lg font-bold text-darkslate dark:text-vanilla select-none">
              Shortify
            </span>
          </div>
        </NavLink>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-mustard dark:focus:ring-vanilla transition-colors duration-200 hover:bg-mustard/20 dark:hover:bg-vanilla/20"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <SunIcon className="w-5 h-5 text-vanilla" />
          ) : (
            <MoonIcon className="w-5 h-5 text-darkslate" />
          )}
        </button>

        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-mustard dark:focus:ring-vanilla"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <XMarkIcon className="w-7 h-7 text-darkslate dark:text-vanilla" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-darkslate dark:text-vanilla" />
          )}
        </button>

        {/* Nav links - desktop */}
        <ul className="hidden sm:flex flex-1 justify-center gap-2 sm:gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-semibold transition-colors duration-150 text-darkslate dark:text-vanilla hover:bg-mustard/30 dark:hover:bg-vanilla/30 hover:text-darkslate/90 dark:hover:text-vanilla/90 text-responsive-sm ${
                    isActive
                      ? "bg-mustard dark:bg-mustard/30 text-darkslate dark:text-vanilla shadow font-bold"
                      : ""
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
          className="hidden sm:inline-block ml-2 px-5 py-2 bg-white dark:bg-darkslate border-2 border-mustard dark:border-vanilla text-darkslate dark:text-vanilla font-bold rounded-full shadow hover:bg-mustard dark:hover:bg-vanilla hover:text-white dark:hover:text-darkslate transition text-responsive-sm"
        >
          Coffee Time!
        </NavLink>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex justify-end sm:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-3/4 max-w-xs bg-white dark:bg-darkslate h-full shadow-lg flex flex-col p-6 gap-4 animate-slide-in transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-mustard dark:focus:ring-vanilla"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="w-7 h-7 text-darkslate dark:text-vanilla" />
            </button>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-semibold transition-colors duration-150 text-darkslate dark:text-vanilla hover:bg-mustard/30 dark:hover:bg-vanilla/30 hover:text-darkslate/90 dark:hover:text-vanilla/90 text-responsive-base ${
                        isActive
                          ? "bg-mustard dark:bg-vanilla text-darkslate dark:text-vanilla shadow font-bold"
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
              className="mt-4 px-5 py-2 bg-white dark:bg-darkslate border-2 border-mustard dark:border-vanilla text-darkslate dark:text-vanilla font-bold rounded-full shadow hover:bg-mustard dark:hover:bg-vanilla hover:text-white dark:hover:text-darkslate transition text-responsive-base"
              onClick={() => setMenuOpen(false)}
            >
              Coffee Time!
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
