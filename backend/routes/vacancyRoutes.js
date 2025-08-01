const express = require("express");
const router = express.Router();
const {
  getVacancies,
  getVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controllers/vacancyController");
const { route } = require("./announcementRoutes");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMIddleware");

router.get("/", getVacancies);
router.get("/:id", getVacancy);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createVacancy
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateVacancy
);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteVacancy);

module.exports = router;
