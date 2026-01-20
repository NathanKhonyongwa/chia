'use client';

import { motion } from 'framer-motion';

/**
 * Generic skeleton loader component for loading states
 * @param {Object} props - Component props
 * @param {number} props.width - Width of skeleton (default: 100%)
 * @param {number} props.height - Height of skeleton (default: 20px)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Skeleton loader
 */
export const SkeletonLoader = ({ 
  width = '100%', 
  height = '20px', 
  className = '' 
}) => {
  return (
    <motion.div
      className={`bg-gray-300 rounded ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
};

/**
 * Skeleton for contact form loading state
 * @returns {JSX.Element} Contact form skeleton
 */
export const ContactFormSkeleton = () => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SkeletonLoader height="30px" className="mb-6" />
      
      {/* Input fields */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="mb-4">
          <SkeletonLoader height="15px" width="60px" className="mb-2" />
          <SkeletonLoader height="45px" />
        </div>
      ))}
      
      {/* Submit button */}
      <SkeletonLoader height="45px" className="mt-8" />
    </motion.div>
  );
};

/**
 * Skeleton for footer loading state
 * @returns {JSX.Element} Footer skeleton
 */
export const FooterSkeleton = () => {
  return (
    <motion.div
      className="bg-gray-900 text-white p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company info */}
        <div>
          <SkeletonLoader height="25px" width="150px" className="mb-4" />
          {[1, 2, 3].map((i) => (
            <SkeletonLoader key={i} height="15px" className="mb-3" />
          ))}
        </div>
        
        {/* Navigation columns */}
        {[1, 2, 3].map((col) => (
          <div key={col}>
            <SkeletonLoader height="20px" width="100px" className="mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <SkeletonLoader key={i} height="15px" className="mb-3" />
            ))}
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <SkeletonLoader height="1px" className="my-8" />
      
      {/* Footer bottom */}
      <div className="flex justify-between items-center">
        <SkeletonLoader height="15px" width="200px" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} height="25px" width="25px" className="rounded-full" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Skeleton for page content loading state
 * @returns {JSX.Element} Page content skeleton
 */
export const PageSkeleton = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <SkeletonLoader height="40px" width="60%" className="mb-8" />
      
      {/* Paragraph lines */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="mb-4">
          <SkeletonLoader height="15px" className="mb-2" />
          <SkeletonLoader height="15px" className="mb-2" />
          <SkeletonLoader height="15px" width="80%" />
        </div>
      ))}
      
      {/* Image placeholder */}
      <SkeletonLoader height="300px" className="my-8 rounded-lg" />
      
      {/* More content */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-4">
          <SkeletonLoader height="15px" className="mb-2" />
          <SkeletonLoader height="15px" className="mb-2" />
          <SkeletonLoader height="15px" width="75%" />
        </div>
      ))}
    </motion.div>
  );
};

/**
 * Skeleton for card grid loading state
 * @param {number} count - Number of skeleton cards to display
 * @returns {JSX.Element} Grid of skeleton cards
 */
export const CardGridSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          {/* Image */}
          <SkeletonLoader height="200px" className="mb-4 rounded" />
          
          {/* Title */}
          <SkeletonLoader height="20px" width="70%" className="mb-3" />
          
          {/* Description lines */}
          {[1, 2].map((j) => (
            <SkeletonLoader key={j} height="15px" className="mb-2" />
          ))}
          
          {/* Button */}
          <SkeletonLoader height="40px" className="mt-4" />
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
