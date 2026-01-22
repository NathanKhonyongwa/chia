/**
 * SearchBar - Global search component
 * Features:
 * - Search across blog posts, pages, and content
 * - Keyboard shortcuts (Ctrl/Cmd + K)
 * - Modal overlay with results
 * - Recent searches
 * - Accessible design
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";

const searchData = [
  { title: "Home", url: "/", type: "page", description: "Welcome to Chia View Church Mission" },
  { title: "Mission", url: "/Mission", type: "page", description: "Our mission and impact" },
  { title: "About Us", url: "/About", type: "page", description: "Learn about our organization" },
  { title: "Blog", url: "/Blog", type: "page", description: "Latest news and stories" },
  { title: "Volunteer", url: "/Volunteer", type: "page", description: "Join our volunteer team" },
  { title: "Donations", url: "/Donations", type: "page", description: "Support our mission" },
  { title: "Contact", url: "#contact", type: "section", description: "Get in touch with us" },
  { title: "Community Outreach", url: "/Mission", type: "program", description: "Supporting vulnerable families" },
  { title: "Youth Empowerment", url: "/Mission", type: "program", description: "Mentoring the next generation" },
  { title: "Spiritual Growth", url: "/Mission", type: "program", description: "Faith and discipleship" },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Filter results based on query
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "page": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "program": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "section": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Open search"
      >
        <FaSearch className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search pages, programs, and content... (Ctrl+K)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <Link
                        key={index}
                        href={result.url}
                        onClick={handleClose}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {result.description}
                            </p>
                          </div>
                          <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <FaSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No results found for "{query}"</p>
                    <p className="text-sm mt-2">Try searching for pages, programs, or content</p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <FaSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Start typing to search...</p>
                    <p className="text-sm mt-2">Press Ctrl+K to open search anytime</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}