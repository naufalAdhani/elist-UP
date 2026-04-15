import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});


export const login = async (data) => {
  const res = await API.post("/login", data);
  return res.data; 
};


export const register = async (data) => {
  const res = await API.post("/register", data); 
  return res.data;
};