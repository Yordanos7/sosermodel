import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LinkIcon, EyeIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("sosser_token");
      if (!token)
        throw new Error("No authentication token found. Please log in.");
      const res = await fetch("http://localhost:5000/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sortPayments = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedPayments = [...payments].sort((a, b) => {
      if (key === "user") {
        return direction === "ascending"
          ? a.user.name.localeCompare(b.user.name)
          : b.user.name.localeCompare(a.user.name);
      } else if (key === "amount") {
        return direction === "ascending"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (key === "status") {
        return direction === "ascending"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (key === "paymentDate") {
        return direction === "ascending"
          ? new Date(a.paymentDate) - new Date(b.paymentDate)
          : new Date(b.paymentDate) - new Date(a.paymentDate);
      } else if (key === "paymentMethod") {
        return direction === "ascending"
          ? a.paymentMethod.localeCompare(b.paymentMethod)
          : b.paymentMethod.localeCompare(a.paymentMethod);
      }
      return 0;
    });
    setPayments(sortedPayments);
  };

  const handleToggleStatus = async (paymentId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "failed";
    try {
      const token = localStorage.getItem("sosser_token");
      const res = await fetch(
        `http://localhost:5000/api/payments/${paymentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to ${
            newStatus === "completed" ? "approve" : "reject"
          } payment`
        );
      await fetchPayments();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm("Are you sure you want to delete this payment?"))
      return;
    try {
      const token = localStorage.getItem("sosser_token");
      const res = await fetch(
        `http://localhost:5000/api/payments/${paymentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete payment");
      await fetchPayments();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewDetails = (payment) => {
    alert(
      `Payment ID: ${payment.id}\nUser: ${payment.user.name}\nEmail: ${
        payment.user.email
      }\nAmount: ${payment.amount.toLocaleString()} ETB\nStatus: ${
        payment.status
      }\nDate: ${new Date(payment.paymentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}\nTransaction ID: ${payment.transactionId || "N/A"}\nPayment Method: ${
        payment.paymentMethod
      }\nTransaction Link: ${payment.transactionLink}\nScreenshot: ${
        payment.screenshot
      }`
    );
  };

  const handleViewImage = (screenshot) => {
    setSelectedImage(`http://localhost:5000/${screenshot}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">
            Payment Management Dashboard
          </h1>
          <p className="mt-2 text-lg text-blue-100">
            Review, approve, or reject payment submissions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
          >
            <XCircleIcon className="w-6 h-6 mr-2" />
            <span>{error}</span>
            {error.includes("Please log in") && (
              <a href="/login" className="ml-2 text-blue-600 hover:underline">
                Log in
              </a>
            )}
          </motion.div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Payment Records
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : payments.length === 0 ? (
            <p className="text-gray-600 text-center py-6">
              No payments available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortPayments("user")}
                    >
                      User{" "}
                      {sortConfig.key === "user" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortPayments("amount")}
                    >
                      Amount{" "}
                      {sortConfig.key === "amount" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortPayments("status")}
                    >
                      Status{" "}
                      {sortConfig.key === "status" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortPayments("paymentDate")}
                    >
                      Date{" "}
                      {sortConfig.key === "paymentDate" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortPayments("paymentMethod")}
                    >
                      Method{" "}
                      {sortConfig.key === "paymentMethod" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </th>
                    <th className="border p-4 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border p-4">
                        {p.user?.name || p.userId}
                        <br />
                        <span className="text-sm text-gray-500">
                          {p.user?.email || "N/A"}
                        </span>
                      </td>
                      <td className="border p-4">
                        {p.amount.toLocaleString()} ETB
                      </td>
                      <td className="border p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            p.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : p.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td className="border p-4">
                        {new Date(p.paymentDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border p-4">{p.paymentMethod}</td>
                      <td className="border p-4 space-x-3">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => handleViewDetails(p)}
                        >
                          Details
                        </button>
                        <button
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                          onClick={() =>
                            window.open(p.transactionLink, "_blank")
                          }
                        >
                          <LinkIcon className="w-4 h-4 inline-block mr-1" />
                          Link
                        </button>
                        <button
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          onClick={() => handleViewImage(p.screenshot)}
                        >
                          <EyeIcon className="w-4 h-4 inline-block mr-1" />
                          Screenshot
                        </button>
                        {p.status === "pending" && (
                          <button
                            className={`px-4 py-2 rounded-lg text-white transition-colors ${
                              p.status === "pending"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                            onClick={() => handleToggleStatus(p.id, p.status)}
                          >
                            {p.status === "pending" ? "Approve" : "Reject"}
                          </button>
                        )}
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          onClick={() => handleDeletePayment(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-4 max-w-3xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <XCircleIcon className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Payment Screenshot"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm">&copy; 2025 Sosser App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManagePayments;
