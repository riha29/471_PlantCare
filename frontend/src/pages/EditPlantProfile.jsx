import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const EditPlantProfile = () => {
  const location = useLocation();
  const plant = location.state?.plant || {};
  const navigate = useNavigate();

  const [name, setName] = useState(plant.name || '');
  const [species, setSpecies] = useState(plant.species || '');
  const [health, setHealth] = useState(plant.health || 'Healthy');
  const [status, setStatus] = useState(plant.status || 'active');
  const [wateringFrequency, setWateringFrequency] = useState(
    plant.careSchedule?.watering?.frequency || ''
  );
  const [lastWatered, setLastWatered] = useState(
    plant.careSchedule?.watering?.lastWatered || ''
  );
  const [fertilizingFrequency, setFertilizingFrequency] = useState(
    plant.careSchedule?.fertilizing?.frequency || ''
  );
  const [lastFertilized, setLastFertilized] = useState(
    plant.careSchedule?.fertilizing?.lastFertilized || ''
  );
  const [lastPruned, setLastPruned] = useState(
    plant.careSchedule?.pruning?.lastPruned || ''
  );
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPlant = {
      name,
      species,
      health,
      status,
      careSchedule: {
        watering: {
          frequency: wateringFrequency,
          lastWatered,
        },
        fertilizing: {
          frequency: fertilizingFrequency,
          lastFertilized,
        },
        pruning: {
          lastPruned,
        },
      },
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`/plants/${plant._id}`, updatedPlant, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Plant updated:', response.data);
      navigate('/plant-profile');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update plant profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-200 p-6 text-center">
          <h2 className="text-2xl font-bold text-green-800">Edit Plant Profile</h2>
        </div>
        <div className="p-6">
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Species Field */}
            <div className="mb-4">
              <label htmlFor="species" className="block text-gray-700">Species</label>
              <input
                type="text"
                id="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Health Field */}
            <div className="mb-4">
              <label htmlFor="health" className="block text-gray-700">Health</label>
              <select
                id="health"
                value={health}
                onChange={(e) => setHealth(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs Care">Needs Care</option>
                <option value="Wilting">Wilting</option>
              </select>
            </div>

            {/* Status Field */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Care Schedule Fields */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">Care Schedule</h3>
              <label htmlFor="wateringFrequency" className="block text-gray-700">Watering Frequency</label>
              <input
                type="text"
                id="wateringFrequency"
                value={wateringFrequency}
                onChange={(e) => setWateringFrequency(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />

              <label htmlFor="lastWatered" className="block text-gray-700">Last Watered</label>
              <input
                type="date"
                id="lastWatered"
                value={lastWatered}
                onChange={(e) => setLastWatered(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />

              <label htmlFor="fertilizingFrequency" className="block text-gray-700">Fertilizing Frequency</label>
              <input
                type="text"
                id="fertilizingFrequency"
                value={fertilizingFrequency}
                onChange={(e) => setFertilizingFrequency(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />

              <label htmlFor="lastFertilized" className="block text-gray-700">Last Fertilized</label>
              <input
                type="date"
                id="lastFertilized"
                value={lastFertilized}
                onChange={(e) => setLastFertilized(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />

              <label htmlFor="lastPruned" className="block text-gray-700">Last Pruned</label>
              <input
                type="date"
                id="lastPruned"
                value={lastPruned}
                onChange={(e) => setLastPruned(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
</form>

        </div>
      </div>
    </div>
  );
};

export default EditPlantProfile;
