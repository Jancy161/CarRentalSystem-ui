import http, { API_BASE } from "./http";

export const fetchUserByEmail = async (email) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyemail/${encodeURIComponent(email)}`);
  return data; // backend returns List<User>
};

export const fetchUserById = async (id) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyid/${id}`);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await http.put(`${API_BASE}/api/users/update/${id}`, payload);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await http.get(`${API_BASE}/api/users/getall`);
  return data;
};