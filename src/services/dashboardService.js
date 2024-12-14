import apiClient from "../api/apiClient";
import { handleApiError } from "../api/errorHandler";


/**
 * Ambil data deals WON & LOST dengan format seperti yang diberikan.
 */
export const getDealsData = async () => {
  try {
    const { data } = await apiClient.get('/c/6756-ff34-40be-bbe2');
    return data; // { data: { dealStages: { nodes: [ ... ] } } }
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const getTopUsers = async () => {
    try {
      const { data } = await apiClient.get('/users?limit=5&skip=10&select=firstName,lastName,age,email,image');
      return data.users; 
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };