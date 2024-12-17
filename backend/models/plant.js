const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  species: { type: String },
  health: { type: String, default: "Healthy" },
  lastWatered: { type: Date },
  lastFertilized: { type: Date },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Plant", plantSchema);
