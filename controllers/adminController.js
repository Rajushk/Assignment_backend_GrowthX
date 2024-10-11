const User = require("../models/user");
const Assignment = require("../models/assignment");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await User.create({ username, email, password, role: "admin" });
    res.status(201).json({ token: generateToken(admin._id) });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(400).json({ error: "Invalid admin data" });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" }); // Ensure it's an admin
    if (admin && (await admin.matchPassword(password))) {
      res.json({ token: generateToken(admin._id) });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// View Assignments Tagged to Admin
exports.viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id }).populate(
      "userId",
      "username"
    );
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    assignment.status = "accepted";
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error("Error accepting assignment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    assignment.status = "rejected";
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error("Error rejecting assignment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
