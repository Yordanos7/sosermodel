import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../lib/axios";
import {
  CalendarDaysIcon,
  MegaphoneIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Announcements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const categories = [
    { id: "all", name: "All Announcements", count: announcements.length },
    ...Object.entries(
      announcements.reduce((acc, announcement) => {
        acc[announcement.category] = (acc[announcement.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([category, count]) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count,
    })),
  ];

  const filteredAnnouncements =
    selectedCategory === "all"
      ? announcements
      : announcements.filter(
          (announcement) => announcement.category === selectedCategory
        );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-gradient-to-r from-blue-600 to-green-600 py-20"
        style={{
          backgroundImage: `url(/announce.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <MegaphoneIcon className="w-16 h-16 mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Announcements
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-white/90">
                Stay informed with the latest updates, policy changes, and
                important notices from Sosser.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Content - Announcements */}
            <div className="lg:w-3/4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedCategory === "all"
                    ? "All Announcements"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredAnnouncements.length} announcement
                  {filteredAnnouncements.length !== 1 ? "s" : ""} found
                </p>
              </motion.div>

              <div className="space-y-6">
                {filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                                announcement.priority
                              )}`}
                            >
                              {announcement.priority.toUpperCase()} PRIORITY
                            </span>
                            <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                              {announcement.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {announcement.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {announcement.content}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarDaysIcon className="w-4 h-4" />
                              <span>
                                {formatDate(announcement.publishDate)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>By {announcement.user.name}</span>
                            </div>
                          </div>
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                            <span>Read More</span>
                            <ArrowRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredAnnouncements.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <MegaphoneIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    No announcements found
                  </h3>
                  <p className="text-gray-400">
                    Try selecting a different category or check back later.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
