import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://soserunion.com/api",
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
