// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1000", // Adjust to match your backend
});

export default instance;
