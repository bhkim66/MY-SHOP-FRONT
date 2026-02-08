# 프론트엔드 프로젝트 구성 계획서

MY_SHOP 프론트엔드 프로젝트를 와이어프레임에서 본격적인 개발 프로젝트로 재구성하기 위한 implementation plan입니다.

## 프로젝트 개요

현재 프론트엔드 프로젝트는 협업자들에게 화면을 보여주기 위한 와이어프레임 수준으로 구성되어 있습니다. 백엔드 프로젝트의 요구사항과 DB 구조를 기반으로, 실제 개발이 가능한 현대적인 이커머스 프론트엔드 애플리케이션으로 재구성합니다.

### 백엔드 프로젝트 핵심 정보

- **프로젝트 목적**: 개인 창업자들을 위한 쇼핑몰 이커머스 서비스
- **주요 도메인**: 회원(Member), 마켓(Market), 상품(Product), 주문(Order), 결제(Payment), 배송(Delivery), 프로모션(Promotion), 리뷰/문의/알림(Interaction), 정산(Settlement), 통계(Stats), AI 서비스
- **백엔드 기술 스택**: Spring Boot 3.x (Java 21), JPA, QueryDSL, MariaDB/H2, Spring Security + JWT

### 현재 상태 분석

```
MY_SHOP_FRONT/
├── src/
│   ├── App.js              # 기본 라우팅 (와이어프레임)
│   ├── AdminDashboard.jsx  # 관리자 대시보드 (와이어프레임)
│   ├── ClientShop.jsx      # 고객 쇼핑몰 (와이어프레임)
│   ├── index.css
│   └── index.js
├── public/
├── backend/                # 백엔드 관련 리소스?
├── database/               # DB 스키마 정의
└── package.json            # React 18.2.0 기반
```

**문제점:**
- 구조화되지 않은 컴포넌트 (모든 UI가 2개의 거대한 파일에 집중)
- 라우팅 시스템 부재
- 상태 관리 부재
- API 연동 로직 없음
- 재사용 가능한 컴포넌트 부재
- 타입 안정성 부족

## User Review Required

> [!IMPORTANT]
> 다음 주요 설계 결정사항에 대해 사용자 확인이 필요합니다:

### 1. 언어 선택
- **선택**: JavaScript (ES6+)
- **이유**: 팀 학습 곡선 최소화, PropTypes로 타입 체크 보완

### 2. 상태 관리 라이브러리
- **선택**: Zustand
- **이유**: 
  - 매우 작은 번들 사이즈 (1KB)
  - 간단한 API로 빠른 개발
  - Redux DevTools 지원으로 디버깅 편리
  - Context API보다 성능 우수
  - 필요 시 Redux로 마이그레이션 용이
- **사용 케이스**:
  - 인증 상태 관리 (AuthStore)
  - 장바구니 상태 관리 (CartStore)
  - UI 상태 관리 (UIStore)

### 3. UI 컴포넌트 라이브러리
- **선택**: TailwindCSS + Headless UI
- **이유**: 
  - 최대한의 디자인 자유도
  - 작은 번들 사이즈 (필요한 스타일만 포함)
  - 유틸리티 우선 방식으로 빠른 개발
  - Headless UI로 접근성(a11y) 보장

### 4. 개발 우선순위 (Phase 1 - MVP)
초기 단계에서는 다음 핵심 기능에 집중합니다:
1. **회원 인증**: 로그인, 회원가입
2. **메인 화면**: 홈페이지, 네비게이션 메뉴
3. **상품 조회**: 상품 목록, 상품 상세, 검색/필터
**이후 단계 (Phase 2+)**: 장바구니, 주문, 결제, 관리자 기능, 정산, AI 서비스 등

> [!WARNING]
> 현재 와이어프레임 파일(`AdminDashboard.jsx`, `ClientShop.jsx`)은 참고용으로 `src/wireframes/` 폴더로 이동하고, 새로운 구조로 재구성할 예정입니다.

---

## Proposed Changes

프로젝트를 체계적으로 재구성하기 위해 다음과 같은 변경사항을 제안합니다.

### 기술 스택 및 의존성

#### [NEW] package.json 업데이트

**추가할 주요 라이브러리:**

