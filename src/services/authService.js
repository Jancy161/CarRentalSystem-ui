import http, { API_BASE } from "./http";
// authService.js (after login success)
import { fetchUserByEmail } from "./userService";
//const TOKEN_KEY = "token";

export const register = async (payload) => {
  // payload: { userId, name, email, password, role }
  const { data } = await http.post(`${API_BASE}/auth/register`, payload);
  return data;
};
/*
export const login = async ({ username, password }) => {
  const { data } = await http.post(`${API_BASE}/auth/login`, { username, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
    // We keep the username (email) to lookup role right after login
    localStorage.setItem("email", username);
    // fetch user details
    const userArr = await fetchUserByEmail(username);
    const user = Array.isArray(userArr) ? userArr[0] : userArr;
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("role", user.role);
  }
  
  return data;
};*/
export const login = async ({ username, password }) => {
  const { data } = await http.post(`${API_BASE}/auth/login`, { username, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", username);

    // fetch user details with token
    const userArr = await fetchUserByEmail(username);
    const user = Array.isArray(userArr) ? userArr[0] : userArr;
    //localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("role", user.role);
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};
/*export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}; */
export const isAuthenticated = () => !!localStorage.getItem("token");

export const getRole = () => localStorage.getItem("role");
// ✅ add this helper so other services can send JWT
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};