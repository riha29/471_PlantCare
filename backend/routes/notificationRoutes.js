const express = require("express");
const Plant = require("../models/plant");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const today = new Date();
    const plants = await Plant.find({ userId: req.userId });

    const notifications = plants.map((plant) => {
      const { name, lastWatered, lastFertilized, lastPruned, waterInterval, fertilizeInterval, pruneInterval } = plant;
      const messages = [];

      // Check watering schedule
      if (lastWatered) {
        const nextWatering = new Date(lastWatered);
        nextWatering.setDate(nextWatering.getDate() + waterInterval);
        if (today >= nextWatering) {
          messages.push(`Time to water your plant "${name}".`);
        }
      }

      // Check fertilizing schedule
      if (lastFertilized) {
        const nextFertilizing = new Date(lastFertilized);
        nextFertilizing.setDate(nextFertilizing.getDate() + fertilizeInterval);
        if (today >= nextFertilizing) {
          messages.push(`Time to fertilize your plant "${name}".`);
        }
      }

      // Check pruning schedule
      if (lastPruned) {
        const nextPruning = new Date(lastPruned);
        nextPruning.setDate(nextPruning.getDate() + pruneInterval);
        if (today >= nextPruning) {
          messages.push(`Time to prune your plant "${name}".`);
        }
      }

      return { plant: name, messages };
    });

    res.status(200).json(notifications.filter((n) => n.messages.length > 0));
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
