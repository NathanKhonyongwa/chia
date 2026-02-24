"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ContactForm from "@/components/ContactForm";
import CTACards from "@/components/CTACards";
import NewsletterSignup from "@/components/NewsletterSignup";
import PrayerRequestForm from "@/components/PrayerRequestForm";
import Footer from "./Footer/page";
import ThemeToggle from "@/components/ThemeToggle";

const heroSlides = [
  {
    id: 1,
    image: "/1.JPG",
    title: "Welcome to Chia View",
    description: "Spreading Hope & God's Love",
    linkHref: "/Mission",
    linkText: "Explore Our Mission",
    gradient: "from-blue-900/90 via-purple-900/70 to-black/80"
  },
  {
    id: 2,
    image: "/2.JPG",
    title: "Faith in Action",
    description: "Transforming lives through compassion and service",
    linkHref: "/Mission",
    linkText: "See Our Impact",
    gradient: "from-emerald-900/90 via-teal-900/70 to-black/80"
  },
  {
    id: 3,
    image: "/3.JPG",
    title: "Join Our Community",
    description: "Be part of something greater than yourself",
    linkHref: "#contact",
    linkText: "Get In Touch",
    gradient: "from-amber-900/90 via-orange-900/70 to-black/80"
  }
];

const coreValues = [
  {
    title: "Faith",
    description: "A deep commitment to God's word and following Christ's teachings",
    icon: "✝️",
    color: "from-blue-600 to-indigo-600",
    lightColor: "from-blue-50 to-indigo-50"
  },
  {
    title: "Compassion",
    description: "Serving others with genuine care and unconditional love",
    icon: "❤️",
    color: "from-red-600 to-pink-600",
    lightColor: "from-red-50 to-pink-50"
  },
  {
    title: "Community",
    description: "Building strong connections and lifting each other up",
    icon: "🤝",
    color: "from-green-600 to-emerald-600",
    lightColor: "from-green-50 to-emerald-50"
  },
  {
    title: "Hope",
    description: "Offering inspiration and positivity through challenging times",
    icon: "💫",
    color: "from-yellow-600 to-amber-600",
    lightColor: "from-yellow-50 to-amber-50"
  }
];

const whatWeDo = [
  {
    title: "Community Outreach",
    description: "Supporting vulnerable families through education, health, and direct assistance",
    icon: "🤲",
    stats: "500+ Families Helped",
    color: "from-blue-600 to-cyan-600"
  },
  {
    title: "Spiritual Growth",
    description: "Nurturing faith through prayer meetings, worship, and Bible studies",
    icon: "📖",
    stats: "50+ Weekly Gatherings",
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Youth Empowerment",
    description: "Mentoring the next generation with leadership and spiritual guidance",
    icon: "🌟",
    stats: "200+ Youth Mentored",
    color: "from-green-600 to-teal-600"
  }
];

const stats = [
  { number: "1000+", label: "Lives Impacted", icon: "❤️" },
  { number: "50+", label: "Community Programs", icon: "🤝" },
  { number: "15+", label: "Years of Service", icon: "⭐" },
  { number: "100+", label: "Active Volunteers", icon: "🙏" }
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      {/* 🖼️ Hero Section - Enhanced with Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden" 
        aria-label="Hero section"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: '.hero-pagination'
            }}
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
            }}
            className="h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                  
                  <div className="relative z-10 text-center px-4 py-12 max-w-5xl mx-auto w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="mb-6"
                    >
                      <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wider border border-white/30">
                        CENTRAL MALAWI CONFERENCE
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight"
                    >
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block hover:scale-105 transition-transform duration-300 mr-4">
                          {word}
                        </span>
                      ))}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                      <Link
                        href={slide.linkHref}
                        className="group inline-flex items-center bg-white text-gray-900 font-bold py-5 px-12 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 text-lg relative overflow-hidden"
                      >
                        <span className="relative z-10">{slide.linkText}</span>
                        <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-500" />
                      </Link>

                      <Link
                        href="/about"
                        className="group inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-5 px-12 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 text-lg"
                      >
                        Learn More
                        <svg className="w-5 h-5 ml-3 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Custom Navigation Arrows */}
        <button className="hero-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 border border-white/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="hero-next absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 border border-white/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" />
      </section>

      {/* 📊 Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 Core Values Section - Enhanced */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" aria-label="Our core values">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              WHY WE DO WHAT WE DO
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do as we serve our community and spread God's love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group perspective"
              >
                <div className={`relative bg-gradient-to-br ${value.lightColor} p-1 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700`}>
                  <div className="bg-white rounded-3xl p-10 h-full transform transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                    {/* Floating Icon */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500"
                    >
                      {value.icon}
                    </motion.div>

                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {value.description}
                    </p>

                    <div className={`h-1 w-16 bg-gradient-to-r ${value.color} rounded-full group-hover:w-24 transition-all duration-500`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💼 What We Do Section - Enhanced */}
      <section className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden" aria-label="What we do">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              OUR IMPACT
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Through faith and dedication, we make a tangible difference in our communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                <div className="relative bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-blue-100 transition-all duration-500">
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-bl-3xl rounded-tr-3xl`} />
                  
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>

                  <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {item.description}
                  </p>

                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-500 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>{item.stats}</span>
                  </div>

                  <Link 
                    href={`/ministries/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-semibold group-hover:underline`}
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTACards />

      {/* Newsletter Section - Enhanced */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              ✝️
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
              Ready to Make a Difference?
            </h2>

            <p className="text-2xl lg:text-3xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Join us in spreading hope and God's love throughout our community
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/Mission"
                className="group relative inline-flex items-center bg-white text-gray-900 font-bold py-6 px-14 rounded-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-xl overflow-hidden"
              >
                <span className="relative z-10">Explore Our Mission</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <Link
                href="#contact"
                className="group inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-6 px-14 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 text-xl relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>

            <p className="text-blue-200 text-lg mt-12">
              Join <span className="font-bold text-white">100+</span> volunteers already making an impact
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section id="contact" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/world-map.svg')] bg-no-repeat bg-right-top opacity-5" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              GET IN TOUCH
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-green-900 to-teal-900 bg-clip-text text-transparent">
                Connect With Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you and pray with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-500"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Send us a message</h3>
              </div>
              <ContactForm />
            </motion.div>

            {/* Prayer Request Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 lg:p-10 border border-purple-100 hover:shadow-3xl transition-shadow duration-500"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Prayer Requests</h3>
              </div>
              <PrayerRequestForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}