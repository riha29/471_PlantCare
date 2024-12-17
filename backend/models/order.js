const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is at least 1
        price: { type: Number, required: true, min: 0 }, // Ensure price is non-negative
      },
    ],
    total: { type: Number, required: true, min: 0 }, // Ensure total is non-negative
    address: { type: String, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "Bkash", "Cash on Delivery"], // Restrict to valid payment methods
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Restrict to valid statuses
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
