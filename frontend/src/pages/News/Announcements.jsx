import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "../../lib/axios";
import {
  CalendarDaysIcon,
  MegaphoneIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Announcements = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/announcements");
        setAnnouncements(response.data.announcements || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const categories = [
    {
      id: "all",
      name: t("announcements.categories.all"),
      count: announcements.length,
    },
    ...(Array.isArray(announcements)
      ? Object.entries(
          announcements.reduce((acc, announcement) => {
            acc[announcement.category] = (acc[announcement.category] || 0) + 1;
            return acc;
          }, {})
        ).map(([category, count]) => ({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1),
          count,
        }))
      : []),
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
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-4 lg:pt-8 w-full overflow-x-hidden bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-gradient-to-r from-blue-600 to-green-600 py-8 sm:py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: `url(/announce.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <MegaphoneIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4 text-white" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-white">
                {t("announcements.hero.title")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                {t("announcements.hero.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 sticky top-4 sm:top-6 lg:top-8"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">
                  {t("announcements.categories.title")}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-2 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg transition-all duration-200 text-xs sm:text-sm ${
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-2 sm:mb-4 md:mb-6"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                  {selectedCategory === "all"
                    ? t("announcements.categories.all")
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {t("announcements.main.count", {
                    count: filteredAnnouncements.length,
                    s: filteredAnnouncements.length !== 1 ? "s" : "",
                  })}
                </p>
              </motion.div>

              <div className="space-y-4 sm:space-y-6">
                {filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-2 sm:p-4 md:p-6">
                      <div className="flex items-start justify-between mb-2 sm:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                            <span
                              className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                                announcement.priority
                              )}`}
                            >
                              {t("announcements.main.priority", {
                                priority: announcement.priority.toUpperCase(),
                              })}
                            </span>
                            <span className="text-xs capitalize bg-gray-100 px-2 py-1 rounded">
                              {announcement.category}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {announcement.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-4">
                            {announcement.content}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-2 sm:pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
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
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm transition-colors">
                            <span>{t("announcements.main.read_more")}</span>
                            <ArrowRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
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
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center py-8 sm:py-12"
                >
                  <MegaphoneIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-2 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
                    {t("announcements.main.no_announcements.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {t("announcements.main.no_announcements.description")}
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
