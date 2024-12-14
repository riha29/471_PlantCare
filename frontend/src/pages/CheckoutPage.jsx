import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/cart/checkout",
        { address, paymentMethod },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(`Order placed! Order ID: ${response.data.orderId}`); // Include order ID in the success message
      setTimeout(() => navigate("/marketplace"), 2000); // Redirect to marketplace
    } catch (error) {
      setMessage("Failed to place the order. Try again.");
    }
  };
  

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Delivery Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label htmlFor="payment-method" className="block text-gray-700">
              Payment Method
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Bkash">Bkash</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
