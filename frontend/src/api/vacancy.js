import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("sosser_token")}`,
  },
});

export async function addVacancy(data) {
  const res = await api.post("/vacancies", data);
  return res.data;
}

export async function getVacancies() {
  const res = await api.get("/vacancies");
  return res.data;
}
