const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Assuming a Cart model exists
const Order = require('../models/order'); // Assuming an Order model exists
const protect = require('../middleware/authMiddleware'); // Middleware for authentication

// Checkout route
router.post('/', protect, async (req, res) => {
  const { address, paymentMethod } = req.body;

  try {
    // Validate input
    if (!address || !paymentMethod) {
      return res.status(400).json({ message: 'Address and payment method are required' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Create an order
    const order = new Order({
      userId: req.userId,
      items: cart.items,
      total: cart.total,
      address,
      paymentMethod,
      status: 'Pending', // Optional: Add an initial status for the order
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({ 
      message: 'Order placed successfully', 
      orderId: order._id, // Return the order ID
      order 
    });
  } catch (error) {
    console.error('Error in checkout:', error.message);
    res.status(500).json({ message: 'Failed to process the order' });
  }
});

module.exports = router;
