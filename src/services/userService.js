/*import http, { API_BASE } from "./http";
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
};*/
import http, { API_BASE } from "./http";

export const fetchUserByEmail = async (email) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyemail/${encodeURIComponent(email)}`);
  return data; // backend returns List
};

export const fetchUserById = async (userId) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyid/${userId}`);
  return data;
};

export const updateUser = async (userId, payload) => {
  const { data } = await http.put(`${API_BASE}/api/users/update/${userId}`, payload);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await http.get(`${API_BASE}/api/users/getall`);
  return data;
};

// Add additional user methods if needed
export const deleteUser = async (userId) => {
  const { data } = await http.delete(`${API_BASE}/api/users/deletebyid/${userId}`);
  return data;
};

export const getUserByName = async (name) => {
  const { data } = await http.get(`${API_BASE}/api/users/getbyname/${encodeURIComponent(name)}`); //${encodeURIComponent(name)} or ${name}
  return data;
};
