const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  downloadDocument,
} = require("../controllers/documentController");
const router = express.Router();

router.get("/", getDocuments);
router.get("/download/:id", downloadDocument);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  createDocument
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  updateDocument
);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDocument);

module.exports = router;
