// API 엔드포인트
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },
    MEMBERS: {
        SIGNUP: '/members/signup',
    },
    PRODUCTS: {
        LIST: '/products',
        DETAIL: (id) => `/products/${id}`,
        SEARCH: '/products/search',
    },
    ORDERS: {
        CREATE: '/orders',
        LIST: '/orders',
        DETAIL: (id) => `/orders/${id}`,
        CANCEL: (id) => `/orders/${id}/cancel`,
    },
    CART: {
        GET: '/cart',
        ADD: '/cart',
        UPDATE: (id) => `/cart/${id}`,
        REMOVE: (id) => `/cart/${id}`,
    },
};

// 주문 상태
export const ORDER_STATUS = {
    PENDING: '결제 대기',
    CONFIRMED: '주문 확정',
    PREPARING: '배송 준비중',
    SHIPPED: '배송중',
    DELIVERED: '배송 완료',
    CANCELED: '취소',
    REFUNDED: '환불',
};

// 사용자 역할
export const USER_ROLES = {
    BUYER: 'BUYER',
    SELLER: 'SELLER',
    ADMIN: 'ADMIN',
};

// 상품 상태
export const PRODUCT_STATUS = {
    ON_SALE: '판매중',
    SOLD_OUT: '품절',
    HIDDEN: '숨김',
    DISCONTINUED: '판매종료',
};
