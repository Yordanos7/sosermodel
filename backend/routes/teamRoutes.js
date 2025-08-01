const express = require("express");
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  deleteTeamMember,
} = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMIddleware");

router
  .route("/")
  .post(
    authMiddleware,
    roleMiddleware("admin"),
    upload.single("photo"),
    createTeamMember
  )
  .get(getAllTeamMembers);

router
  .route("/:id")
  .delete(authMiddleware, roleMiddleware("admin"), deleteTeamMember);

module.exports = router;