```json
{
  "dependencies": {
    // 라우팅
    "react-router-dom": "^6.21.0",
    
    // 상태 관리
    "zustand": "^4.4.7",
    
    // API 통신
    "axios": "^1.6.5",
    "@tanstack/react-query": "^5.17.19",
    
    // UI 라이브러리
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.1.1",
    
    // 폼 관리
    "react-hook-form": "^7.49.3",
    "yup": "^1.3.3",
    
    // 유틸리티
    "dayjs": "^1.11.10",
    "lodash": "^4.17.21",
    "clsx": "^2.1.0",
    
    // JWT 처리
    "jwt-decode": "^4.0.0",
    
    // 환경변수
    "dotenv": "^16.3.1",
    
    // PropTypes (타입 체크)
    "prop-types": "^15.8.1"
  },
  "devDependencies": {
    // TailwindCSS
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.16",
    
    // ESLint & Prettier
    "eslint-plugin-tailwindcss": "^3.13.1",
    "prettier-plugin-tailwindcss": "^0.5.11"
  }
}
```

---

### 프로젝트 구조 재설계

#### [NEW] 새로운 디렉토리 구조

```
MY_SHOP_FRONT/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/                     # API 호출 로직
│   │   ├── client.js           # Axios 인스턴스 설정
│   │   ├── auth.api.js         # 인증 관련 API
│   │   ├── product.api.js      # 상품 관련 API
│   │   ├── order.api.js        # 주문 관련 API
│   │   ├── payment.api.js      # 결제 관련 API
│   │   └── market.api.js       # 마켓 관련 API
│   │
│   ├── assets/                  # 정적 리소스 (이미지, 아이콘)
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/              # 재사용 가능한 컴포넌트
│   │   ├── common/             # 공통 컴포넌트
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   │
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── ClientLayout.jsx
│   │   │
│   │   ├── product/            # 상품 관련 컴포넌트
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   └── ProductSearch.jsx
│   │   │
│   │   ├── cart/               # 장바구니 컴포넌트
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   │
│   │   └── order/              # 주문 관련 컴포넌트
│   │       ├── OrderItem.jsx
│   │       ├── OrderSummary.jsx
│   │       └── OrderStatusBadge.jsx
│   │
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── auth/               # 인증 페이지 (Phase 1)
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   └── client/             # 고객용 페이지
│   │       ├── HomePage.jsx         # Phase 1: 메인 화면
│   │       ├── ProductListPage.jsx  # Phase 1: 상품 목록
│   │       ├── ProductDetailPage.jsx # Phase 1: 상품 상세
│   │       ├── CartPage.jsx         # Phase 2
│   │       ├── CheckoutPage.jsx     # Phase 2
│   │       ├── MyPage.jsx           # Phase 2
│   │       └── OrderHistoryPage.jsx # Phase 2
│   │
│   │   # 관리자 페이지는 Phase 2+ 에서 구현
│   │   # └── admin/
│   │   #     ├── DashboardPage.jsx
│   │   #     ├── ProductManagePage.jsx
│   │   #     ├── OrderManagePage.jsx
│   │   #     ├── MarketSettingPage.jsx
│   │   #     └── SettlementPage.jsx
│   │
│   ├── store/                   # Zustand 상태 관리
│   │   ├── authStore.js        # 인증 상태 (Phase 1)
│   │   ├── cartStore.js        # 장바구니 상태 (Phase 2)
│   │   └── uiStore.js          # UI 상태 (모달, 로딩 등)
│   │
│   ├── hooks/                   # Custom Hooks
│   │   ├── useAuth.js          # Phase 1: 인증 관련
│   │   ├── useProduct.js       # Phase 1: 상품 관련
│   │   ├── useCart.js          # Phase 2: 장바구니
│   │   └── useDebounce.js      # Phase 1: 검색 최적화
│   │
│   ├── routes/                  # 라우팅 설정
│   │   ├── index.jsx           # 메인 라우터 (Phase 1)
│   │   └── PrivateRoute.jsx    # 인증 필요 라우트 (Phase 1)
│   │
│   ├── utils/                   # 유틸리티 함수
│   │   ├── formatters.js       # 포맷팅 (날짜, 가격 등)
│   │   ├── validators.js       # 유효성 검사
│   │   ├── storage.js          # LocalStorage/SessionStorage
│   │   └── constants.js        # 상수 정의
│   │
│   ├── wireframes/              # 기존 와이어프레임 (참고용)
│   │   ├── AdminDashboard.jsx
│   │   └── ClientShop.jsx
│   │
│   ├── App.jsx                  # 메인 앱 컴포넌트
│   ├── index.jsx                # 엔트리 포인트
│   └── setupProxy.js            # 개발 서버 프록시 설정
│
├── .env.development             # 개발 환경변수
├── .env.production              # 프로덕션 환경변수
├── tailwind.config.js          # TailwindCSS 설정
├── postcss.config.js           # PostCSS 설정
├── .eslintrc.json              # ESLint 설정
├── .prettierrc                 # Prettier 설정
└── README.md                   # 프로젝트 문서
```

