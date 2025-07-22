import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your API base URL
  timeout: 1800000, // 30 minutes
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sosser_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
