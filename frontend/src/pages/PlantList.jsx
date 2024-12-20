import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const PlantList = () => {
  const [plants, setPlants] = useState([]); // User's plants
  const [newPlant, setNewPlant] = useState({ name: "", species: "" }); // New plant form
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]); // Notifications for care

  // Fetch user's plants from the backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(response.data);
        generateNotifications(response.data);
      } catch (err) {
        console.error("Error fetching plants:", err);
        setError("Failed to fetch plants. Please try again.");
      }
    };
  
    fetchPlants();
  }, []);
  

  // Add a new plant
  const handleAddPlant = async () => {
    if (!newPlant.name || !newPlant.species) {
      alert("Please provide both name and species for the plant.");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/plants", // Corrected endpoint
        newPlant,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlants([...plants, response.data]); // Add new plant to the list
      setNewPlant({ name: "", species: "" }); // Reset form
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error adding plant:", err);
      setError("Failed to add plant. Please ensure all fields are correct.");
    }
  };
  

  // Remove a plant
  const handleRemovePlant = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/plants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants(plants.filter((plant) => plant._id !== id)); // Update plant list
    } catch (err) {
      console.error("Error removing plant:", err);
      setError("Failed to remove plant");
    }
  };

  // Generate care notifications
  const generateNotifications = (plantList) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const upcomingTasks = [];

    plantList.forEach((plant) => {
      if (plant.lastWatered && new Date(plant.lastWatered) < new Date(today)) {
        upcomingTasks.push(`${plant.name}: Time to water your plant!`);
      }
      if (plant.lastFertilized && new Date(plant.lastFertilized) < new Date(today)) {
        upcomingTasks.push(`${plant.name}: Time to fertilize your plant!`);
      }
      if (plant.lastPruned && new Date(plant.lastPruned) < new Date(today)) {
        upcomingTasks.push(`${plant.name}: Time to prune your plant!`);
      }
    });

    setNotifications(upcomingTasks);
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">My Plants</h1>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <h3 className="font-bold">Care Notifications</h3>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Plant Form */}
      {/* Add Plant Form */}
<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
  <h2 className="text-xl font-bold mb-4">Add a New Plant</h2>
  <div className="mb-4">
    <label className="block text-gray-700">Plant Name</label>
    <input
      type="text"
      value={newPlant.name}
      onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Species</label>
    <input
      type="text"
      value={newPlant.species}
      onChange={(e) => setNewPlant({ ...newPlant, species: e.target.value })}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Health</label>
    <input
      type="text"
      value={newPlant.health || ""}
      onChange={(e) => setNewPlant({ ...newPlant, health: e.target.value })}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Last Watered (Optional)</label>
    <input
      type="date"
      value={newPlant.lastWatered || ""}
      onChange={(e) => setNewPlant({ ...newPlant, lastWatered: e.target.value })}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Last Fertilized (Optional)</label>
    <input
      type="date"
      value={newPlant.lastFertilized || ""}
      onChange={(e) => setNewPlant({ ...newPlant, lastFertilized: e.target.value })}
      className="w-full p-2 border rounded"
    />
  </div>
  <button
    onClick={handleAddPlant}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Add Plant
  </button>
</div>


      {/* Plant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div key={plant._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{plant.name}</h3>
            <p>Species: {plant.species}</p>
            <p>Last Watered: {plant.lastWatered || "Not yet"}</p>
            <p>Last Fertilized: {plant.lastFertilized || "Not yet"}</p>
            <p>Last Pruned: {plant.lastPruned || "Not yet"}</p>
            <button
              onClick={() => handleRemovePlant(plant._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PlantList;
