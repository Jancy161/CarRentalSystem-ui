import http, { API_BASE } from "./http";


export const addFeedback = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/feedback/add`, payload);
  return data;
};

export const getAllFeedback = async () => {
  const { data } = await http.get(`${API_BASE}/api/feedback/all`);
  return data;
};

export const getFeedbackById = async (feedbackId) => {
  const { data } = await http.get(`${API_BASE}/api/feedback/${feedbackId}`);
  return data;
};

export const deleteFeedback = async (feedbackId) => {
  const { data } = await http.delete(`${API_BASE}/api/feedback/delete/${feedbackId}`);
  return data;
};

export const getFeedbacksOrderByRating = async () => {
  const { data } = await http.get(`${API_BASE}/api/feedback/getorderbyrating`);
  return data;
};