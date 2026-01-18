"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
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
    title: "Mission Centers Established",
    description: "Launched vibrant hubs in Dowa and Guma as foundations for community transformation.",
    icon: "⛪",
  },
  {
    year: "2024",
    title: "Outreach Expansion",
    description: "Food drives and health campaigns reached over 500 families across multiple districts.",
    icon: "🍞",
  },
  {
    year: "2024",
    title: "Youth & Spiritual Momentum",
    description: "Mentorship programs, weekly Bible studies, and prayer meetings building lasting faith.",
    icon: "🙏📚",
  },
  {
    year: "2024",
    title: "Regional Partnerships",
    description: "Connected with Nkhotakota, Salima, Ntchisi and beyond for greater kingdom impact.",
    icon: "🤝",
  },
];

export default function Mission() {
  useEffect(() => {
    // Optional: If you still want to support ?tab= for deep linking, you can scroll to sections instead
    // But since tabs are removed, this can be simplified or removed
  }, []);

  return (
    <section id="mission" className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div
        className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/mission-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-5xl px-6 text-center text-white"
        >
          <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl tracking-tight">
            Our Mission
          </h1>
          <p className="mx-auto max-w-4xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed">
            To make disciples, proclaim the everlasting gospel (Three Angels' Messages), 
            and prepare hearts for Jesus' soon return.
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
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-4xl font-bold text-blue-900"
        >
          Our Three Core Pillars
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-100"
            >
              <div className="mb-6 flex justify-center">
                <Image
                  src={area.icon}
                  alt={area.title}
                  width={80}
                  height={80}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-blue-900 text-center">
                {area.title}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map / Circle of Influence */}
      <div className="bg-blue-900/5 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-4xl font-bold text-blue-900"
          >
            Our Circle of Influence
          </motion.h2>
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-10">
            From our mission centers in Dowa and Guma, we reach families across the Central Region 
            and beyond — including Nkhotakota, Salima, Ntchisi, and more — bringing hope and help where it's needed most.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-blue-200">
            <MapSection />
          </div>
        </div>
      </div>

      {/* Progress & Impact */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-4xl font-bold text-blue-900"
        >
          Our Journey & Impact
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {progressHighlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
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
          <h3 className="mb-10 text-3xl md:text-4xl font-bold">By God's Grace</h3>
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
          in Jesus' name. Together, we prepare the way for His return.
        </p>
        <a
          href="#contact"
          className="inline-block rounded-full bg-white px-10 py-5 text-xl font-bold text-blue-900 shadow-xl hover:bg-gray-100 transition hover:scale-105"
        >
          Get Involved Today
        </a>
      </motion.div>
    </section>
  );
}