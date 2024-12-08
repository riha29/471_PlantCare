const express = require('express');
const Plant = require('../models/plant');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const protect= require('../middleware/authMiddleware')

const router = express.Router();

const calculateOverdue = (lastDate, frequency) => {
  if (!lastDate) return true;

  const days = parseInt(frequency.split(' ')[0]);
  const nextDue = new Date(lastDate);
  nextDue.setDate(nextDue.getDate() + days);

  return new Date() > nextDue;
};

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
  
router.get('/', protect, async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.userId });
    res.status(200).json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
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
  
router.put('/:id', protect, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant || plant.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    const { name, species, health, status, careSchedule } = req.body;
    if (name) plant.name = name;
    if (species) plant.species = species;
    if (health) plant.health = health;
    if (status) plant.status = status;
    if (careSchedule) plant.careSchedule = { ...plant.careSchedule, ...careSchedule };
    
    const updatedPlant = await plant.save();
    res.status(200).json({ message: 'Plant updated successfully', updatedPlant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
  
router.delete('/:id', protect, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant || plant.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    await plant.remove();
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/status', protect, async (req, res) => {
  console.log('Route Reached:', req.params.id); // Debugging
  console.log('Request Body:', req.body);       // Debugging
  console.log('Request User:', req.userId);     // Debugging
  const { status, health } = req.body;
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
      // Check if the plant belongs to the logged-in user
    if (plant.userId.toString() !== req.userId) {

      return res.status(403).json({ message: 'Not authorized to update this plant' });
    }
  
    // Update status and health
    if (status) plant.status = status;
    if (health) plant.health = health;
  
    const updatedPlant = await plant.save();
    res.status(200).json({ message: 'Plant status updated', updatedPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/status/:status', protect, async (req, res) => {
  try {
    const { status } = req.params;

    const plants = await Plant.find({ userId: req.userId, status });
    res.status(200).json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/overdue-tasks', protect, async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.userId, status: 'active' });

    const overdueTasks = plants.map((plant) => {
      const overdue = [];

      if (calculateOverdue(plant.careSchedule.watering.lastWatered, plant.careSchedule.watering.frequency)) {
        overdue.push('Watering');
      }

      if (calculateOverdue(plant.careSchedule.fertilizing.lastFertilized, plant.careSchedule.fertilizing.frequency)) {
        overdue.push('Fertilizing');
      }

      if (calculateOverdue(plant.careSchedule.pruning.lastPruned, '30 days')) {
        overdue.push('Pruning');
      }

      return {
        plantId: plant._id,
        plantName: plant.name,
        overdue,
      };
    });

    res.status(200).json(overdueTasks.filter((task) => task.overdue.length > 0));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});



  module.exports = router;