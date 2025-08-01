const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");
const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createAnnouncement);
router.get("/", getAnnouncements);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateAnnouncement);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteAnnouncement
);

module.exports = router;
