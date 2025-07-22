import axios from "../lib/axios";

export const getTestimonials = async () => {
  const response = await axios.get("/testimonials");
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await axios.post("/testimonials", testimonialData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await axios.put(`/testimonials/${id}`, testimonialData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`/testimonials/${id}`);
  return response.data;
};
