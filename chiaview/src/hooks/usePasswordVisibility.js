/**
 * usePasswordVisibility - Custom hook for managing password field visibility toggle
 * Supports multiple password fields (password, confirmPassword, etc.)
 * 
 * @param {string[]} fields - Array of password field names
 * @returns {Object} Password visibility state and toggle function
 */

import { useState, useCallback } from "react";

export function usePasswordVisibility(fields = ["password"]) {
  const [showPassword, setShowPassword] = useState(
    Object.fromEntries(fields.map((field) => [field, false]))
  );

  /**
   * Toggle password visibility for a specific field
   * @param {string} field - Field name to toggle
   */
  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  return {
    showPassword,
    togglePasswordVisibility,
  };
}
