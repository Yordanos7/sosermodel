import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ScaleIcon,
  BanknotesIcon,
  DocumentTextIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Insurance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const insuranceServices = t("insurance.services.items", {
    returnObjects: true,
  }).map((insurance, index) => ({
    id: index + 1,
    name: insurance.name,
    icon: [ScaleIcon, BanknotesIcon][index],
    description: insurance.description,
    coverage: insurance.coverage,
    benefits: insurance.benefits,
  }));

  const insuranceDefinition = {
    title: t("insurance.definition.title"),
    description: t("insurance.definition.description"),
    icon: ShieldCheckIcon,
  };

  const claimProcess = t("insurance.claim_process.items", {
    returnObjects: true,
  }).map((item, index) => ({
    step: index + 1,
    title: item.title,
    description: item.description,
  }));

  const features = t("insurance.features.items", { returnObjects: true }).map(
    (feature, index) => ({
      icon: [UserIcon, HeartIcon, DocumentTextIcon][index],
      title: feature.title,
      description: feature.description,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative overflow-hidden rounded-xl h-96"
        >
          <div
            className="absolute inset-0 bg-[url('/insurance.png')] bg-cover bg-center"
            style={{
              filter: "brightness(0.7)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("insurance.header.title")}
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {t("insurance.header.subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Insurance Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
              <insuranceDefinition.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {insuranceDefinition.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {insuranceDefinition.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Insurance Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insuranceServices.map((insurance, index) => (
            <motion.div
              key={insurance.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <insurance.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {insurance.name}
                </h3>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  {t("insurance.coverage_label")}
                </p>
                <p className="font-semibold text-gray-900">
                  {insurance.coverage}
                </p>
              </div>

              <p className="text-gray-600 mb-6">{insurance.description}</p>

              <div className="space-y-2 mb-6">
                <p className="font-semibold text-gray-900 mb-3">
                  {t("insurance.benefits_label")}
                </p>
                {insurance.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
                onClick={() => navigate("/get-started")}
              >
                {t("insurance.apply_button")}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("insurance.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Claims Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("insurance.claim_process.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {claimProcess.map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("insurance.cta.title")}
          </h2>
          <p className="text-gray-600 mb-8">{t("insurance.cta.description")}</p>
          <button
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/contact/offices")}
          >
            {t("insurance.cta.button")}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;
