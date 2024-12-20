const express = require('express');
const router = express.Router();

// Mock Checkout Endpoint
router.post('/transaction', async (req, res) => {
  const { paymentMethod, address } = req.body;

  try {
    if (!paymentMethod || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (paymentMethod === 'cash_on_delivery') {
      // Simulate placing an order for Cash on Delivery
      console.log('Processing Cash on Delivery...');
      // Save the order to the database if necessary (optional)
    } else {
      return res.status(400).json({ message: 'Invalid payment method for this endpoint' });
    }

    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error processing order:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
