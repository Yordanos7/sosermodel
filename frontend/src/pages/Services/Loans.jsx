import React from "react";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  HomeIcon,
  TruckIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Loans = () => {
  const { t } = useTranslation();

  const durationLoans = t("loans.duration_loans.items", {
    returnObjects: true,
  }).map((loan, index) => ({
    id: index + 1,
    name: loan.name,
    icon: ClockIcon,
    features: loan.features,
  }));

  const purposeLoans = t("loans.purpose_loans.items", {
    returnObjects: true,
  }).map((loan, index) => ({
    id: index + 4,
    name: loan.name,
    icon: [
      BuildingOfficeIcon,
      TruckIcon,
      WrenchScrewdriverIcon,
      BuildingStorefrontIcon,
    ][index],
    description: loan.description,
    features: loan.features,
  }));

  const requirements = t("loans.requirements.items", { returnObjects: true });

  const process = t("loans.application_process.items", {
    returnObjects: true,
  }).map((item, index) => ({
    step: index + 1,
    title: item.title,
    description: item.description,
  }));

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
            className="absolute inset-0 bg-[url('https://hips.hearstapps.com/hmg-prod/images/how-to-get-a-personal-loan-1584033069.jpg')] bg-cover bg-center"
            style={{
              filter: "brightness(0.7)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("loans.header.title")}
            </h1>
          </div>
        </motion.div>

        {/* Loan Types by Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("loans.duration_loans.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {durationLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <loan.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {loan.name}
                  </h3>
                </div>
                <div className="space-y-2 mb-6">
                  {loan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                  {t("loans.apply_button")}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Loan Types by Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("loans.purpose_loans.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {purposeLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <loan.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {loan.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{loan.description}</p>
                <div className="space-y-2 mb-6">
                  {loan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                  {t("loans.apply_button")}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("loans.application_process.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item) => (
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

        {/* Interest Rate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="mt-8">
              <Link to="/loan-calculator">
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                  {t("loans.interest_rate.button")}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loans;
