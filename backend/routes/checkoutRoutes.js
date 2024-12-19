const express = require("express");
const router = express.Router();

// Mock checkout endpoint
router.post("/mock-checkout", (req, res) => {
  const { cartItems } = req.body;

  // Simulate a successful payment
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log("Transaction Successful:", { cartItems, totalAmount });

  res.status(200).json({
    message: "Transaction successful",
    totalAmount,
    transactionId: Math.random().toString(36).substring(7), // Generate a random transaction ID
  });
});

module.exports = router;
