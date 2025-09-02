import http, { API_BASE } from "./http";

export const addPayment = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/payments/insert`, payload);
  return data;
};

export const getPaymentById = async (id) => {
  const { data } = await http.get(`${API_BASE}/api/payments/getbyid/${id}`);
  return data;
};

export const getAllPayments = async () => {
  const { data } = await http.get(`${API_BASE}/api/payments/getall`);
  return data;
};

export const deletePayment = async (id) => {
  const { data } = await http.delete(`${API_BASE}/api/payments/deletebyid/${id}`);
  return data;
};

export const getByMethodAndStatus = async (method, status) => {
  const { data } = await http.get(`${API_BASE}/api/payments/getbymethodandstatus/${method}/${status}`);
  return data;
};
