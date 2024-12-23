import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1000",
});

export default instance;
