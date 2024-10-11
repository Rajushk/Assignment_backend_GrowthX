const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  viewAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Register Admin
router.post("/register", registerAdmin);

// Login Admin
router.post("/login", loginAdmin);

// View assignments tagged to the admin
router.get("/assignments", protect, isAdmin, viewAssignments);

// Accept assignment
router.post("/assignments/:id/accept", protect, isAdmin, acceptAssignment);

// Reject assignment
router.post("/assignments/:id/reject", protect, isAdmin, rejectAssignment);

module.exports = router;
