import apiClient from './client';
import { API_ENDPOINTS } from '../utils/constants';

// 대시보드 통계
export const getDashboardStats = async () => {
    return await apiClient.get(API_ENDPOINTS.SELLER.DASHBOARD.STATS);
};

// 최근 주문
export const getRecentOrders = async () => {
    return await apiClient.get(API_ENDPOINTS.SELLER.ORDERS.RECENT);
};

// 상품 목록 조회
export const getProducts = async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size !== undefined) queryParams.append('size', params.size);
    if (params.status && params.status !== 'ALL') queryParams.append('status', params.status);
    if (params.categoryCode && params.categoryCode !== 'ALL') queryParams.append('categoryCode', params.categoryCode);
    if (params.search) queryParams.append('keyword', params.search);

    const queryString = queryParams.toString();
    return await apiClient.get(`${API_ENDPOINTS.SELLER.PRODUCTS.LIST}${queryString ? `?${queryString}` : ''}`);
};

// 상품 상세 조회
export const getProduct = async (seq) => {
    return await apiClient.get(API_ENDPOINTS.SELLER.PRODUCTS.DETAIL(seq));
};

// 상품 생성
export const createProduct = async (productData) => {
    return await apiClient.post(API_ENDPOINTS.SELLER.PRODUCTS.CREATE, productData);
};

// 상품 수정
export const updateProduct = async (seq, productData) => {
    return await apiClient.put(API_ENDPOINTS.SELLER.PRODUCTS.UPDATE(seq), productData);
};

// 상품 삭제
export const deleteProduct = async (seq) => {
    return await apiClient.delete(API_ENDPOINTS.SELLER.PRODUCTS.DELETE(seq));
};

// 상품 이미지 업로드
export const uploadProductImage = async (productSeq, file, imageType = 'DETAIL') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageType', imageType);

    return await apiClient.post(API_ENDPOINTS.SELLER.PRODUCTS.IMAGES(productSeq), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// 상품 이미지 삭제
export const deleteProductImage = async (productSeq, imageSeq) => {
    return await apiClient.delete(API_ENDPOINTS.SELLER.PRODUCTS.DELETE_IMAGE(productSeq, imageSeq));
};

// 이미지 업로드 (임시)
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post(API_ENDPOINTS.SELLER.UPLOAD.IMAGE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// 주문 관리
// 주문 목록 조회
export const getSellerOrders = async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size !== undefined) queryParams.append('size', params.size);
    if (params.status && params.status !== 'ALL') queryParams.append('status', params.status);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const queryString = queryParams.toString();
    return await apiClient.get(`${API_ENDPOINTS.SELLER.ORDERS.LIST}${queryString ? `?${queryString}` : ''}`);
};

// 주문 상세 조회
export const getSellerOrderDetail = async (orderSeq) => {
    return await apiClient.get(API_ENDPOINTS.SELLER.ORDERS.DETAIL(orderSeq));
};

// 주문 상태 변경
export const updateOrderStatus = async (orderSeq, status, reason = '', shippingInfo = null) => {
    const payload = {
        status,
        ...(reason && { reason }),
        ...(shippingInfo && { shippingInfo }),
    };
    return await apiClient.put(API_ENDPOINTS.SELLER.ORDERS.UPDATE_STATUS(orderSeq), payload);
};

// 배송 정보 등록
export const registerShipment = async (orderSeq, shippingCompany, trackingNumber) => {
    return await updateOrderStatus(orderSeq, 'SHIPPED', '', {
        shippingCompany,
        trackingNumber,
    });
};
