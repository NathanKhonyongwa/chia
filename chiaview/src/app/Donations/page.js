"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from "@/components/DonationForm";
import { donationOptions, donationCategories } from "@/lib/stripe";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const budgetBreakdown = [
  {
    category: "Community Outreach",
    percentage: 35,
    amount: "$8,750",
    description: "Food drives, health campaigns, emergency relief",
    icon: "🤲",
    color: "bg-green-500",
  },
  {
    category: "Youth Programs",
    percentage: 25,
    amount: "$6,250",
    description: "Mentorship, education support, leadership training",
    icon: "📚",
    color: "bg-blue-500",
  },
  {
    category: "Facility & Operations",
    percentage: 20,
    amount: "$5,000",
    description: "Mission center maintenance, utilities, supplies",
    icon: "🏢",
    color: "bg-purple-500",
  },
  {
    category: "Spiritual Programs",
    percentage: 15,
    amount: "$3,750",
    description: "Prayer meetings, worship events, discipleship",
    icon: "🙏",
    color: "bg-yellow-500",
  },
  {
    category: "Administration",
    percentage: 5,
    amount: "$1,250",
    description: "Staff, communications, accountability",
    icon: "📊",
    color: "bg-gray-500",
  },
];

const givingOptions = [
  {
    title: "One-Time Gift",
    description: "Make a single contribution of any amount",
    icon: "💝",
  },
  {
    title: "Monthly Giving",
    description: "Become a consistent partner in our mission",
    icon: "📅",
  },
  {
    title: "Designated Gift",
    description: "Support a specific program or initiative",
    icon: "🎯",
  },
  {
    title: "In-Kind Donation",
    description: "Donate supplies or services",
    icon: "📦",
  },
];

const impactLevels = [
  {
    amount: "$10",
    description: "Feeds one family for a week",
    icon: "🍽️",
  },
  {
    amount: "$25",
    description: "Provides health screening for 5 people",
    icon: "⚕️",
  },
  {
    amount: "$50",
    description: "Supports a student's education for a month",
    icon: "📖",
  },
  {
    amount: "$100",
    description: "Enables a youth mentor session series",
    icon: "👥",
  },
  {
    amount: "$250",
    description: "Funds a health awareness workshop",
    icon: "📚",
  },
  {
    amount: "$500",
    description: "Sponsors a community outreach event",
    icon: "🎉",
  },
];

const testimonials = [
  {
    name: "Margaret Simukonda",
    role: "Monthly Supporter",
    message: "Supporting Chia View has transformed how I see giving. I literally see families being fed and children getting educated.",
  },
  {
    name: "Peter Chiwanda",
    role: "Donor",
    message: "The transparency about how funds are used gives me confidence that my gift truly makes a difference.",
  },
  {
    name: "Rose Banda",
    role: "Supporter",
    message: "Giving to this mission feels like investing in eternity. The work being done is kingdom work!",
  },
];

export default function Donations() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 overflow-hidden py-16 px-6">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-pink-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Gift Changes Lives
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-purple-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join us in spreading hope and God's love through generous giving
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate"
                className="bg-white text-purple-900 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Give Now
              </a>
              <Link
                href="#impact"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-purple-900 transition-colors"
              >
                See Impact
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donate" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Make Your Donation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every contribution, no matter the size, makes a meaningful difference in our community.
              All donations are tax-deductible and securely processed.
            </p>
          </motion.div>

          <Elements stripe={stripePromise}>
            <DonationForm />
          </Elements>
        </div>
      </section>
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.25em] text-purple-200 uppercase mb-4"
          >
            Give with Purpose
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            Support Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-purple-100 max-w-2xl mx-auto"
          >
            Your generosity transforms lives and strengthens communities
          </motion.p>
        </div>
      </section>

      {/* Impact of Giving */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Your Gift in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the tangible impact your donation makes
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {impactLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-200 hover:shadow-lg transition"
              >
                <div className="text-5xl mb-3">{level.icon}</div>
                <p className="font-bold text-2xl text-purple-900 mb-2">{level.amount}</p>
                <p className="text-sm text-gray-700">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Transparency */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Where Your Money Goes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              100% transparency on our annual budget allocation
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Visual Budget */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {budgetBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.category}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className="font-bold text-purple-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-full ${item.color}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Budget Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-10 border border-purple-200 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Annual Budget</h3>
                <p className="text-5xl font-extrabold text-purple-600 mb-2">$25,000</p>
                <p className="text-gray-600">Allocated across five key ministry areas</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-purple-200">
                {budgetBreakdown.map((item) => (
                  <div key={item.category} className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">{item.category}</span>
                    <span className="text-purple-600 font-bold">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-purple-200">
                <p className="text-sm text-gray-600">
                  💡 <strong>Our Commitment:</strong> We maintain transparent financial records and welcome donor inquiries about fund usage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-16"
          >
            Ways to Give
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {givingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200 hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">{option.title}</h3>
                <p className="text-gray-700">{option.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-2xl p-10 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Additional Giving Methods</h3>
            <p className="mb-6 text-purple-100">
              For bank transfers, check donations, or to discuss major gifts, please contact us
            </p>
            <a href="/#contact" className="inline-block bg-white text-purple-900 font-bold px-8 py-3 rounded-full hover:bg-purple-50 transition">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-xl border border-purple-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              Make a Donation
            </h2>
            <p className="text-gray-600 mb-8">
              Support our mission with a secure donation
            </p>

            <form onSubmit={handleDonate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Select Amount *
                </label>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  {[10, 25, 50, 100, 250, 500, 1000, "Custom"].map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={() => {
                        if (amount !== "Custom") {
                          setSelectedAmount(amount.toString());
                        }
                      }}
                      className={`py-3 px-4 rounded-lg font-bold transition ${
                        selectedAmount === amount.toString()
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-purple-100"
                      }`}
                    >
                      {amount === "Custom" ? "Custom" : `$${amount}`}
                    </motion.button>
                  ))}
                </div>
                {selectedAmount === "Custom" && (
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="w-full mt-4 px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-600 focus:outline-none"
                  />
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-600 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-600 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <input
                  type="checkbox"
                  id="receipt"
                  className="w-4 h-4 accent-purple-600"
                />
                <label htmlFor="receipt" className="text-sm text-gray-700">
                  Send me a donation receipt
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-300"
              >
                Donate Now
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                💳 All donations are secure and confidential
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Donor Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-16"
          >
            Why Donors Give
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.message}"
                </blockquote>
                <div>
                  <p className="font-bold text-purple-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us in This Vision
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Your investment in our mission is an investment in eternity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-10 py-3 bg-white text-purple-900 font-bold rounded-full hover:bg-purple-50 transition"
            >
              Donate Today
            </motion.button>
            <Link
              href="/Mission"
              className="px-10 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
