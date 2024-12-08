const mongoose = require('mongoose');

const careSchema = new mongoose.Schema({
  watering: {
    lastWatered: { type: Date, default: Date.now },
    frequency: { type: String, default: '7 days' }, // Example: "7 days", "3 days"
  },
  fertilizing: {
    lastFertilized: { type: Date },
    frequency: { type: String, default: '30 days' }, // Example: "30 days"
  },
  pruning: {
    lastPruned: { type: Date },
  },
});

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String },
    health: { type: String, default: 'Healthy' }, // Example: Healthy, Needs Care, Wilting
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    careSchedule: careSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  },
  { timestamps: true }
);

const Plant = model('plant', plantSchema);
module.exports=  Plant;