---

### Core 컴포넌트 구현

#### 1. API Client 설정

##### [NEW] src/api/client.js

```javascript
import axios from 'axios';
import { getToken, removeToken } from '../utils/storage';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - JWT 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - 에러 처리
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### 2. 라우팅 시스템

##### [NEW] src/routes/index.jsx

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';
import AdminRoutes from './AdminRoutes';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 관련 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 고객용 라우트 */}
        <Route path="/*" element={<ClientRoutes />} />
        
        {/* 관리자용 라우트 */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* 기본 리다이렉트 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
```

##### [NEW] src/routes/PrivateRoute.jsx

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default PrivateRoute;
```

#### 3. 상태 관리 (Zustand)

##### [NEW] src/store/authStore.js

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setToken, removeToken, getToken } from '../utils/storage';
import * as authAPI from '../api/auth.api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // 초기화
      initialize: async () => {
        const token = getToken();
        if (token) {
          set({ isLoading: true });
          try {
            const userData = await authAPI.getCurrentUser();
            set({ user: userData, isAuthenticated: true });
          } catch (error) {
            removeToken();
            set({ user: null, isAuthenticated: false });
          } finally {
            set({ isLoading: false });
          }
        }
      },
      
      login: async (credentials) => {
        try {
          const response = await authAPI.login(credentials);
          setToken(response.accessToken);
          set({ user: response.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      
      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          removeToken();
          set({ user: null, isAuthenticated: false });
        }
      },
      
      updateUser: (userData) => {
        set({ user: userData });
      },
    }),
    {
      name: 'auth-storage',
      partialUpdate: true,
    }
  )
);

export default useAuthStore;
```

