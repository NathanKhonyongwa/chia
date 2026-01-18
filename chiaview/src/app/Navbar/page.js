"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [missionDropdownOpen, setMissionDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Centered Links - Desktop */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link
              href="/"
              className="relative px-3 py-2 hover:text-blue-300 transition-colors duration-200 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setMissionDropdownOpen(true)}
            onMouseLeave={() => setMissionDropdownOpen(false)}
          >
            <Link
              href="#mission"
              className="relative px-3 py-2 hover:text-blue-300 transition-colors duration-200 group"
            >
              Mission
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Dropdown Menu */}
            {missionDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
              >
                <Link
                  href="#mission-circle"
                  scroll={true}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  onClick={() => setMissionDropdownOpen(false)}
                >
                  Circle of Influence
                </Link>
                <Link
                  href="#mission-pillars"
                  scroll={true}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  onClick={() => setMissionDropdownOpen(false)}
                >
                  Goals
                </Link>
                <Link
                  href="#mission-impact"
                  scroll={true}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  onClick={() => setMissionDropdownOpen(false)}
                >
                  Progress
                </Link>
              </motion.div>
            )}
          </li>
          <li>
            <Link
              href="/About"
              className="relative px-3 py-2 hover:text-blue-300 transition-colors duration-200 group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/Register"
              className="relative px-3 py-2 hover:text-blue-300 transition-colors duration-200 group"
            >
              Register
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="relative px-3 py-2 hover:text-blue-300 transition-colors duration-200 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        {/* Logo on the right */}
        <div className="flex-shrink-0 ml-auto">
          <Link
            href="/"
            className="block transition-transform duration-300 hover:scale-105"
            aria-label="Go to home page"
          >
            <img
              src="/logo.png"
              alt="Chia View Church Mission Logo"
              className="h-20 w-auto drop-shadow-lg"
              width={80}
              height={80}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-2 transition-transform duration-200 hover:scale-110"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <span className="text-2xl font-bold" aria-hidden="true">
                ×
              </span>
            ) : (
              <span className="text-2xl font-bold" aria-hidden="true">
                ☰
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className={`md:hidden w-full px-6 py-4 flex flex-col space-y-4 text-white font-medium transition-all duration-300 ${
            scrolled ? "bg-blue-900/95 backdrop-blur-lg" : "bg-blue-900/90 backdrop-blur-md"
          }`}
          role="menu"
        >
          <Link
            href="/"
            className="hover:text-blue-300 transition-colors duration-200 py-2 border-b border-white/10 hover:border-blue-300/50"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <div className="space-y-2">
            <div className="font-semibold py-2 text-blue-300">Mission</div>
            <Link
              href="#mission-circle"
              className="block pl-4 py-2 hover:text-blue-300 transition-colors duration-200 border-b border-white/10 hover:border-blue-300/50"
              onClick={() => setMenuOpen(false)}
            >
              Circle of Influence
            </Link>
            <Link
              href="#mission-pillars"
              className="block pl-4 py-2 hover:text-blue-300 transition-colors duration-200 border-b border-white/10 hover:border-blue-300/50"
              onClick={() => setMenuOpen(false)}
            >
              Goals
            </Link>
            <Link
              href="#mission-impact"
              className="block pl-4 py-2 hover:text-blue-300 transition-colors duration-200 border-b border-white/10 hover:border-blue-300/50"
              onClick={() => setMenuOpen(false)}
            >
              Progress
            </Link>
          </div>

          <Link
            href="/About"
            className="hover:text-blue-300 transition-colors duration-200 py-2 border-b border-white/10 hover:border-blue-300/50"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            href="/Register"
            className="hover:text-blue-300 transition-colors duration-200 py-2 border-b border-white/10 hover:border-blue-300/50"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>

          <Link
            href="#contact"
            className="hover:text-blue-300 transition-colors duration-200 py-2 border-b border-white/10 hover:border-blue-300/50"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}