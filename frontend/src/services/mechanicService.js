import api from "./api";

export const getMechanics = async (params = {}) => {
  const response = await api.get("/mechanics", { params });

  return response.data;
};

export const getMechanicById = async (id) => {
  const response = await api.get(`/mechanics/${id}`);

  return response.data;
};
