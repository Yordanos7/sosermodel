const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  upload,
} = require("../controllers/galleryController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", getGalleryItems);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  createGalleryItem
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  updateGalleryItem
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteGalleryItem
);

module.exports = router;
