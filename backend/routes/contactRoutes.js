const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, createContact);
router.get("/", authMiddleware, getContacts);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateContact);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteContact);

module.exports = router;
