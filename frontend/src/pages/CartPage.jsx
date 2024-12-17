import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  console.log("Cart Items:", cart);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
