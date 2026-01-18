"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar/page";


const teamValues = [
  {
    title: "Faithfulness to Scripture",
    description:
      "We hold the Bible as our only rule of faith and practice, proclaiming the everlasting gospel as revealed in the Three Angels' Messages.",
    icon: "📖",
  },
  {
    title: "Compassionate Service",
    description:
      "Following Christ's example, we serve the vulnerable through practical help, always pointing people to the hope found in Jesus.",
    icon: "🤝",
  },
  {
    title: "Community Transformation",
    description:
      "We believe lasting change happens when hearts are transformed by the gospel, leading to stronger families, empowered youth, and vibrant communities.",
    icon: "🌱",
  },
  {
    title: "Unity in Christ",
    description:
      "As a local expression of the body of Christ, we welcome all who seek truth and fellowship, working together until Jesus returns.",
    icon: "🙏",
  },
];


export default function About() {
  return (
    
    <section className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div
        className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/about-hero.jpg')" }} // Replace with your image (e.g., church gathering, community, or landscape)
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-5xl px-6 text-center text-white"
        >
          <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl tracking-tight">
            About Chia View Church Mission
          </h1>
          <p className="mx-auto max-w-4xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed">
            A community of believers in Central Malawi, called to proclaim hope, serve with love, and prepare hearts for Christ's soon return.
          </p>
        </motion.div>
      </div>

      {/* Who We Are */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-5xl px-6 py-20 text-center"
      >
        <h2 className="mb-8 text-4xl md:text-5xl font-bold text-blue-900">
          Who We Are
        </h2>
        <div className="prose prose-lg mx-auto max-w-4xl text-gray-800 leading-relaxed">
          <p>
            Chia View Church Mission is a vibrant Seventh-day Adventist community based in the Central Region of Malawi, with mission centers in{" "}
            <strong>Dowa</strong> and <strong>Guma</strong>. Rooted in the timeless truths of Scripture, we are committed to living and sharing the{" "}
            <strong>Three Angels' Messages</strong> of Revelation 14 — calling people to worship the Creator, announcing Christ's soon return, and inviting all to receive His grace and truth.
          </p>
          <p className="mt-6">
            Our name reflects our vision: to be a{" "}
            <strong>"Chia View"</strong> — a place where people can clearly see the love of Jesus reflected in our lives, our service, and our hope in His promised return.
          </p>
        </div>
      </motion.div>

      {/* Our Story / Where We Serve */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-blue-900">
              Our Journey in Malawi
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              From humble beginnings, God has grown our ministry to reach beyond our local congregations. Today, our mission centers in Dowa and Guma serve as hubs for worship, discipleship, and outreach across the central region.
            </p>
            <p className="text-lg text-gray-700">
              We extend our reach through partnerships and programs into neighboring districts including Nkhotakota, Salima, Ntchisi, and beyond — bringing food relief, health education, youth mentorship, Bible studies, and the hope of the gospel to families and communities in need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-blue-200"
          >
            <Image
              src="/map-malawi-central.jpg" // Replace with your actual map image or use MapSection component
              alt="Central Malawi - Our Reach"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-blue-900/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-4xl font-bold text-blue-900"
          >
            What Guides Us
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center border border-blue-100"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-blue-900 py-20 px-6 text-center text-white"
      >
        <h2 className="mb-6 text-4xl md:text-5xl font-bold">
          Be Part of What God Is Doing
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl">
          Whether you're seeking truth, looking for fellowship, or wanting to serve — there's a place for you at Chia View Church Mission.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/Register"
            className="inline-block rounded-full bg-white px-10 py-5 text-xl font-bold text-blue-900 shadow-xl hover:bg-gray-100 transition hover:scale-105"
          >
            Join Our Family
          </Link>
          <Link
            href="#contact"
            className="inline-block rounded-full bg-transparent border-2 border-white px-10 py-5 text-xl font-bold hover:bg-white/10 transition"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
}