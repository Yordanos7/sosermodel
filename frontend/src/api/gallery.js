import axios from "../lib/axios";

export const getGalleryItems = async () => {
  try {
    const response = await axios.get("/gallery");
    return response.data;
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    throw error;
  }
};

export const createGalleryItem = async (formData) => {
  try {
    const response = await axios.post("/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating gallery item:", error);
    throw error;
  }
};

export const updateGalleryItem = async (id, formData) => {
  try {
    const response = await axios.put(`/gallery/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const response = await axios.delete(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
};
