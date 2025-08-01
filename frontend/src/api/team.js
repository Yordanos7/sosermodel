import axios from "../lib/axios";

export const addTeamMember = async (formData) => {
  const response = await axios.post("/team", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchTeamMembers = async () => {
  const response = await axios.get("/team");
  return response.data;
};

export const deleteTeamMember = async (id) => {
  await axios.delete(`/team/${id}`);
};
