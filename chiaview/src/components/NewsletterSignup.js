/**
 * NewsletterSignup - Email newsletter subscription component
 * Features:
 * - Email validation
 * - Success/error states
 * - Integration with email service (placeholder)
 * - Accessible form design
 * - Privacy notice
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function NewsletterSignup({ className = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // TODO: Replace with actual newsletter API call
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success (90% success rate for demo)
      if (Math.random() > 0.1) {
        setStatus("success");
        setMessage("Thank you for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 text-white ${className}`}>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
        >
          <FaEnvelope className="w-8 h-8" />
        </motion.div>

        <h3 className="text-2xl font-bold mb-2">
          Stay Connected
        </h3>
        <p className="text-blue-100 mb-6 max-w-md mx-auto">
          Get the latest updates on our mission, upcoming events, and ways to get involved.
          Join our community of faith-driven changemakers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetStatus();
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={status === "loading"}
                aria-label="Email address"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
            >
              {status === "loading" ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </div>

          {/* Status Messages */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: status !== "idle" ? 1 : 0, y: status !== "idle" ? 0 : -10 }}
            className="mt-4 min-h-[24px] flex items-center justify-center"
          >
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-200">
                <FaCheck className="w-4 h-4" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-200">
                <FaExclamationTriangle className="w-4 h-4" />
                <span className="text-sm">{message}</span>
              </div>
            )}
          </motion.div>
        </form>

        <p className="text-xs text-blue-200 mt-4 max-w-sm mx-auto">
          We respect your privacy. Unsubscribe at any time.
          Your information is secure and will never be shared.
        </p>
      </div>
    </div>
  );
}