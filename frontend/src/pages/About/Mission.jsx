import React from "react";
import { motion } from "framer-motion";
import {
  EyeIcon,
  RocketLaunchIcon,
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Mission = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const values = t("mission.core_values.items", { returnObjects: true }).map(
    (value, index) => ({
      icon: [HeartIcon, ShieldCheckIcon, UserGroupIcon, GlobeAltIcon][index],
      title: value.title,
      description: value.description,
    })
  );

  const goals = t("mission.strategic_goals.items", { returnObjects: true }).map(
    (goal, index) => ({
      title: goal.title,
      description: goal.description,
      progress: [60, 65, 70, 80, 70, 50][index], // Hardcoded progress values from original component
    })
  );

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="/1.png"
          alt="Company Mission"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto bg-orange-400 bg-opacity-70 p-8 rounded-lg"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {t("mission.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              {/* Add hero description if needed */}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <RocketLaunchIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {t("mission.mission_section.title")}
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("mission.mission_section.description")}
              </p>
              <ul className="space-y-3"></ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <EyeIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {t("mission.vision_section.title")}
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("mission.vision_section.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("mission.core_values.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("mission.core_values.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {user ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t("mission.cta.authenticated.title")}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {t("mission.cta.authenticated.description")}
                </p>
                <button
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => navigate("/contact/offices")}
                >
                  {t("mission.cta.authenticated.button")}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t("mission.cta.unauthenticated.title")}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {t("mission.cta.unauthenticated.description")}
                </p>
                <button
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => navigate("/get-started")}
                >
                  {t("mission.cta.unauthenticated.button")}
                </button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
