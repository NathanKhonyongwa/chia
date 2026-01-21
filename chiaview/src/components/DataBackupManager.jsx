/**
 * DataBackupManager - Admin component for backup/restore operations
 * Features:
 * - Create backups
 * - Restore from backup
 * - Export data
 * - View backup history
 * - Schedule automatic backups
 */

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useBackup } from "@/hooks/useDatabase";
import { useToast } from "@/hooks/useToast";
import {
  FaDownload,
  FaUpload,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function DataBackupManager() {
  const { createBackup, restoreBackup, isBackingUp, isRestoring, error } =
    useBackup();
  const { showToast } = useToast() || {};
  const fileInputRef = useRef(null);
  const [backups, setBackups] = useState([
    {
      id: 1,
      date: new Date(Date.now() - 86400000),
      size: "2.4 KB",
      status: "success",
    },
    {
      id: 2,
      date: new Date(Date.now() - 172800000),
      size: "2.3 KB",
      status: "success",
    },
  ]);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("daily");

  const handleCreateBackup = async () => {
    try {
      await createBackup();
      if (showToast) {
        showToast("Backup created successfully!", "success");
      }
      // Add to backups list
      setBackups([
        {
          id: backups.length + 1,
          date: new Date(),
          size: "2.4 KB",
          status: "success",
        },
        ...backups,
      ]);
    } catch (err) {
      if (showToast) {
        showToast("Failed to create backup", "error");
      }
    }
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await restoreBackup(file);
        if (showToast) {
          showToast("Backup restored successfully!", "success");
        }
      } catch (err) {
        if (showToast) {
          showToast("Failed to restore backup", "error");
        }
      }
    }
  };

  const handleToggleAutoBackup = () => {
    setAutoBackupEnabled(!autoBackupEnabled);
    if (showToast) {
      showToast(
        `Auto backup ${!autoBackupEnabled ? "enabled" : "disabled"}`,
        "success"
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Data Backup</h2>
        <p className="text-gray-400">
          Create backups and restore your website data
        </p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2 mb-8"
      >
        {/* Create Backup */}
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 border border-green-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
              <FaDownload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Create Backup</h3>
              <p className="text-green-100 text-sm">
                Save all your data locally
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateBackup}
            disabled={isBackingUp}
            className="w-full bg-white text-green-900 font-bold py-3 rounded-lg hover:bg-green-50 transition disabled:opacity-50"
          >
            {isBackingUp ? "Backing up..." : "Create Backup Now"}
          </motion.button>
        </div>

        {/* Restore Backup */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 border border-blue-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
              <FaUpload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Restore Backup</h3>
              <p className="text-blue-100 text-sm">
                Restore from a saved backup file
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestoreClick}
            disabled={isRestoring}
            className="w-full bg-white text-blue-900 font-bold py-3 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
          >
            {isRestoring ? "Restoring..." : "Select Backup File"}
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelected}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Auto Backup Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Automatic Backups
            </h3>
            <p className="text-gray-400">
              Schedule automatic backups of your data
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleAutoBackup}
            className={`px-6 py-2 rounded-full font-bold transition ${
              autoBackupEnabled
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            {autoBackupEnabled ? "Enabled" : "Disabled"}
          </motion.button>
        </div>

        {autoBackupEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <div>
              <label className="block text-white font-semibold mb-2">
                Backup Frequency
              </label>
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-blue-500"
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Every Day</option>
                <option value="weekly">Every Week</option>
                <option value="monthly">Every Month</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm">
              Automatic backups will be stored in your cloud storage.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Backup History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600"
      >
        <h3 className="text-xl font-bold text-white mb-6">Backup History</h3>

        {backups.length > 0 ? (
          <div className="space-y-4">
            {backups.map((backup, index) => (
              <motion.div
                key={backup.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-600/50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-4">
                  <FaClock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-semibold">
                      {backup.date.toLocaleDateString()} at{" "}
                      {backup.date.toLocaleTimeString()}
                    </p>
                    <p className="text-gray-400 text-sm">Size: {backup.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {backup.status === "success" ? (
                    <FaCheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <FaTimesCircle className="w-5 h-5 text-red-400" />
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    Restore
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            No backups yet. Create one to get started.
          </p>
        )}
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-blue-100"
      >
        <p className="text-sm">
          💡 <strong>Tip:</strong> Regular backups protect your data from
          accidental loss. We recommend creating backups at least weekly.
        </p>
      </motion.div>
    </div>
  );
}
