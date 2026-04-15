import api from "./axios";

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  
  localStorage.setItem("token", res.data.token);

  return res.data;
};