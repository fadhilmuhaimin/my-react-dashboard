import apiClient from "./apiClient"
import { handleApiError } from "./errorHandler";

export const login = async (username,password) => {
    try{
        const{data} = await apiClient.post('/auth/login',{username,password});
        return data;
    }catch(error){
        throw new Error(handleApiError(error));
    }
}