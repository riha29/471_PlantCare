const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {sign} = require("jsonwebtoken");
const admin = require("../firebase");
const User = require("../models/user");
const protect = require("../middleware/authMiddleware");

// Utility function for generating JWT tokens
const generateToken = (payload) => {
  return sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// User Signup
router.post("/signup", async (req, res) => {
  const {name, email, password} = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: "User already exists"});
    }

    // Create a new user with hashed password
    const user = new User({name, email, password});

    // Save the user
    await user.save();


    // Generate JWT token
    const token = generateToken({id: user._id});

    // Send response with token
    res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    res.status(500).json({message: "Server error"});
  }
});

// User Signin
router.post("/signin", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: "Invalid Email"});
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(401).json({message: "Invalid Password"});
    }

    // Generate JWT token
    const token = generateToken({id: user._id, email: user.email});

    // Send response with token
    res.status(200).json({
      message: "User logged in successfully",
      token
    });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).json({message: "Server error"});
  }
});

// Get Profile
router.get("/profile", protect, async (req, res) => {
  console.log("Profile endpoint hit by userId:", req.userId);
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      console.log("User not found in profile");
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in profile:", error);
    res.status(500).json({message: "Server error"});
  }
});

// Google Sign-In
router.post("/google-signin", async (req, res) => {
  const {token} = req.body;
  console.log("Google Sign-In endpoint hit with token:", token);

  if (!token) {
    return res.status(400).json({message: "Token is missing"});
  }

  try {
    // Verify the Google ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const {email, name, picture} = decodedToken;

    // Check if user exists in MongoDB
    let user = await User.findOne({email});
    if (!user) {
      // Create a new user if they don't exist
      user = new User({
        name,
        email,
        photo: picture, // Save profile picture
        password: "google-auth" // Dummy password (not used)
      });
      await user.save();
      console.log("New user created via Google Sign-In:", user);
    }

    // Generate a custom JWT for your application
    const jwtToken = generateToken({id: user._id, email: user.email});

    res.status(200).json({
      message: "Google sign-in successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo
      }
    });
  } catch (error) {
    console.error("Error in Google sign-in:", error.message);
    res.status(500).json({message: "Failed to authenticate with Google"});
  }
});

module.exports = router;
