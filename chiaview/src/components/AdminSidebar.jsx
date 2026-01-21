/**
 * AdminSidebar - Side navigation for admin pages
 * Features:
 * - Collapsible menu
 * - Active page highlighting
 * - Quick access to all admin sections
 * - Mobile responsive
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaStar,
  FaHandsHelping,
  FaHome,
  FaCog,
  FaBars,
  FaTimes,
  FaDashboard,
} from "react-icons/fa";

/**
 * Navigation items configuration
 */
const navItems = [
  {
    label: "Dashboard",
    href: "/Admin",
    icon: FaDashboard,
  },
  {
    label: "Blog",
    href: "/Admin/Blog",
    icon: FaFileAlt,
  },
  {
    label: "Testimonials",
    href: "/Admin/Testimonials",
    icon: FaStar,
  },
  {
    label: "Opportunities",
    href: "/Admin/Opportunities",
    icon: FaHandsHelping,
  },
  {
    label: "Homepage",
    href: "/Admin/Homepage",
    icon: FaHome,
  },
  {
    label: "Settings",
    href: "/Admin/Settings",
    icon: FaCog,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition"
        aria-label="Toggle navigation menu"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </motion.div>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl z-40 md:z-30 md:relative md:translate-x-0 md:translate-y-0 md:animate-none pt-24 md:pt-0"
      >
        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Help Section */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-blue-900/50 rounded-lg border border-blue-700">
          <p className="text-sm text-gray-300 mb-2">Need help?</p>
          <Link
            href="/contact"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
          >
            Contact Support →
          </Link>
        </div>
      </motion.aside>

      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl z-30 flex-col pt-24">
        <nav className="p-6 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Help Section */}
        <div className="p-6 border-t border-gray-700">
          <div className="p-4 bg-blue-900/50 rounded-lg border border-blue-700">
            <p className="text-sm text-gray-300 mb-2">Need help?</p>
            <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
