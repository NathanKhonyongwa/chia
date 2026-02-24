"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";



export default function TestimonialsManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    category: "Donor",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load testimonials from API
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
      return;
    }
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        if (json.success && Array.isArray(json.testimonials)) {
          setTestimonials(json.testimonials);
        }
      } catch (error) {
        showToast("Failed to load testimonials", "error");
      }
      setLoading(false);
    };
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, router]);

  // Add or update testimonial via API
  const saveTestimonial = async (testimonial, isEdit = false) => {
    try {
      if (isEdit) {
        const res = await fetch(`/api/testimonials/${testimonial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonial),
        });
        const json = await res.json();
        if (json.success) {
          setTestimonials((prev) => prev.map((t) => t.id === testimonial.id ? json.testimonial : t));
          showToast("Testimonial updated successfully!", "success");
        } else {
          showToast(json.error || "Failed to update testimonial", "error");
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonial),
        });
        const json = await res.json();
        if (json.success) {
          setTestimonials((prev) => [json.testimonial, ...prev]);
          showToast("Testimonial added successfully!", "success");
        } else {
          showToast(json.error || "Failed to add testimonial", "error");
        }
      }
    } catch (error) {
      showToast("Failed to save testimonial", "error");
    }
  };

  // Delete testimonial via API
  const deleteTestimonial = async (id) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        showToast("Testimonial deleted successfully!", "success");
      } else {
        showToast(json.error || "Failed to delete testimonial", "error");
      }
    } catch (error) {
      showToast("Failed to delete testimonial", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Please enter a name", "error");
      return false;
    }
    if (!formData.role.trim()) {
      showToast("Please enter a role/title", "error");
      return false;
    }
    if (!formData.quote.trim()) {
      showToast("Please enter a testimonial quote", "error");
      return false;
    }
    if (formData.quote.length > 500) {
      showToast("Quote should be less than 500 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (editingId) {
      await saveTestimonial({ ...formData, id: editingId }, true);
      setEditingId(null);
    } else {
      await saveTestimonial(formData, false);
    }
    setFormData({ name: "", role: "", quote: "", category: "Donor" });
    setShowForm(false);
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      category: testimonial.category,
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await deleteTestimonial(id);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", role: "", quote: "", category: "Donor" });
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
          <h1 className="text-4xl font-bold text-white mb-2">Testimonials Management</h1>
          <p className="text-gray-400">Manage donor and volunteer testimonials</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3 mb-8"
        >
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Total Testimonials</p>
            <p className="text-3xl font-bold text-white">{testimonials.length}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Donors</p>
            <p className="text-3xl font-bold text-white">
              {testimonials.filter((t) => t.category === "Donor").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Volunteers</p>
            <p className="text-3xl font-bold text-white">
              {testimonials.filter((t) => t.category === "Volunteer").length}
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
              {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-white font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Person's full name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-purple-600 focus:outline-none"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-white font-semibold mb-2">Role/Title</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Monthly Supporter, Volunteer"
                    className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border-2 border-gray-500 focus:border-purple-600 focus:outline-none"
                >
                  <option value="Donor">Donor</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Community">Community Member</option>
                </select>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-white font-semibold mb-2">Testimonial Quote</label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="What they said about their experience..."
                  maxLength="500"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 border-2 border-gray-500 focus:border-purple-600 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.quote.length}/500 characters</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
                >
                  {editingId ? "Update Testimonial" : "Add Testimonial"}
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
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg mb-8 transition"
          >
            ⭐ Add New Testimonial
          </motion.button>
        )}

        {/* Testimonials List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Testimonials</h2>

          {testimonials.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg">No testimonials yet. Add your first one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600 hover:border-purple-600 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          testimonial.category === "Donor"
                            ? "bg-pink-900/50 text-pink-300"
                            : testimonial.category === "Volunteer"
                            ? "bg-yellow-900/50 text-yellow-300"
                            : "bg-blue-900/50 text-blue-300"
                        }`}>
                          {testimonial.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 italic">{testimonial.role}</p>
                      <p className="text-gray-300 mb-3 leading-relaxed">"{testimonial.quote}"</p>
                      <p className="text-xs text-gray-500">
                        📅 Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(testimonial)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(testimonial.id)}
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
