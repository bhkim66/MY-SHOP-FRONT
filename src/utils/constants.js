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
    SELLER: {
        DASHBOARD: {
            STATS: '/seller/dashboard/stats',
        },
        PRODUCTS: {
            LIST: '/seller/products',
            DETAIL: (seq) => `/seller/products/${seq}`,
            CREATE: '/seller/products',
            UPDATE: (seq) => `/seller/products/${seq}`,
            DELETE: (seq) => `/seller/products/${seq}`,
            IMAGES: (seq) => `/seller/products/${seq}/images`,
            DELETE_IMAGE: (seq, imageSeq) => `/seller/products/${seq}/images/${imageSeq}`,
        },
        ORDERS: {
            LIST: '/seller/orders',
            RECENT: '/seller/orders/recent',
            DETAIL: (id) => `/seller/orders/${id}`,
            UPDATE_STATUS: (id) => `/seller/orders/${id}/status`,
        },
        UPLOAD: {
            IMAGE: '/seller/upload/image',
        },
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

// 상품 상태 (백엔드 API 명세에 맞춤)
export const PRODUCT_STATUS = {
    ON_SALE: '판매중',
    SOLD_OUT: '품절',
    HIDDEN: '숨김',
};

// 카테고리 코드 (백엔드 API 명세에 맞춤)
export const CATEGORY_CODES = {
    FASHION_TOP: '패션 > 상의',
    FASHION_BOTTOM: '패션 > 하의',
    FASHION_OUTER: '패션 > 아우터',
    FASHION_SHOES: '패션 > 신발',
    ELECTRONICS_AUDIO: '전자기기 > 오디오',
    ELECTRONICS_MOBILE: '전자기기 > 모바일',
};

// 이미지 타입
export const IMAGE_TYPES = {
    MAIN: 'MAIN',
    DETAIL: 'DETAIL',
    THUMBNAIL: 'THUMBNAIL',
};

// Select 옵션용 배열
export const PRODUCT_STATUS_OPTIONS = Object.entries(PRODUCT_STATUS).map(([value, label]) => ({
    value,
    label,
}));

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_CODES).map(([value, label]) => ({
    value,
    label,
}));
