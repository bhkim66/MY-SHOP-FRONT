import apiClient from './client';

// 상품 API
export const getProducts = (params = {}) => {
    return apiClient.get('/products', { params });
};

export const getProductDetail = (productSeq) => {
    return apiClient.get(`/products/${productSeq}`);
};

// 주문 API
export const createOrder = (orderData) => {
    return apiClient.post('/orders', orderData);
};

export const getMyOrders = (params = {}) => {
    return apiClient.get('/orders', { params });
};

export const getOrderDetail = (orderSeq) => {
    return apiClient.get(`/orders/${orderSeq}`);
};

export const cancelOrder = (orderSeq, reason = '') => {
    return apiClient.post(`/orders/${orderSeq}/cancel`, { reason });
};

// 결제 API
export const requestPayment = (paymentData) => {
    return apiClient.post('/payments', paymentData);
};

export const confirmPayment = (paymentSeq) => {
    return apiClient.post(`/payments/${paymentSeq}/confirm`);
};
