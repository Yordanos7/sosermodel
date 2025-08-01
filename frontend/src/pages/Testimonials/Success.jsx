import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  StarIcon,
  UserIcon,
  MapPinIcon,
  BanknotesIcon,
  TruckIcon,
  HomeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { getTestimonials } from "../../api/testimonial";

const Success = () => {
  const { t } = useTranslation();
  const [successStories, setSuccessStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all_stories");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        setSuccessStories(response.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const categories = [
    {
      name: t("success.categories.all_stories"),
      id: "all_stories",
      count: successStories.length,
      active: activeCategory === "all_stories",
      icon: StarIcon,
    },
    {
      name: t("success.categories.small_business"),
      id: "small_business",
      count: successStories.filter(
        (s) => s.category === t("success.categories.small_business")
      ).length,
      active: activeCategory === "small_business",
      icon: BanknotesIcon,
    },
    {
      name: t("success.categories.agriculture"),
      id: "agriculture",
      count: successStories.filter(
        (s) => s.category === t("success.categories.agriculture")
      ).length,
      active: activeCategory === "agriculture",
      icon: TruckIcon,
    },
    {
      name: t("success.categories.education"),
      id: "education",
      count: successStories.filter(
        (s) => s.category === t("success.categories.education")
      ).length,
      active: activeCategory === "education",
      icon: AcademicCapIcon,
    },
    {
      name: t("success.categories.housing"),
      id: "housing",
      count: successStories.filter(
        (s) => s.category === t("success.categories.housing")
      ).length,
      active: activeCategory === "housing",
      icon: HomeIcon,
    },
  ];

  const stats = [
    {
      label: t("success.statistics.success_stories"),
      value: successStories.length,
      icon: StarIcon,
    },
    {
      label: t("success.statistics.lives_impacted"),
      value: "2000+",
      icon: UserIcon,
    },
    {
      label: t("success.statistics.jobs_created"),
      value: "150+",
      icon: BanknotesIcon,
    },
    {
      label: t("success.statistics.communities_served"),
      value: "25+",
      icon: MapPinIcon,
    },
  ];

  const filteredStories =
    activeCategory === "all_stories"
      ? successStories
      : successStories.filter(
          (s) => s.category === t(`success.categories.${activeCategory}`)
        );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-4 sm:w-5 h-4 sm:h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
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
            {t("success.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("success.header.description")}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8 md:mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center"
            >
              <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Category Filters */}
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
                category.active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Stories */}
        {filteredStories.filter((story) => story.featured).length > 0 && (
          <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {t("success.featured_stories.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {filteredStories
                .filter((story) => story.featured)
                .slice(0, 2)
                .map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      className="relative h-48 sm:h-56 bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center"
                      style={{
                        backgroundImage: `url(https://soserunion.com/${story.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        src={`https://soserunion.com/${story.image}`}
                        alt={story.title}
                        className="h-48 sm:h-56 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <p className="text-sm sm:text-lg font-semibold">
                            {story.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                            {story.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPinIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                            <span className="text-xs sm:text-sm">
                              {story.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStars(story.rating)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-4 md:mb-6">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("success.fields.loan_amount")}
                          </p>
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                            {story.loanAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("success.fields.business_type")}
                          </p>
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                            {story.businessType}
                          </p>
                        </div>
                      </div>

                      <blockquote className="text-gray-700 text-xs sm:text-sm md:text-base italic mb-2 sm:mb-4 md:mb-6">
                        "{story.story}"
                      </blockquote>

                      <div className="bg-green-50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg mb-2 sm:mb-4 md:mb-6">
                        <h4 className="font-semibold text-green-800 text-sm sm:text-base mb-1 sm:mb-2">
                          {t("success.fields.impact_achieved")}
                        </h4>
                        <p className="text-green-700 text-xs sm:text-sm">
                          {story.impact}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-500">
                          {t("success.fields.success_from", {
                            year: story.year,
                          })}
                        </span>
                        {story.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {t("success.fields.featured")}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Stories Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
            {t("success.all_stories.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="flex items-center">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <UserIcon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                        {story.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {story.location}
                      </p>
                    </div>
                  </div>
                  {story.featured && (
                    <span className="text-yellow-500 text-xs sm:text-sm">
                      ⭐
                    </span>
                  )}
                </div>

                <div className="mb-2 sm:mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {story.category}
                  </span>
                </div>

                <div className="flex items-center mb-2 sm:mb-4">
                  {renderStars(story.rating)}
                </div>

                <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-3">
                  "{story.story}"
                </p>

                <div className="border-t pt-2 sm:pt-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">
                      {t("success.fields.loan")}: {story.loanAmount}
                    </span>
                    <span className="text-gray-500">{story.year}</span>
                  </div>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-xs sm:text-sm text-green-600 font-medium">
                      {story.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Share Your Story CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
            {t("success.cta.title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
            {t("success.cta.description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
