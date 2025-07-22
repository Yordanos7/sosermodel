import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  CloudArrowUpIcon,
  LinkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Payment = () => {
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
      steps: [
        "Open TeleBirr app on your mobile device",
        'Select "Send Money" or "Transfer"',
        "Enter the amount you want to pay",
        "Complete the transaction with your PIN",
        "Take a screenshot of the confirmation",
      ],
    },
    {
      id: "awash",
      name: "Awash Bank Mobile",
      icon: BuildingLibraryIcon,
      color: "from-blue-500 to-indigo-500",
      steps: [
        "Open Awash Bank Mobile app",
        "Login with your credentials",
        'Select "Transfer" from the menu',
        'Choose "To Other Banks"',
        "Enter Soser account details provided",
        "Enter amount and confirm transaction",
        "Save transaction receipt",
      ],
    },
    {
      id: "abyssinia",
      name: "Bank of Abyssinia App",
      icon: CreditCardIcon,
      color: "from-green-500 to-teal-500",
      steps: [
        "Launch Bank of Abyssinia mobile app",
        'Navigate to "Money Transfer"',
        'Select "Inter-bank Transfer"',
        "Enter Sosser cooperative account number",
        "Input transfer amount",
        "Authenticate with biometric or PIN",
        "Download transaction confirmation",
      ],
    },
  ];

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoadingPayments(true);
    try {
      const token = localStorage.getItem("sosser_token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
      const res = await fetch(
        "http://localhost:5000/api/payments/my-payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch payment history");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
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
      const token = localStorage.getItem("sosser_token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        setTransactionData({
          amount: "",
          transactionId: "",
          screenshot: null,
          transactionLink: "",
        });
        await fetchPayments(); // Refresh payment history
      } else {
        setIsSubmitting(false);
        if (
          response.status === 400 &&
          data.message === "Invalid user ID: User does not exist"
        ) {
          setError("Your session is invalid. Please log in again.");
          localStorage.removeItem("sosser_token");
        } else {
          setError(data.message || "Payment failed");
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setError("Error submitting payment: " + (err.message || "Unknown error"));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 lg:pt-20 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4"
        >
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment information has been sent to our admin team for
            verification. You will receive a confirmation email once processed.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
          >
            Submit Another Payment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Payment Methods
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your preferred payment method and follow the step-by-step
              guide to complete your transaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {method.name}
                    </h3>
                  </motion.button>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  How to pay with{" "}
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </h3>
                <div className="space-y-4">
                  {paymentMethods
                    .find((m) => m.id === selectedMethod)
                    ?.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Submit Transaction
              </h3>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                  {error.includes("Please log in again") && (
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      Log in
                    </button>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Paid (ETB)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={transactionData.amount}
                    onChange={handleInputChange}
                    required
                    min="1"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={transactionData.transactionId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter transaction ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Screenshot
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                    >
                      Click to upload screenshot
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                    {transactionData.screenshot && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {transactionData.screenshot.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Link (Alternative)
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="url"
                      name="transactionLink"
                      value={transactionData.transactionLink}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paste transaction link"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    If available, paste the transaction confirmation link
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !transactionData.amount}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <span>Submit Payment</span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-12"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Your Payment History
            </h3>
            {isLoadingPayments ? (
              <p className="text-gray-600">Loading payment history...</p>
            ) : payments.length === 0 ? (
              <p className="text-gray-600">No payments found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-3 text-left">Amount (ETB)</th>
                      <th className="border p-3 text-left">Status</th>
                      <th className="border p-3 text-left">Date</th>
                      <th className="border p-3 text-left">Transaction ID</th>
                      <th className="border p-3 text-left">Payment Method</th>
                      <th className="border p-3 text-left">Payment Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-100">
                        <td className="border p-3">
                          {payment.amount.toLocaleString()}
                        </td>
                        <td className="border p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
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
                        <td className="border p-3">
                          {new Date(payment.paymentDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="border p-3">
                          {payment.transactionId || "N/A"}
                        </td>
                        <td className="border p-3">{payment.paymentMethod}</td>
                        <td className="border p-3">
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Important Notes
            </h3>
            <ul className="space-y-2 text-yellow-700">
              <li>• All payments are processed manually by our admin team</li>
              <li>
                • Please ensure transaction details are accurate before
                submission
              </li>
              <li>
                • You will receive email confirmation once payment is verified
              </li>
              <li>• For urgent matters, contact our support team directly</li>
              <li>
                • Keep your transaction receipt until confirmation is received
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

[
  {
    id: 1,
    userId: 2,
    amount: 100000,
    status: "pending",
    paymentDate: "2025-07-10T15:37:42.000Z",
    transactionId: "12",
    screenshot: "uploads/1752161861975-gitphoto.jpg",
    paymentMethod: "telebirr",
    transactionLink: "http://localhost:3000/payment",
    createdAt: "2025-07-10T15:37:42.000Z",
    updatedAt: "2025-07-10T15:37:42.000Z",
    user: {
      id: 2,
      name: "geberu",
      email: "geberu@gmail.com",
    },
  },
  {
    id: 2,
    userId: 2,
    amount: 1000000,
    status: "pending",
    paymentDate: "2025-07-10T15:38:59.000Z",
    transactionId: "125",
    screenshot: "uploads/1752161939335-photo_2025-04-23_14-36-39.jpg",
    paymentMethod: "telebirr",
    transactionLink: "http://localhost:3000/payment",
    createdAt: "2025-07-10T15:38:59.000Z",
    updatedAt: "2025-07-10T15:38:59.000Z",
    user: {
      id: 2,
      name: "geberu",
      email: "geberu@gmail.com",
    },
  },
];
