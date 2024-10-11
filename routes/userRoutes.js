const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  uploadAssignment,
  getAllAdmins,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Upload assignment
router.post("/upload", protect, uploadAssignment);

// Get all admins
router.get("/admins", protect, getAllAdmins);

module.exports = router;
