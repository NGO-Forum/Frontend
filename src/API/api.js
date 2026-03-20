import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "https://api.ngoforum.org.kh/api",
  timeout: 15000, // prevent hanging requests
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});