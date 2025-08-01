import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  PlayIcon,
  FilmIcon,
  EyeIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getVideos } from "../../api/video";
import getYouTubeId from "get-youtube-id";

const Videos = () => {
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all_videos");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getVideos();
        setVideos(data.videos);
      } catch (err) {
        setError(
          t("videos.status.error", { message: err.message || "Unknown error" })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [t]);

  const categories = [
    {
      name: t("videos.categories.all_videos"),
      id: "all_videos",
      count: videos.length,
    },
    ...Object.entries(
      videos.reduce((acc, video) => {
        acc[video.category] = (acc[video.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, count]) => ({
      name,
      id: name.toLowerCase().replace(/\s/g, "_"),
      count,
    })),
  ];

  const filteredVideos =
    activeCategory === "all_videos"
      ? videos
      : videos.filter(
          (video) =>
            video.category ===
            categories.find((cat) => cat.id === activeCategory)?.name
        );

  const featuredVideos = filteredVideos.filter((video) => video.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views) => {
    if (!views) return "0";
    const numViews =
      parseFloat(views.replace("K", "")) * (views.includes("K") ? 1000 : 1);
    if (numViews >= 1000) {
      return `${(numViews / 1000).toFixed(1)}K`;
    }
    return numViews.toString();
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
            {t("videos.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("videos.header.description")}
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
              {t("videos.status.loading")}
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
              <FilmIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {videos.length}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("videos.statistics.total_videos")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <EyeIcon className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {formatViews(
                  videos
                    .reduce(
                      (total, video) =>
                        total +
                        (video.views
                          ? parseFloat(video.views.replace("K", "")) *
                            (video.views.includes("K") ? 1000 : 1)
                          : 0),
                      0
                    )
                    .toString()
                )}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("videos.statistics.total_views")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <PlayIcon className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {featuredVideos.length}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("videos.statistics.featured_videos")}
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
              <CalendarDaysIcon className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {categories.length - 1}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("videos.statistics.categories")}
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

        {/* Featured Video Player */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative bg-gray-900 rounded-md sm:rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 text-gray-800 hover:text-gray-900 transition-all duration-200"
                >
                  <XMarkIcon className="w-4 sm:w-6 h-4 sm:h-6" />
                </button>
                <div className="aspect-w-16 w-full h-64 sm:h-80 md:h-96">
                  {selectedVideo.url.startsWith("http") ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(
                        selectedVideo.url
                      )}`}
                      title={t("videos.modal.alt_text")}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <video
                      src={`https://soserunion.com/${selectedVideo.url}`}
                      title={t("videos.modal.alt_text")}
                      controls
                      autoPlay
                      className="w-full h-full"
                    ></video>
                  )}
                </div>
                <div className="p-2 sm:p-4 md:p-6 bg-white text-gray-800">
                  <div className="flex items-start justify-between mb-2 sm:mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                        {selectedVideo.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center">
                          <EyeIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {formatViews(selectedVideo.views)}{" "}
                          {t("videos.statistics.total_views").toLowerCase()}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {selectedVideo.duration}
                        </span>
                        <span className="flex items-center">
                          <CalendarDaysIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {formatDate(selectedVideo.uploadDate)}
                        </span>
                        <span className="flex items-center">
                          <UserIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {selectedVideo.author}
                        </span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {selectedVideo.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                    {selectedVideo.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Videos */}
        {!loading && !error && featuredVideos.length > 0 && (
          <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {t("videos.featured_videos.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {featuredVideos.slice(0, 2).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative h-48 sm:h-56">
                    {video.url.startsWith("http") ? (
                      <img
                        src={`https://soserunion.com/${video.thumbnail}`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={`https://soserunion.com/${video.url}`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-20">
                      <PlayIcon className="w-12 sm:w-16 h-12 sm:h-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                      {video.duration}
                    </div>
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {t("videos.featured_videos.title").split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {video.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <EyeIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                        {formatViews(video.views)}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span className="truncate">{video.author}</span>
                      <span>{formatDate(video.uploadDate)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Videos Grid */}
        {!loading && !error && (
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {activeCategory === "all_videos"
                ? t("videos.all_videos.all_title")
                : t("videos.all_videos.title", {
                    category: categories.find(
                      (cat) => cat.id === activeCategory
                    )?.name,
                  })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative h-48 sm:h-56">
                      {video.url.startsWith("http") ? (
                        <img
                          src={`https://soserunion.com/${video.thumbnail}`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={`https://soserunion.com/${video.url}`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-20">
                        <PlayIcon className="w-10 sm:w-12 h-10 sm:h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                        {video.duration}
                      </div>
                      {video.featured && (
                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                          <span className="text-yellow-500 text-sm sm:text-lg">
                            ⭐
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs sm:text-sm font-medium">
                          {video.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                          <EyeIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {formatViews(video.views)}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 md:mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <span className="truncate">{video.author}</span>
                        <span>{formatDate(video.uploadDate)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 text-center col-span-full">
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">
                    {t("videos.all_videos.no_videos")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

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
              {t("videos.cta.title")}
            </h2>
            <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
              {t("videos.cta.description")}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Videos;
