/**
 * AdminStats - Dashboard statistics and overview cards
 * Features:
 * - Key metrics display
 * - Real-time data from localStorage
 * - Animated counters
 * - Status indicators
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaStar, FaHandsHelping, FaUsers } from "react-icons/fa";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalTestimonials: 0,
    totalOpportunities: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Load data from localStorage
    const blogs = JSON.parse(localStorage.getItem("chiaview_blog_posts") || "[]");
    const testimonials = JSON.parse(
      localStorage.getItem("chiaview_testimonials") || "[]"
    );
    const opportunities = JSON.parse(
      localStorage.getItem("chiaview_opportunities") || "[]"
    );

    setStats({
      totalBlogs: blogs.length,
      totalTestimonials: testimonials.length,
      totalOpportunities: opportunities.length,
      totalUsers: 1, // Admin user
    });
  }, []);

  const statCards = [
    {
      id: 1,
      label: "Blog Posts",
      value: stats.totalBlogs,
      icon: FaFileAlt,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Testimonials",
      value: stats.totalTestimonials,
      icon: FaStar,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      label: "Opportunities",
      value: stats.totalOpportunities,
      icon: FaHandsHelping,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      label: "Admin Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-gray-500 transition group"
          >
            {/* Icon */}
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              whileHover={{ rotate: 10 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Stat Value */}
            <div className="mb-2">
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>

            {/* Label */}
            <p className="text-gray-400 text-sm">{card.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
