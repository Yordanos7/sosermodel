import axios from "../lib/axios";

export const getAnnouncements = async () => {
  try {
    const response = await axios.get("/announcements");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    throw error;
  }
};
