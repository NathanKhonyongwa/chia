"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";

export default function AdminLogin() {
  const router = useRouter();
  const { login, admin } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Demo accounts
  const demoAccounts = [
    { email: "admin@chiaview.com", password: "Admin@123" },
    { email: "pastor@chiaview.com", password: "Pastor@123" },
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (admin) {
      router.push("/Admin");
    }
  }, [admin, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      showToast("Please enter your email", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return false;
    }

    if (!formData.password) {
      showToast("Please enter your password", "error");
      return false;
    }

    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const demoAccount = demoAccounts.find(
        (acc) => acc.email === formData.email && acc.password === formData.password
      );

      if (demoAccount) {
        const name = formData.email.split("@")[0].charAt(0).toUpperCase() + formData.email.split("@")[0].slice(1);
        login(formData.email, formData.password, name);
        showToast(`Welcome back, ${name}!`, "success");
        router.push("/Admin");
      } else {
        showToast("Invalid email or password. Try admin@chiaview.com / Admin@123", "error");
      }
      setLoading(false);
    }, 500);
  };

  if (admin) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white mb-2"
            >
              Admin Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-200"
            >
              Login to manage your church content
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-blue-800/40 to-blue-700/40 backdrop-blur-lg rounded-2xl p-8 space-y-6 border border-blue-600/50 shadow-2xl"
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white font-semibold mb-3">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@chiaview.com"
                className="w-full px-5 py-3 rounded-lg bg-blue-900/50 text-white placeholder-blue-300 border-2 border-blue-600/50 focus:border-blue-400 focus:outline-none focus:bg-blue-900/70 transition"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-white font-semibold mb-3">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-lg bg-blue-900/50 text-white placeholder-blue-300 border-2 border-blue-600/50 focus:border-blue-400 focus:outline-none focus:bg-blue-900/70 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login to Admin Portal"}
            </motion.button>
          </motion.form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-blue-900/30 backdrop-blur border border-blue-600/50 rounded-xl p-6"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              💡 Demo Credentials
            </h3>
            <div className="space-y-3">
              <div className="bg-blue-900/50 rounded p-3">
                <p className="text-blue-300 text-sm">
                  <span className="font-semibold text-white">Email:</span> admin@chiaview.com
                </p>
                <p className="text-blue-300 text-sm">
                  <span className="font-semibold text-white">Password:</span> Admin@123
                </p>
              </div>
              <div className="bg-blue-900/50 rounded p-3">
                <p className="text-blue-300 text-sm">
                  <span className="font-semibold text-white">Email:</span> pastor@chiaview.com
                </p>
                <p className="text-blue-300 text-sm">
                  <span className="font-semibold text-white">Password:</span> Pastor@123
                </p>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-3"
          >
            <p className="text-blue-200">
              Don't have an account?{" "}
              <Link href="/Register" className="text-blue-300 font-bold hover:text-blue-100">
                Sign up here
              </Link>
            </p>
            <p className="text-blue-200">
              <Link href="/" className="text-blue-300 font-bold hover:text-blue-100">
                ← Back to Home
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
