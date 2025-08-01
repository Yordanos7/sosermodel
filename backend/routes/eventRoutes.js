const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMIddleware");
const router = express.Router();

router.get("/", getEvents);
router.post(
  "/",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("admin"),
  createEvent
);
router.put(
  "/:id",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("admin"),
  updateEvent
);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteEvent);
module.exports = router;
