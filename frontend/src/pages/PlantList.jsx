import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from 'react-router-dom'; 

const PlantList = () => {
  const [plants, setPlants] = useState([]); // User's plants
  const [newPlant, setNewPlant] = useState({ name: "", species: "", health: "", lastWatered: "", lastFertilized: "" });
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]); // Notifications for care
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [isEditing, setIsEditing] = useState(false); // To check if editing a plant
  const [editingPlantId, setEditingPlantId] = useState(null); // Plant being edited
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show confirmation modal

  // Fetch user's plants from the backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(response.data);
        generateNotifications(response.data); // Generate notifications
      } catch (err) {
        console.error("Error fetching plants:", err);
        setError("Failed to fetch plants");
      }
    };

    fetchPlants();
  }, []);

  // Add or Update a Plant
  const handleAddOrUpdatePlant = async () => {
    if (!newPlant.name || !newPlant.species) {
      alert("Please provide both name and species for the plant.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (isEditing) {
        // Update plant
        const response = await axios.put(`/plants/${editingPlantId}`, newPlant, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(
          plants.map((plant) => (plant._id === editingPlantId ? response.data : plant))
        );
        setIsEditing(false);
        setEditingPlantId(null);
      } else {
        // Add new plant
        const response = await axios.post("/plants", newPlant, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants([...plants, response.data]); // Add new plant to the list
      }

      setNewPlant({ name: "", species: "", health: "", lastWatered: "", lastFertilized: "" }); // Reset form
      setError(""); // Clear error
      setShowForm(false); // Hide form after adding/updating
    } catch (err) {
      console.error("Error adding/updating plant:", err);
      setError("Failed to add or update plant");
    }
  };

  // Remove a plant
  const handleRemovePlant = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/plants/${editingPlantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setPlants(plants.filter((plant) => plant._id !== editingPlantId)); // Update the plant list
      setShowDeleteModal(false); // Close the modal
      setShowForm(false); // Close the form
      setEditingPlantId(null); // Reset editing state
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
      // Check watering schedule
      if (plant.lastWatered) {
        const nextWatering = new Date(plant.lastWatered);
        nextWatering.setDate(nextWatering.getDate() + (plant.waterInterval || 7)); // Default 7 days
        if (new Date(today) >= nextWatering) {
          upcomingTasks.push(`${plant.name}: Time to water your plant.`);
        }
      }

      // Check fertilizing schedule
      if (plant.lastFertilized) {
        const nextFertilizing = new Date(plant.lastFertilized);
        nextFertilizing.setDate(nextFertilizing.getDate() + (plant.fertilizeInterval || 30)); // Default 30 days
        if (new Date(today) >= nextFertilizing) {
          upcomingTasks.push(`${plant.name}: Time to fertilize your plant.`);
        }
      }

      // Check pruning schedule (if applicable)
      if (plant.lastPruned) {
        const nextPruning = new Date(plant.lastPruned);
        nextPruning.setDate(nextPruning.getDate() + (plant.pruneInterval || 90)); // Default 90 days
        if (new Date(today) >= nextPruning) {
          upcomingTasks.push(`${plant.name}: Time to prune your plant.`);
        }
      }
    });

    setNotifications(upcomingTasks);
  };

  // Edit a plant
  const handleEditPlant = (plant) => {
    setIsEditing(true);
    setEditingPlantId(plant._id);
    setNewPlant({
      name: plant.name,
      species: plant.species,
      health: plant.health || "",
      lastWatered: plant.lastWatered ? plant.lastWatered.split("T")[0] : "",
      lastFertilized: plant.lastFertilized ? plant.lastFertilized.split("T")[0] : "",
    });
    setShowForm(true); // Show form with pre-filled data
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
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
  
      <h1 className="text-3xl font-bold mt-16 text-center mb-6">My Plants</h1>
  
      {/* Add Plant Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm); // Toggle form visibility
            setIsEditing(false); // Reset editing state
            setNewPlant({ name: "", species: "", health: "", lastWatered: "", lastFertilized: "" }); // Reset form data
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? "Close Form" : "Add Plant"}
        </button>
      </div>
  
      {/* Notifications Section */}
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
  
      {/* Add/Edit Plant Form */}
      {showForm && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Plant" : "Add a New Plant"}</h2>
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
              value={newPlant.health}
              onChange={(e) => setNewPlant({ ...newPlant, health: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Watered (Optional)</label>
            <input
              type="date"
              value={newPlant.lastWatered}
              onChange={(e) => setNewPlant({ ...newPlant, lastWatered: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Fertilized (Optional)</label>
            <input
              type="date"
              value={newPlant.lastFertilized}
              onChange={(e) => setNewPlant({ ...newPlant, lastFertilized: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddOrUpdatePlant}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditing ? "Update Plant" : "Add Plant"}
          </button>
          {isEditing && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Remove Plant
            </button>
          )}
        </div>
      )}
  
      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete this plant? This action cannot be undone.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={handleRemovePlant} // Calls the remove function
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Plant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div key={plant._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{plant.name}</h3>
            <p>Species: {plant.species}</p>
            <p>Health: {plant.health || "Healthy"}</p>
            <p>Last Watered: {plant.lastWatered || "Not yet"}</p>
            <p>Last Fertilized: {plant.lastFertilized || "Not yet"}</p>
            <button
              onClick={() => handleEditPlant(plant)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Edit
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
