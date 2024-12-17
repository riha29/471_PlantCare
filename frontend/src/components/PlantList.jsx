import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // To prevent state updates if unmounted
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Plants:", response.data);
        if (isMounted) setPlants(response.data); // Set plants only if mounted
      } catch (err) {
        console.error("Error fetching plants:", err.response?.data || err.message);
        if (isMounted) setError("Failed to fetch plants");
      }
    };
  
    fetchPlants();
  
    return () => {
      isMounted = false; // Cleanup to prevent re-renders
    };
  }, []);
  

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">My Plants</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={plant.image || "/placeholder.jpg"}
                alt={plant.name}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-lg font-bold">{plant.name}</h3>
              <p>Species: {plant.species}</p>
              <p>Health: {plant.health}</p>
              <p>Last Watered: {plant.lastWatered}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No plants found. Start adding your plants!</p>
        )}
      </div>
    </div>
  );
};

export default PlantList;
