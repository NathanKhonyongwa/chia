"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import AdminQuickLinks from "@/components/AdminQuickLinks";
import AdminStats from "@/components/AdminStats";

// Demo data for quick display
const demoStats = [
  { label: "Blog Posts", value: "12", link: "/Admin/Blog" },
  { label: "Testimonials", value: "8", link: "/Admin/Testimonials" },
  { label: "Volunteer Opportunities", value: "6", link: "/Admin/Opportunities" },
  { label: "Site Visitors", value: "3,200", link: null },
];

const adminSections = [
  {
    id: "blog",
    title: "Blog Management",
    description: "Create, edit, and delete blog posts",
    icon: "📝",
    color: "from-blue-500 to-blue-600",
    link: "/Admin/Blog",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Manage donor and volunteer testimonials",
    icon: "⭐",
    color: "from-purple-500 to-purple-600",
    link: "/Admin/Testimonials",
  },
  {
    id: "opportunities",
    title: "Volunteer Opportunities",
    description: "Manage volunteer positions and roles",
    icon: "🤝",
    color: "from-green-500 to-green-600",
    link: "/Admin/Opportunities",
  },
  {
    id: "homepage",
    title: "Home Page Content",
    description: "Edit hero sections and core values",
    icon: "🏠",
    color: "from-yellow-500 to-yellow-600",
    link: "/Admin/Homepage",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Website settings and configuration",
    icon: "⚙️",
    color: "from-gray-500 to-gray-600",
    link: "/Admin/Settings",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const { showToast } = useToast() || {};
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    if (!admin) {
      router.push("/Register");
      if (showToast) {
        showToast("Please log in first", "error");
      }
    }
  }, [admin, router, showToast]);

  const handleLogout = () => {
    logout();
    if (showToast) {
      showToast("Logged out successfully", "success");
    }
    router.push("/");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 aria-label="Admin Dashboard" className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-blue-200">Welcome, {admin?.name || "Admin"}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <>
          {/* Statistics Overview */}
          <AdminStats />

          {/* Dashboard Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Management Sections</h2>
            <p className="text-gray-400 mb-8">Click on a section below to manage your website content</p>

            <AdminQuickLinks />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Quick Links</h2>
            <div className="grid gap-6 md:grid-cols-4">
              {demoStats.map((stat, index) => (
                <motion.a
                  key={index}
                  href={stat.link}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 ${stat.link ? 'cursor-pointer hover:shadow-lg transition' : ''}`}
                >
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  {stat.link && <p className="text-blue-300 text-sm mt-3">Manage →</p>}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </>
      </div>
    </section>
  );
}
