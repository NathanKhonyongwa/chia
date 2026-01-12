"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-blue-900/90 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Centered Links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link href="/" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="./Register" className="hover:text-blue-300 transition-colors">
              Register
            </Link>
          </li>
          <li>
            <Link href="./About/" className="hover:text-blue-300 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-blue-300 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Logo on the right */}
        <div className="flex-shrink-0 ml-auto">
          <Link href="#home">
            <img
              src="/logo.PNG" 
              alt="Chia View Logo"
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <span className="text-2xl font-bold">&times;</span> // simple X icon
            ) : (
              <span className="text-2xl font-bold">&#9776;</span> // hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900/95 backdrop-blur-md w-full px-6 py-4 flex flex-col space-y-4 text-white font-medium">
          <Link href="#home" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="#mission" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>
            Mission
          </Link>
          <Link href="#about" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="#contact" className="hover:text-blue-300 transition-colors" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
