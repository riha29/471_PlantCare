const express = require("express");
const router = express.Router();

// Mock Checkout Endpoint
router.post("/mock-checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Generate a mock transaction ID
    const transactionId = `TRANS_${Date.now()}`;

    // Respond with a mock transaction result
    res.status(200).json({
      message: "Transaction successful",
      transactionId,
      totalAmount,
    });
  } catch (error) {
    console.error("Error during mock checkout:", error.message);
    res.status(500).json({ message: "Server error during mock checkout" });
  }
});

module.exports = router;
