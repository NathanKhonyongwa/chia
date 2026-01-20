/**
 * useFormHandler - Custom hook for managing form state and validation
 * Reduces code duplication across Register and Login components
 * 
 * @param {Object} initialState - Initial form data
 * @param {Function} onValidate - Custom validation function
 * @returns {Object} Form handler utilities
 */

import { useState, useCallback } from "react";

export function useFormHandler(initialState, onValidate) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  /**
   * Handle input change events with error clearing
   * @param {Event} e - Input change event
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  /**
   * Validate form using provided validation function
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = useCallback(() => {
    const newErrors = onValidate(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, onValidate]);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setFormData(initialState);
    setErrors({});
  }, [initialState]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validateForm,
    reset,
  };
}
