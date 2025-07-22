const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  upload,
} = require("../controllers/announcementController");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.array("attachments", 5),
  createAnnouncement
);
router.get("/", getAnnouncements);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.array("attachments", 5),
  updateAnnouncement
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteAnnouncement
);

module.exports = router;
