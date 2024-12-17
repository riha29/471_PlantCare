import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import EditProfile from './EditProfile';
import { Link } from 'react-router-dom'; 

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
      }
    };
    fetchUserProfile();
  }, []);

  if (isEditing) {
    return <EditProfile user={user} updateUser={updateUser} />;
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-green-900 mb-12 -m-8 pt-8 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/transaction" className="hover:underline">Marketplace</Link>
            <Link to="/profile" className="hover:underline">User</Link>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="flex-grow flex mt-32 items-center justify-center">
        <div className="max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-200 p-6 text-center">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/1253/1253756.png"}
              alt="User Avatar"
              className="w-24 h-24 mx-auto rounded-full border-4 border-green-400"
            />
            <h2 className="text-2xl font-bold text-green-800 mt-2">{user.name}</h2>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-green-800">Contact Information</h3>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Address:</strong> {user.address}
            </p>
          </div>
          <div className="bg-green-100 p-4 text-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
