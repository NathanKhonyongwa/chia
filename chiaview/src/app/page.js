/**
 * Home - Main landing page with inspiring hero and purpose-driven sections
 * Features:
 * - Swiper carousel with fade effect
 * - Inspiring sections about faith and community
 * - Call-to-action buttons linking to mission and contact
 * - Contact form integration
 * - Accessibility features throughout
 */

"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ContactForm from "@/components/ContactForm";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTACards from "@/components/CTACards";
import NewsletterSignup from "@/components/NewsletterSignup";
import PrayerRequestForm from "@/components/PrayerRequestForm";
import Image from "next/image";

/**
 * Hero slides data with inspiring messages
 */
const heroSlides = [
  {
    id: 1,
    image: "/1.JPG",
    title: "Welcome to Chia View",
    description: "Spreading Hope & God's Love",
    linkHref: "/Mission",
    linkText: "Explore Our Mission"
  },
  {
    id: 2,
    image: "/2.JPG",
    title: "Faith in Action",
    description: "Transforming lives through compassion and service",
    linkHref: "/Mission",
    linkText: "See Our Impact"
  },
  {
    id: 3,
    image: "/3.JPG",
    title: "Join Our Community",
    description: "Be part of something greater than yourself",
    linkHref: "#contact",
    linkText: "Get In Touch"
  }
];

/**
 * Core values showcasing what we believe in
 */
const coreValues = [
  {
    title: "Faith",
    description: "A deep commitment to God's word and following Christ's teachings",
    icon: "✝️"
  },
  {
    title: "Compassion",
    description: "Serving others with genuine care and unconditional love",
    icon: "❤️"
  },
  {
    title: "Community",
    description: "Building strong connections and lifting each other up",
    icon: "🤝"
  },
  {
    title: "Hope",
    description: "Offering inspiration and positivity through challenging times",
    icon: "💫"
  }
];

/**
 * What we do - Brief overview of our work
 */
const whatWeDo = [
  {
    title: "Community Outreach",
    description: "Supporting vulnerable families through education, health, and direct assistance"
  },
  {
    title: "Spiritual Growth",
    description: "Nurturing faith through prayer meetings, worship, and Bible studies"
  },
  {
    title: "Youth Empowerment",
    description: "Mentoring the next generation with leadership and spiritual guidance"
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full dark:bg-gray-900" aria-label="Hero section">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="h-screen"
          aria-label="Hero carousel"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
                role="img"
                aria-label={`Slide ${slide.id}: ${slide.title}`}
              >
                <Image
                  src={slide.image}
                  alt={`Hero image for ${slide.title}`}
                  fill
                  className="object-cover"
                  priority={slide.id === 1} // Only prioritize the first image
                  sizes="100vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" aria-hidden="true"></div>
                <div className="relative text-center px-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 animate-fadeIn delay-200">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.linkHref}
                    className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fadeIn delay-400"
                    aria-label={`${slide.linkText} - ${slide.title}`}
                  >
                    {slide.linkText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800" aria-label="Our core values">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do as we serve our community and spread God's love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" aria-label="What we do">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Through faith and dedication, we make a tangible difference in our communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-800 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* CTA Cards Section */}
      <CTACards />

      {/* Newsletter Signup Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-blue-900 text-white" aria-label="Call to action">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              Whether you want to learn more about our mission, volunteer your time, or simply connect with our community, 
              we'd love to hear from you. Join us in spreading hope and God's love.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/Mission"
                className="bg-white text-blue-900 font-semibold py-3 px-10 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Explore Our Mission
              </Link>
              <a
                href="#contact"
                className="bg-blue-700 text-white font-semibold py-3 px-10 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg border-2 border-white"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-800" aria-label="Contact form">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <PrayerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}