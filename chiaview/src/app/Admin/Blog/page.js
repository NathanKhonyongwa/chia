"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { useDatabase } from "@/hooks/useDatabase";

const STORAGE_KEY = "chiaview_blog_posts";

export default function BlogManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();
  const { data: postsRaw, saveData: savePosts, loading, error } = useDatabase(STORAGE_KEY, []);
  const posts = Array.isArray(postsRaw) ? postsRaw : [];

  const [formData, setFormData] = useState({
    title: "",
    category: "Testimonies",
    excerpt: "",
    content: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Authenticate user
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
    }
  }, [admin, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast("Please enter a title", "error");
      return false;
    }
    if (!formData.excerpt.trim()) {
      showToast("Please enter an excerpt", "error");
      return false;
    }
    if (!formData.content.trim()) {
      showToast("Please enter content", "error");
      return false;
    }
    if (formData.title.length > 100) {
      showToast("Title should be less than 100 characters", "error");
      return false;
    }
    if (formData.excerpt.length > 200) {
      showToast("Excerpt should be less than 200 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      // Update existing post
      const updatedPosts = posts.map((post) =>
        post.id === editingId
          ? { ...post, ...formData, updatedAt: new Date().toISOString() }
          : post
      );
      savePosts(updatedPosts);
      showToast("Blog post updated successfully!", "success");
      setEditingId(null);
    } else {
      // Create new post
      const newPost = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: true,
      };
      savePosts([newPost, ...posts]);
      showToast("Blog post created successfully!", "success");
    }

    setFormData({ title: "", category: "Testimonies", excerpt: "", content: "" });
    setShowForm(false);
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      savePosts(posts.filter((post) => post.id !== id));
      showToast("Blog post deleted successfully!", "success");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", category: "Testimonies", excerpt: "", content: "" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => router.push("/Admin")}
            className="text-blue-400 hover:text-blue-300 mb-6 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Blog Management</h1>
          <p className="text-gray-400">Create, edit, and manage your blog posts</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Total Posts</p>
            <p className="text-3xl font-bold text-white">{posts.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Published</p>
            <p className="text-3xl font-bold text-white">{posts.filter((p) => p.published).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Categories</p>
            <p className="text-3xl font-bold text-white">
              {new Set(posts.map((p) => p.category)).size || "0"}
            </p>
          </div>
        </motion.div>

        {/* Form Section */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 mb-8 border border-gray-600"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog post title"
                  maxLength="100"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-blue-600 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border-2 border-gray-500 focus:border-blue-600 focus:outline-none"
                >
                  <option>Testimonies</option>
                  <option>Youth</option>
                  <option>Mission</option>
                  <option>Spiritual</option>
                  <option>Community</option>
                  <option>Events</option>
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-white font-semibold mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your post (shown in listings)"
                  maxLength="200"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-blue-600 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.excerpt.length}/200 characters</p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-white font-semibold mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Full blog post content (separate paragraphs with empty lines)"
                  rows="10"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-blue-600 focus:outline-none font-mono text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Markdown formatting supported</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  {editingId ? "Update Post" : "Publish Post"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Add New Button */}
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg mb-8 transition"
          >
            ✍️ Create New Post
          </motion.button>
        )}

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Published Posts</h2>

          {posts.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg">No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600 hover:border-blue-600 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        <span className="text-xs font-bold text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>✏️ Last updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(post)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        🗑️ Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
