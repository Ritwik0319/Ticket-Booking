import api from "./api";

export const getAdminBuses = async () => {
  const response = await api.get("/admin/bus");
  return response.data;
};

export const getAdminBusById = async (id) => {
  const response = await api.get(`/admin/bus/${id}`);
  return response.data;
};

export const createBus = async (busData) => {
  const response = await api.post("/admin/bus", busData);
  return response.data;
};
