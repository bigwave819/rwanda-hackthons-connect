import axios from "axios";
import { redirect } from "next/navigation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true, // IMPORTANT for cookies
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      // REGISTER
      register: async (fullName, email, password) => {
        set({ isLoading: true, error: null });

        try {
          const res = await axiosInstance.post("/auth/register", {
            fullName,
            email,
            password,
          });

          set({ user: res.data.user, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: "Registration failed",
          });
          return false;
        }
      },

      // LOGIN
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const res = await axiosInstance.post("/auth/login", {
            email,
            password,
          });

          // Ensure the browser actually received the cookie
          if (!res.headers['set-cookie']) {
            console.warn("Warning: no Set-Cookie header detected");
          }

          set({ user: res.data.user, isLoading: false });
          return true;
        } catch {
          set({
            isLoading: false,
            error: "Invalid credentials",
          });
          return false;
        }
      },

      // LOGOUT
      logout: async () => {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
        redirect("/")
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
