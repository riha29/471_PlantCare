const Plant = require("./models/Plant");

exports.addPlant = async (req, res) => {
  try {
    const plantData = {
      ...req.body,
      userId: req.user._id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };
    const plant = new Plant(plantData);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add plant" });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const updatedData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : plant.imageUrl, // Retain old image if no new one is provided
    };

    Object.assign(plant, updatedData);
    await plant.save();

    res.status(200).json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update plant" });
  }
};
