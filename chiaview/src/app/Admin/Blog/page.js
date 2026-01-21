"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function BlogManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Testimonies",
    excerpt: "",
    content: "",
    image_url: "",
    featured: false,
    published: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // UI filters
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [publishedFilter, setPublishedFilter] = useState("all"); // all | published | drafts
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const categories = useMemo(
    () => ["All", "Testimonies", "Youth", "Mission", "Spiritual", "Community", "Events"],
    []
  );

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Authenticate user
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
    }
  }, [admin, router]);

  const fetchPosts = async ({ signal } = {}) => {
    setLoading(true);
    setError(null);

    const offset = (page - 1) * pageSize;
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (categoryFilter && categoryFilter !== "All") params.set("category", categoryFilter);
    if (publishedFilter === "published") params.set("published", "true");
    if (publishedFilter === "drafts") params.set("published", "false");
    params.set("limit", String(pageSize));
    params.set("offset", String(offset));

    try {
      const res = await fetch(`/api/blogposts?${params.toString()}`, { signal });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load blog posts");
      }
      setPosts(Array.isArray(json.posts) ? json.posts : []);
      setTotal(Number.isFinite(json.total) ? json.total : 0);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e.message || "Failed to load blog posts");
      showToast(e.message || "Failed to load blog posts", "error");
    } finally {
      setLoading(false);
    }
  };

  // Load posts from Supabase via API
  useEffect(() => {
    if (!admin) return;
    const controller = new AbortController();
    fetchPosts({ signal: controller.signal });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, page, pageSize, query, categoryFilter, publishedFilter]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    if (editingId) {
      // Optimistic update
      const prev = posts;
      const optimistic = prev.map((p) =>
        p.id === editingId
          ? { ...p, ...formData, updated_at: new Date().toISOString(), __optimistic: true }
          : p
      );
      setPosts(optimistic);

      try {
        const res = await fetch(`/api/blogposts/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to update blog post");
        }
        setPosts((curr) => curr.map((p) => (p.id === editingId ? json.post : p)));
        showToast("Blog post updated successfully!", "success");
        setEditingId(null);
      } catch (e) {
        setPosts(prev);
        showToast(e.message || "Failed to update blog post", "error");
      } finally {
        setIsSaving(false);
      }
    } else {
      // Optimistic create
      const tempId = `temp-${Date.now()}`;
      const now = new Date().toISOString();
      const optimistic = {
        id: tempId,
        ...formData,
        created_at: now,
        updated_at: now,
        __optimistic: true,
      };
      setPosts((curr) => [optimistic, ...curr]);
      setTotal((t) => t + 1);

      try {
        const res = await fetch("/api/blogposts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to create blog post");
        }
        setPosts((curr) => curr.map((p) => (p.id === tempId ? json.post : p)));
        showToast("Blog post created successfully!", "success");
      } catch (e) {
        setPosts((curr) => curr.filter((p) => p.id !== tempId));
        setTotal((t) => Math.max(0, t - 1));
        showToast(e.message || "Failed to create blog post", "error");
      } finally {
        setIsSaving(false);
      }
    }

    setFormData({
      title: "",
      category: "Testimonies",
      excerpt: "",
      content: "",
      image_url: "",
      featured: false,
      published: true,
    });
    setShowForm(false);
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url || "",
      featured: !!post.featured,
      published: !!post.published,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const prev = posts;
    setPosts((curr) => curr.filter((p) => p.id !== id));
    setTotal((t) => Math.max(0, t - 1));

    try {
      const res = await fetch(`/api/blogposts/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete blog post");
      }
      showToast("Blog post deleted successfully!", "success");
    } catch (e) {
      setPosts(prev);
      setTotal((t) => t + 1);
      showToast(e.message || "Failed to delete blog post", "error");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      category: "Testimonies",
      excerpt: "",
      content: "",
      image_url: "",
      featured: false,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

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
            <p className="text-3xl font-bold text-white">{total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Published</p>
            <p className="text-3xl font-bold text-white">
              {posts.filter((p) => p.published).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Categories</p>
            <p className="text-3xl font-bold text-white">
              {new Set(posts.map((p) => p.category)).size || "0"}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-8"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-white font-semibold mb-2">Search</label>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title or excerpt..."
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border-2 border-gray-600 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-600 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Status</label>
              <select
                value={publishedFilter}
                onChange={(e) => {
                  setPublishedFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-600 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="drafts">Drafts</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-700 text-red-200 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
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
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-white font-semibold mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-blue-600 focus:outline-none"
                />
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

              {/* Toggles */}
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <input
                    type="checkbox"
                    name="published"
                    checked={!!formData.published}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  Published
                </label>
                <label className="flex items-center gap-3 text-white font-semibold">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={!!formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  Featured
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition"
                >
                  {isSaving ? "Saving..." : editingId ? "Update Post" : "Create Post"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
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
          <h2 className="text-2xl font-bold text-white mb-6">Posts</h2>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse"
                >
                  <div className="h-5 bg-gray-600 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-gray-600 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-600 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-200 text-lg font-semibold mb-2">No posts found</p>
              <p className="text-gray-400">Try adjusting your filters or create a new post.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600 hover:border-blue-600 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white">
                          {post.title}{" "}
                          {post.__optimistic && (
                            <span className="text-xs text-yellow-300 font-semibold">(saving...)</span>
                          )}
                        </h3>
                        <span className="text-xs font-bold text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            post.published
                              ? "bg-green-900/40 text-green-300"
                              : "bg-yellow-900/40 text-yellow-300"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                        {post.featured && (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-900/40 text-purple-300">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                        <span>✏️ Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleEdit(post)}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDelete(post.id)}
                        disabled={isSaving}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg transition"
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

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between text-gray-300">
          <div className="text-sm">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
