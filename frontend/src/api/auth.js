import api from "../lib/axios";

export async function register(data) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data) {
  const res = await api.post("/auth/login", data);
  return res.data;
}
