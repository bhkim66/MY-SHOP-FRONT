import apiClient from './client';

// 상품 API
export const getProducts = (params = {}) => {
    return apiClient.get('/products', { params });
};

export const getCategories = () => {
    return apiClient.get('/categories');
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

export const getShipment = (orderSeq) => {
    return apiClient.get(`/orders/${orderSeq}/shipment`);
};

// 결제 API
export const requestPayment = (paymentData) => {
    return apiClient.post('/payments', paymentData);
};

export const confirmPayment = (paymentSeq) => {
    return apiClient.post(`/payments/${paymentSeq}/confirm`);
};

// 장바구니 API
export const addToCart = (data) => {
    return apiClient.post('/cart', data);
};

export const getCart = () => {
    return apiClient.get('/cart');
};

export const getCartCount = () => {
    return apiClient.get('/cart/count');
};

export const updateCartItem = (cartSeq, data) => {
    return apiClient.patch(`/cart/${cartSeq}`, data);
};

export const removeCartItem = (cartSeq) => {
    return apiClient.delete(`/cart/${cartSeq}`);
};

export const clearCart = () => {
    return apiClient.delete('/cart');
};
