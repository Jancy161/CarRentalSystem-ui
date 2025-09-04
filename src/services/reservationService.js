import http, { API_BASE } from "./http";

export const addReservation = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/reservations/add`, payload);
  return data;
};

export const updateReservation = async (reservation) => {
  const { data } = await http.put(`${API_BASE}/api/reservations/update`, reservation);
  return data;
};
//parameter was reservationId
export const getReservationByUserId = async (userId) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getbyid/${userId}`);
  return data;
};

export const deleteReservationById = async (reservationId) => {
  const { data } = await http.delete(`${API_BASE}/api/reservations/deletebyid/${reservationId}`);
  return data;
};

export const getAllReservations = async () => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getall`);
  return data;
};

export const getByReservationGreaterThan = async (totalAmount) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getresgreaterthan/${totalAmount}`);
  return data;
};
