import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  PhotoIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { getGalleryItems } from "../../api/gallery";

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getGalleryItems();
        setGalleryImages(data.galleryItems);
      } catch (err) {
        setError(
          t("gallery.status.error", { message: err.message || "Unknown error" })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, [t]);

  const categories = [
    {
      name: t("gallery.categories.all"),
      id: "all",
      count: galleryImages.length,
    },
    ...Object.entries(
      galleryImages.reduce((acc, img) => {
        acc[img.category] = (acc[img.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, count]) => ({
      name,
      id: name.toLowerCase().replace(/\s/g, "_"),
      count,
    })),
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter(
          (img) =>
            img.category ===
            categories.find((cat) => cat.id === activeCategory)?.name
        );

  const featuredImages = galleryImages.filter((img) => img.featured);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 lg:pt-8 w-full overflow-x-hidden mt-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
            {t("gallery.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("gallery.header.description")}
          </p>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 sm:mb-8"
          >
            <p className="text-sm sm:text-base text-gray-600">
              {t("gallery.status.loading")}
            </p>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 sm:mb-8"
          >
            <p className="text-sm sm:text-base text-red-600">{error}</p>
          </motion.div>
        )}

        {/* Statistics */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8 md:mb-12"
          >
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <PhotoIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {galleryImages.length}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("gallery.statistics.total_photos")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <CalendarDaysIcon className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {categories.length - 1}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("gallery.statistics.categories")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <EyeIcon className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {featuredImages.length}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("gallery.statistics.featured_photos")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <PhotoIcon className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {new Date().getFullYear()}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("gallery.statistics.latest_year")}
              </p>
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-8 md:mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-2 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </motion.div>
        )}

        {/* Featured Images */}
        {!loading &&
          !error &&
          activeCategory === "all" &&
          featuredImages.length > 0 && (
            <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
                {t("gallery.featured_photos.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredImages.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer"
                    onClick={() => openModal(image)}
                  >
                    <div className="aspect-w-16 aspect-h-12 bg-gray-300 rounded-md sm:rounded-lg overflow-hidden">
                      <img
                        src={`https://soserunion.com/${image.url}`}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-md sm:rounded-lg flex items-center justify-center">
                      <EyeIcon className="w-8 sm:w-10 h-8 sm:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-4 rounded-b-md sm:rounded-b-lg">
                      <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {image.category}
                        </span>
                        <span className="text-white text-xs sm:text-sm">
                          {formatDate(image.date)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        {/* All Images Grid */}
        {!loading && !error && (
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {activeCategory === "all"
                ? t("gallery.all_photos.all_title")
                : t("gallery.all_photos.title", {
                    category: categories.find(
                      (cat) => cat.id === activeCategory
                    )?.name,
                  })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredImages.length > 0 ? (
                filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    onClick={() => openModal(image)}
                  >
                    <div className="aspect-w-16 aspect-h-12">
                      <img
                        src={`https://soserunion.com/${image.url}`}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <EyeIcon className="w-8 sm:w-10 h-8 sm:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-2 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                          {image.title}
                        </h3>
                        {image.featured && (
                          <span className="text-yellow-500 text-xs sm:text-sm">
                            ⭐
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs sm:text-sm font-medium">
                          {image.category}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm">
                          {formatDate(image.date)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 text-center col-span-full">
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">
                    {t("gallery.all_photos.no_photos")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full bg-white rounded-md sm:rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <XMarkIcon className="w-4 sm:w-6 h-4 sm:h-6 text-gray-800" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeftIcon className="w-4 sm:w-6 h-4 sm:h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 text-gray-800" />
                </button>

                {/* Image */}
                <div className="w-full h-64 sm:h-80 md:h-96">
                  <img
                    src={`https://soserunion.com/${selectedImage.url}`}
                    alt={t("gallery.modal.alt_text")}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Info */}
                <div className="p-2 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                      {selectedImage.title}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {selectedImage.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-4">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <CalendarDaysIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                    <span>{formatDate(selectedImage.date)}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload CTA */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
              {t("gallery.cta.title")}
            </h2>
            <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
              {t("gallery.cta.description")}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
