/**
 * Mission - Main mission and impact page
 * Features:
 * - Hero section with compelling headline
 * - Core pillars showcasing ministry focus areas
 * - Interactive map with mission centers (lazy-loaded for performance)
 * - Impact statistics and progress highlights
 * - Call-to-action sections
 * - Accessibility features throughout
 */

"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues and improve performance
const MapSection = dynamic(() => import("./MapSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="text-gray-500 text-lg">Loading interactive map...</div>
    </div>
  ),
});

const focusAreas = [
  {
    title: "Community Outreach",
    description:
      "Organizing food drives, educational support, health campaigns, and direct assistance to uplift vulnerable families and individuals in our communities.",
    icon: "/comm.png",
  },
  {
    title: "Youth Empowerment",
    description:
      "Mentoring and equipping the next generation through workshops, spiritual guidance, leadership training, and programs that build confidence and faith.",
    icon: "/youth.png",
  },
  {
    title: "Spiritual Growth",
    description:
      "Fostering deeper relationships with God through prayer meetings, Bible studies, worship gatherings, and discipleship that transforms lives.",
    icon: "/pray.png",
  },
];

const impactStats = [
  { number: "500+", label: "Families Served" },
  { number: "200+", label: "Youth Engaged" },
  { number: "5", label: "Districts Reached" },
];

const progressHighlights = [
  {
    year: "2023–2024",
    title: "Mission Center in Guma, Dowa",
    description: "Established a vibrant hub in Guma (Dowa District) as the foundation for community transformation and spiritual growth.",
    icon: "⛪",
  },
  {
    year: "2024",
    title: "Outreach Expansion",
    description: "Food drives and health campaigns reached over 500 families across the Dowa district and surrounding communities.",
    icon: "🍞",
  },
  {
    year: "2024",
    title: "Youth & Spiritual Momentum",
    description: "Mentorship programs, weekly Bible studies, and prayer meetings building lasting faith in youth and families.",
    icon: "🙏📚",
  },
  {
    year: "2024",
    title: "Regional Partnerships",
    description: "Connected with Nkhotakota, Salima, Ntchisi and beyond for greater kingdom impact and collaboration.",
    icon: "🤝",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero */}
      <div
        className="relative flex min-height-[70vh] min-h-[70vh] items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/mission-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-5xl px-6 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 inline-block"
          >
            <div className="text-6xl mb-4">✨</div>
          </motion.div>
          
          <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Our Mission
          </h1>
          <p className="mx-auto max-w-4xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-blue-50">
            To make disciples, proclaim the everlasting gospel (Three Angels&apos; Messages),
            and prepare hearts for Jesus&apos; soon return.
          </p>
        </motion.div>
      </div>

      {/* Core Mission Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-5xl px-6 py-20 text-center"
      >
        <h2 className="mb-8 text-4xl md:text-5xl font-bold text-blue-900">
          Why We Exist
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-800 max-w-4xl mx-auto">
          At Chia View Church Mission, we exist to serve our community through
          <span className="font-semibold text-blue-700"> faith-driven compassion</span>,
          spiritual guidance, and transformative outreach.
          Every program, gathering, and act of service flows from our deep conviction
          that everyone deserves hope, purpose, and the life-changing love of Jesus.
        </p>
      </motion.div>

      {/* Focus Areas */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-4xl font-bold text-blue-900"
        >
          Our Three Core Pillars
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Built on faith and compassion, these three pillars guide everything we do
        </motion.p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl bg-gradient-to-br from-white to-blue-50 p-10 shadow-lg transition-all duration-300 hover:shadow-2xl border border-blue-100 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={area.icon}
                      alt={area.title}
                      width={80}
                      height={80}
                      className="transition-transform duration-300"
                    />
                  </motion.div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-blue-900 text-center">
                  {area.title}
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Circle of Influence (Map) */}
      <div className="bg-gradient-to-b from-white via-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-center text-4xl font-bold text-blue-900"
          >
            Our Circle of Influence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12"
          >
            From our mission center in Guma, Dowa District, we reach families across the region
            and beyond — including Nkhotakota, Salima, Ntchisi, and more — bringing hope and help
            where it&apos;s needed most.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-100"
          >
            <MapSection />
          </motion.div>
        </div>
      </div>

      {/* Journey & Impact */}
      <div className="mx-auto max-w-7xl px-6 py-20 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-4xl font-bold text-blue-900"
        >
          Our Journey &amp; Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Marking milestones in faith and service across Dowa and the Central Region
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {progressHighlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-blue-100"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl flex-shrink-0">{item.icon}</span>
                <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 rounded-full mt-1">
                  {item.year}
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Big Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-3xl p-10 md:p-16 text-white text-center"
        >
          <h3 className="mb-10 text-3xl md:text-4xl font-bold">By God&apos;s Grace</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-6xl md:text-7xl font-extrabold mb-3">{stat.number}</div>
                <div className="text-xl md:text-2xl text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-900 py-20 px-6 text-center text-white"
      >
        <h2 className="mb-6 text-4xl md:text-5xl font-bold">
          Join Us in This Mission
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl">
          Your prayers, time, talents, and support help us reach more lives and bring lasting change
          in Jesus&apos; name. Together, we prepare the way for His return.
        </p>
        <a
          href="/#contact"
          className="inline-block rounded-full bg-white px-10 py-5 text-xl font-bold text-blue-900 shadow-xl hover:bg-gray-100 transition hover:scale-105"
        >
          Get Involved Today
        </a>
      </motion.div>
    </section>
  );
}