const express = require("express");
const Plant = require("../models/plant");
const protect = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const router = express.Router();

// Fetch all plants of the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.userId });
    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Add a new plant
router.post("/", protect, async (req, res) => {
  const { name, species, health, lastWatered, lastFertilized, image } = req.body;

  if (!name || !species) {
    return res.status(400).json({ message: "Name and species are required" });
  }

  try {
    const newPlant = new Plant({
      userId: req.userId,
      name,
      species,
      health: health || "Healthy",
      lastWatered,
      lastFertilized,
      image,
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error("Error adding plant:", error.message);
    res.status(500).json({ message: "Failed to add plant. Please try again." });
  }
});

// Update Plant Information
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, species, health, lastWatered, lastFertilized, image } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid plant ID" });
    }

    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Authorization check: Ensure the plant belongs to the logged-in user
    if (plant.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this plant" });
    }

    // Update only fields provided in the request
    if (name) plant.name = name;
    if (species) plant.species = species;
    if (health) plant.health = health;
    if (lastWatered) plant.lastWatered = lastWatered;
    if (lastFertilized) plant.lastFertilized = lastFertilized;
    if (image) plant.image = image;

    const updatedPlant = await plant.save();
    res.status(200).json(updatedPlant);
  } catch (error) {
    console.error("Error updating plant:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Remove a plant
router.delete("/:id", protect, async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid plant ID" });
    }

    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Authorization check: Ensure the plant belongs to the logged-in user
    if (plant.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this plant" });
    }

    // Use deleteOne instead of remove
    await Plant.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Plant removed successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


module.exports = router;
