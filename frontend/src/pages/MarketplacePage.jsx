import React, { useState } from "react";
// import axios from "../api/axios";
import { Link } from 'react-router-dom'; 

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

  return (
    <div>
      <nav className="bg-green-900 -m-8 pt-8 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/marketplace" className="hover:underline">MarketplacePage</Link>
            <Link to="/profile" className="hover:underline">User</Link>
          </div>
        </div>
      </nav>
      <div className="flex min-h-screen mt-16 bg-green-50">
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
              
              <h1>
                <Link
                  to="/transaction"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Checkout
                </Link>
              </h1>
                
              
            </div>
          ) : (
            <p className="text-green-700">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
