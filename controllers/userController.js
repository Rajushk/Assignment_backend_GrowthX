const User = require("../models/user");
const Assignment = require("../models/assignment");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password, role: "user" });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ error: "Invalid user data" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
  
    // Validate adminId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid adminId format" });
    }
  
    try {
      const assignment = await Assignment.create({
        userId: req.user._id, // Ensure req.user._id is valid
        task,
        adminId: new mongoose.Types.ObjectId(adminId), // Instantiate ObjectId
      });
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ error: "Assignment upload failed", details: error.message });
    }
  };
  

// Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
