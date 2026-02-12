"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToast } from "@/hooks/useToast";
import Footer from "../Footer/page";

const opportunities = [
  {
    id: 1,
    title: "Community Outreach Coordinator",
    category: "Community",
    time: "Flexible - 8-10 hours/week",
    description: "Help organize food drives, health campaigns, and community events",
    impact: "Directly serve 50+ families monthly",
    icon: "🤲",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 2,
    title: "Youth Mentor & Tutor",
    category: "Youth",
    time: "Flexible - 5-8 hours/week",
    description: "Mentor young people, provide tutoring, and lead Bible study discussions",
    impact: "Invest in 10-15 young lives",
    icon: "📚",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Prayer Network Coordinator",
    category: "Spiritual",
    time: "Flexible - 3-5 hours/week",
    description: "Organize prayer meetings, manage prayer requests, encourage intercessors",
    impact: "Mobilize a prayer movement",
    icon: "🙏",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 4,
    title: "Health Campaign Assistant",
    category: "Outreach",
    time: "Flexible - 6-10 hours/week",
    description: "Support health screening events, health education, patient support",
    impact: "Help screen & educate 100+ people",
    icon: "⚕️",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 5,
    title: "Technology & Digital Media",
    category: "Communication",
    time: "Flexible - 5-8 hours/week",
    description: "Help with photography, videography, social media, website updates",
    impact: "Reach thousands with our story",
    icon: "📱",
    color: "from-orange-500 to-amber-600",
  },
  {
    id: 6,
    title: "Events & Activities Coordinator",
    category: "Community",
    time: "Project-based - varies",
    description: "Plan and execute church events, workshops, and special programs",
    impact: "Unite and energize our community",
    icon: "🎉",
    color: "from-yellow-500 to-orange-600",
  },
];

const testimonials = [
  {
    name: "Grace Banda",
    role: "Youth Mentor (2 years)",
    quote: "Volunteering has transformed my own faith journey. Seeing young people grow in Christ is incredibly rewarding.",
    avatar: "👩‍🦰",
  },
  {
    name: "John Mwale",
    role: "Community Outreach (1.5 years)",
    quote: "I never knew I could make such a direct impact. Every day I see lives touched and families blessed.",
    avatar: "👨‍💼",
  },
  {
    name: "Hope Chithete",
    role: "Prayer Coordinator (1 year)",
    quote: "Prayer is powerful! Being part of the prayer team has shown me God's faithfulness in real time.",
    avatar: "👩‍🦳",
  },
];

const stats = [
  { number: "150+", label: "Active Volunteers", icon: "🙋‍♀️" },
  { number: "5000+", label: "Hours Served Yearly", icon: "⏰" },
  { number: "1000+", label: "Lives Impacted", icon: "❤️" },
];

const faqs = [
  {
    question: "Do I need experience to volunteer?",
    answer: "No experience is required! We provide training and support for all volunteers. Your willingness to serve is what matters most.",
  },
  {
    question: "What is the minimum time commitment?",
    answer: "We have opportunities ranging from 3 hours per week to project-based roles. You can choose what works best with your schedule.",
  },
  {
    question: "Are there age requirements?",
    answer: "We welcome volunteers of all ages. Youth under 18 can volunteer with parental consent and appropriate supervision.",
  },
];

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedRole: "",
    experience: "",
    availability: "",
    motivation: "",
  });

  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.selectedRole) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    showToast("Thank you! We'll contact you soon about volunteering opportunities.", "success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      selectedRole: "",
      experience: "",
      availability: "",
      motivation: "",
    });
  };

  return (
    <>
      {/* Hero Section - Fully Responsive */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-emerald-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white rounded-full opacity-5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4 sm:mb-6"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-green-200 uppercase">
              Make a Difference
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
          >
            Volunteer With Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Your time, talents, and heart can transform lives and communities
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-10"
          >
            <a
              href="#opportunities"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-900 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              View Opportunities
            </a>
            <a
              href="#apply"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-900 transition-all duration-300 text-sm sm:text-base"
            >
              Apply Now
            </a>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative w-full h-16 sm:h-20 md:h-24"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Impact Stats - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities - Fully Responsive */}
      <section id="opportunities" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide mb-4">
              Serve With Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-2">
              Ways to <span className="text-emerald-600">Serve</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Whether you have 3 hours or 10 hours a week, there's a place for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${opp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`text-4xl sm:text-5xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {opp.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {opp.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${opp.color} text-white`}>
                    {opp.category}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {opp.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4">
                  <span className="text-lg">⏱️</span>
                  <span>{opp.time}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                    ✨ {opp.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide mb-4">
              Real Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-2">
              Volunteer <span className="text-emerald-600">Stories</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Hear from volunteers about their transformative experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-100 hover:border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-4xl text-emerald-200 opacity-50">
                  "
                </div>
                
                <div className="text-4xl sm:text-5xl mb-4">{testimonial.avatar}</div>
                
                <blockquote className="text-sm sm:text-base text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="relative pt-4 border-t border-emerald-200">
                  <p className="font-bold text-emerald-900 text-base sm:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-600">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide mb-4">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-2">
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - Fully Responsive */}
      <section id="apply" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-emerald-100"
          >
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Ready to <span className="text-emerald-600">Volunteer?</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Fill out this form and we'll get back to you with opportunities tailored to your interests
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base"
                    placeholder="+265 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Interested Role *
                  </label>
                  <select
                    name="selectedRole"
                    value={formData.selectedRole}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base bg-white"
                  >
                    <option value="">Select a role...</option>
                    {opportunities.map((opp) => (
                      <option key={opp.id} value={opp.title}>
                        {opp.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={window.innerWidth < 640 ? 3 : 4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base"
                  placeholder="Any relevant skills or experience..."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Weekly Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base bg-white"
                >
                  <option value="">Select availability...</option>
                  <option value="3-5">3-5 hours per week</option>
                  <option value="5-8">5-8 hours per week</option>
                  <option value="8-10">8-10 hours per week</option>
                  <option value="flexible">Project-based (flexible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  What motivates you to volunteer?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={window.innerWidth < 640 ? 3 : 4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-sm sm:text-base"
                  placeholder="Tell us why you want to serve..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                Submit Application
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                * Required fields. We'll respond within 2-3 business days.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Still Have Questions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 px-4 leading-relaxed">
            We're here to help you find the perfect volunteer opportunity
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-xl text-sm sm:text-base"
          >
            Contact Us
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </section>
      
      <Footer />
    </>
  );
}