import React from "react";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  QrCodeIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Digital = () => {
  const { t } = useTranslation();

  const services = t("digital.services.items", { returnObjects: true }).map(
    (service, index) => ({
      id: index + 1,
      name: service.name,
      icon: [
        DevicePhoneMobileIcon,
        CreditCardIcon,
        ArrowsRightLeftIcon,
        GlobeAltIcon,
      ][index],
      description: service.description,
      features: service.features,
    })
  );

  const benefits = t("digital.benefits.items", { returnObjects: true }).map(
    (benefit, index) => ({
      icon: [ClockIcon, ShieldCheckIcon, BanknotesIcon, QrCodeIcon][index],
      title: benefit.title,
      description: benefit.description,
    })
  );

  const paymentMethods = t("digital.payment_methods.items", {
    returnObjects: true,
  }).map((method, index) => ({
    name: method.name,
    logo: ["📱", "🏦", "💳"][index],
    description: method.description,
    features: method.features,
  }));

  const steps = t("digital.steps.items", { returnObjects: true }).map(
    (item, index) => ({
      step: index + 1,
      title: item.title,
      description: item.description,
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
            className="absolute inset-0 bg-[url('https://www.nelito.com/images/blog-images/what-is-digital-banking-its-benefits-and-future-banner.jpg')] bg-cover bg-center"
            style={{
              filter: "brightness(0.8)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("digital.header.title")}
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {t("digital.header.subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Digital Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {service.name}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                {t("digital.get_started_button")}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("digital.benefits.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("digital.payment_methods.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200"
              >
                <div className="text-4xl mb-4">{method.logo}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.name}
                </h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <ul className="space-y-1">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("digital.steps.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Digital;
