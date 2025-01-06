// backend/routes/auth.js
const express = require("express");
const admin = require("../firebase");
const router = express.Router();

router.post("/google-signin", async (req, res) => {
  const { email, name } = req.body;

  try {
    // Find or create the user in your database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: "google-auth" });
      await user.save();
    }

    res.status(200).json({ message: "Google sign-in successful", user });
  } catch (error) {
    console.error("Error in Google sign-in:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
