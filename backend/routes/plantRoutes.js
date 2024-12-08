const express = require('express');
const Plant = require('../models/plant');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const protect= require('../middleware/authMiddleware')

const router = express.Router();

// creating new plant
router.post('/', protect, async (req, res) => {
  const { name, species, health, careSchedule } = req.body;
  try {
    const plant = await Plant.create({
      name,
      species,
      health,
      careSchedule,
      userId: req.userId,
    });
    res.status(201).json({ message: 'Plant added successfully', plant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get all plants
router.get('/', protect, async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.userId });
    res.status(200).json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get plant by id
router.get('/:id', protect, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant || plant.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
// update specific plant
router.put('/:id/status', protect, async (req, res) => {
  const { name, species, health, status, careSchedule } = req.body;
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant || plant.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Plant not found' });
    }
      // Check if the plant belongs to the logged-in user
    if (plant.userId.toString() !== req.userId) {

      return res.status(403).json({ message: 'Not authorized to update this plant' });
    }
  
    // Update status and health
    if (name) plant.name = name;
    if (species) plant.species = species;
    if (health) plant.health = health;
    if (status) plant.status = status;
    if (careSchedule) plant.careSchedule = { ...plant.careSchedule, ...careSchedule };
  
    const updatedPlant = await plant.save();
    res.status(200).json({ message: 'Plant status updated', updatedPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
// delete plant
router.delete('/:id', protect, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant || plant.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    await plant.deleteOne();
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// overdue task
// router.get('/overdue-tasks', protect, async (req, res) => {
//   try {
//     const plants = await Plant.find({ userId: req.userId, status: 'active' });

//     const overdueTasks = plants.map((plant) => {
//       const overdue = [];

//       if (calculateOverdue(plant.careSchedule.watering.lastWatered, plant.careSchedule.watering.frequency)) {
//         overdue.push('Watering');
//       }

//       if (calculateOverdue(plant.careSchedule.fertilizing.lastFertilized, plant.careSchedule.fertilizing.frequency)) {
//         overdue.push('Fertilizing');
//       }

//       if (calculateOverdue(plant.careSchedule.pruning.lastPruned, '30 days')) {
//         overdue.push('Pruning');
//       }

//       return {
//         plantId: plant._id,
//         plantName: plant.name,
//         overdue,
//       };
//     });

//     res.status(200).json(overdueTasks.filter((task) => task.overdue.length > 0));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


module.exports = router;