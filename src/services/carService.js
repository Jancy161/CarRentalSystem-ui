import http, { API_BASE } from "./http";

export const getAllCars = async () => {
  // Public per SecurityConfig
  const { data } = await http.get(`${API_BASE}/api/cars/getall`);
  return data;
};

export const addCar = async (payload) => {
  const { data } = await http.post(`${API_BASE}/api/cars/insert`, payload);
  return data;
};

export const updateCar = async (car) => {
  const { data } = await http.put(`${API_BASE}/api/cars/update`, car);
  return data;
};

export const deleteCar = async (carId) => {
  const { data } = await http.delete(`${API_BASE}/api/cars/deletebyid/${carId}`);
  return data;
};

export const getCarById = async (carId) => {
  const { data } = await http.get(`${API_BASE}/api/cars/getbyid/${carId}`);
  return data;
};

export const getByBrand = async (brand) => {
  const { data } = await http.get(`${API_BASE}/api/cars/getbybrand/${encodeURIComponent(brand)}`);
  return data;
};

export const getAffordableSorted = async (price) => {
  const { data } = await http.get(`${API_BASE}/api/cars/getaffordable/orderbyprice/${price}`);
  return data;
};
