"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";

// Sample blog posts (in production, this would come from a database)
const blogPosts = [
  {
    id: "1",
    title: "Spreading Hope Through Community Service",
    category: "Testimonies",
    author: "Pastor John",
    date: "March 15, 2024",
    excerpt: "How our community service initiatives are transforming lives and spreading hope...",
    content: `In the past few months, our church has been actively engaged in spreading hope through various community service initiatives. 

From feeding programs to educational support, we have seen remarkable transformations in the lives of those we serve. This article explores the stories of individuals whose lives have been touched by our mission.

Our commitment to serving others stems from the core belief that every person deserves dignity and compassion. Whether it's through our food distribution program, educational scholarships, or spiritual guidance, we aim to meet people where they are and support them in their journey.

The response from the community has been overwhelming. Many families have expressed their gratitude for the support they've received, and we continue to be inspired by their resilience and courage.

As we move forward, we are committed to expanding our programs and reaching more families in need. We believe that together, we can create a more compassionate and hopeful community.`,
    image: "/blog-default.jpg",
  },
  {
    id: "2",
    title: "Youth Empowerment Through Education and Mentorship",
    category: "Youth",
    author: "Pastor Faith",
    date: "March 10, 2024",
    excerpt: "Investing in our youth through education and mentorship programs...",
    content: `Education is the foundation of a better future, and our youth program is dedicated to providing quality educational support and mentorship to young people in our community.

We understand that many young people face challenges in their educational journey. Through our tutoring programs, scholarship opportunities, and mentorship initiatives, we aim to remove barriers and empower youth to reach their full potential.

Our mentors work closely with students to not only improve their academic performance but also to instill values of integrity, hard work, and compassion. The results have been inspiring, with many of our mentees going on to pursue higher education and making significant contributions to society.

The youth program is a testament to our belief that investing in young people is investing in the future of our community. We are grateful for the mentors and volunteers who dedicate their time and energy to this important cause.`,
    image: "/blog-default.jpg",
  },
  {
    id: "3",
    title: "Our Mission: Transforming Lives Through Faith",
    category: "Mission",
    author: "Pastor Mike",
    date: "March 5, 2024",
    excerpt: "Understanding the heart of our church's mission and vision...",
    content: `At the heart of our church lies a simple yet powerful mission: to transform lives through faith, compassion, and service.

We believe that every person has the potential to achieve greatness when given the right support and encouragement. Our mission is to provide that support through spiritual guidance, practical assistance, and community engagement.

Over the years, we have witnessed countless transformations. Families have been reunited, individuals have found purpose and direction, and communities have been strengthened through our collective efforts.

Our mission extends beyond our immediate community. We are committed to making a global impact by supporting various international mission projects and partnering with organizations that share our vision.

As we continue on this journey, we invite you to be part of something bigger than yourself. Whether through volunteering, donating, or simply spreading the word, your contribution matters and makes a difference.`,
    image: "/blog-default.jpg",
  },
];

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const id = params.id;

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-6">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/Blog")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            ← Back to Blog
          </motion.button>
        </div>
      </section>
    );
  }

  const handleShare = () => {
    const url = `${window.location.origin}/Blog/${id}`;
    navigator.clipboard.writeText(url);
    showToast("Link copied to clipboard!", "success");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-12 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/Blog" className="text-blue-200 hover:text-white mb-6 flex items-center gap-2">
            ← Back to Blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block bg-blue-500/50 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-6 text-blue-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold">By</span>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{post.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-12 mb-12"
        >
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl shadow-xl"
            />
          </motion.div>

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            <div className="text-white space-y-6 leading-relaxed text-lg">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-600"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Share This Post</h3>
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                🔗 Copy Link
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://www.facebook.com/sharer/sharer.php?u=${window?.location?.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                f Share on Facebook
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://twitter.com/intent/tweet?url=${window?.location?.href}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                𝕏 Share on Twitter
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Related Posts</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts
              .filter((p) => p.id !== id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 cursor-pointer"
                  onClick={() => router.push(`/Blog/${relatedPost.id}`)}
                >
                  <h4 className="text-xl font-bold text-white mb-2">{relatedPost.title}</h4>
                  <p className="text-gray-400 mb-4">{relatedPost.excerpt}</p>
                  <span className="text-blue-400 hover:text-blue-300">Read More →</span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
