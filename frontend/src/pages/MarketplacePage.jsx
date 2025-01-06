import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logout } from "../firebase"; // Firebase authentication functions
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore functions

// Initialize Firestore
const firestore = getFirestore();

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Save user data to Firestore
  const saveUserData = async (user) => {
    try {
      const userRef = doc(firestore, "users", user.uid); // Reference to Firestore document
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user); // Update the user state
      await saveUserData(user); // Save user data to Firestore
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      setError("Failed to sign in with Google.");
      console.error("Sign-In Error:", error.message);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      setError("Failed to log out.");
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-200 p-6 text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0W0qlOIJzqKqmroAm7U5JVDjaHnNb0r8xLw&s"
            alt="Plant Illustration"
            className="w-24 h-24 mx-auto"
          />
          <h2 className="text-2xl font-bold text-green-800 mt-2">
            Plant Care Management
          </h2>
          <p className="text-green-700 text-sm">Nurture your plants, nurture life.</p>
        </div>

        <div className="p-6">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {!user ? (
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign In with Google
            </button>
          ) : (
            <>
              <p className="text-green-700 text-center">
                Welcome, {user.displayName}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200 mt-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
