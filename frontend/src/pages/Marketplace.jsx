import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Marketplace = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Snake Plant", description: "Low-maintenance plant", price: 25, image: "snake.jpg" },
    { id: 2, name: "Aloe Vera", description: "Useful plant", price: 20, image: "aloe.jpg" },
    { id: 3, name: "Peace Lily", description: "Air-purifying plant", price: 30, image: "lily.jpg" },
  ];

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-white shadow-lg rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-700 mt-1">{product.description}</p>
            <p className="text-green-600 font-semibold mt-2">${product.price}</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
