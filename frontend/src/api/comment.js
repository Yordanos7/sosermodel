import axios from "../lib/axios";

export const createComment = async (commentData) => {
  try {
    const response = await axios.post("/comments", commentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to create comment");
  }
};

export const getComments = async () => {
  try {
    const response = await axios.get("/comments");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to fetch comments");
  }
};

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`/comments/${id}`, commentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to update comment");
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to delete comment");
  }
};
