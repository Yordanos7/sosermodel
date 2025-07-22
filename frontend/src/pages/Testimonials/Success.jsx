import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [successStories, setSuccessStories] = useState([]);

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

  console.log(successStories);

  const categories = [
    {
      name: "All Stories",
      count: successStories.length,
      active: true,
      icon: StarIcon,
    },
    {
      name: "Small Business",
      count: successStories.filter((s) => s.category === "Small Business")
        .length,
      active: false,
      icon: BanknotesIcon,
    },
    {
      name: "Agriculture",
      count: successStories.filter((s) => s.category === "Agriculture").length,
      active: false,
      icon: TruckIcon,
    },
    {
      name: "Education",
      count: successStories.filter((s) => s.category === "Education").length,
      active: false,
      icon: AcademicCapIcon,
    },
    {
      name: "Housing",
      count: successStories.filter((s) => s.category === "Housing").length,
      active: false,
      icon: HomeIcon,
    },
  ];

  const stats = [
    { label: "Success Stories", value: successStories.length, icon: StarIcon },
    { label: "Lives Impacted", value: "2000+", icon: UserIcon },
    { label: "Jobs Created", value: "150+", icon: BanknotesIcon },
    { label: "Communities Served", value: "25+", icon: MapPinIcon },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
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
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Sosser's financial services have transformed lives and
            communities across Ethiopia. These inspiring stories showcase the
            real impact of accessible financial services.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Category Filters */}

        {/* Featured Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Success Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories
              .filter((story) => story.featured)
              .slice(0, 2)
              .map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="relative h-48 bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(http://localhost:5000/${story.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/${story.image}`}
                      alt={story.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-lg font-semibold">
                          {story.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {story.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{story.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {renderStars(story.rating)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount</p>
                        <p className="font-semibold text-gray-900">
                          {story.loanAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Business Type</p>
                        <p className="font-semibold text-gray-900">
                          {story.businessType}
                        </p>
                      </div>
                    </div>

                    <blockquote className="text-gray-700 italic mb-6">
                      "{story.story}"
                    </blockquote>

                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Impact Achieved:
                      </h4>
                      <p className="text-green-700">{story.impact}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Success Story from {story.year}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Stories Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            All Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                  </div>
                  {story.featured && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {story.category}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  {renderStars(story.rating)}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  "{story.story}"
                </p>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Loan: {story.loanAmount}
                    </span>
                    <span className="text-gray-500">{story.year}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-green-600 font-medium">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Share Your Success Story</h2>
          <p className="text-xl mb-8">
            Have you achieved success with Sosser's support? We'd love to hear
            your story and inspire others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Submit Your Story
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
