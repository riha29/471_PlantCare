// src/api/axios.js
import axios from 'axios';

// Axios instance with a base URL pointing to your backend
const instance = axios.create({
  baseURL: 'http://localhost:1000/api', // Replace with your actual backend base URL
  timeout: 5000, // Optional: Set a timeout for requests (5 seconds)
});

export default instance;
