import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signin', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);

      // Redirect to the profile page
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials');
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
          <h2 className="text-2xl font-bold text-green-800 mt-2">Plant Care Management</h2>
          <p className="text-green-700 text-sm">Nurture your plants, nurture life.</p>
        </div>

        <div className="p-6">
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-green-800 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-green-800 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm mb-8 text-green-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
