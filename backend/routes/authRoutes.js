const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verifyToken);

module.exports = router;
