/**
 * RegisterPage - User registration form component
 * Features:
 * - Custom form validation with field-level error clearing
 * - Password visibility toggle for both password fields
 * - Newsletter opt-in checkbox
 * - Success message after registration
 * - Accessibility features (ARIA labels, proper form semantics)
 * - Robust error handling for API calls
 */

"use client";

import { useTransition, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useFormHandler } from "@/hooks/useFormHandler";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { validateRegisterForm } from "@/utils/validation";

export default function RegisterPage() {
  // Custom hooks for form state management
  const { formData, errors, handleChange, validateForm, reset } = useFormHandler(
    {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      newsletter: false,
    },
    validateRegisterForm
  );

  const { showPassword, togglePasswordVisibility } = usePasswordVisibility([
    "password",
    "confirmPassword",
  ]);

  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handle form submission with error handling
   * Validates form, sends data to server, and manages success/error states
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      try {
        // Simulate API call - replace with actual backend call
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Registration failed. Please try again.");
        }

        if (formData.newsletter) {
          console.log("Welcome email sent to:", formData.email);
        }

        console.log("Registration successful for:", formData.email);
        setSubmitStatus("success");
        reset();
      } catch (error) {
        console.error("Registration error:", error);
        setErrorMessage(error.message || "An error occurred. Please try again later.");
        setSubmitStatus("error");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100 relative overflow-hidden" role="main" aria-label="User registration page">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-30 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Join Our Mission
              </motion.h1>
              <p className="text-gray-600 text-lg font-medium">Create your account to connect with our community</p>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  role="alert"
                >
                  {errorMessage}
                </motion.div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome aboard!</h2>
                  <p className="text-green-700">Your account has been created successfully.</p>
                  <motion.button
                    onClick={() => setSubmitStatus("idle")}
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 bg-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        aria-invalid={!!errors.fullName}
                        required
                        className={`w-full px-4 py-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                          errors.fullName 
                            ? "border-red-400 focus:border-red-500 shadow-red-200" 
                            : "border-gray-200 focus:border-blue-500 focus:shadow-blue-200 hover:border-blue-300"
                        }`}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="text-red-500 text-xs mt-1">• {errors.fullName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                      required
                      className={`w-full px-4 py-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                        errors.email 
                          ? "border-red-400 focus:border-red-500 shadow-red-200" 
                          : "border-gray-200 focus:border-blue-500 focus:shadow-blue-200 hover:border-blue-300"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-xs mt-1">• {errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Phone (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      aria-invalid={!!errors.phone}
                      className={`w-full px-4 py-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                        errors.phone 
                          ? "border-red-400 focus:border-red-500 shadow-red-200" 
                          : "border-gray-200 focus:border-blue-500 focus:shadow-blue-200 hover:border-blue-300"
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-1">• {errors.phone}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2 relative">
                    <label htmlFor="password" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword.password ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      aria-describedby={errors.password ? "password-error" : undefined}
                      aria-invalid={!!errors.password}
                      required
                      className={`w-full px-4 py-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none pr-12 transition-all duration-300 ${
                        errors.password 
                          ? "border-red-400 focus:border-red-500 shadow-red-200" 
                          : "border-gray-200 focus:border-blue-500 focus:shadow-blue-200 hover:border-blue-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      aria-label={showPassword.password ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
                    >
                      {showPassword.password ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    {errors.password && (
                      <p id="password-error" className="text-red-500 text-xs mt-1">• {errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2 relative">
                    <label htmlFor="confirmPassword" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                      aria-invalid={!!errors.confirmPassword}
                      required
                      className={`w-full px-4 py-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none pr-12 transition-all duration-300 ${
                        errors.confirmPassword 
                          ? "border-red-400 focus:border-red-500 shadow-red-200" 
                          : "border-gray-200 focus:border-blue-500 focus:shadow-blue-200 hover:border-blue-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                      aria-label={showPassword.confirmPassword ? "Hide confirm password" : "Show confirm password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
                    >
                      {showPassword.confirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">• {errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 bg-white/50 backdrop-blur-sm mt-1 cursor-pointer"
                      aria-describedby="newsletter-help"
                    />
                    <div>
                      <label htmlFor="newsletter" className="text-sm text-gray-700 cursor-pointer">
                        Send me updates about church events and newsletters
                      </label>
                      <p id="newsletter-help" className="text-xs text-gray-500 mt-1">
                        Optional. You can unsubscribe anytime.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending || submitStatus === "success"}
                    aria-busy={isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-3xl shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm border border-transparent hover:border-white/30"
                  >
                    {isPending ? "Creating Account..." : "Join Our Community"}
                  </button>
                </form>
              )}
            </AnimatePresence>

            <p className="text-center text-gray-500 mt-8 pt-6 border-t border-gray-100">
              Already have an account?{" "}
              <Link href="/Login" className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors" aria-label="Go to login page">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
