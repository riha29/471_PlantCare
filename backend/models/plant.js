const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    species: { type: String },
    health: { type: String, default: "Healthy" },
    lastWatered: { type: Date },
    lastFertilized: { type: Date },
    lastPruned: { type: Date },
    waterInterval: { type: Number, default: 7 }, // in days
    fertilizeInterval: { type: Number, default: 30 }, // in days
    pruneInterval: { type: Number, default: 90 }, // in days
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);
