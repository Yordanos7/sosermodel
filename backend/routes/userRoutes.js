const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getProfile,
  getAllUsers,
  updateProfile,
  deleteUser,
  getDashboardStats,
} = require("../controllers/userController");
const router = express.Router();
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
