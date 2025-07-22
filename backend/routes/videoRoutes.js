const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
  upload,
} = require("../controllers/videoController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", getVideos);
router.post("/", authMiddleware, roleMiddleware("admin"), upload, createVideo);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload,
  updateVideo
);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteVideo);

module.exports = router;
