/**
 * CTACards - Call-to-Action cards component
 * Features:
 * - Multiple CTA options with icons
 * - Animated hover effects
 * - Responsive grid layout
 * - Links to different pages/actions
 * - Accessibility features
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaHeart,
  FaHandsHelping,
  FaBookOpen,
  FaUsers,
} from "react-icons/fa";

/**
 * CTA cards data
 */
const ctaCards = [
  {
    id: 1,
    title: "Make a Donation",
    description: "Support our mission and help transform lives in our community",
    icon: FaHeart,
    link: "/Donations",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    title: "Volunteer With Us",
    description:
      "Join our team and make a hands-on difference in people's lives",
    icon: FaHandsHelping,
    link: "/Volunteer",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    title: "Learn More",
    description: "Explore our blog and discover inspiring stories of impact",
    icon: FaBookOpen,
    link: "/Blog",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 4,
    title: "Join Our Community",
    description: "Be part of our growing network and stay connected with updates",
    icon: FaUsers,
    link: "/Register",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function CTACards() {
  return (
    <section
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white"
      aria-label="Call to action section"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How You Can Help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            There are many ways to be part of our mission and make a difference
          </p>
        </motion.div>

        {/* CTA Cards Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ctaCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className={`${card.bgColor} rounded-2xl p-8 transition-all duration-300 border border-gray-200 hover:border-gray-300`}
              >
                <Link href={card.link} className="group block h-full">
                  {/* Icon Container */}
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 mb-4 group-hover:text-gray-600 transition">
                    {card.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    className="text-gray-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    Learn More →
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
