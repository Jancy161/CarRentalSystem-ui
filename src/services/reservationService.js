import http, { API_BASE } from "./http";
import { getAuthHeader } from "./authService";
export const addReservation = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/reservations/add`, payload, getAuthHeader());
  return data;
};
/*
export const updateReservation = async (reservation) => {
  const { data } = await http.put(`${API_BASE}/api/reservations/update`, reservation);
  return data;
};*/
/*//parameter was reservationId
export const getReservationByUserId = async (userId) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getbyid/${userId}`);
  return data;
};*/

export const deleteReservationById = async (reservationId) => {
  const { data } = await http.delete(`${API_BASE}/api/reservations/deletebyid/${reservationId}`,getAuthHeader());
  return data;
};

export const getAllReservations = async () => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getall`,getAuthHeader());
  return data;
};

export const getByReservationGreaterThan = async (totalAmount) => {
  const { data } = await http.get(`${API_BASE}/api/reservations/getresgreaterthan/${totalAmount}`,getAuthHeader());
  return data;
};


/*// get all reservations for a user
export const getReservationsByUserId = async (userId) => {
const res = await http.get(`${API_BASE}/api/reservations/getbyuserid/${userId}`, getAuthHeader());
  return res.data;
};
*/
export const getReservationsByUserId = async (userId) => {
  const res = await http.get(`${API_BASE}/api/reservations/getbyuserid/${userId}`, getAuthHeader());
  return res.data;   // now this is List<ReservationDto>
};

// cancel reservation
export const cancelReservation = async (reservationId) => {
  const res = await http.put(`${API_BASE}/api/reservations/cancel/${reservationId}`, {}, getAuthHeader());
  return res.data;
};

// update reservation (dates/status)
export const updateReservation = async (reservation) => {
  const res = await http.put(`${API_BASE}/api/reservations/update`, reservation, getAuthHeader());
  return res.data;
};
