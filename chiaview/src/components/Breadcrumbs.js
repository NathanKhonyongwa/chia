'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * Breadcrumb navigation component
 * Displays current page location in site hierarchy
 * 
 * @param {Array<{label: string, href?: string}>} items - Breadcrumb items
 * @returns {JSX.Element} Breadcrumb navigation
 * 
 * @example
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Services', href: '/services' },
 *   { label: 'Contact' }
 * ]} />
 */
export default function Breadcrumbs({ items = [{ label: 'Home', href: '/' }] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-600 py-3 px-4 overflow-x-auto"
      aria-label="Breadcrumb"
    >
      <motion.ol
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-2 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Breadcrumb item */}
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.span
                  animate={{
                    color: hoveredIndex === index ? '#1e40af' : '#2563eb',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            ) : (
              <span
                className="text-gray-700 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}

            {/* Separator (only show if not last item) */}
            {index < items.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.05 }}
              >
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </nav>
  );
}
