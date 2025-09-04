/*import axios from "axios";

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

export default http;*/
import axios from "axios";

export const API_BASE = "http://localhost:8080";

// Create axios instance
const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Request interceptor to add JWT token to all requests
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again."));
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      return Promise.reject(new Error("Access denied. You don't have permission to perform this action."));
    }
    
    return Promise.reject(error);
  }
);

export default http;
