"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToast } from "@/hooks/useToast";

const opportunities = [
  {
    id: 1,
    title: "Community Outreach Coordinator",
    category: "Community",
    time: "Flexible - 8-10 hours/week",
    description: "Help organize food drives, health campaigns, and community events",
    impact: "Directly serve 50+ families monthly",
    icon: "🤲",
  },
  {
    id: 2,
    title: "Youth Mentor & Tutor",
    category: "Youth",
    time: "Flexible - 5-8 hours/week",
    description: "Mentor young people, provide tutoring, and lead Bible study discussions",
    impact: "Invest in 10-15 young lives",
    icon: "📚",
  },
  {
    id: 3,
    title: "Prayer Network Coordinator",
    category: "Spiritual",
    time: "Flexible - 3-5 hours/week",
    description: "Organize prayer meetings, manage prayer requests, encourage intercessors",
    impact: "Mobilize a prayer movement",
    icon: "🙏",
  },
  {
    id: 4,
    title: "Health Campaign Assistant",
    category: "Outreach",
    time: "Flexible - 6-10 hours/week",
    description: "Support health screening events, health education, patient support",
    impact: "Help screen & educate 100+ people",
    icon: "⚕️",
  },
  {
    id: 5,
    title: "Technology & Digital Media",
    category: "Communication",
    time: "Flexible - 5-8 hours/week",
    description: "Help with photography, videography, social media, website updates",
    impact: "Reach thousands with our story",
    icon: "📱",
  },
  {
    id: 6,
    title: "Events & Activities Coordinator",
    category: "Community",
    time: "Project-based - varies",
    description: "Plan and execute church events, workshops, and special programs",
    impact: "Unite and energize our community",
    icon: "🎉",
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
  { number: "150+", label: "Active Volunteers" },
  { number: "5000+", label: "Hours Served Yearly" },
  { number: "1000+", label: "Lives Impacted" },
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-green-900 via-green-800 to-teal-900 overflow-hidden py-16 px-6">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
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
            className="text-sm font-semibold tracking-[0.25em] text-green-200 uppercase mb-4"
          >
            Make a Difference
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            Volunteer With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-green-100 max-w-2xl mx-auto"
          >
            Your time, talents, and heart can transform lives and communities
          </motion.p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200"
              >
                <div className="text-5xl font-extrabold text-green-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Ways to Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you have 3 hours or 10 hours a week, there's a place for you
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-green-600"
              >
                <div className="text-5xl mb-4">{opp.icon}</div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">{opp.title}</h3>
                <p className="text-sm font-semibold text-green-600 mb-3">{opp.category}</p>
                <p className="text-gray-700 mb-3">{opp.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>⏱️</span> {opp.time}
                </div>
                <div className="pt-3 border-t border-green-100">
                  <p className="text-sm font-semibold text-green-700">{opp.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-green-900 mb-4"
          >
            Volunteer Stories
          </motion.h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from volunteers about their transformative experiences
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200"
              >
                <div className="text-6xl mb-4">{testimonial.avatar}</div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-green-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-xl border border-green-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
              Ready to Volunteer?
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out this form and we'll get back to you with opportunities tailored to your interests
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                    placeholder="+265 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Interested Role *
                  </label>
                  <select
                    name="selectedRole"
                    value={formData.selectedRole}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
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
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                  placeholder="Any relevant skills or experience..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Weekly Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                >
                  <option value="">Select availability...</option>
                  <option value="3-5">3-5 hours per week</option>
                  <option value="5-8">5-8 hours per week</option>
                  <option value="8-10">8-10 hours per week</option>
                  <option value="flexible">Project-based (flexible)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What motivates you to volunteer?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-600 focus:outline-none transition"
                  placeholder="Tell us why you want to serve..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-300"
              >
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-green-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg text-green-100 mb-6">
            Contact us to learn more about volunteering opportunities
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-green-900 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </>
  );
}
