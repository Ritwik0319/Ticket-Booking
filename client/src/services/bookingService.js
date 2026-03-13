import api from "./api";

export const getBuses = async () => {
  const response = await api.get("/bookings/buses");
  return response.data;
};

export const getBusById = async (id) => {
  const response = await api.get(`/bookings/bus/${id}`);
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
