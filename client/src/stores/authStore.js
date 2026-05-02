import { create } from "zustand";
import api from "@/lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  signup: async (name, email, password) => {
    set({ loading: true });
    try {
      await api.post("/auth/signup", { name, email, password });
      set({ loading: false });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/login", { email, password });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout error:", err);
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));