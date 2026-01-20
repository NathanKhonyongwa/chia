"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Please enter your name", "error");
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showToast("Please enter a valid email", "error");
      return false;
    }
    if (formData.password.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return false;
    }
    if (!formData.agreeTerms) {
      showToast("Please agree to the terms and conditions", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      login(formData.email, formData.password, formData.name);
      showToast("Account created successfully!", "success");
      router.push("/");
    } catch (error) {
      showToast("Failed to create account", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 2) return "bg-red-500";
    if (passwordStrength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 px-6 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our community and make a difference</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Banda"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 transition"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-2"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full transition ${
                          i < passwordStrength ? getStrengthColor() : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Strength:{" "}
                    <span className="font-bold">
                      {passwordStrength < 2
                        ? "Weak"
                        : passwordStrength < 4
                        ? "Fair"
                        : "Strong"}
                    </span>
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition"
              />
              {formData.password && formData.confirmPassword && (
                <p
                  className={`text-xs mt-2 ${
                    formData.password === formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3"
            >
              <input
                type="checkbox"
                name="agreeTerms"
                id="terms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5 mt-1 accent-blue-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 font-bold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition">
              <span>📱</span> Sign up with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/Login" className="text-blue-600 font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
