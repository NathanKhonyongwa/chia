"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "../Footer/page";

const blogPosts = [
  {
    id: 1,
    title: "God's Love Never Fails - Stories of Transformation",
    category: "Testimonies",
    date: "January 15, 2026",
    excerpt: "Meet families whose lives have been transformed through faith and community support. Real stories of hope and healing.",
    image: "/blog-1.jpg",
    content: "In the heart of Guma, Dowa District, we've witnessed remarkable transformations as families experience God's love through our community programs. These aren't just stories - they're powerful testimonies of faith in action.",
    featured: true,
  },
  {
    id: 2,
    title: "Youth Leadership Training - Raising the Next Generation",
    category: "Youth",
    date: "January 12, 2026",
    excerpt: "Our youth mentorship program is equipping the next generation with skills, faith, and confidence to lead with purpose.",
    image: "/blog-2.jpg",
    content: "Through intensive workshops, Bible studies, and practical training, we're investing in young leaders who will impact their communities for decades to come.",
    featured: true,
  },
  {
    id: 3,
    title: "Community Outreach Success: 500+ Families Served",
    category: "Mission",
    date: "January 8, 2026",
    excerpt: "By God's grace, we've reached over 500 families with food, health support, and spiritual guidance this year.",
    image: "/blog-3.jpg",
    content: "Our community outreach initiatives continue to make tangible differences in the lives of vulnerable families across five districts.",
    featured: true,
  },
  {
    id: 4,
    title: "Prayer Changes Things - Join Our Prayer Network",
    category: "Spiritual",
    date: "January 5, 2026",
    excerpt: "Discover how consistent prayer is transforming our mission, our communities, and our hearts.",
    image: "/blog-4.jpg",
    content: "Prayer is the foundation of everything we do. Join our growing prayer network and be part of spiritual transformation.",
  },
  {
    id: 5,
    title: "Health Campaigns Making Real Impact",
    category: "Outreach",
    date: "December 28, 2025",
    excerpt: "Free health screenings, education, and preventive care reaching families in remote areas.",
    image: "/blog-5.jpg",
    content: "Our health initiatives combine medical care with spiritual support, addressing the whole person.",
  },
  {
    id: 6,
    title: "Education Support Programs - Breaking Cycles",
    category: "Mission",
    date: "December 20, 2025",
    excerpt: "Education is a gateway to opportunity. See how we're supporting vulnerable children in their academic journey.",
    image: "/blog-6.jpg",
    content: "Through scholarships, tutoring, and mentorship, we're opening doors for children who wouldn't otherwise have access to quality education.",
  },
];

const categories = ["All", "Testimonies", "Youth", "Mission", "Spiritual", "Outreach"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
      const searchMatch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section - Fully Responsive */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        {/* Animated Background Elements - Hidden on mobile */}
        <motion.div
          className="absolute top-20 left-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-400 rounded-full opacity-10 blur-3xl hidden sm:block"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white rounded-full opacity-5 blur-3xl hidden sm:block"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center px-2 sm:px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-blue-200 uppercase mb-3 sm:mb-4"
          >
            Stories & Updates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
          >
            Blog & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Inspiring stories, updates, and insights from our mission work
          </motion.p>
        </div>
      </section>

      {/* Featured Posts Section - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 text-center px-2"
          >
            Featured Stories
          </motion.h2>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
            Inspiring testimonies and recent updates from our mission
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-blue-100 hover:border-blue-300"
              >
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  {/* Featured Badge */}
                  <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/Blog/${post.id}`}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition inline-flex items-center gap-2 group"
                  >
                    Read More 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section - Fully Responsive */}
      <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white border-y border-blue-100">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center"
          >
            {/* Search - Full width on mobile */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-blue-200 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-sm sm:text-base"
                />
                <svg 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Categories - Scrollable on mobile */}
            <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <div className="flex gap-2 lg:gap-3 min-w-max lg:min-w-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          {filteredPosts.length > 0 ? (
            <>
              {/* Results count */}
              <div className="mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-gray-600">
                  Showing <span className="font-bold text-blue-600">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 3) * 0.1 }}
                    className="group rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-200 flex flex-col h-full"
                  >
                    <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden bg-gray-200">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/Blog/${post.id}`}
                        className="text-blue-600 font-semibold text-xs sm:text-sm hover:text-blue-800 transition inline-flex items-center gap-1 mt-auto group"
                      >
                        Read More 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16 lg:py-20 px-4"
            >
              <div className="text-6xl sm:text-7xl mb-4">📰</div>
              <p className="text-xl sm:text-2xl font-bold text-gray-400 mb-2">No articles found</p>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your search or category filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Stay Updated
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-10 px-4 leading-relaxed">
            Subscribe to receive our latest mission updates and inspiring stories
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-xl px-4">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-full text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all text-sm sm:text-base"
              />
            </div>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-white/50 text-sm sm:text-base">
              Subscribe
            </button>
          </div>
          
          <p className="text-xs sm:text-sm text-blue-200 mt-4">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </section>
      
      <Footer />
    </>
  );
}