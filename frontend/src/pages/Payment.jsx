import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  DevicePhoneMobileIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  CloudArrowUpIcon,
  LinkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { getMyPayments, createPayment } from "../api/payment";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Payment = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth(); // Get the user from the AuthContext
  const [selectedMethod, setSelectedMethod] = useState("telebirr");
  const [transactionData, setTransactionData] = useState({
    amount: "",
    transactionId: "",
    screenshot: null,
    transactionLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);

  const paymentMethods = [
    {
      id: "telebirr",
      name: "TeleBirr",
      icon: DevicePhoneMobileIcon,
      color: "from-orange-500 to-red-500",
      steps: t("payment.payment_steps.telebirr", { returnObjects: true }),
    },
    {
      id: "awash",
      name: "Awash Bank Mobile",
      icon: BuildingLibraryIcon,
      color: "from-blue-500 to-indigo-500",
      steps: t("payment.payment_steps.awash", { returnObjects: true }),
    },
    {
      id: "abyssinia",
      name: "Bank of Abyssinia App",
      icon: CreditCardIcon,
      color: "from-green-500 to-teal-500",
      steps: t("payment.payment_steps.abyssinia", { returnObjects: true }),
    },
  ];

  useEffect(() => {
    if (user) {
      fetchPayments();
    }
  }, [t, user]);

  const fetchPayments = async () => {
    setIsLoadingPayments(true);
    try {
      const res = await getMyPayments();
      setPayments(res);
    } catch (err) {
      setError(err.message || t("payment.errors.fetch_failed"));
    } finally {
      setIsLoadingPayments(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTransactionData((prev) => ({
        ...prev,
        screenshot: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("amount", transactionData.amount);
    formData.append("transactionId", transactionData.transactionId);
    formData.append("screenshot", transactionData.screenshot);
    formData.append("paymentMethod", selectedMethod);
    formData.append(
      "transactionLink",
      transactionData.transactionLink || `payment-${Date.now()}`
    );

    try {
      const response = await createPayment(formData);

      if (response) {
        setIsSubmitting(false);
        setSubmitted(true);
        setTransactionData({
          amount: "",
          transactionId: "",
          screenshot: null,
          transactionLink: "",
        });
        await fetchPayments();
      }
    } catch (err) {
      setIsSubmitting(false);
      const data = err.response?.data;
      if (
        err.response?.status === 400 &&
        data?.message.includes("Invalid user ID")
      ) {
        setError(t("payment.errors.invalid_user"));
        localStorage.removeItem("sosser_token");
        localStorage.removeItem("sosser_user");
      } else {
        setError(
          t("payment.errors.payment_failed", {
            message: data?.message || err.message || "Unknown error",
          })
        );
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-4 lg:pt-8 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center w-full overflow-x-hidden mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-center max-w-md mx-2 sm:mx-4"
        >
          <CheckCircleIcon className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mx-auto mb-2 sm:mb-4" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
            {t("payment.success.title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
            {t("payment.success.description")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200"
          >
            {t("payment.success.button")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 lg:pt-8 bg-gradient-to-br from-blue-50 to-green-50 w-full overflow-x-hidden mt-24">
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-4 sm:mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              {t("payment.header.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t("payment.header.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-8 md:mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
                {t("payment.select_method.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 sm:p-6 rounded-md sm:rounded-lg border-2 transition-all duration-200 ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${method.color} rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-4`}
                    >
                      <method.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      {method.name}
                    </h3>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
                  {t("payment.payment_steps.title", {
                    method: paymentMethods.find((m) => m.id === selectedMethod)
                      ?.name,
                  })}
                </h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {paymentMethods
                    .find((m) => m.id === selectedMethod)
                    ?.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3 sm:space-x-4"
                      >
                        <div className="flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {index + 1}
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
                {t("payment.submit_transaction.title")}
              </h3>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md sm:rounded-lg text-xs sm:text-sm"
                >
                  {error}
                  {error.includes(t("payment.errors.invalid_user")) && (
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      {t("payment.errors.login_link")}
                    </button>
                  )}
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t("payment.submit_transaction.amount_label")}
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={transactionData.amount}
                    onChange={handleInputChange}
                    required
                    min="1"
                    step="0.01"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder={t(
                      "payment.submit_transaction.amount_placeholder"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t("payment.submit_transaction.transaction_id_label")}
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={transactionData.transactionId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder={t(
                      "payment.submit_transaction.transaction_id_placeholder"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t("payment.submit_transaction.screenshot_label")}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md sm:rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                    <CloudArrowUpIcon className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mx-auto mb-1 sm:mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      required
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                    >
                      {t("payment.submit_transaction.screenshot_prompt")}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("payment.submit_transaction.screenshot_info")}
                    </p>
                    {transactionData.screenshot && (
                      <p className="text-xs sm:text-sm text-green-600 mt-1 sm:mt-2">
                        {t(
                          "payment.submit_transaction.screenshot_confirmation",
                          { filename: transactionData.screenshot.name }
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t("payment.submit_transaction.transaction_link_label")}
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="url"
                      name="transactionLink"
                      value={transactionData.transactionLink}
                      onChange={handleInputChange}
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                      placeholder={t(
                        "payment.submit_transaction.transaction_link_placeholder"
                      )}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t("payment.submit_transaction.transaction_link_info")}
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !transactionData.amount}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 px-4 rounded-md sm:rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs sm:text-sm"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    <span>{t("payment.submit_transaction.submit_button")}</span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 mb-4 sm:mb-8 md:mb-12"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {t("payment.payment_history.title")}
            </h3>
            {isLoadingPayments ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : payments.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-600">
                {t("payment.payment_history.no_payments")}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.amount")}
                      </th>
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.status")}
                      </th>
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.date")}
                      </th>
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.transaction_id")}
                      </th>
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.payment_method")}
                      </th>
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">
                        {t("payment.payment_history.table.transaction_link")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-100">
                        <td className="border p-2 sm:p-3 text-xs sm:text-sm">
                          {payment.amount.toLocaleString(i18n.language)}
                        </td>
                        <td className="border p-2 sm:p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="border p-2 sm:p-3 text-xs sm:text-sm">
                          {formatDate(payment.paymentDate)}
                        </td>
                        <td className="border p-2 sm:p-3 text-xs sm:text-sm">
                          {payment.transactionId || "N/A"}
                        </td>
                        <td className="border p-2 sm:p-3 text-xs sm:text-sm">
                          {payment.paymentMethod}
                        </td>
                        <td className="border p-2 sm:p-3 text-xs sm:text-sm">
                          {payment.transactionLink}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-yellow-50 border border-yellow-200 rounded-md sm:rounded-lg p-4 sm:p-6"
          >
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-yellow-800 mb-2 sm:mb-3">
              {t("payment.notes.title")}
            </h3>
            <ul className="space-y-2 text-yellow-700 text-xs sm:text-sm">
              {t("payment.notes.items", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>• {item}</li>
                )
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
