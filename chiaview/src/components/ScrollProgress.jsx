/**
 * ScrollProgress - Reading progress indicator
 * Features:
 * - Shows scroll progress as a thin bar at the top
 * - Smooth animations
 * - Accessible with proper ARIA attributes
 */

"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
      style={{ scaleX }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isVisible ? scaleX : 0 }}
      transition={{ duration: 0.3 }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-label="Page scroll progress"
    />
  );
}