import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [selectedVideo, setSelectedVideo] = useState(null);
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
        setError(err.message || "Error fetching videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const categories = [
    { name: "All Videos", count: videos.length, active: true },
    ...Object.entries(
      videos.reduce((acc, video) => {
        acc[video.category] = (acc[video.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, count]) => ({ name, count, active: false })),
  ];

  const featuredVideos = videos.filter((video) => video.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views) => {
    const numViews = parseFloat(views.replace("K", "")) * 1000;
    if (numViews >= 1000) {
      return `${(numViews / 1000).toFixed(1)}K`;
    }
    return numViews.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Video Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of educational content, success stories, and
            tutorials designed to help you make the most of Sosser's financial
            services.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FilmIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {videos.length}
            </h3>
            <p className="text-gray-600">Total Videos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <EyeIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {Math.round(
                videos.reduce(
                  (total, video) =>
                    total +
                    (video.views
                      ? parseFloat(video.views.replace("K", "")) * 1000
                      : 0),
                  0
                ) / 1000
              )}
              K
            </h3>
            <p className="text-gray-600">Total Views</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <PlayIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {featuredVideos.length}
            </h3>
            <p className="text-gray-600">Featured Videos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CalendarDaysIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {categories.length - 1}
            </h3>
            <p className="text-gray-600">Categories</p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                category.active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Video Player */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-gray-900 rounded-xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 text-gray-800 hover:text-gray-900 transition-all duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <div className="aspect-w-16 w-full h-96">
                {selectedVideo.url.startsWith("http") ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(
                      selectedVideo.url
                    )}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <video
                    src={`http://localhost:5000/${selectedVideo.url}`}
                    title={selectedVideo.title}
                    controls
                    autoPlay
                    className="w-full h-full"
                  ></video>
                )}
              </div>
              <div className="p-6 bg-white text-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {selectedVideo.views} views
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {selectedVideo.duration}
                      </span>
                      <span className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {formatDate(selectedVideo.uploadDate)}
                      </span>
                      <span className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {selectedVideo.author}
                      </span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedVideo.category}
                  </span>
                </div>
                <p className="text-gray-700">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Featured Videos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.slice(0, 2).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-48">
                  {video.url.startsWith("http") ? (
                    <img
                      src={`http://localhost:5000/${video.thumbnail}`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={`http://localhost:5000/${video.url}`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-20">
                    <PlayIcon className="w-16 h-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {video.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {video.views}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{video.author}</span>
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Videos Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-48">
                  {video.url.startsWith("http") ? (
                    <img
                      src={`http://localhost:5000/${video.thumbnail}`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={`http://localhost:5000/${video.url}`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-20">
                    <PlayIcon className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {video.duration}
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="text-yellow-500 text-lg">⭐</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {video.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {video.views}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="truncate">{video.author}</span>
                    <span>
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our channel for the latest educational content and
            success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe to Channel
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Request Video Topic
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;
