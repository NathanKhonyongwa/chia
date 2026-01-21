"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function OpportunitiesManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [opportunities, setOpportunities] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    description: "",
    category: "Outreach",
    published: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [publishedFilter, setPublishedFilter] = useState("all"); // all | published | drafts
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const categories = useMemo(
    () => ["All", "Outreach", "Youth", "Education", "Health", "Administration", "Spiritual"],
    []
  );

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const fetchOpportunities = async ({ signal } = {}) => {
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
      const res = await fetch(`/api/opportunities?${params.toString()}`, { signal });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load opportunities");
      }
      setOpportunities(Array.isArray(json.opportunities) ? json.opportunities : []);
      setTotal(Number.isFinite(json.total) ? json.total : 0);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e.message || "Failed to load opportunities");
      showToast(e.message || "Failed to load opportunities", "error");
    } finally {
      setLoading(false);
    }
  };

  // Load opportunities from Supabase via API
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
      return;
    }

    const controller = new AbortController();
    fetchOpportunities({ signal: controller.signal });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, router, page, pageSize, query, categoryFilter, publishedFilter]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast("Please enter opportunity title", "error");
      return false;
    }
    if (!formData.time.trim()) {
      showToast("Please enter time commitment", "error");
      return false;
    }
    if (!formData.description.trim()) {
      showToast("Please enter description", "error");
      return false;
    }
    if (formData.title.length > 80) {
      showToast("Title should be less than 80 characters", "error");
      return false;
    }
    if (formData.description.length > 600) {
      showToast("Description should be less than 600 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      setIsSaving(true);
      const prev = opportunities;
      setOpportunities((curr) =>
        curr.map((o) =>
          o.id === editingId ? { ...o, ...formData, updated_at: new Date().toISOString(), __optimistic: true } : o
        )
      );

      try {
        const res = await fetch(`/api/opportunities/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to update opportunity");
        }
        setOpportunities((curr) => curr.map((o) => (o.id === editingId ? json.opportunity : o)));
        showToast("Opportunity updated successfully!", "success");
        setEditingId(null);
      } catch (e) {
        setOpportunities(prev);
        showToast(e.message || "Failed to update opportunity", "error");
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      const tempId = `temp-${Date.now()}`;
      const now = new Date().toISOString();
      const optimistic = {
        id: tempId,
        ...formData,
        created_at: now,
        updated_at: now,
        __optimistic: true,
      };
      setOpportunities((curr) => [optimistic, ...curr]);
      setTotal((t) => t + 1);

      try {
        const res = await fetch("/api/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to create opportunity");
        }
        setOpportunities((curr) => curr.map((o) => (o.id === tempId ? json.opportunity : o)));
        showToast("Opportunity added successfully!", "success");
      } catch (e) {
        setOpportunities((curr) => curr.filter((o) => o.id !== tempId));
        setTotal((t) => Math.max(0, t - 1));
        showToast(e.message || "Failed to create opportunity", "error");
      } finally {
        setIsSaving(false);
      }
    }

    setFormData({ title: "", time: "", description: "", category: "Outreach", published: true });
    setShowForm(false);
  };

  const handleEdit = (opportunity) => {
    setFormData({
      title: opportunity.title,
      time: opportunity.time,
      description: opportunity.description,
      category: opportunity.category,
      published: !!opportunity.published,
    });
    setEditingId(opportunity.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;

    const prev = opportunities;
    setOpportunities((curr) => curr.filter((o) => o.id !== id));
    setTotal((t) => Math.max(0, t - 1));

    try {
      const res = await fetch(`/api/opportunities/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete opportunity");
      }
      showToast("Opportunity deleted successfully!", "success");
    } catch (e) {
      setOpportunities(prev);
      setTotal((t) => t + 1);
      showToast(e.message || "Failed to delete opportunity", "error");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", time: "", description: "", category: "Outreach", published: true });
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
          <h1 className="text-4xl font-bold text-white mb-2">Volunteer Opportunities</h1>
          <p className="text-gray-400">Create and manage volunteer positions and roles</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3 mb-8"
        >
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Total Opportunities</p>
            <p className="text-3xl font-bold text-white">{total}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Outreach Programs</p>
            <p className="text-3xl font-bold text-white">
              {opportunities.filter((o) => o.category === "Outreach").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Other Roles</p>
            <p className="text-3xl font-bold text-white">
              {opportunities.filter((o) => o.category !== "Outreach").length}
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
                placeholder="Search title or description..."
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border-2 border-gray-600 focus:border-green-600 focus:outline-none"
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
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-600 focus:outline-none"
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
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-600 focus:outline-none"
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
              {editingId ? "Edit Opportunity" : "Create New Opportunity"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-semibold mb-2">Opportunity Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Community Outreach Coordinator"
                  maxLength="80"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-green-600 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.title.length}/80 characters</p>
              </div>

              {/* Time Commitment */}
              <div>
                <label className="block text-white font-semibold mb-2">Time Commitment</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 5-8 hours per week"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-green-600 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border-2 border-gray-500 focus:border-green-600 focus:outline-none"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c === "Outreach" ? "Community Outreach" : c}
                      </option>
                    ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the volunteer role, responsibilities, and impact..."
                  maxLength="600"
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-green-600 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.description.length}/600 characters</p>
              </div>

              {/* Published */}
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

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition"
                >
                  {isSaving ? "Saving..." : editingId ? "Update Opportunity" : "Create Opportunity"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition"
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
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-lg mb-8 transition"
          >
            🤝 Create New Opportunity
          </motion.button>
        )}

        {/* Opportunities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Active Opportunities</h2>

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
          ) : opportunities.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg">No opportunities yet. Create your first one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600 hover:border-green-600 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {opportunity.title}{" "}
                          {opportunity.__optimistic && (
                            <span className="text-xs text-yellow-300 font-semibold">(saving...)</span>
                          )}
                        </h3>
                        <span className="text-xs font-bold text-green-300 bg-green-900/50 px-3 py-1 rounded-full">
                          {opportunity.category}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            opportunity.published
                              ? "bg-green-900/40 text-green-300"
                              : "bg-yellow-900/40 text-yellow-300"
                          }`}
                        >
                          {opportunity.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">⏱️ {opportunity.time}</p>
                      <p className="text-gray-300 mb-3 leading-relaxed">{opportunity.description}</p>
                      <p className="text-xs text-gray-500">
                        📅 Created: {new Date(opportunity.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(opportunity)}
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(opportunity.id)}
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
