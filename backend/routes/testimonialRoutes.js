const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const router = express.Router();

router.get("/", getTestimonials);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createTestimonial
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateTestimonial
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTestimonial
);

module.exports = router;
