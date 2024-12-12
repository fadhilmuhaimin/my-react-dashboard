import apiClient from './apiClient';
import { handleApiError } from './errorHandler';

export const getProducts = async ({ limit = 12, skip = 0 } = {}) => {
  try {
    const { data } = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const { data } = await apiClient.put(`/products/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await apiClient.delete(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
