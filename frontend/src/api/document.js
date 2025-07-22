import axios from "../lib/axios";

export const getDocuments = async () => {
  const response = await axios.get("/documents");
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await axios.post("/documents", documentData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateDocument = async (id, documentData) => {
  const response = await axios.put(`/documents/${id}`, documentData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await axios.delete(`/documents/${id}`);
  return response.data;
};

export const downloadDocument = async (id, onDownloadProgress) => {
  const response = await axios.get(`/documents/download/${id}`, {
    responseType: "blob",
    onDownloadProgress,
  });
  return response.data;
};
