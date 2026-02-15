import apiClient from './client';
import { API_ENDPOINTS } from '../utils/constants';

export const login = async (credentials) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

export const logout = async () => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
};

export const getCurrentUser = async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH.ME);
};

export const refreshToken = async (refreshToken) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
};
