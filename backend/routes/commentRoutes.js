const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router
  .route("/")
  .post(createComment)
  .get(protect, authorize("admin"), getComments);

router
  .route("/:id")
  .put(protect, authorize("admin"), updateComment)
  .delete(protect, authorize("admin"), deleteComment);

module.exports = router;
