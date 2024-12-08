const express = require('express');
const Plant = require('../models/plant');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const protect= require('../middleware/authMiddleware')

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

  module.exports = router;