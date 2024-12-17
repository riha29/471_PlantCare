import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null); // Plant to be updated
  const [updatedPlantData, setUpdatedPlantData] = useState({}); // Form Data
  const [error, setError] = useState("");

  // Fetch plants
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch plants");
      }
    };
    fetchPlants();
  }, []);

  // Handle Edit Button Click
  const handleEditClick = (plant) => {
    setSelectedPlant(plant);
    setUpdatedPlantData(plant); // Pre-fill form data with current plant info
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlantData({ ...updatedPlantData, [name]: value });
  };

  // Handle Submit Update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/api/plants/${selectedPlant._id}`,
        updatedPlantData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Plant updated successfully!");
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant._id === response.data._id ? response.data : plant
        )
      );
      setSelectedPlant(null); // Close the form
    } catch (error) {
      console.error("Error updating plant:", error.response?.data || error.message);
      alert("Failed to update plant.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">My Plants</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Display Plants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
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
            <button
              onClick={() => handleEditClick(plant)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Plant</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedPlantData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Species:
                <input
                  type="text"
                  name="species"
                  value={updatedPlantData.species}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Health:
                <input
                  type="text"
                  name="health"
                  value={updatedPlantData.health}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Last Watered:
                <input
                  type="date"
                  name="lastWatered"
                  value={updatedPlantData.lastWatered}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Last Fertilized:
                <input
                  type="date"
                  name="lastFertilized"
                  value={updatedPlantData.lastFertilized}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <button
                type="button"
                onClick={handleUpdate}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => setSelectedPlant(null)}
                className="mt-4 ml-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantList;
