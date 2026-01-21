/**
 * TestimonialsCarousel - Displays customer/user testimonials in a carousel
 * Features:
 * - Smooth carousel animations with Framer Motion
 * - Auto-rotating slides
 * - Manual navigation controls
 * - Responsive design (mobile-friendly)
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Star ratings display
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Sample testimonials data
 * Replace with actual data from your API or database
 */
const testimonials = [
  {
    id: 1,
    name: "Mary Kamwendo",
    role: "Community Member",
    content:
      "The work of Chia View has transformed our family. The youth mentorship program changed my son's life completely. He's now a strong believer and leader in our community.",
    rating: 5,
    image: "👩‍🌾",
  },
  {
    id: 2,
    name: "Joseph Banda",
    role: "Volunteer",
    content:
      "Being part of this mission has deepened my faith and shown me the real meaning of service. Every project we undertake is done with genuine love and dedication.",
    rating: 5,
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Grace Mchope",
    role: "Beneficiary",
    content:
      "When our family was struggling with food and my daughter needed school fees, Chia View stepped in. But more importantly, they shared the gospel and now our whole family believes.",
    rating: 5,
    image: "👩",
  },
  {
    id: 4,
    name: "David Chisambi",
    role: "Youth Leader",
    content:
      "The discipleship and leadership training I received equipped me to lead others. The pastors genuinely care about the spiritual development of every young person.",
    rating: 5,
    image: "👨",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoplay(false); // Stop autoplay when user manually navigates
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50"
      aria-label="Testimonials section"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Voices of Impact
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from those whose lives have been transformed by our mission
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-blue-100"
            >
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="text-6xl">{currentTestimonial.image}</div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="mb-8">
                <p className="text-xl text-gray-700 italic leading-relaxed">
                  &quot;{currentTestimonial.content}&quot;
                </p>
              </blockquote>

              {/* Author Info */}
              <div>
                <p className="text-lg font-bold text-blue-900">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm text-gray-600">
                  {currentTestimonial.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-blue-300 hover:bg-blue-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            {currentIndex + 1} of {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
