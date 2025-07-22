const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
  upload,
  getMyPayments,
} = require("../controllers/paymentController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", authMiddleware, upload.single("screenshot"), createPayment);
router.get("/", authMiddleware, roleMiddleware("admin"), getPayments);
router.get("/my-payments", authMiddleware, getMyPayments);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updatePayment);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deletePayment);

module.exports = router;
