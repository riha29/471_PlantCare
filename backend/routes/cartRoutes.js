const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  console.log("Request Body:", { productId, quantity });
  console.log("User ID from token:", req.userId);

  try {
    // Validate input
    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch or create user's cart
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      console.log("Creating new cart for user");
      cart = new Cart({ userId: req.userId, items: [] });
    }

    // Add or update product in cart
    const existingItem = cart.items.find((item) => item.productId.equals(productId));
    if (existingItem) {
      console.log("Updating existing product quantity in cart");
      existingItem.quantity += quantity;
    } else {
      console.log("Adding new product to cart");
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    console.log("Updated Cart:", cart);
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error in POST /api/cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
