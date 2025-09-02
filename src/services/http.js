import axios from "axios";

export const API_BASE = "http://localhost:8080"; // Spring Boot API

const http = axios.create({ baseURL: API_BASE });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Token invalid/expired -> force logout
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;