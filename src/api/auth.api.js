import apiClient from './client';

export const login = async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
};



export const logout = async () => {
    return await apiClient.post('/auth/logout');
};

export const getCurrentUser = async () => {
    return await apiClient.get('/auth/me');
};

export const refreshToken = async (refreshToken) => {
    return await apiClient.post('/auth/refresh', { refreshToken });
};
