const express = require("express");
const User = require("../models/user"); // Assuming a User model
const sendEmail = require("../utils/email");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/notify-event", async (req, res) => {
  const { eventName, userIds } = req.body; // Event name and targeted users
  try {
    const users = await User.find({ _id: { $in: userIds } }); // Get user details

    users.forEach((user) => {
      const emailText = `Hello ${user.name},\n\nYou are invited to the event "${eventName}".\nDon't miss it!\n\n- Plant Care Team`;
      sendEmail(user.email, `Invitation to ${eventName}`, emailText);
    });

    res.status(200).json({ message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error sending event notifications:", error.message);
    res.status(500).json({ message: "Failed to send emails." });
  }
});

router.post("/notify-updates", async (req, res) => {
    const { featureDetails } = req.body; // Feature update details
    try {
      const users = await User.find(); // Get all users
      const subject = "Exciting New Feature!";
      const emailText = `Hello,\n\nWe're excited to announce a new feature:\n\n${featureDetails}\n\nBest,\nThe Plant Care Team`;
  
      users.forEach((user) => {
        sendEmail(user.email, subject, emailText);
      });
  
      res.status(200).json({ message: "Feature update emails sent." });
    } catch (error) {
      console.error("Error sending feature updates:", error.message);
      res.status(500).json({ message: "Failed to send emails." });
    }
  });

  router.put("/update-preferences", protect, async (req, res) => {
    const { eventNotifications, featureUpdates } = req.body;
    try {
      const user = await User.findById(req.userId);
      user.preferences = { eventNotifications, featureUpdates };
      await user.save();
      res.status(200).json({ message: "Preferences updated successfully." });
    } catch (error) {
      console.error("Error updating preferences:", error.message);
      res.status(500).json({ message: "Failed to update preferences." });
    }
  });
  

  module.exports = router;