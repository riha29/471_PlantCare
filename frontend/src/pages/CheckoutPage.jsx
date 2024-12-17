import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  const handleSubmit = () => {
    alert("Order placed successfully!");
    // You can clear the cart here if needed
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="mb-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
