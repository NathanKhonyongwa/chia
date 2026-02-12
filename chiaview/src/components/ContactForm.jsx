/**
 * ContactForm - Reusable contact form component
 * Features:
 * - Multiple contact fields (name, email, subject, message)
 * - Real-time validation
 * - Error handling
 * - Success feedback
 * - Accessibility features
 * - Fully responsive design
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
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.subject?.trim()) {
    errors.subject = "Subject is required";
  } else if (formData.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!formData.message?.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (formData.message.length > 5000) {
    errors.message = "Message must not exceed 5000 characters";
  }

  return errors;
};

/**
 * Sanitize user input to prevent XSS attacks
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
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
        // Sanitize all input data before sending
        const sanitizedData = {
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          subject: sanitizeInput(formData.subject),
          message: sanitizeInput(formData.message),
          phone: sanitizeInput(formData.phone),
        };

        const response = await fetch("/api/contact/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send message");
        }

        console.log("Contact form submitted:", sanitizedData.email);
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
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4 leading-relaxed">
            Have questions or want to join our mission? We'd love to hear from you. 
            Fill out the form below and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 md:p-10 lg:p-12 border border-white/50 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8 sm:py-10 md:py-12 px-4"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-sm sm:text-base text-green-700">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Error Alert */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm"
                    role="alert"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Name Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 text-sm sm:text-base ${
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

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 text-sm sm:text-base ${
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
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Phone (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+265 123 456 789"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-500 hover:border-blue-300 transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="subject" className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 text-sm sm:text-base ${
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
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={window.innerWidth < 640 ? 4 : 6}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${
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
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
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

        {/* Additional Contact Info - Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Email",
              value: "info@chiamissionview.org",
              href: "mailto:info@chiamissionview.org",
              icon: "",
            },
            {
              title: "Phone",
              value: "+265 1 234 5678",
              href: "tel:+2651234567",
              icon: "",
            },
            {
              title: "Address",
              value: "Dowa District, Malawi",
              href: "#",
              icon: "",
            },
          ].map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              whileHover={{ y: -5 }}
              className="group bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center border border-white/50 hover:shadow-lg hover:bg-white transition-all duration-300"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 block group-hover:scale-110 transition-transform">
                {contact.icon}
              </span>
              <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                {contact.title}
              </h3>
              <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-base break-words">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}