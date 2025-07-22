import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome, {user?.name || "Admin"}!
      </h1>
      <p className="text-gray-600">
        Here's what's happening with Sosser today.
      </p>
    </motion.div>
  );
};

export default DashboardHeader;
