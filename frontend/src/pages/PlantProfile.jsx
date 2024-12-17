import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const PlantProfile = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`/plants/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlant(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch plant details");
      }
    };
    fetchPlant();
  }, [id]);

  if (!plant) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">{plant.name} Profile</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <img
          src={plant.image || "/placeholder.jpg"}
          alt={plant.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p><strong>Species:</strong> {plant.species}</p>
        <p><strong>Health:</strong> {plant.health}</p>
        <p><strong>Last Watered:</strong> {plant.lastWatered}</p>
        <button
          onClick={() => navigate(`/edit-plant/${plant._id}`)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default PlantProfile;
