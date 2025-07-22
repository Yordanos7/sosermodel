const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/", getEvents);
router.post("/", authMiddleware, roleMiddleware("admin"), createEvent);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateEvent);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteEvent);
module.exports = router;
