import React, { useState } from "react";
import axios from "../api/axios";

const TransactionPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Payment method
  const [address, setAddress] = useState(""); // Address
  // const [amount, setAmount] = useState(""); // Amount to pay
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success Modal
  const [successMessage, setSuccessMessage] = useState(""); // Success Message

  const handleTransaction = async () => {
    if (!paymentMethod || !address) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      console.log('Sending transaction request:', { paymentMethod, address });
      const response = await axios.post('/transaction', {
        paymentMethod,
        address,
      });
      console.log('Transaction response:', response.data);
  
      // Handle success response
      setSuccessMessage(response.data.message);
      if (paymentMethod === 'cash_on_delivery') {
        setShowSuccessModal(true); // Show success modal for COD
      }
  
      setError(''); // Clear any errors
      setAddress(''); // Reset form
      setPaymentMethod('');
    } catch (err) {
      console.error('Error processing transaction:', err.response || err.message);
      setError('Failed to process transaction. Please try again.');
    }
  };
  
  

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Transaction</h1>

      {/* Success Message */}
      {successMessage && !showSuccessModal && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          {error}
        </div>
      )}

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter delivery address"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a payment method</option>
            <option value="google_pay">Google Pay</option>
            <option value="bkash">bKash</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          onClick={handleTransaction}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Payment
        </button>
      </div>

      {/* Success Modal for Cash on Delivery */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Order Confirmed!</h2>
            <p>Your order has been placed successfully and will be delivered to your address shortly.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
