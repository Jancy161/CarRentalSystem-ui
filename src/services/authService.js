import http, { API_BASE } from "./http";

export const register = async (payload) => {
  // payload: { userId, name, email, password, role }
  const { data } = await http.post(`${API_BASE}/auth/register`, payload);
  return data;
};

export const login = async ({ username, password }) => {
  const { data } = await http.post(`${API_BASE}/auth/login`, { username, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
    // We keep the username (email) to lookup role right after login
    localStorage.setItem("email", username);
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
