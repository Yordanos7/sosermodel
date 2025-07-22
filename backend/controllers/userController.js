const User = require("../models/User");
const Payment = require("../models/Payment");
const Announcement = require("../models/Announcement");
const Event = require("../models/Event");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalPayments = await Payment.count();
    const totalAnnouncements = await Announcement.count();
    const totalEvents = await Event.count();

    res.status(200).json({
      totalUsers,
      totalPayments,
      totalAnnouncements,
      totalEvents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "address",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "address",
        "createdAt",
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Add update logic here
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getAllUsers,
  updateProfile,
  deleteUser,
  getDashboardStats,
};
