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
      {/* 🖼️ Hero Section - Fixed Swiper Layout */}
      <section className="relative min-h-screen w-full overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              el: '.hero-pagination'
            }}
            className="h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div 
                  className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
                  <div className="relative z-10 text-center px-4 py-12 max-w-4xl mx-auto w-full">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Link
                        href={slide.linkHref}
                        className="inline-flex items-center bg-white/90 hover:bg-white text-blue-900 font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-3xl backdrop-blur-md border-2 border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg"
                        aria-label={`${slide.linkText} - ${slide.title}`}
                      >
                        {slide.linkText}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Custom Pagination */}
        <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2" />
      </section>

      {/* 🎯 Core Values Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white" aria-label="Our core values">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do as we serve our community and spread God's love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-50 hover:border-blue-100 hover:-translate-y-3 transition-all duration-500 cursor-pointer"
              >
                <div className="text-6xl lg:text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💼 What We Do Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white" aria-label="What we do">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Through faith and dedication, we make a tangible difference in our communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-gradient-to-br from-white to-blue-50 p-12 rounded-3xl shadow-lg hover:shadow-2xl border-l-8 border-blue-500 hover:-translate-y-4 transition-all duration-500 cursor-pointer hover:bg-blue-50"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials, CTA, Newsletter, Contact sections remain the same */}
      <TestimonialsCarousel />
      <CTACards />
      
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join us in spreading hope and God's love throughout our community
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/Mission"
                className="bg-white text-blue-900 font-bold py-5 px-12 rounded-3xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-xl"
              >
                Explore Our Mission
              </Link>
              <Link
                href="#contact"
                className="bg-transparent border-2 border-white text-white font-bold py-5 px-12 rounded-3xl hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-xl backdrop-blur-sm"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ContactForm />
            <PrayerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
