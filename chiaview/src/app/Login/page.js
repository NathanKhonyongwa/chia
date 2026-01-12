"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaChurch, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import Navbar from "../Navbar/page";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState("idle");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Login successful:", formData);
        setSubmitStatus("success");
      } catch (error) {
        setSubmitStatus("error");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-300/20 via-purple-300/10 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-r from-white/40 to-blue-200/40 rounded-full blur-xl animate-ping" style={{animationDelay: '1s'}} />
      </div>

      <Navbar />
      
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-30">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <motion.div 
            className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/50 shadow-2xl overflow-hidden group"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Background shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[100%] group-hover:translate-x-[100vw] transition-transform duration-1000" />

            {/* Header */}
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-16"
                >
                  <motion.div 
                    className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <FaCheckCircle className="w-14 h-14 text-white" />
                  </motion.div>
                  <motion.h1 
                    className="text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-4"
                  >
                    Welcome Back!
                  </motion.h1>
                  <p className="text-xl text-gray-700 font-medium mb-8">
                    You're now connected to the mission
                  </p>
                  <motion.button
                    onClick={() => {
                      setSubmitStatus("idle");
                      setFormData({ email: "", password: "" });
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-emerald-700 hover:to-teal-700"
                  >
                    Continue to Dashboard
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-10 relative z-10">
                    <motion.div
                      className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border-4 border-white/50"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaChurch className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    <motion.h1 
                      className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Welcome Back
                    </motion.h1>
                    <motion.p 
                      className="text-gray-600 text-lg font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Sign in to continue the mission
                    </motion.p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {/* Email Field */}
                    <motion.div className="space-y-2" layout>
                      <label className="font-semibold text-sm text-gray-700 uppercase tracking-wide flex items-center">
                        <FaShieldAlt className="w-4 h-4 mr-2 text-blue-500" />
                        Email Address
                      </label>
                      <div className="relative">
                        <motion.input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          disabled={isPending}
                          className={`w-full px-5 py-5 rounded-2xl border-2 bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none transition-all duration-300 pr-5 ${
                            errors.email
                              ? "border-red-400 focus:border-red-500 shadow-red-100"
                              : "border-gray-200 focus:border-blue-500 focus:shadow-lg hover:border-blue-300 hover:shadow-md"
                          }`}
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)" }}
                        />
                        {errors.email && (
                          <motion.p 
                            className="text-red-500 text-xs mt-2 flex items-center font-medium"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <FaShieldAlt className="w-3 h-3 mr-1" /> {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div className="space-y-2" layout>
                      <label className="font-semibold text-sm text-gray-700 uppercase tracking-wide flex items-center">
                        Password
                      </label>
                      <div className="relative">
                        <motion.input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          disabled={isPending}
                          className={`w-full px-5 py-5 rounded-2xl border-2 bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none pr-14 transition-all duration-300 ${
                            errors.password
                              ? "border-red-400 focus:border-red-500 shadow-red-100"
                              : "border-gray-200 focus:border-blue-500 focus:shadow-lg hover:border-blue-300 hover:shadow-md"
                          }`}
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isPending}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-lg transition-all group"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                          ) : (
                            <FaEye className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                          )}
                        </button>
                        {errors.password && (
                          <motion.p 
                            className="text-red-500 text-xs mt-2 flex items-center font-medium"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <FaShieldAlt className="w-3 h-3 mr-1" /> {errors.password}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Forgot Password */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-right pt-2"
                    >
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 flex items-center justify-end group"
                      >
                        Forgot password?
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isPending || submitStatus === "success"}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 text-lg backdrop-blur-sm border border-transparent hover:border-white/30 relative overflow-hidden group"
                    >
                      {isPending ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In to Mission"
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] duration-1000" />
                    </motion.button>
                  </form>
                </>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.p 
              className="text-center text-gray-600 mt-10 pt-8 border-t border-gray-200 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Don’t have an account?{" "}
              <Link 
                href="/Register" 
                className="font-bold text-blue-600 hover:text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-no-repeat bg-left transition-all duration-500 px-2 py-1 rounded-lg font-semibold group"
              >
                Create Account
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
