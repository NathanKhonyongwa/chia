/**
 * 404 Not Found Page
 * Displayed when user navigates to a non-existent route
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100 relative overflow-hidden flex items-center justify-center px-4" role="main" aria-label="404 Page Not Found">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-9xl md:text-[150px] font-black bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 mb-8"
        >
          The page you're looking for doesn't exist or has been moved. But don't worry, we're here to help!
        </motion.p>

        {/* Helpful Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/50"
        >
          <p className="text-gray-700 mb-4">
            Here are some helpful resources:
          </p>
          <ul className="text-left space-y-2 text-gray-600">
            <li>• Check the URL for typos</li>
            <li>• Try navigating from the home page</li>
            <li>• Use the navigation menu to explore</li>
            <li>• Contact us if you need assistance</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Go to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/#mission"
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 border-2 border-blue-600"
            >
              Learn About Our Mission
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-gray-600"
        >
          Need help? {" "}
          <Link
            href="/#contact"
            className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
          >
            Contact us
          </Link>
        </motion.p>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 text-6xl opacity-20"
      >
        🔍
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-20 text-6xl opacity-20"
      >
        📍
      </motion.div>
    </div>
  );
}
