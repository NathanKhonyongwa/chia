"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export default function Mission() {
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

      {/* Focus Areas */}
      <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-3">
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
