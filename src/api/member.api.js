import apiClient from './client';
import { API_ENDPOINTS } from '../utils/constants';

export const signup = async (userData) => {
    return await apiClient.post(API_ENDPOINTS.MEMBERS.SIGNUP, userData);
};