##### [NEW] src/store/cartStore.js (Phase 2)

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.productSeq === product.seq && item.optionSeq === product.optionSeq
        );
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productSeq === product.seq && item.optionSeq === product.optionSeq
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },
      
      removeItem: (productSeq, optionSeq) => {
        set({
          items: get().items.filter(
            (item) => !(item.productSeq === productSeq && item.optionSeq === optionSeq)
          ),
        });
      },
      
      updateQuantity: (productSeq, optionSeq, quantity) => {
        set({
          items: get().items.map((item) =>
            item.productSeq === productSeq && item.optionSeq === optionSeq
              ? { ...item, quantity }
              : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
```

##### [NEW] src/index.css (TailwindCSS 설정)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 커스텀 스타일 */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
  }
  
  .input-base {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

##### [NEW] tailwind.config.js

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
```

##### [NEW] postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### 4. 유틸리티 함수

##### [NEW] src/utils/storage.js

```javascript
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
```

##### [NEW] src/utils/formatters.js

```javascript
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
```

##### [NEW] src/utils/constants.js

```javascript
// API 엔드포인트
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
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
```

#### 5. Custom Hooks

##### [NEW] src/hooks/useAuth.js

```javascript
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, initialize, login, logout, updateUser } = useAuthStore();
  
  // 앱 시작 시 인증 상태 초기화
  useEffect(() => {
    initialize();
  }, []);
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };
};
```

#### 6. 환경 설정

##### [NEW] .env.development

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
```

##### [NEW] .env.production

```env
REACT_APP_API_BASE_URL=https://api.myshop.com/api/v1
REACT_APP_ENV=production
```

##### [NEW] .eslintrc.json

```json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "off"
  }
}
```

##### [NEW] .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

---

### 기존 파일 이동 및 정리

#### [MODIFY] src/App.js → src/App.jsx

기존 와이어프레임 라우팅을 새로운 라우터 시스템으로 교체

```javascript
import AppRouter from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/common/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
```

#### [MODIFY] src/AdminDashboard.jsx → src/wireframes/AdminDashboard.jsx

기존 파일을 `wireframes` 폴더로 이동 (참고용)

#### [MODIFY] src/ClientShop.jsx → src/wireframes/ClientShop.jsx

기존 파일을 `wireframes` 폴더로 이동 (참고용)

---

## Verification Plan

### 자동화된 테스트

#### 1. 프로젝트 빌드 검증
```bash
# 프로젝트 루트에서 실행
cd /Users/bh/project/MY_SHOP_FRONT
npm install
npm run build
```
**검증 기준**: 에러 없이 빌드 완료

#### 2. 개발 서버 실행 검증
```bash
npm start
```
**검증 기준**: 
- 개발 서버가 `http://localhost:3000`에서 정상 실행
- 콘솔에 에러 없음

#### 3. 라우팅 테스트
브라우저에서 다음 URL 접근 테스트:
- `http://localhost:3000/` → 홈 페이지로 리다이렉트
- `http://localhost:3000/login` → 로그인 페이지 표시
- `http://localhost:3000/admin` → 인증 없이 접근 시 로그인 페이지로 리다이렉트

### 수동 검증

#### 1. 프로젝트 구조 확인
```bash
tree -L 3 src/
```
**검증 사항**:
- `api/`, `components/`, `pages/`, `hooks/`, `store/`, `routes/`, `utils/` 디렉토리 생성 확인
- 각 디렉토리에 계획된 파일들이 존재하는지 확인

#### 2. 의존성 설치 확인
```bash
npm list --depth=0
```
**검증 사항**:
- `react-router-dom`, `zustand` (또는 `@reduxjs/toolkit`), `axios`, `antd` (또는 `@mui/material`) 등 주요 라이브러리 설치 확인

#### 3. 환경 변수 설정 확인
- `.env.development` 파일 존재 및 `REACT_APP_API_BASE_URL` 설정 확인

---

## 구현 단계별 우선순위

### Phase 1: MVP - 핵심 기능 (5-7일)

#### 1단계: 프로젝트 셋업 (1일)
1. ✅ 문서 동기화 workflow 생성
2. TailwindCSS + Headless UI 설정
3. 디렉토리 구조 생성
4. API Client 설정 (Axios)
5. 라우팅 시스템 구축 (React Router)

#### 2단계: 인증 기능 (2일)
1. AuthContext 구현 (Context API)
2. 로그인 페이지 (UI + API 연동)
3. 회원가입 페이지 (UI + API 연동)
4. JWT 토큰 관리
5. PrivateRoute 구현

#### 3단계: 메인 화면 및 네비게이션 (1-2일)
1. 홈페이지 레이아웃
2. 헤더/푸터 컴포넌트
3. 네비게이션 메뉴
4. 반응형 디자인 (모바일/데스크톱)

#### 4단계: 상품 조회 기능 (2-3일)
1. 상품 목록 페이지
   - 카테고리별 필터링
   - 정렬 기능 (최신순, 가격순, 인기순)
   - 페이지네이션
2. 상품 상세 페이지
   - 상품 정보 표시
   - 이미지 갤러리
   - 옵션 선택 UI
3. 상품 검색 기능
   - 검색창 + debounce 적용
   - 검색 결과 표시

### Phase 2 이후: 확장 기능

- 장바구니 기능 (CartContext)
- 주문 생성 및 관리
- 결제 연동 (PG사)
- 마이페이지
- 주문 내역 조회
- 관리자 대시보드
- 상품 관리 (CRUD)
- 리뷰/문의 시스템
- 정산 및 통계
- AI 기능 연동

---

## 주의사항

> [!CAUTION]
> - 기존 와이어프레임 파일은 삭제하지 말고 `wireframes` 폴더에 보관
> - 백엔드 API 엔드포인트와 데이터 구조를 정확히 매칭해야 함
> - JWT 토큰 만료 시 Refresh Token으로 갱신하는 로직 필수
> - CORS 문제 발생 시 백엔드에서 CORS 설정 필요

> [!NOTE]
> - 개발 진행 중 백엔드 API 문서(`/Users/bh/project/MY_SHOP/.agent/*.md`)를 지속적으로 참조
> - 상태 관리 라이브러리는 사용자 선택에 따라 Zustand 또는 Redux Toolkit 중 하나만 사용
> - UI 라이브러리도 마찬가지로 하나만 선택하여 일관성 유지
