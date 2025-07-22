import axios from "../lib/axios";

export const getEvents = async () => {
  try {
    const response = await axios.get("/events");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw error;
  }
};
