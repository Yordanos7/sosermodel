import axios from "../lib/axios";

export const getVideos = async () => {
  try {
    const response = await axios.get("/videos");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const createVideo = async (formData) => {
  try {
    const response = await axios.post("/videos", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

export const updateVideo = async (id, formData) => {
  try {
    const response = await axios.put(`/videos/${id}`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await axios.delete(`/videos/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};
