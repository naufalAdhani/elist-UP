import api from "./axios";

export const createCard = (data) => {
  return api.post("/cards", data);
};

export const updateCard = (id, data) => {
  return api.put(`/cards/${id}`, data);
};

export const deleteCard = (id) => {
  return api.delete(`/cards/${id}`);
};