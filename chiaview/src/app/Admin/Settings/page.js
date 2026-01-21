"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import DataBackupManager from "@/components/DataBackupManager";

const initialSettings = {
  general: {
    siteName: "Chia View Church",
    siteDescription: "A vibrant church community dedicated to faith, service, and growth.",
    siteUrl: "https://chiaview.com",
    contactEmail: "info@chiaview.com",
    contactPhone: "+1 (555) 123-4567",
  },
  social: {
    facebook: "https://facebook.com/chiaview",
    twitter: "https://twitter.com/chiaview",
    instagram: "https://instagram.com/chiaview",
    youtube: "https://youtube.com/@chiaview",
  },
  maintenance: {
    maintenanceMode: false,
    maintenanceMessage: "We are currently undergoing maintenance. Please check back soon!",
  },
};

export default function SettingsManagement() {
  const router = useRouter();
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [settings, setSettings] = useState(initialSettings);
  const [generalForm, setGeneralForm] = useState(initialSettings.general);
  const [socialForm, setSocialForm] = useState(initialSettings.social);
  const [maintenanceForm, setMaintenanceForm] = useState(
    initialSettings.maintenance
  );
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load settings");
      }
      const rows = Array.isArray(json.settings) ? json.settings : [];
      const byKey = new Map(rows.map((r) => [r.key, r.value]));

      const merged = {
        general: byKey.get("general") || initialSettings.general,
        social: byKey.get("social") || initialSettings.social,
        maintenance: byKey.get("maintenance") || initialSettings.maintenance,
      };

      setSettings(merged);
      setGeneralForm(merged.general);
      setSocialForm(merged.social);
      setMaintenanceForm(merged.maintenance);
    } catch (error) {
      showToast(error.message || "Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const upsertSetting = async (key, value, description) => {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value, description }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to save setting");
    }
    return json.setting;
  };

  // Load settings from Supabase via API
  useEffect(() => {
    if (!admin) {
      router.push("/Admin/Login");
      return;
    }

    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, router]);

  const handleGeneralInputChange = (e) => {
    const { name, value } = e.target;
    setGeneralForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialInputChange = (e) => {
    const { name, value } = e.target;
    setSocialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaintenanceInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateGeneralForm = () => {
    if (!generalForm.siteName.trim()) {
      showToast("Please enter site name", "error");
      return false;
    }
    if (!generalForm.siteDescription.trim()) {
      showToast("Please enter site description", "error");
      return false;
    }
    if (!generalForm.contactEmail.trim()) {
      showToast("Please enter contact email", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(generalForm.contactEmail)) {
      showToast("Please enter a valid email address", "error");
      return false;
    }
    if (!generalForm.contactPhone.trim()) {
      showToast("Please enter contact phone", "error");
      return false;
    }
    if (generalForm.siteName.length > 100) {
      showToast("Site name should be less than 100 characters", "error");
      return false;
    }
    if (generalForm.siteDescription.length > 300) {
      showToast("Site description should be less than 300 characters", "error");
      return false;
    }
    return true;
  };

  const validateSocialForm = () => {
    const urlRegex = /^(https?:\/\/)?[\w\-\.]+\.[\w\-\.]+/;
    for (const [key, value] of Object.entries(socialForm)) {
      if (value.trim() && !urlRegex.test(value)) {
        showToast(`${key} must be a valid URL`, "error");
        return false;
      }
    }
    return true;
  };

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    if (!validateGeneralForm()) return;

    const updatedSettings = { ...settings, general: { ...generalForm } };
    setIsSaving(true);
    Promise.resolve()
      .then(async () => {
        await upsertSetting(
          "general",
          updatedSettings.general,
          "General website settings"
        );
        setSettings(updatedSettings);
        showToast("General settings updated successfully!", "success");
      })
      .catch((err) => showToast(err.message || "Failed to save settings", "error"))
      .finally(() => setIsSaving(false));
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    if (!validateSocialForm()) return;

    const updatedSettings = { ...settings, social: { ...socialForm } };
    setIsSaving(true);
    Promise.resolve()
      .then(async () => {
        await upsertSetting("social", updatedSettings.social, "Social media URLs");
        setSettings(updatedSettings);
        showToast("Social media links updated successfully!", "success");
      })
      .catch((err) => showToast(err.message || "Failed to save settings", "error"))
      .finally(() => setIsSaving(false));
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();

    if (maintenanceForm.maintenanceMode && !maintenanceForm.maintenanceMessage.trim()) {
      showToast("Please enter a maintenance message", "error");
      return;
    }

    const updatedSettings = { ...settings, maintenance: { ...maintenanceForm } };
    setIsSaving(true);
    Promise.resolve()
      .then(async () => {
        await upsertSetting(
          "maintenance",
          updatedSettings.maintenance,
          "Maintenance mode settings"
        );
        setSettings(updatedSettings);
        showToast("Maintenance settings updated successfully!", "success");
      })
      .catch((err) => showToast(err.message || "Failed to save settings", "error"))
      .finally(() => setIsSaving(false));
  };

  const resetSettings = () => {
    if (
      confirm(
        "Are you sure you want to reset all settings to defaults? This cannot be undone."
      )
    ) {
      setIsSaving(true);
      Promise.resolve()
        .then(async () => {
          await Promise.all([
            upsertSetting("general", initialSettings.general, "General website settings"),
            upsertSetting("social", initialSettings.social, "Social media URLs"),
            upsertSetting("maintenance", initialSettings.maintenance, "Maintenance mode settings"),
          ]);
          setSettings(initialSettings);
          setGeneralForm(initialSettings.general);
          setSocialForm(initialSettings.social);
          setMaintenanceForm(initialSettings.maintenance);
          showToast("Settings reset to defaults!", "success");
        })
        .catch((err) => showToast(err.message || "Failed to reset settings", "error"))
        .finally(() => setIsSaving(false));
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">⚙️ Website Settings</h1>
          <p className="text-gray-400 mb-8">
            Manage your website configuration and global settings
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === "general"
                ? "text-gray-400 border-b-2 border-gray-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === "social"
                ? "text-gray-400 border-b-2 border-gray-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === "maintenance"
                ? "text-gray-400 border-b-2 border-gray-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Maintenance
          </button>
        </div>

        {/* General Settings Tab */}
        {activeTab === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
            <form onSubmit={handleGeneralSubmit} className="space-y-6">
              {/* Site Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={generalForm.siteName}
                  onChange={handleGeneralInputChange}
                  maxLength="100"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition"
                  placeholder="e.g., Chia View Church"
                />
                <div className="text-right text-gray-400 text-sm mt-1">
                  {generalForm.siteName.length}/100 characters
                </div>
              </div>

              {/* Site Description */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  value={generalForm.siteDescription}
                  onChange={handleGeneralInputChange}
                  maxLength="300"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition resize-none h-24"
                  placeholder="Brief description of your website..."
                />
                <div className="text-right text-gray-400 text-sm mt-1">
                  {generalForm.siteDescription.length}/300 characters
                </div>
              </div>

              {/* Site URL */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  name="siteUrl"
                  value={generalForm.siteUrl}
                  onChange={handleGeneralInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition"
                  placeholder="https://example.com"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={generalForm.contactEmail}
                  onChange={handleGeneralInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition"
                  placeholder="contact@example.com"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={generalForm.contactPhone}
                  onChange={handleGeneralInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg transition"
              >
                {isSaving ? "Saving..." : "💾 Save General Settings"}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Social Media Settings Tab */}
        {activeTab === "social" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Social Media Links</h2>
            <form onSubmit={handleSocialSubmit} className="space-y-6">
              {/* Facebook */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  📘 Facebook URL
                </label>
                <input
                  type="url"
                  name="facebook"
                  value={socialForm.facebook}
                  onChange={handleSocialInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none transition"
                  placeholder="https://facebook.com/..."
                />
              </div>

              {/* Twitter */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  𝕏 Twitter/X URL
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={socialForm.twitter}
                  onChange={handleSocialInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition"
                  placeholder="https://twitter.com/..."
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  📷 Instagram URL
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={socialForm.instagram}
                  onChange={handleSocialInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-pink-400 focus:outline-none transition"
                  placeholder="https://instagram.com/..."
                />
              </div>

              {/* YouTube */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  ▶️ YouTube URL
                </label>
                <input
                  type="url"
                  name="youtube"
                  value={socialForm.youtube}
                  onChange={handleSocialInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-400 focus:outline-none transition"
                  placeholder="https://youtube.com/@..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition"
              >
                {isSaving ? "Saving..." : "💾 Save Social Media Links"}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Maintenance Settings Tab */}
        {activeTab === "maintenance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Maintenance Mode</h2>
            <form onSubmit={handleMaintenanceSubmit} className="space-y-6">
              {/* Maintenance Mode Toggle */}
              <div className="flex items-center gap-4 p-6 bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={maintenanceForm.maintenanceMode}
                  onChange={handleMaintenanceInputChange}
                  className="w-6 h-6 rounded cursor-pointer"
                />
                <div>
                  <label className="text-white font-semibold block">
                    Enable Maintenance Mode
                  </label>
                  <p className="text-gray-400 text-sm">
                    When enabled, only admins can access the website
                  </p>
                </div>
              </div>

              {/* Maintenance Message */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Maintenance Message
                </label>
                <textarea
                  name="maintenanceMessage"
                  value={maintenanceForm.maintenanceMessage}
                  onChange={handleMaintenanceInputChange}
                  disabled={!maintenanceForm.maintenanceMode}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none transition resize-none h-32 ${
                    maintenanceForm.maintenanceMode
                      ? "bg-gray-700 text-white focus:border-yellow-400"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  placeholder="We are currently undergoing maintenance. Please check back soon!"
                />
                <p className="text-gray-400 text-sm mt-2">
                  This message will be displayed to visitors during maintenance
                </p>
              </div>

              {maintenanceForm.maintenanceMode && (
                <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                  <p className="text-yellow-200">
                    ⚠️ Maintenance mode is currently <strong>ENABLED</strong>. Regular
                    visitors will not be able to access the site.
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition"
              >
                {isSaving ? "Saving..." : "💾 Save Maintenance Settings"}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Reset Settings Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSettings}
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            🔄 Reset to Default Settings
          </motion.button>
        </div>

        {/* Data Backup Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-gray-600"
        >
          <DataBackupManager />
        </motion.div>
      </div>
    </section>
  );
}
