import apiClient from '../api/apiClient';
import { handleApiError } from '../api/errorHandler';

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

export const searchProducts = async (query, limit = 20, skip = 0) => {
  try {
    const { data } = await apiClient.get(`/products/search`, {
      params: { q: query, limit, skip },
    });
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const getProductCategories = async () => {
  try {
    const { data } = await apiClient.get('/products/category-list');
    return data; // data adalah array string categories
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addProduct = async (payload) => {
  try {
    const { data } = await apiClient.post('/products/add', payload);
    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
