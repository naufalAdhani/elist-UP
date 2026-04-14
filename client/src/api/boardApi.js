import api from "./axios";

export const getBoards = () => {
  return api.get("/boards");
};

export const createBoard = (data) => {
  return api.post("/boards", data);
};