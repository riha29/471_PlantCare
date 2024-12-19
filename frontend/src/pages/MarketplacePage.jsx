import React, { useState } from "react";
import axios from "../api/axios";

const MarketplacePage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const plants = [
    { id: 1, name: "Aloe Vera", price: 10, image: "images/aloe.jpg" },
    { id: 2, name: "Snake Plant", price: 15, image: "images/snake.jpg" },
    { id: 3, name: "Peace Lily", price: 20, image: "images/peace.jpg" },
  ];

  const addToCart = (plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...plant, quantity: 1 }];
    });
    setTotalPrice((prevTotal) => prevTotal + plant.price);
  };

  const handleMockCheckout = async () => {
    try {
      const response = await axios.post("/api/checkout/mock-checkout", {
        cartItems: cart,
      });

      if (response.data) {
        alert(
          `Payment successful! Transaction ID: ${response.data.transactionId}, Total: $${response.data.totalAmount}`
        );
        setCart([]); // Clear cart after successful payment
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Error during mock checkout:", error.message);
      alert("Failed to process the transaction.");
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Marketplace */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-green-800 text-center">Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {plants.map((plant) => (
            <div key={plant.id} className="border border-green-300 rounded-md p-4 text-center">
              <img src={plant.image} alt={plant.name} className="w-24 h-24 mx-auto" />
              <h3 className="mt-2 font-semibold text-green-800">{plant.name}</h3>
              <p className="text-green-700">${plant.price}</p>
              <button
                onClick={() => addToCart(plant)}
                className="mt-2 bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-1/3 bg-white shadow-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">Cart Summary</h3>
        {cart.length > 0 ? (
          <div>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center text-green-700">
                  <span>
                    {item.name} <strong>× {item.quantity}</strong>
                  </span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-green-800">Total: ${totalPrice}</p>
            <button
              onClick={handleMockCheckout}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full"
            >
              Checkout
            </button>
          </div>
        ) : (
          <p className="text-green-700">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
