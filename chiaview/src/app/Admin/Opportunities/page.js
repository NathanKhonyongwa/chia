"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";

const STORAGE_KEY = "chiaview_opportunities";

export default function OpportunitiesManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [opportunities, setOpportunities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    description: "",
    category: "Outreach",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load opportunities from localStorage
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setOpportunities(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading opportunities:", error);
      }
    }
    setLoading(false);
  }, [admin, router]);

  // Save opportunities to localStorage
  const saveOpportunities = (newOpportunities) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOpportunities));
    setOpportunities(newOpportunities);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      const updated = opportunities.map((opp) =>
        opp.id === editingId
          ? { ...opp, ...formData, updatedAt: new Date().toISOString() }
          : opp
      );
      saveOpportunities(updated);
      showToast("Opportunity updated successfully!", "success");
      setEditingId(null);
    } else {
      const newOpportunity = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveOpportunities([newOpportunity, ...opportunities]);
      showToast("Opportunity added successfully!", "success");
    }

    setFormData({ title: "", time: "", description: "", category: "Outreach" });
    setShowForm(false);
  };

  const handleEdit = (opportunity) => {
    setFormData({
      title: opportunity.title,
      time: opportunity.time,
      description: opportunity.description,
      category: opportunity.category,
    });
    setEditingId(opportunity.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this opportunity?")) {
      saveOpportunities(opportunities.filter((opp) => opp.id !== id));
      showToast("Opportunity deleted successfully!", "success");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", time: "", description: "", category: "Outreach" });
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
            <p className="text-3xl font-bold text-white">{opportunities.length}</p>
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
                  <option value="Outreach">Community Outreach</option>
                  <option value="Youth">Youth Ministry</option>
                  <option value="Education">Education & Tutoring</option>
                  <option value="Health">Health & Wellness</option>
                  <option value="Administration">Administration</option>
                  <option value="Spiritual">Spiritual Leadership</option>
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

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  {editingId ? "Update Opportunity" : "Create Opportunity"}
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

          {opportunities.length === 0 ? (
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
                        <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                        <span className="text-xs font-bold text-green-300 bg-green-900/50 px-3 py-1 rounded-full">
                          {opportunity.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">⏱️ {opportunity.time}</p>
                      <p className="text-gray-300 mb-3 leading-relaxed">{opportunity.description}</p>
                      <p className="text-xs text-gray-500">
                        📅 Created: {new Date(opportunity.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(opportunity)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(opportunity.id)}
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
