import axios from "../lib/axios";

export const getMyPayments = async () => {
  try {
    const response = await axios.get("/payments/my-payments");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch payments");
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post("/payments", paymentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to create payment");
  }
};

export const updatePayment = async (id, status) => {
  try {
    const response = await axios.put(`/payments/${id}`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to update payment");
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await axios.delete(`/payments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to delete payment");
  }
};

export const getAllPayments = async () => {
  try {
    const response = await axios.get("/payments");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch payments");
  }
};
