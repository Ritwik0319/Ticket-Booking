import axios from "axios";

const api = axios.create({
  baseURL: "https://ticket-booking-production-71a3.up.railway.app/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
