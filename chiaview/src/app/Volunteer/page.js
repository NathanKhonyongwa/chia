"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
    bgLight: "from-emerald-50 to-green-50",
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
    bgLight: "from-blue-50 to-cyan-50",
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
    bgLight: "from-purple-50 to-indigo-50",
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
    bgLight: "from-red-50 to-pink-50",
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
    bgLight: "from-orange-50 to-amber-50",
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
    bgLight: "from-yellow-50 to-orange-50",
  },
];

const testimonials = [
  {
    name: "Grace Banda",
    role: "Youth Mentor (2 years)",
    quote: "Volunteering has transformed my own faith journey. Seeing young people grow in Christ is incredibly rewarding.",
    avatar: "👩‍🦰",
    initials: "GB",
  },
  {
    name: "John Mwale",
    role: "Community Outreach (1.5 years)",
    quote: "I never knew I could make such a direct impact. Every day I see lives touched and families blessed.",
    avatar: "👨‍💼",
    initials: "JM",
  },
  {
    name: "Hope Chithete",
    role: "Prayer Coordinator (1 year)",
    quote: "Prayer is powerful! Being part of the prayer team has shown me God's faithfulness in real time.",
    avatar: "👩‍🦳",
    initials: "HC",
  },
];

const stats = [
  { number: "150+", label: "Active Volunteers", icon: "🙋‍♀️", color: "from-emerald-600 to-green-600" },
  { number: "5000+", label: "Hours Served Yearly", icon: "⏰", color: "from-blue-600 to-cyan-600" },
  { number: "1000+", label: "Lives Impacted", icon: "❤️", color: "from-red-600 to-pink-600" },
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

const benefits = [
  {
    icon: "🌱",
    title: "Personal Growth",
    description: "Develop new skills, build character, and grow in your faith"
  },
  {
    icon: "🤝",
    title: "Meaningful Connections",
    description: "Build lasting relationships with like-minded individuals"
  },
  {
    icon: "💫",
    title: "Make an Impact",
    description: "See firsthand how your time changes lives"
  },
  {
    icon: "🎓",
    title: "Training Provided",
    description: "Receive guidance and mentorship in your chosen area"
  }
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

  const [expandedFaq, setExpandedFaq] = useState(null);
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

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Section - Enhanced with Parallax */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900" />
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/grid.svg')",
              backgroundSize: "30px 30px",
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full opacity-20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-sm font-semibold tracking-[0.2em] text-green-200 uppercase">
              Make a Difference
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight"
          >
            Volunteer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300">
              With Purpose
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Your time, talents, and heart can transform lives and communities.
            Join us in making a lasting impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              href="#opportunities"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-green-900 font-bold rounded-full hover:shadow-2xl transition-all duration-300 text-lg overflow-hidden"
            >
              <span className="relative z-10">View Opportunities</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-900 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              Apply Now
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
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

      {/* Benefits Section - New */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Why Volunteer With Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              More Than Just <span className="text-emerald-600">Service</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience personal growth while making a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats - Enhanced */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-900 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-10" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center border border-white/20 hover:bg-white/20 transition-all duration-500"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, delay: index * 0.5, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-xl text-emerald-100">{stat.label}</div>

                {/* Animated Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Opportunities - Enhanced with Card Flip Effect */}
      <section id="opportunities" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Serve With Purpose
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ways to <span className="text-emerald-600">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you have 3 hours or 10 hours a week, there's a place for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className="group perspective"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${opp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Icon with Animation */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${opp.color} flex items-center justify-center mb-6 text-4xl shadow-lg`}
                  >
                    {opp.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {opp.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${opp.color} text-white`}>
                      {opp.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {opp.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="text-xl">⏱️</span>
                    <span>{opp.time}</span>
                  </div>
                  
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent my-4"
                  />
                  
                  <p className="text-sm font-semibold text-emerald-700">
                    ✨ {opp.impact}
                  </p>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-4 right-4 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    ✨
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with Carousel Effect */}
      <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Real Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Volunteer <span className="text-emerald-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from volunteers about their transformative experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-500">
                  {/* Quote Icon */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-6 right-6 text-6xl text-emerald-200 opacity-50"
                  >
                    "
                  </motion.div>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                      <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-6 leading-relaxed relative z-10">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-yellow-400 text-xl">
                    {"★★★★★".split("").map((star, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                      >
                        {star}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with Accordion */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center"
                  whileHover={{ backgroundColor: "#f9f9f9" }}
                >
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-emerald-600"
                  >
                    {expandedFaq === index ? "−" : "+"}
                  </motion.span>
                </motion.button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - Enhanced */}
      <section id="apply" className="py-24 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-4xl blur-3xl" />
            
            <div className="relative bg-white rounded-4xl p-8 md:p-12 shadow-2xl border border-emerald-100">
              <div className="text-center mb-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🙏
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  Ready to <span className="text-emerald-600">Volunteer?</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out this form and we'll get back to you with opportunities tailored to your interests
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                      placeholder="+265 XXX XXX XXX"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Interested Role *
                    </label>
                    <select
                      name="selectedRole"
                      value={formData.selectedRole}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg bg-white"
                    >
                      <option value="">Select a role...</option>
                      {opportunities.map((opp) => (
                        <option key={opp.id} value={opp.title}>
                          {opp.title}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Relevant Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                    placeholder="Any relevant skills or experience..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Weekly Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg bg-white"
                  >
                    <option value="">Select availability...</option>
                    <option value="3-5">3-5 hours per week</option>
                    <option value="5-8">5-8 hours per week</option>
                    <option value="8-10">8-10 hours per week</option>
                    <option value="flexible">Project-based (flexible)</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    What motivates you to volunteer?
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                    placeholder="Tell us why you want to serve..."
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Submit Application</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields. We'll respond within 2-3 business days.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/pattern.svg')",
            backgroundSize: "60px 60px",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            Still Have <span className="text-emerald-300">Questions?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            We're here to help you find the perfect volunteer opportunity that matches your gifts and schedule
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-white text-emerald-900 font-bold px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 text-xl group"
            >
              <span>Contact Us</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl"
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">📞</div>
              <p className="text-emerald-100">+265 1 234 5678</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✉️</div>
              <p className="text-emerald-100">volunteer@chiamissionview.org</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📍</div>
              <p className="text-emerald-100">Dowa District, Malawi</p>
            </div>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </>
  );
}