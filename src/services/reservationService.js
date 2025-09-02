import http, { API_BASE } from "./http";

export const addReservation = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/reservations/add`, payload);
  return data;
};

export const updateReservation = async (reservation) => {
  const { data } = await http.put(`${API_BASE}/api/reservations/update`, reservation);
  return data;
};

export const getReservationById = async (id) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getbyid/${id}`);
  return data;
};

export const deleteReservationById = async (id) => {
  const { data } = await http.delete(`${API_BASE}/api/reservations/deletebyid/${id}`);
  return data;
};

export const getAllReservations = async () => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getall`);
  return data;
};

export const getByReservationGreaterThan = async (amount) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getresgreaterthan/${amount}`);
  return data;
};
