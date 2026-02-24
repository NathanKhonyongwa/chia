"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import Footer from "../Footer/page";

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
    title: "Mobile Money",
    description: "Donate via Airtel Money or TNM Mpamba",
    icon: "📱",
    methods: [
      { provider: "Airtel Money", number: "*211#", instructions: "Dial *211# and follow prompts" },
      { provider: "TNM Mpamba", number: "*444#", instructions: "Dial *444# and select 'Donations'" }
    ]
  },
  {
    title: "Bank Transfer",
    description: "Direct deposit to our bank account",
    icon: "🏦",
    methods: [
      { provider: "NBS Bank", number: "1234567890", instructions: "Account Name: Chia View Mission" },
      { provider: "Standard Bank", number: "0987654321", instructions: "Branch: Dowa" }
    ]
  },
  {
    title: "In-Kind Donations",
    description: "Donate supplies or services",
    icon: "📦",
    methods: [
      { type: "Food & Supplies", contact: "Contact us for needs list" },
      { type: "Professional Services", contact: "Email us to discuss" }
    ]
  },
  {
    title: "International Giving",
    description: "Donate from outside Malawi",
    icon: "🌍",
    methods: [
      { provider: "WorldRemit", code: "CHIAVIEW", instructions: "Use code CHIAVIEW" },
      { provider: "Western Union", address: "Dowa, Malawi", instructions: "Send to: Chia View Mission" }
    ]
  },
];

const impactLevels = [
  {
    amount: "MWK 5,000",
    description: "Feeds one family for a week",
    icon: "🍽️",
  },
  {
    amount: "MWK 15,000",
    description: "Provides health screening for 5 people",
    icon: "⚕️",
  },
  {
    amount: "MWK 25,000",
    description: "Supports a student's education for a month",
    icon: "📖",
  },
  {
    amount: "MWK 50,000",
    description: "Enables a youth mentor session series",
    icon: "👥",
  },
  {
    amount: "MWK 100,000",
    description: "Funds a health awareness workshop",
    icon: "📚",
  },
  {
    amount: "MWK 250,000",
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
  const [selectedOption, setSelectedOption] = useState(null);
  const { showToast } = useToast();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!", "success");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400 rounded-full opacity-20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full opacity-5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-[0.2em] text-purple-200 uppercase">
              Give with Purpose
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight"
          >
            Your Gift
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Changes Lives
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Join us in spreading hope and God's love through generous giving.
            Every donation makes a tangible difference in our community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              href="#give"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-purple-900 font-bold rounded-full hover:shadow-2xl transition-all duration-300 text-lg overflow-hidden"
            >
              <span className="relative z-10">Give Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#impact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              See Impact
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ height: [4, 16, 4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Impact of Giving */}
      <section id="impact" className="py-24 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Your Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Gift in <span className="text-purple-600">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the tangible impact your donation makes in our community
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {impactLevels.map((level, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, delay: index * 0.2, repeat: Infinity }}
                  className="text-5xl mb-3 group-hover:scale-110 transition-transform"
                >
                  {level.icon}
                </motion.div>
                <p className="font-bold text-lg text-purple-900 mb-2">{level.amount}</p>
                <p className="text-xs text-gray-700">{level.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Giving Options Section */}
      <section id="give" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Give Generously
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ways to <span className="text-purple-600">Give</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you. All donations support our mission in Malawi.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {givingOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{option.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{option.title}</h3>
                      <p className="text-purple-100">{option.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {option.methods.map((method, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {method.provider || method.type}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {method.number || method.contact || method.address || method.instructions}
                          </p>
                          {method.instructions && (
                            <p className="text-xs text-gray-500 mt-1">{method.instructions}</p>
                          )}
                        </div>
                        {method.number && (
                          <button
                            onClick={() => copyToClipboard(method.number)}
                            className="text-purple-600 hover:text-purple-800 text-sm font-semibold"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact for Large Gifts */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Want to Make a Large Gift?</h3>
            <p className="text-purple-100 mb-6">
              For significant donations, planned giving, or to discuss how you can make a lasting impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:giving@chiamissionview.org"
                className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:bg-purple-50 transition"
              >
                <span>✉️</span>
                giving@chiamissionview.org
              </a>
              <a
                href="tel:+26512345678"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-purple-900 transition"
              >
                <span>📞</span>
                +265 1 234 5678
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget Transparency */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              100% Transparency
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Where Your <span className="text-purple-600">Money Goes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe in complete transparency with our financial stewardship
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Visual Budget */}
            <motion.div
              variants={fadeInUp}
              className="space-y-6"
            >
              {budgetBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors"
                    >
                      {item.icon}
                    </motion.span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{item.category}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className="font-bold text-purple-600 text-xl">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-full ${item.color} relative`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white opacity-30"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Budget Summary */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-10 text-white shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-6">Annual Budget Overview</h3>
              <p className="text-6xl font-extrabold mb-2">$25,000</p>
              <p className="text-purple-200 mb-8">Total annual allocation across ministries</p>

              <div className="space-y-4 pt-6 border-t border-white/20">
                {budgetBreakdown.map((item) => (
                  <motion.div
                    key={item.category}
                    whileHover={{ x: 10 }}
                    className="flex justify-between items-center"
                  >
                    <span className="font-semibold text-purple-100">{item.category}</span>
                    <span className="text-white font-bold text-lg">{item.amount}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-purple-200">
                  💡 <strong className="text-white">Our Commitment:</strong> We maintain transparent financial records and welcome donor inquiries about fund usage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donor Testimonials */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Real Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Donors <span className="text-purple-600">Give</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from those who have partnered with us in mission
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl p-8 border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-6xl text-purple-200 opacity-50">
                  "
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-2xl"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic mb-6 relative z-10">
                  "{testimonial.message}"
                </blockquote>
                
                <div className="relative pt-4 border-t border-purple-200">
                  <p className="font-bold text-purple-900 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-r from-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            ✨
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Join Us in This Vision
          </h2>
          
          <p className="text-2xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your investment in our mission is an investment in eternity. 
            Together, we can transform lives and communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="#give"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-white text-purple-900 font-bold rounded-full hover:shadow-2xl transition-all duration-300 text-lg overflow-hidden"
            >
              <span className="relative z-10">Give Today</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <Link
              href="/Mission"
              className="px-12 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📧</div>
              <p className="text-purple-100 text-sm">donate@chiamissionview.org</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📞</div>
              <p className="text-purple-100 text-sm">+265 1 234 5678</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📍</div>
              <p className="text-purple-100 text-sm">Dowa District, Malawi</p>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      <Footer />
    </>
  );
}