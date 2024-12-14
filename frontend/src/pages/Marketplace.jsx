import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Marketplace = () => {
  const [marketplaceItems, setMarketplaceItems] = useState([]);

  // Function to fetch marketplace items
  const fetchMarketplaceItems = async () => {
    try {
      const response = await axios.get("/api/marketplace"); // Backend endpoint
      setMarketplaceItems(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
    }
  };

  // useEffect to call fetchMarketplaceItems on component load
  useEffect(() => {
    fetchMarketplaceItems();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Marketplace</h1>

      {/* Marketplace Items Grid */}
      {marketplaceItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-green-600 font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No items available in the marketplace. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
