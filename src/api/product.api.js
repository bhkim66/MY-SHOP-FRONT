import apiClient from './client';

export const getProducts = async (params = {}) => {
    return await apiClient.get('/products', { params });
};

export const getProductById = async (id) => {
    return await apiClient.get(`/products/${id}`);
};

export const searchProducts = async (keyword, params = {}) => {
    return await apiClient.get('/products/search', {
        params: { keyword, ...params },
    });
};

export const getCategories = async () => {
    return await apiClient.get('/categories');
};
