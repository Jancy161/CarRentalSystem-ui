import http, { API_BASE } from "./http";
import { getAuthHeader } from "./authService";

export const addPayment = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/payments/insert`, payload,getAuthHeader());
  return data;
};

export const getPaymentById = async (paymentId) => {
  const { data } = await http.get(`${API_BASE}/api/payments/getbyid/${paymentId}`,getAuthHeader());
  return data;
};

export const getAllPayments = async () => {
  const { data } = await http.get(`${API_BASE}/api/payments/getall`,getAuthHeader());
  return data;
};

export const deletePayment = async (paymentId) => {
  const { data } = await http.delete(`${API_BASE}/api/payments/deletebyid/${paymentId}`,getAuthHeader());
  return data;
};

export const getByMethodAndStatus = async (method, status) => {
  const { data } = await http.get(`${API_BASE}/api/payments/getbymethodandstatus/${method}/${status}`,getAuthHeader());
  return data;
};
