import api from "../services/api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getBuses = async () => {
  const response = await api.get("/bookings/buses");
  return response.data;
};

export const getAdminBuses = async () => {
  const response = await api.get("/admin/bus");
  return response.data;
};

export const getBusById = async (id) => {
  const response = await api.get(`/bookings/bus/${id}`);
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

export const bookTicket = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const holdSeats = async (holdData) => {
  const response = await api.post("/bookings/hold", holdData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/mybookings");
  return response.data;
};
