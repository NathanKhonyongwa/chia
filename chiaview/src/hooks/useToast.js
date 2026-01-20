/**
 * useToast - Custom hook for toast notifications
 * Provides a simple way to show temporary notifications to users
 * 
 * Usage:
 * const { showToast } = useToast();
 * showToast("Success!", "success");
 * showToast("Error occurred", "error", 5000);
 */

import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Type: "success" | "error" | "info" | "warning"
   * @param {number} duration - Duration in ms before auto-dismiss (0 = no auto-dismiss)
   * @returns {string} - Toast ID for manual removal
   */
  const showToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now().toString();
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove a specific toast
   * @param {string} id - Toast ID to remove
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, showToast, removeToast, clearToasts };
}
