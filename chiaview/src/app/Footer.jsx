/**
 * Footer - Application footer component
 * Features:
 * - Multiple column layout (Links, Contact, Newsletter, Social)
 * - Newsletter email subscription
 * - Social media links
 * - Quick navigation links
 * - Contact information
 * - Copyright and legal links
 * - Responsive design (mobile-friendly)
 * - Accessibility features
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

/**
 * Newsletter subscription handler
 * @param {string} email - Email address to subscribe
 * @returns {Promise} - API response
 */
const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Subscription failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle, loading, success, error
  const [newsletterMessage, setNewsletterMessage] = useState("");

  /**
   * Handle newsletter subscription
   */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage("Please enter a valid email address");
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("loading");

    try {
      await subscribeToNewsletter(email);
      setNewsletterMessage("Thank you for subscribing!");
      setNewsletterStatus("success");
      setEmail("");
      
      // Reset message after 3 seconds
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 3000);
    } catch (error) {
      setNewsletterMessage(error.message || "Failed to subscribe. Please try again.");
      setNewsletterStatus("error");
    }
  };

  /**
   * Quick navigation links
   */
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Mission", href: "/#mission" },
    { label: "About Us", href: "/About" },
    { label: "Contact", href: "/#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  /**
   * Contact information
   */
  const contactInfo = [
    { icon: FaMapMarkerAlt, label: "Dowa District, Malawi", href: "#" },
    { icon: FaPhone, label: "+265 1 234 5678", href: "tel:+2651234567" },
    { icon: FaEnvelope, label: "info@chiamissionview.org", href: "mailto:info@chiamissionview.org" },
  ];

  /**
   * Social media links
   */
  const socialLinks = [
    { icon: FaFacebook, label: "Facebook", href: "https://facebook.com/chiamissionview", ariaLabel: "Follow us on Facebook" },
    { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/chiamissionview", ariaLabel: "Follow us on Twitter" },
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/chiamissionview", ariaLabel: "Follow us on Instagram" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/company/chiamissionview", ariaLabel: "Connect with us on LinkedIn" },
  ];

  return (
    <footer className="bg-blue-900 text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Chia View</h3>
            <p className="text-blue-100 leading-relaxed">
              Spreading hope and God's love through faith-driven initiatives and compassionate outreach across Malawi.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-white" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-start gap-3 group"
                  >
                    <info.icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400 group-hover:text-white" />
                    <span>{info.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-blue-100 text-sm">
              Subscribe to our newsletter for mission updates and events.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={newsletterStatus === "loading"}
                  className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  aria-label="Email address for newsletter subscription"
                />
              </div>
              <motion.button
                type="submit"
                disabled={newsletterStatus === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </motion.button>
              {newsletterMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${
                    newsletterStatus === "success" ? "text-green-300" : "text-red-300"
                  }`}
                  role="status"
                >
                  {newsletterMessage}
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800"></div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Copyright */}
          <p className="text-blue-200 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Chia View Church Mission. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex justify-center md:justify-end gap-6">
            <Link
              href="/privacy"
              className="text-blue-200 hover:text-white text-sm transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <span className="text-blue-700">|</span>
            <Link
              href="/terms"
              className="text-blue-200 hover:text-white text-sm transition-colors"
              aria-label="Terms of Service"
            >
              Terms of Service
            </Link>
            <span className="text-blue-700">|</span>
            <Link
              href="/sitemap"
              className="text-blue-200 hover:text-white text-sm transition-colors"
              aria-label="Sitemap"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
