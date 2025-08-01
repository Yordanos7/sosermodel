import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { register } from "../api/auth";

const GetStarted = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("getStarted.errors.password_mismatch"));
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: formData.role,
      });

      if (result.token) {
        setSuccess(t("getStarted.form.submitting") + " Success!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(result.message || t("getStarted.errors.registration_failed"));
      }
    } catch (error) {
      setError(error.message || t("getStarted.errors.unexpected_error"));
    }

    setIsLoading(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen pt-4 lg:pt-8 bg-gradient-to-br from-blue-50 to-green-50 w-full overflow-x-hidden">
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8"
          >
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <img
                  src="/favicon.ico"
                  alt={t("getStarted.images.logo_alt")}
                  className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
                />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                {t("getStarted.header.title")}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("getStarted.header.description")}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm"
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.name_label")}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t("getStarted.form.name_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.email_label")}
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t("getStarted.form.email_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.phone_label")}
                </label>
                <div className="relative">
                  <PhoneIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t("getStarted.form.phone_placeholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.address_label")}
                </label>
                <div className="relative">
                  <HomeIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t("getStarted.form.address_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.password_label")}
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t("getStarted.form.password_placeholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("getStarted.form.confirm_password_label")}
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                    placeholder={t(
                      "getStarted.form.confirm_password_placeholder"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 px-4 rounded-md sm:rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs sm:text-sm"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:h-5 border-b-2 border-white"></div>
                ) : (
                  <span>{t("getStarted.form.submit_button")}</span>
                )}
              </motion.button>
            </form>

            <div className="mt-4 sm:mt-6 md:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                {t("getStarted.form.login_prompt")}{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t("getStarted.form.login_link")}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
