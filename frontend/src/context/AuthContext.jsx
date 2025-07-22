import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const api = axios.create({
  baseURL: "http://localhost:5000", // Match backend port
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sosser_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("sosser_token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("sosser_token");
      const storedUser = localStorage.getItem("sosser_user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const response = await api.post("/api/auth/verify");

          if (response.data.success) {
            setUser(userData);
          } else {
            localStorage.removeItem("sosser_token");
            localStorage.removeItem("sosser_user");
            setUser(null);
            setToken(null);
          }
        } catch (err) {
          console.error("Token validation error:", err);
          localStorage.removeItem("sosser_token");
          localStorage.removeItem("sosser_user");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("sosser_token", token);
        localStorage.setItem("sosser_user", JSON.stringify(user));
        setToken(token);
        setUser(user);
        setLoading(false);
        return { success: true, user };
      } else {
        setError(response.data.message || "Invalid credentials");
        return {
          success: false,
          error: response.data.message || "Invalid credentials",
        };
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to login. Check your network or credentials.";
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/auth/register", userData);

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("sosser_token", token);
        localStorage.setItem("sosser_user", JSON.stringify(user));
        setToken(token);
        setUser(user);
        setLoading(false);
        return { success: true, user };
      } else {
        setError(response.data.message || "Registration failed");
        return {
          success: false,
          error: response.data.message || "Registration failed",
        };
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to register. Check your network.";
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem("sosser_token");
    localStorage.removeItem("sosser_user");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const getAuthToken = () => token;

  const value = {
    user,
    token,
    login,
    register,
    logout,
    getAuthToken,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
