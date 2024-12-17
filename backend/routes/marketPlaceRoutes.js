const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products. Please try again later." });
  }
});

// Add a new product (Admin only, requires protect middleware)
router.post("/", protect, async (req, res) => {
  const { name, category, price, image, description, stock } = req.body;

  // Input validation
  if (!name || !category || !price || !image) {
    return res.status(400).json({ message: "Name, category, price, and image are required." });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number." });
  }

  if (stock && (typeof stock !== "number" || stock < 0)) {
    return res.status(400).json({ message: "Stock must be a non-negative number." });
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
    res.status(500).json({ message: "Failed to add product. Please try again later." });
  }
});

// Delete a product (Admin only, requires protect middleware)
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully", deletedProduct: product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product. Please try again later." });
  }
});

module.exports = router;
