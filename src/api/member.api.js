import apiClient from './client';

export const signup = async (userData) => {
    return await apiClient.post('/members/signup', userData);
};
