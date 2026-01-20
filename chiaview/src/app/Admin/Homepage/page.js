"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";

const STORAGE_KEY = "chiaview_homepage_content";

const initialHomeContent = {
  hero: {
    title: "Welcome to Chia View",
    subtitle: "Empowering lives through faith, community, and service",
    cta_button_text: "Get Involved",
    background_image_url: "",
  },
  coreValues: [
    {
      id: "1",
      title: "Faith",
      description: "Centered on Jesus Christ and biblical principles",
      icon: "✨",
    },
    {
      id: "2",
      title: "Community",
      description: "Building meaningful relationships and connections",
      icon: "🤝",
    },
    {
      id: "3",
      title: "Service",
      description: "Serving others and making a positive impact",
      icon: "🙏",
    },
  ],
};

export default function HomepageManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [homeContent, setHomeContent] = useState(initialHomeContent);
  const [heroForm, setHeroForm] = useState(initialHomeContent.hero);
  const [valueForm, setValueForm] = useState({
    title: "",
    description: "",
    icon: "✨",
  });
  const [editingValueId, setEditingValueId] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);

  // Load content from localStorage
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHomeContent(parsed);
        setHeroForm(parsed.hero);
      } catch (error) {
        console.error("Error loading homepage content:", error);
      }
    }
    setLoading(false);
  }, [admin, router]);

  // Save content to localStorage
  const saveContent = (newContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    setHomeContent(newContent);
  };

  const handleHeroInputChange = (e) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueInputChange = (e) => {
    const { name, value } = e.target;
    setValueForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateHeroForm = () => {
    if (!heroForm.title.trim()) {
      showToast("Please enter a hero title", "error");
      return false;
    }
    if (!heroForm.subtitle.trim()) {
      showToast("Please enter a hero subtitle", "error");
      return false;
    }
    if (!heroForm.cta_button_text.trim()) {
      showToast("Please enter CTA button text", "error");
      return false;
    }
    if (heroForm.title.length > 100) {
      showToast("Title should be less than 100 characters", "error");
      return false;
    }
    if (heroForm.subtitle.length > 150) {
      showToast("Subtitle should be less than 150 characters", "error");
      return false;
    }
    return true;
  };

  const validateValueForm = () => {
    if (!valueForm.title.trim()) {
      showToast("Please enter a value title", "error");
      return false;
    }
    if (!valueForm.description.trim()) {
      showToast("Please enter a value description", "error");
      return false;
    }
    if (valueForm.title.length > 50) {
      showToast("Value title should be less than 50 characters", "error");
      return false;
    }
    if (valueForm.description.length > 150) {
      showToast("Value description should be less than 150 characters", "error");
      return false;
    }
    return true;
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!validateHeroForm()) return;

    const updatedContent = {
      ...homeContent,
      hero: { ...heroForm },
    };
    saveContent(updatedContent);
    showToast("Hero section updated successfully!", "success");
  };

  const handleAddValue = (e) => {
    e.preventDefault();
    if (!validateValueForm()) return;

    const updatedContent = {
      ...homeContent,
      coreValues: [
        ...homeContent.coreValues,
        {
          id: Date.now().toString(),
          ...valueForm,
        },
      ],
    };
    saveContent(updatedContent);
    setValueForm({
      title: "",
      description: "",
      icon: "✨",
    });
    showToast("Core value added successfully!", "success");
  };

  const handleUpdateValue = (e) => {
    e.preventDefault();
    if (!validateValueForm()) return;

    const updatedContent = {
      ...homeContent,
      coreValues: homeContent.coreValues.map((v) =>
        v.id === editingValueId
          ? {
              ...v,
              title: valueForm.title,
              description: valueForm.description,
              icon: valueForm.icon,
            }
          : v
      ),
    };
    saveContent(updatedContent);
    setValueForm({
      title: "",
      description: "",
      icon: "✨",
    });
    setEditingValueId(null);
    showToast("Core value updated successfully!", "success");
  };

  const handleDeleteValue = (id) => {
    if (confirm("Are you sure you want to delete this core value?")) {
      const updatedContent = {
        ...homeContent,
        coreValues: homeContent.coreValues.filter((v) => v.id !== id),
      };
      saveContent(updatedContent);
      showToast("Core value deleted successfully!", "success");
    }
  };

  const handleEditValue = (value) => {
    setEditingValueId(value.id);
    setValueForm({
      title: value.title,
      description: value.description,
      icon: value.icon,
    });
  };

  const handleCancelEdit = () => {
    setEditingValueId(null);
    setValueForm({
      title: "",
      description: "",
      icon: "✨",
    });
  };

  const icons = ["✨", "🙏", "🤝", "❤️", "🌟", "💪", "🎯", "🔥"];

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          ⏳
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href="/Admin"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">🏠 Homepage Content</h1>
          <p className="text-gray-400 mb-8">
            Manage your homepage hero section and core values
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("hero")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "hero"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab("values")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "values"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Core Values
          </button>
        </div>

        {/* Hero Section Tab */}
        {activeTab === "hero" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Hero Section</h2>
            <form onSubmit={handleHeroSubmit} className="space-y-6">
              {/* Hero Title */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={heroForm.title}
                  onChange={handleHeroInputChange}
                  maxLength="100"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                  placeholder="e.g., Welcome to Chia View"
                />
                <div className="text-right text-gray-400 text-sm mt-1">
                  {heroForm.title.length}/100 characters
                </div>
              </div>

              {/* Hero Subtitle */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  name="subtitle"
                  value={heroForm.subtitle}
                  onChange={handleHeroInputChange}
                  maxLength="150"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none transition resize-none h-24"
                  placeholder="e.g., Empowering lives through faith, community, and service"
                />
                <div className="text-right text-gray-400 text-sm mt-1">
                  {heroForm.subtitle.length}/150 characters
                </div>
              </div>

              {/* CTA Button Text */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Call-to-Action Button Text
                </label>
                <input
                  type="text"
                  name="cta_button_text"
                  value={heroForm.cta_button_text}
                  onChange={handleHeroInputChange}
                  maxLength="50"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                  placeholder="e.g., Get Involved"
                />
                <div className="text-right text-gray-400 text-sm mt-1">
                  {heroForm.cta_button_text.length}/50 characters
                </div>
              </div>

              {/* Background Image URL */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Background Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="background_image_url"
                  value={heroForm.background_image_url}
                  onChange={handleHeroInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 rounded-lg transition"
              >
                💾 Save Hero Section
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Core Values Tab */}
        {activeTab === "values" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Add/Edit Value Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingValueId ? "Edit Core Value" : "Add Core Value"}
              </h2>
              <form
                onSubmit={editingValueId ? handleUpdateValue : handleAddValue}
                className="space-y-6"
              >
                {/* Value Title */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Value Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={valueForm.title}
                    onChange={handleValueInputChange}
                    maxLength="50"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none transition"
                    placeholder="e.g., Faith"
                  />
                  <div className="text-right text-gray-400 text-sm mt-1">
                    {valueForm.title.length}/50 characters
                  </div>
                </div>

                {/* Value Description */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Value Description
                  </label>
                  <textarea
                    name="description"
                    value={valueForm.description}
                    onChange={handleValueInputChange}
                    maxLength="150"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none transition resize-none h-20"
                    placeholder="Describe this core value..."
                  />
                  <div className="text-right text-gray-400 text-sm mt-1">
                    {valueForm.description.length}/150 characters
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() =>
                          setValueForm((prev) => ({ ...prev, icon }))
                        }
                        className={`p-4 rounded-lg text-2xl transition ${
                          valueForm.icon === icon
                            ? "bg-purple-600 border-2 border-purple-400"
                            : "bg-gray-700 border-2 border-gray-600 hover:border-purple-400"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    {editingValueId ? "✏️ Update Value" : "➕ Add Value"}
                  </motion.button>
                  {editingValueId && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </form>
            </div>

            {/* Core Values List */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Current Core Values ({homeContent.coreValues.length})
              </h2>
              {homeContent.coreValues.length === 0 ? (
                <p className="text-gray-400">No core values added yet.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {homeContent.coreValues.map((value) => (
                    <motion.div
                      key={value.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition"
                    >
                      <div className="text-4xl mb-3">{value.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {value.description}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditValue(value)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition text-sm font-semibold"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteValue(value.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition text-sm font-semibold"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
