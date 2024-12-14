const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new product
router.post("/", protect, async (req, res) => {
  const { name, category, price, image, description, stock } = req.body;

  if (!name || !category || !price || !image) {
    return res.status(400).json({ message: "Name, category, price, and image are required." });
  }

  try {
    const product = new Product({
      name,
      category,
      price,
      image,
      description,
      stock,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a product (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
