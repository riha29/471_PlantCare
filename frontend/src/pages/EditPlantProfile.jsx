import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const EditPlantProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`/plants/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch plant details");
      }
    };
    fetchPlant();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`/plants/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plant updated successfully!");
      navigate(`/plant-profile/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update plant.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Plant</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
        <label className="block mb-4">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Species:
          <input
            type="text"
            name="species"
            value={formData.species || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Health:
          <input
            type="text"
            name="health"
            value={formData.health || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Last Watered:
          <input
            type="date"
            name="lastWatered"
            value={formData.lastWatered || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPlantProfile;
