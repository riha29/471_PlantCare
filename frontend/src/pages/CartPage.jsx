// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.cartItems);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching cart items:", error.response?.data || error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item._id !== itemId));
      setTotal(total - cartItems.find((item) => item._id === itemId).price);
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-right mt-6">
            <h3 className="text-lg font-bold">Total: ${total}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;