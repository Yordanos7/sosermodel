const express = require("express");
const router = express.Router();
const {
  getVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controllers/vacancyController");
const { route } = require("./announcementRoutes");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getVacancies);
router.post("/", authMiddleware, createVacancy);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateVacancy);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteVacancy);

module.exports = router;
