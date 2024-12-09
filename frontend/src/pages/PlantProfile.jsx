// src/pages/PlantProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlantProfile = () => {
  const [plant, setPlant] = useState({
    name: 'Aloe Vera',
    species: 'Aloe Vera',
    health: 'Healthy',
    status: 'active',
    careSchedule: {
      watering: { frequency: '7 days', lastWatered: '2024-12-01' },
      fertilizing: { frequency: '30 days', lastFertilized: '2024-11-15' },
      pruning: { lastPruned: '2024-10-10' },
    },
  });

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit-plant'); // Redirect to Edit Plant Profile
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-200 p-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909597.png"
            alt="Plant Avatar"
            className="w-24 h-24 mx-auto rounded-full border-4 border-green-400"
          />
          <h2 className="text-2xl font-bold text-green-800 mt-2">{plant.name}</h2>
          <p className="text-green-700 text-sm">{plant.species}</p>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-green-800 mb-2">Plant Details</h3>
          <p className="text-sm text-gray-700">
            <strong>Health:</strong> {plant.health}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> {plant.status}
          </p>

          <h3 className="text-lg font-medium text-green-800 mt-4 mb-2">Care Schedule</h3>
          <p className="text-sm text-gray-700">
            <strong>Watering Frequency:</strong> {plant.careSchedule.watering.frequency}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Last Watered:</strong> {plant.careSchedule.watering.lastWatered}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Fertilizing Frequency:</strong> {plant.careSchedule.fertilizing.frequency}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Last Fertilized:</strong> {plant.careSchedule.fertilizing.lastFertilized}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Last Pruned:</strong> {plant.careSchedule.pruning.lastPruned}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="bg-green-100 p-4 text-center flex gap-4 justify-center">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            onClick={handleEditClick}
          >
            Edit Plant
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantProfile;
