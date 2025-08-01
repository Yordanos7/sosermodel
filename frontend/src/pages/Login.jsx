import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        if (result.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(
          t("login.errors.login_failed", {
            message: result.error || t("login.errors.unexpected_error"),
          })
        );
      }
    } catch (error) {
      setError(
        t("login.errors.login_failed", {
          message: error.message || t("login.errors.unexpected_error"),
        })
      );
      console.error("Login error:", error);
    }

    setIsLoading(false);
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
                  alt={t("login.images.logo_alt")}
                  className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
                />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                {t("login.header.title")}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {t("login.header.description")}
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

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("login.form.email_label")}
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
                    placeholder={t("login.form.email_placeholder")}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t("login.form.password_label")}
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
                    placeholder={t("login.form.password_placeholder")}
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

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 px-4 rounded-md sm:rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs sm:text-sm"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                ) : (
                  <span>{t("login.form.submit_button")}</span>
                )}
              </motion.button>
            </form>

            <div className="mt-4 sm:mt-6 md:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                {t("login.navigation.signup_prompt")}{" "}
                <a
                  href="/get-started"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t("login.navigation.signup_link")}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
