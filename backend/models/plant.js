const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const { genSalt, hash, bcrypt, compare } = require('bcryptjs');

const careSchema = new mongoose.Schema({
  watering: {
    lastWatered: { type: Date, default: Date.now },
    frequency: { type: String, default: '7 days' },
  },
  fertilizing: {
    lastFertilized: { type: Date },
    frequency: { type: String, default: '30 days' },
  },
  pruning: {
    lastPruned: { type: Date },
  },
});

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String },
    health: { type: String, default: 'Healthy' },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    careSchedule: careSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
module.exports=  Plant;
