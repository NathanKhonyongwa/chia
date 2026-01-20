/**
 * Validation utilities for form fields
 * Centralized validation logic for consistency across components
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum required length (default: 6)
 * @returns {boolean} - True if valid
 */
export const validatePassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const validatePhone = (phone) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
};

/**
 * Validate register form
 * @param {Object} formData - Form data object
 * @returns {Object} - Errors object (empty if no errors)
 */
export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = "Invalid phone number format";
  }

  return errors;
};

/**
 * Validate login form
 * @param {Object} formData - Form data object
 * @returns {Object} - Errors object (empty if no errors)
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
