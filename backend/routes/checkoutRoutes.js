const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Order = require("../models/order");
const protect = require("../middleware/authMiddleware");

// Checkout route
router.post("/", protect, async (req, res) => {
  const { address, paymentMethod } = req.body;

  if (!address || !paymentMethod) {
    return res.status(400).json({ message: "Address and payment method are required" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const total = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    const order = new Order({
      userId: req.userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      total,
      address,
      paymentMethod,
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Failed to process the order" });
  }
});

module.exports = router;
