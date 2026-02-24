/**
 * SocialShare - Social media sharing component
 * Features:
 * - Share to Facebook, Twitter, LinkedIn, WhatsApp
 * - Copy link to clipboard
 * - Native sharing API support
 * - Accessible design with proper ARIA labels
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
  FaShare
} from "react-icons/fa";

const socialPlatforms = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    color: "bg-blue-600 hover:bg-blue-700",
    shareUrl: (url, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    color: "bg-sky-500 hover:bg-sky-600",
    shareUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    color: "bg-blue-700 hover:bg-blue-800",
    shareUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "bg-green-600 hover:bg-green-700",
    shareUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  }
];

export default function SocialShare({ url, title, description = "", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || (typeof window !== 'undefined' ? document.title : '');

  const handleShare = async (platform) => {
    const shareLink = platform.shareUrl(shareUrl, shareTitle);

    if (platform.name === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
      return;
    }

    // Check if native sharing is available
    if (navigator.share && platform.name === 'native') {
      try {
        await navigator.share({
          title: shareTitle,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
      return;
    }

    // Open share link in new window
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share this content"
      >
        <FaShare className="w-4 h-4" />
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      {/* Share Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
          >
            <div className="p-2">
              {/* Native Share (if available) */}
              {navigator.share && (
                <button
                  onClick={() => handleShare({ name: 'native' })}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <FaShare className="w-4 h-4" />
                  <span className="text-sm">Share via...</span>
                </button>
              )}

              {/* Social Platforms */}
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-white rounded-md transition-colors ${platform.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{platform.name}</span>
                  </button>
                );
              })}

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaLink className="w-4 h-4" />
                <span className="text-sm">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}