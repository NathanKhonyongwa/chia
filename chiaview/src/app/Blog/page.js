"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden py-16 px-6">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.25em] text-blue-200 uppercase mb-4"
          >
            Stories & Updates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            Blog & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Inspiring stories, updates, and insights from our mission work
          </motion.p>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 text-center"
          >
            Featured Stories
          </motion.h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Inspiring testimonies and recent updates from our mission
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-blue-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/Blog/${post.id}`}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition inline-flex items-center gap-2"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-blue-50 to-white border-y border-blue-100">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            {/* Search */}
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-full border-2 border-blue-200 focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap justify-center md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 hover:border-blue-200"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <Link
                      href={`/Blog/${post.id}`}
                      className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition inline-flex items-center gap-1"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl font-bold text-gray-400 mb-4">No articles found</p>
              <p className="text-gray-500">Try adjusting your search or category filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-10">
            Subscribe to receive our latest mission updates and inspiring stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email..."
              className="px-6 py-3 rounded-full text-blue-900 flex-1 max-w-sm focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
