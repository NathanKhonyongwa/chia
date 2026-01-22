/**
 * PrayerRequestForm - Prayer request submission form
 * Features:
 * - Anonymous submission option
 * - Form validation
 * - Success/error states
 * - Privacy-focused design
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPrayingHands, FaCheck, FaExclamationTriangle, FaUser, FaEnvelope } from "react-icons/fa";

export default function PrayerRequestForm({ className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    request: "",
    isAnonymous: false,
    shareWithCommunity: false
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.request.trim()) {
      setMessage("Please share your prayer request");
      return false;
    }
    if (!formData.isAnonymous && !formData.name.trim()) {
      setMessage("Please provide your name or choose anonymous submission");
      return false;
    }
    if (!formData.isAnonymous && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // TODO: Replace with actual prayer request API
      // const response = await fetch('/api/prayer-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Math.random() > 0.1) {
        setStatus("success");
        setMessage("Thank you for sharing your prayer request. We will pray for you and keep your request confidential.");
        setFormData({
          name: "",
          email: "",
          request: "",
          isAnonymous: false,
          shareWithCommunity: false
        });
      } else {
        throw new Error("Submission failed");
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
    <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4"
          >
            <FaPrayingHands className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Share Your Prayer Request
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We believe in the power of prayer. Share your needs with us, and our community will lift you up in prayer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonymous Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isAnonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Submit anonymously
            </label>
          </div>

          {/* Name Field */}
          {!formData.isAnonymous && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    handleInputChange(e);
                    resetStatus();
                  }}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  aria-label="Your name"
                />
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          {!formData.isAnonymous && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    resetStatus();
                  }}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  aria-label="Email address"
                />
              </div>
            </motion.div>
          )}

          {/* Prayer Request */}
          <div>
            <label htmlFor="request" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Prayer Request
            </label>
            <textarea
              id="request"
              name="request"
              value={formData.request}
              onChange={(e) => {
                handleInputChange(e);
                resetStatus();
              }}
              placeholder="Please share what's on your heart. Be as specific or general as you'd like..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 resize-vertical"
              aria-label="Prayer request"
            />
          </div>

          {/* Community Sharing Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="shareWithCommunity"
              name="shareWithCommunity"
              checked={formData.shareWithCommunity}
              onChange={handleInputChange}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="shareWithCommunity" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Allow this request to be shared with our prayer community (anonymously)
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
          >
            {status === "loading" ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Prayer Request"
            )}
          </motion.button>

          {/* Status Messages */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: status !== "idle" ? 1 : 0, y: status !== "idle" ? 0 : -10 }}
            className="min-h-[24px] flex items-center justify-center"
          >
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <FaCheck className="w-4 h-4" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <FaExclamationTriangle className="w-4 h-4" />
                <span className="text-sm">{message}</span>
              </div>
            )}
          </motion.div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your prayer requests are kept confidential and handled with care.
            We respect your privacy and will never share your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}