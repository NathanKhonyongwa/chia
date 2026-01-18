"use client";
import Navbar from "../Navbar/page";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutUsPage() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <Navbar />

      {/* Enhanced Hero Banner */}
      <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-indigo-900/50"
          style={{ backgroundImage: "url('/2.JPG')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <motion.div
          className="text-center px-6 relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [-2, 2, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl leading-tight">
              About Us
            </h1>
          </motion.div>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover the heart of Chia View Church Mission – where faith meets community.
          </motion.p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.section
        className="max-w-5xl mx-auto text-center py-24 px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10 blur-xl"></div>
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-8">
            Our Mission
          </h2>
        </motion.div>
        <motion.p 
          className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          variants={itemVariants}
        >
          At Chia View Church Mission, we are dedicated to spreading hope, love, and spiritual growth.
          We serve our community through worship, education, outreach programs, and holistic support.
        </motion.p>
      </motion.section>

      {/* Enhanced Values - Glassmorphism */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl sm:text-5xl font-black text-center mb-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Faith",
                description: "We are rooted in unwavering faith, guiding every action with love and devotion.",
                icon: "/pray.png",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                title: "Community", 
                description: "We build strong, supportive communities that uplift and strengthen one another.",
                icon: "/comm.png",
                gradient: "from-emerald-500 to-teal-600"
              },
              {
                title: "Service",
                description: "We serve with compassion, helping those in need through dedicated outreach programs.",
                icon: "/youth.png",
                gradient: "from-purple-500 to-pink-600"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`group relative bg-white/60 backdrop-blur-xl rounded-3xl p-10 text-center hover:scale-105 transition-all duration-500 border border-white/30 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/25 overflow-hidden cursor-pointer ${value.gradient} bg-gradient-to-br`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.img 
                    src={value.icon} 
                    alt={value.title} 
                    className="mx-auto mb-6 h-20 w-20 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  />
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{value.title}</h3>
                  <p className="text-white/90 leading-relaxed drop-shadow-md">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Leadership */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 
          className="text-4xl sm:text-5xl font-black text-center mb-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Leadership
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: "Pastor John Phiri", role: "CMC President", img: "/team/pastor.jpg" },
            { name: "Pastor Paul Kamgoma", role: "Executive Secretary", img: "/team/jane.jpg" },
            { name: "Elder Chipatla", role: "Chief Financial Officer", img: "/team/mark.jpg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-white/70 to-gray-50/50 backdrop-blur-xl rounded-3xl overflow-hidden hover:scale-105 transition-all duration-700 border border-white/40 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/25 cursor-pointer relative"
              variants={itemVariants}
              whileHover={{ y: -15 }}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 text-center relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-900 font-semibold text-lg bg-white/50 px-4 py-2 rounded-full inline-block backdrop-blur-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Enhanced Call to Action */}
      <motion.section
        className="relative py-24 px-6 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join Our Journey
          </motion.h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Be part of our mission to bring hope, love, and transformation to our community.
          </p>
          <motion.a
            href="#contact"
            className="group inline-flex items-center bg-white text-blue-900 font-bold py-6 px-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-xl backdrop-blur-sm border-4 border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved Today
            <svg className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </motion.section>
    </section>
  );
}
