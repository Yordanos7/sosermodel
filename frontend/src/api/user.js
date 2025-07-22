import axios from "../lib/axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch users");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to delete user");
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await axios.get("/users/stats");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to fetch dashboard stats"
    );
  }
};
