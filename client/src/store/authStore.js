import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  login: (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({ user: userInfo });
  },
  logout: () => {
    localStorage.removeItem("userInfo");
    set({ user: null });
  },
}));

export default useAuthStore;
