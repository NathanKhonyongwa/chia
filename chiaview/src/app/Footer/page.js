import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
              Chia View
            </h2>
            <p className="text-blue-100/80 leading-relaxed mb-6 max-w-md text-lg">
              Spreading hope and God's love through faith, compassion, and community service.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-6 text-white border-b-2 border-blue-500/50 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {['About Us', 'Our Mission', 'Events', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-blue-100/70 hover:text-white flex items-center gap-2 transition-all duration-300 hover:translate-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ministries */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-6 text-white border-b-2 border-blue-500/50 pb-2 inline-block">
              Ministries
            </h3>
            <ul className="space-y-4">
              {['Youth', 'Women', 'Men', 'Children'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-blue-100/70 hover:text-white flex items-center gap-2 transition-all duration-300 hover:translate-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter - Fully Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold mb-6 text-white border-b-2 border-blue-500/50 pb-2 inline-block">
              Stay Connected
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-blue-100/80">
                <span className="text-xl shrink-0">📍</span>
                <span className="break-words">123 Faith Avenue, Hope City, 12345</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <span className="text-xl shrink-0">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <span className="text-xl shrink-0">✉️</span>
                <span className="break-all">hello@chiaview.org</span>
              </div>
            </div>

            {/* Newsletter - Fully Responsive Form */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <span className="text-xl">✨</span>
                Newsletter
              </h4>
              <p className="text-sm text-blue-100/70 mb-4">
                Get weekly updates and inspirational messages.
              </p>
              
              {/* Responsive Form Stack */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-5 py-4 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-100/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-base"
                />
                <button className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              {/* Mobile-friendly hint */}
              <p className="text-xs text-blue-100/50 mt-3">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-blue-100/60 text-sm text-center md:text-left">
              © {currentYear} Chia View Ministries. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
              {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-blue-100/60 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
            
            <div className="text-blue-100/60 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Made with faith 🙏
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;