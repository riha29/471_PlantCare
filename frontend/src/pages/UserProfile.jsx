import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import EditProfile from './EditProfile';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [preferences, setPreferences] = useState({
    eventNotifications: true,
    featureUpdates: true,
  });
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const navigate = useNavigate();

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear the auth token
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/");
  };

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Update state with user data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch shared posts
  useEffect(() => {
    const fetchSharedPosts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/posts/shared', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSharedPosts(response.data);
      } catch (error) {
        console.error('Error fetching shared posts:', error.response?.data || error.message);
      }
    };
    fetchSharedPosts();
  }, []);

  // Fetch email preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/users/preferences', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPreferences(response.data.preferences);
        setLoadingPreferences(false);
      } catch (error) {
        console.error('Error fetching preferences:', error.message);
        setLoadingPreferences(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleUpdatePreferences = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        '/users/preferences',
        preferences,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Preferences updated!');
    } catch (error) {
      console.error('Error updating preferences:', error.message);
    }
  };

  if (isEditing) {
    return <EditProfile user={user} updateUser={updateUser} />;
  }
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {/* Navigation Bar */}
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
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Logout
            </button>
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
              <strong>Phone:</strong> {user.phone || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Address:</strong> {user.address || "N/A"}
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

      {/* Shared Posts Section */}
      <h2 className="text-xl font-bold mt-8 px-6">Shared Posts</h2>
      {sharedPosts.length > 0 ? (
        sharedPosts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow mb-4 mx-6">
            <h3 className="font-bold">{post.userId.name}</h3>
            {post.photo && (
              <img
                src={post.photo}
                alt="Shared Post"
                className="w-full h-48 object-cover mt-2"
              />
            )}
            <p className="mt-2">{post.text}</p>
          </div>
        ))
      ) : (
        <p className="px-6 text-gray-700">No shared posts to display yet!</p>
      )}

      {/* Notification Preferences */}
      <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Email Notifications Preferences</h3>
        {loadingPreferences ? (
          <p>Loading preferences...</p>
        ) : (
          <div>
            <label className="block mb-4">
              <input
                type="checkbox"
                checked={preferences.eventNotifications}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    eventNotifications: !prev.eventNotifications,
                  }))
                }
                className="mr-2"
              />
              Receive event notifications
            </label>
            <label className="block mb-4">
              <input
                type="checkbox"
                checked={preferences.featureUpdates}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    featureUpdates: !prev.featureUpdates,
                  }))
                }
                className="mr-2"
              />
              Receive feature updates
            </label>
            <button
              onClick={handleUpdatePreferences}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
