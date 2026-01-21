/**
 * AdminLayout - Wrapper component for admin pages
 * Features:
 * - Consistent header with back button
 * - Breadcrumb navigation
 * - Quick action buttons
 * - Logout functionality
 * - Responsive design
 */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { FaHome, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

export default function AdminLayout({
  title,
  description,
  breadcrumbs = [],
  children,
  showBackButton = true,
}) {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const { showToast } = useToast() || {};

  const handleLogout = () => {
    logout();
    if (showToast) {
      showToast("Logged out successfully", "success");
    }
    router.push("/");
  };

  const handleBackToDashboard = () => {
    router.push("/Admin");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Admin Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Section - Admin Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-blue-200">Admin Portal</p>
              <p className="font-semibold text-white">{admin?.name || "Administrator"}</p>
            </div>
          </div>

          {/* Right Section - Quick Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToDashboard}
              className="p-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm"
              title="Go to Dashboard"
            >
              <FaHome className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>

            <div className="w-px h-6 bg-blue-700"></div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 text-sm"
              title="Logout"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-2 text-sm text-gray-400"
              aria-label="Breadcrumb"
            >
              <Link href="/Admin" className="hover:text-blue-400 transition">
                Admin
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                  <span className="mx-2">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-blue-400 transition"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-300">{crumb.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-start justify-between"
          >
            <div>
              {showBackButton && (
                <button
                  onClick={handleBackToDashboard}
                  className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2 transition"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
              )}
              <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
              {description && (
                <p className="text-gray-400">{description}</p>
              )}
            </div>
          </motion.div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </section>
  );
}
