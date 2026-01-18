"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import map component to avoid SSR issues
const MapSection = dynamic(() => import("./MapSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

const focusAreas = [
  {
    title: "Community Outreach",
    description:
      "We organize programs and events to support vulnerable members of our community, including food drives, educational support, and health awareness.",
    icon: "/comm.png",
  },
  {
    title: "Youth Empowerment",
    description:
      "We focus on nurturing the next generation through mentorship, educational workshops, and spiritual guidance.",
    icon: "/youth.png",
  },
  {
    title: "Spiritual Growth",
    description:
      "We encourage spiritual growth through prayer meetings, Bible study sessions, and community worship gatherings.",
    icon: "/pray.png",
  },
];

const progressItems = [
  {
    year: "2024",
    title: "Community Outreach Expansion",
    description: "Successfully launched food drive programs reaching over 500 families across Dowa and Guma districts.",
    icon: "🍞",
    stats: "500+ families served"
  },
  {
    year: "2024",
    title: "Youth Programs Initiated",
    description: "Established mentorship programs and educational workshops impacting 200+ youth in the region.",
    icon: "📚",
    stats: "200+ youth engaged"
  },
  {
    year: "2023-2024",
    title: "Spiritual Growth Activities",
    description: "Conducted weekly prayer meetings and Bible study sessions with consistent participation from community members.",
    icon: "🙏",
    stats: "Weekly gatherings"
  },
  {
    year: "2024",
    title: "Health Awareness Campaigns",
    description: "Organized health awareness programs focusing on disease prevention and wellness education.",
    icon: "🏥",
    stats: "Multiple campaigns"
  },
  {
    year: "2023",
    title: "Mission Center Establishment",
    description: "Successfully established mission centers in Dowa and Guma, creating hubs for community development.",
    icon: "⛪",
    stats: "2 centers established"
  },
  {
    year: "2024",
    title: "Regional Partnership",
    description: "Built partnerships with surrounding districts including Nkhotakota, Salima, and Ntchisi for coordinated outreach.",
    icon: "🤝",
    stats: "3 districts connected"
  }
];

const tabs = [
  { id: "circle", label: "Circle of Influence" },
  { id: "goals", label: "Goals" },
  { id: "progress", label: "Progress" },
];

export default function Mission() {
  const [activeTab, setActiveTab] = useState("circle");

  useEffect(() => {
    // Read tab from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab") || "circle";
    
    // Validate tab value
    const validTabs = ["circle", "goals", "progress"];
    if (validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set("tab", tabId);
    window.history.pushState({}, "", url);
  };

  return (
    <section id="mission" className="bg-blue-100">
      {/* Hero */}
      <div
        className="relative flex h-[60vh] w-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/mission-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative px-6 text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Our Mission
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white sm:text-xl md:text-2xl">
            To make disciples, proclaim the everlasting gospel (Three Angels'
            Messages), and prepare people for Jesus' return.
          </p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        className="mx-auto max-w-5xl px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-blue-900 sm:text-4xl">
          Why We Exist
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
          At Chia View, our mission is to serve our community through faith-driven
          initiatives, spiritual guidance, and compassionate outreach. We believe
          everyone deserves hope, support, and purpose.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="bg-white border-b-2 border-blue-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-blue-900"
                    : "text-gray-600 hover:text-blue-700"
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900 rounded-t"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {/* Circle of Influence Tab */}
          {activeTab === "circle" && (
            <motion.div
              key="circle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MapSection />
            </motion.div>
          )}

          {/* Goals Tab */}
          {activeTab === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-16"
            >
              {/* Focus Areas */}
              <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="cursor-pointer rounded-xl bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={area.icon}
                      alt={area.title}
                      width={64}
                      height={64}
                      className="mx-auto mb-4"
                    />
                    <h3 className="mb-2 text-xl font-bold text-blue-900">
                      {area.title}
                    </h3>
                    <p className="text-gray-600">{area.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Goals Description */}
              <motion.div
                className="max-w-4xl mx-auto px-6 mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                    Our Strategic Goals
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Through these three focus areas, we aim to create a comprehensive approach to community transformation:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Community Outreach:</strong> Direct support and assistance to those in need</li>
                      <li><strong>Youth Empowerment:</strong> Building the next generation of leaders and believers</li>
                      <li><strong>Spiritual Growth:</strong> Fostering deeper faith and connection with God</li>
                    </ul>
                    <p className="mt-4">
                      Our mission centers in Dowa and Guma serve as the foundation for expanding these programs 
                      throughout the central region of Malawi, reaching communities in Nkhotakota, Salima, and Ntchisi.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-16"
            >
              <div className="max-w-7xl mx-auto px-6">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-blue-900 sm:text-4xl mb-4">
                    Our Journey & Achievements
                  </h2>
                  <p className="max-w-3xl mx-auto text-lg text-gray-700">
                    See what we've accomplished as we work towards our mission of transforming communities 
                    through faith, service, and love.
                  </p>
                </motion.div>

                {/* Progress Timeline */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {progressItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-blue-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {item.description}
                          </p>
                          <div className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">
                            {item.stats}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Summary */}
                <motion.div
                  className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Impact Summary
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold mb-2">500+</div>
                      <div className="text-blue-200">Families Served</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">200+</div>
                      <div className="text-blue-200">Youth Engaged</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">5</div>
                      <div className="text-blue-200">Districts Reached</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <motion.div
        className="bg-blue-900 px-6 py-16 text-center text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Join Our Mission
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg sm:text-xl">
          Be part of Chia View Church Mission. Your support helps us reach more
          hearts and transform lives.
        </p>
        <a
          href="#contact"
          aria-label="Donate to Chia View Mission"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-blue-900 shadow-lg transition hover:bg-gray-100"
        >
          Donate Now
        </a>
      </motion.div>
    </section>
  );
}