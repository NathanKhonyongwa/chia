/**
 * ContactForm - Reusable contact form component
 * Features:
 * - Multiple contact fields (name, email, subject, message)
 * - Real-time validation
 * - Error handling
 * - Success feedback
 * - Accessibility features
 * - Can be integrated into any page
 */

"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Validation rules for contact form
 */
const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.subject?.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message?.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, success, error
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handle input change with error clearing
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const newErrors = validateContactForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send message");
        }

        console.log("Contact form submitted:", formData.email);
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });

        // Reset status after 3 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 3000);
      } catch (error) {
        console.error("Contact form error:", error);
        setErrorMessage(error.message || "An error occurred. Please try again later.");
        setSubmitStatus("error");
      }
    });
  };

  return (
    <div id="contact" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions or want to join our mission? We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50"
        >
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    role="alert"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-xs">
                      • {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Email Address *
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
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-xs">
                        • {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
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
                      placeholder="+265 123 456 789"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-500 hover:border-blue-300 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    aria-invalid={!!errors.subject}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 ${
                      errors.subject
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                    }`}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-500 text-xs">
                      • {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-xs">
                      • {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending}
                  aria-busy={isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </motion.button>

                {/* Required Fields Note */}
                <p className="text-xs text-gray-500 text-center">
                  * Required fields
                </p>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Email",
              value: "info@chiamissionview.org",
              href: "mailto:info@chiamissionview.org",
            },
            {
              title: "Phone",
              value: "+265 1 234 5678",
              href: "tel:+2651234567",
            },
            {
              title: "Address",
              value: "Dowa District, Malawi",
              href: "#",
            },
          ].map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/50 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-gray-700 mb-2">{contact.title}</h3>
              <p className="text-blue-600 font-semibold">{contact.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
