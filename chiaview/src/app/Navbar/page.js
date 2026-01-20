/**
 * Navbar - Main navigation component with optimized performance
 * Features:
 * - Fast responsive design (desktop & mobile)
 * - Scroll-based styling with throttling
 * - Quick navigation links
 * - Mobile menu toggle
 * - Admin portal link for authenticated users
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Optimized for speed with useCallback and memoization
 */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { admin } = useAuth();

  // Memoize nav links to avoid recreating on every render
  const navLinks = useMemo(() => {
    const links = [
      { href: "/", label: "Home" },
      { href: "/Mission", label: "Mission" },
      { href: "/About", label: "About Us" },
      { href: "/Blog", label: "Blog" },
      { href: "/Volunteer", label: "Volunteer" },
      { href: "/Donations", label: "Give" },
      { href: "/Register", label: "Register" },
      { href: "#contact", label: "Contact" }
    ];
    
    // Add admin login link if user is not authenticated
    if (!admin) {
      links.splice(links.length - 1, 0, { href: "/Admin/Login", label: "🔐 Admin", isAdmin: true });
    } else {
      // Add admin portal link if user is authenticated
      links.splice(links.length - 1, 0, { href: "/Admin", label: "🔐 Admin Portal", isAdmin: true });
    }
    
    return links;
  }, [admin]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  }, []);

  useEffect(() => {
    // Add passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-3 py-2 transition-colors duration-200 group ${
                  link.isAdmin 
                    ? "text-yellow-300 hover:text-yellow-200 font-bold" 
                    : "hover:text-blue-300"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  link.isAdmin ? "bg-yellow-300" : "bg-blue-300"
                }`}></span>
              </Link>
            </li>
          ))}
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 py-2 border-b border-white/10 hover:border-blue-300/50 ${
                link.isAdmin 
                  ? "text-yellow-300 hover:text-yellow-200 font-bold" 
                  : "hover:text-blue-300"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}