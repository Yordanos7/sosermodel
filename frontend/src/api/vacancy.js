import api from "../lib/axios";

export async function addVacancy(data, token) {
  const res = await api.post("/vacancies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getVacancies() {
  const res = await api.get("/vacancies");
  return res.data;
}

export async function getVacancy(id) {
  const res = await api.get(`/vacancies/${id}`);
  return res.data;
}

export async function updateVacancy(id, data, token) {
  const res = await api.put(`/vacancies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteVacancy(id, token) {
}
