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

const Loans = () => {
  // Loan types based on duration from your image
  const durationLoans = [
    {
      id: 1,
      name: "Short Term Loan",
      icon: ClockIcon,
      features: [
        "Up to 1 year duration",
        "Quick approval",
        "Flexible repayment options",
      ],
    },
    {
      id: 2,
      name: "Middle Term Loan",
      icon: ClockIcon,
      features: [
        "1-5 years duration",
        "Medium-term financing",
        "Business growth support",
      ],
    },
    {
      id: 3,
      name: "Long Term Loan",
      icon: ClockIcon,
      features: [
        "5-10 years duration",
        "Long-term investment",
        "Large project financing",
      ],
    },
  ];

  // Loan types based on purpose from your image
  const purposeLoans = [
    {
      id: 4,
      name: "Manufacturing Loan",
      icon: BuildingOfficeIcon,
      description: "Loan disbursed for manufacturing purposes.",
      features: [
        "Equipment financing",
        "Factory setup",
        "Raw material purchase",
        "Production expansion",
      ],
    },
    {
      id: 5,
      name: "Agricultural Loan",
      icon: TruckIcon,
      description: "Loan for agricultural development and farming activities.",
      features: [
        "Farm equipment",
        "Seed and fertilizer",
        "Irrigation systems",
        "Livestock purchase",
      ],
    },
    {
      id: 6,
      name: "Construction Loan",
      icon: WrenchScrewdriverIcon,
      description:
        "Financing for construction projects and real estate development.",
      features: [
        "Building materials",
        "Labor costs",
        "Project financing",
        "Property development",
      ],
    },
    {
      id: 7,
      name: "Service Loan",
      icon: BuildingStorefrontIcon,
      description: "Loan for service-oriented businesses and enterprises.",
      features: [
        "Business expansion",
        "Service equipment",
        "Working capital",
        "Technology upgrade",
      ],
    },
  ];

  const requirements = [
    "Valid Ethiopian ID or passport",
    "Proof of income or business registration",
    "Bank statements (last 6 months)",
    "Collateral documentation (if applicable)",
    "Guarantor information",
    "Completed loan application form",
  ];

  const process = [
    {
      step: 1,
      title: "Application",
      description: "Submit your loan application with required documents",
    },
    {
      step: 2,
      title: "Review",
      description: "Our team reviews your application and credit history",
    },
    {
      step: 3,
      title: "Approval",
      description: "Receive approval notification and loan terms",
    },
    {
      step: 4,
      title: "Disbursement",
      description: "Funds are transferred to your account",
    },
  ];

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
              Loan Services
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
                  Apply Now
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
            Loans by Purpose
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
                  Apply Now
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
            Application Process
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

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Loan Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-gray-700">{requirement}</span>
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
                  Calculate Your Loan
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
