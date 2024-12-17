// routes/productRoutes.js
const express = require("express");
const Product = require("../models/product"); // Product model
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
