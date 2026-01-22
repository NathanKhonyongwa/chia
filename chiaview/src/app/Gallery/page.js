/**
 * Photo Gallery - Church photo gallery and media library
 * Features:
 * - Photo gallery with categories
 * - Image lightbox/modal
 * - Photo upload (admin only)
 * - Event galleries
 * - Ministry photos
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaTimes, FaChevronLeft, FaChevronRight, FaFilter, FaUpload } from "react-icons/fa";

// Sample gallery data
const galleryData = [
  {
    id: 1,
    title: "Sunday Worship Service",
    category: "worship",
    image: "/api/placeholder/400/300",
    description: "Our weekly worship gathering brings the community together in praise and fellowship.",
    date: "2024-01-21",
    tags: ["worship", "community", "praise"]
  },
  {
    id: 2,
    title: "Youth Ministry Outreach",
    category: "youth",
    image: "/api/placeholder/400/300",
    description: "Young people serving the community through various outreach programs.",
    date: "2024-01-18",
    tags: ["youth", "outreach", "service"]
  },
  {
    id: 3,
    title: "Community Food Drive",
    category: "outreach",
    image: "/api/placeholder/400/300",
    description: "Distributing food packages to families in need during our monthly food drive.",
    date: "2024-01-15",
    tags: ["outreach", "community", "service"]
  },
  {
    id: 4,
    title: "Children's Ministry",
    category: "children",
    image: "/api/placeholder/400/300",
    description: "Teaching and nurturing our youngest members through fun and faith-based activities.",
    date: "2024-01-14",
    tags: ["children", "education", "faith"]
  },
  {
    id: 5,
    title: "Prayer Meeting",
    category: "prayer",
    image: "/api/placeholder/400/300",
    description: "Weekly prayer gathering for spiritual growth and intercession.",
    date: "2024-01-17",
    tags: ["prayer", "fellowship", "spiritual"]
  },
  {
    id: 6,
    title: "Women's Fellowship",
    category: "fellowship",
    image: "/api/placeholder/400/300",
    description: "Monthly gathering for women to connect, pray, and grow together.",
    date: "2024-01-10",
    tags: ["women", "fellowship", "community"]
  },
  {
    id: 7,
    title: "Mission Trip Preparation",
    category: "missions",
    image: "/api/placeholder/400/300",
    description: "Preparing for our upcoming mission trip to serve communities in need.",
    date: "2024-01-08",
    tags: ["missions", "service", "preparation"]
  },
  {
    id: 8,
    title: "Baptism Ceremony",
    category: "worship",
    image: "/api/placeholder/400/300",
    description: "Celebrating new beginnings in faith through baptism.",
    date: "2024-01-07",
    tags: ["baptism", "worship", "celebration"]
  }
];

const categories = {
  all: { name: "All Photos", icon: "📸", color: "#6B7280" },
  worship: { name: "Worship Services", icon: "🙏", color: "#3B82F6" },
  youth: { name: "Youth Ministry", icon: "👥", color: "#10B981" },
  children: { name: "Children's Ministry", icon: "👶", color: "#06B6D4" },
  outreach: { name: "Community Outreach", icon: "🤝", color: "#F59E0B" },
  prayer: { name: "Prayer & Fellowship", icon: "🙏", color: "#8B5CF6" },
  fellowship: { name: "Fellowship", icon: "👭", color: "#EC4899" },
  missions: { name: "Missions", icon: "✈️", color: "#EF4444" }
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // This would come from auth context

  // Filter images by category
  const filteredImages = selectedCategory === 'all'
    ? galleryData
    : galleryData.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Capturing moments of faith, fellowship, and service in our church community.
              Browse through our collection of worship services, outreach events, and ministry activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              <span className="ml-2 text-sm opacity-75">
                ({key === 'all' ? galleryData.length : galleryData.filter(img => img.category === key).length})
              </span>
            </button>
          ))}
        </div>

        {/* Admin Upload Button */}
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <FaUpload />
              Upload New Photos
            </button>
          </div>
        )}

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: categories[image.category].color }}
                  >
                    {categories[image.category].icon} {categories[image.category].name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <FaCamera className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No photos found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try selecting a different category or check back later for new uploads.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-full p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <FaChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <FaChevronRight className="w-8 h-8" />
              </button>

              {/* Image */}
              <motion.img
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-6"
              >
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-200 mb-3">{selectedImage.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}