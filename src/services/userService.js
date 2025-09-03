import http, { API_BASE } from "./http";
//import { getAuthHeader } from "./authService";
export const fetchUserByEmail = async (email) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyemail/${encodeURIComponent(email)}`);
  return data; // backend returns List<User>
};

export const fetchUserById = async (userId) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyid/${userId}`);
  return data;
};

export const updateUser = async (userId, payload) => {
  const { data } = await http.put(`${API_BASE}/api/users/update/${userId}`, payload);  //, getAuthHeader() 3rd parameter
  return data;
};

export const getAllUsers = async () => {
  const { data } = await http.get(`${API_BASE}/api/users/getall`);
  return data;
};