// TransactionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionPage = () => {
  const [cart, setCart] = useState([]); // Array to store selected items
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const plants = [
    { id: 1, name: 'Aloe Vera', price: 10, image: 'images/kamil-kalkan-SA3KoWHuMzA-unsplash (1).jpg' },
    { id: 2, name: 'Snake Plant', price: 15, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Peace Lily', price: 20, image: 'https://via.placeholder.com/100' },
  ];

  const addToCart = (plant) => {
    setCart([...cart, plant]);
    setTotalPrice(totalPrice + plant.price);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    alert('Transaction Successful!');
    setCart([]);
    setTotalPrice(0);
    navigate('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
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

        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-bold text-green-800">Cart Summary</h3>
          {cart.length > 0 ? (
            <div>
              <ul className="mt-2 space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total: ${totalPrice}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          ) : (
            <p className="text-green-700 mt-2">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
