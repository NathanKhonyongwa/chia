/**
 * AdminQuickLinks - Quick access links for admin sections
 * Features:
 * - Direct shortcuts to main admin pages
 * - Status indicators
 * - Recent activity preview
 * - Responsive grid layout
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaStar,
  FaHandsHelping,
  FaHome,
  FaCog,
  FaUser,
} from "react-icons/fa";

/**
 * Quick links configuration
 */
const quickLinks = [
  {
    id: 1,
    title: "Blog Posts",
    link: "/Admin/Blog",
    icon: FaFileAlt,
    color: "from-blue-500 to-blue-600",
    description: "Manage blog posts and articles",
  },
  {
    id: 2,
    title: "Testimonials",
    link: "/Admin/Testimonials",
    icon: FaStar,
    color: "from-purple-500 to-purple-600",
    description: "Manage testimonials and reviews",
  },
  {
    id: 3,
    title: "Opportunities",
    link: "/Admin/Opportunities",
    icon: FaHandsHelping,
    color: "from-green-500 to-green-600",
    description: "Manage volunteer opportunities",
  },
  {
    id: 4,
    title: "Homepage",
    link: "/Admin/Homepage",
    icon: FaHome,
    color: "from-yellow-500 to-yellow-600",
    description: "Edit homepage content",
  },
  {
    id: 5,
    title: "Settings",
    link: "/Admin/Settings",
    icon: FaCog,
    color: "from-gray-500 to-gray-600",
    description: "Website settings",
  },
  {
    id: 6,
    title: "Profile",
    link: "/Admin/Login",
    icon: FaUser,
    color: "from-indigo-500 to-indigo-600",
    description: "Admin profile settings",
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

export default function AdminQuickLinks() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <motion.div
            key={link.id}
            variants={itemVariants}
            className="group h-full"
          >
            <Link href={link.link} className="block h-full">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 h-full hover:shadow-2xl transition duration-300 border border-gray-600 hover:border-gray-500">
                {/* Icon Container */}
                <motion.div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 10 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Title and Description */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition">
                  {link.description}
                </p>

                {/* Arrow Link */}
                <div className="mt-4 text-blue-400 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Access →
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
