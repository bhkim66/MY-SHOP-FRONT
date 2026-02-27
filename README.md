# 🏠 My Shop Front

> 오늘의집 스타일의 인테리어 쇼핑몰 플랫폼

당신의 공간을 완성하는 프리미엄 인테리어 쇼핑몰입니다. 고객용 쇼핑몰과 판매자/관리자용 대시보드를 포함한 풀스택 커머스 솔루션을 목표로 합니다.

---

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [개발 환경 설정](./LOCAL_DEVELOPMENT.md)
- [설치 및 실행](#설치-및-실행)
- [화면 구성](#화면-구성)
- [API 설계](#api-설계)
- [데이터베이스 설계](#데이터베이스-설계)
- [개발 로드맵](#개발-로드맵)

---

## 🎯 프로젝트 소개

### 배경
오늘의집(ohou.se)을 레퍼런스로 삼아, 인테리어/가구 커머스 플랫폼을 개발합니다. 판매자가 상품을 등록하고 관리할 수 있는 관리자 시스템과, 고객이 상품을 탐색하고 구매할 수 있는 쇼핑몰 프론트엔드를 구현합니다.

### MVP 목표
1차 MVP에서는 다음 핵심 기능을 구현합니다:

| 기능 | 설명 | 상태 |
|------|------|------|
| 🛍️ 상품 등록 및 관리 | 상품 CRUD, 카테고리 관리, 이미지 업로드 | ✅ 완료 |
| 🧾 주문/결제 관리 (MVP) | 주문 생성, 주문 목록, 결제, 주문 취소 | ✅ 완료 |
| 📊 매출 및 통계 대시보드 | 매출 차트, KPI 지표, 인기 상품 분석 | 🟡 UI 완료 |
| 🔐 사용자 인증 및 권한 관리 | 로그인/회원가입, 판매자/고객 권한 분리 | ✅ 완료 |
| 💻 AI 기반 마켓 설명 서비스 | 상품 설명 자동 생성, AI 챗봇 고객 응대 | 🟡 UI 완료 |

---

## ✨ 주요 기능

### 🛍️ 고객용 쇼핑몰 (ClientShop)

#### 1. 상품 탐색
- **상품 목록** (`ProductListPage`): 전체 상품 조회, 페이지네이션
- **상품 상세** (`ProductDetailPage`): 상품 정보, 이미지 갤러리, 수량 선택, 구매하기

#### 2. 주문 및 결제 (Phase 1 MVP)
- **주문서 작성** (`OrderFormPage`): 주문 상품 확인, 배송지 입력
- **결제** (`PaymentPage`): 결제 수단 선택 (카드/계좌이체/가상계좌), 결제 진행
- **주문 완료** (`OrderCompletePage`): 주문 완료 안내, 주문 번호 표시
- **내 주문 목록** (`MyOrdersPage`): 주문 내역 조회, 페이지네이션
- **주문 상세** (`OrderDetailPage`): 주문 상세 정보, 배송 정보, 주문 취소

#### 3. 재사용 컴포넌트
- **ProductCard**: 상품 카드 컴포넌트 (썸네일, 상품명, 가격)
- **ProductGrid**: 상품 그리드 레이아웃
- **AddressForm**: 배송지 입력 폼 (우편번호 검색 포함)
- **OrderItemList**: 주문 상품 목록 표시
- **OrderStatusBadge**: 주문 상태 뱃지 (색상별 구분)

---

### 📊 관리자 대시보드 (AdminDashboard)

#### 대시보드
- 오늘 매출, 신규 주문, 총 주문, 등록 상품 요약
- 주간 매출 차트
- 카테고리별 매출 비율
- 최근 주문 목록
- 인기 상품 TOP 3

#### 상품 관리
- 상품 목록 (검색, 카테고리 필터)
- 상품 등록/수정 모달
- AI 상품 설명 생성

#### 주문 관리
- 주문 목록 (상태별 탭 필터)
- 주문 상세 모달
- 주문 상태 변경

#### 정산 관리
- 예상 정산금, 총 매출, 수수료 요약
- 정산 내역 테이블

#### 설정
- 스토어 정보 관리
- 알림 설정

#### AI 기능
- AI 챗봇 (플로팅 위젯)
- 상품 설명 자동 생성

---

## 🛠️ 기술 스택

### Frontend (현재)
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.2.0 | UI 라이브러리 |
| Bootstrap | 5.3.2 | CSS 프레임워크 |
| Noto Sans KR | - | 한글 폰트 |

### Backend (예정)
| 기술 | 버전 | 용도 |
|------|------|------|
| Java | 17+ | 언어 |
| Spring Boot | 3.x | 프레임워크 |
| Spring Security | - | 인증/인가 |
| JPA/Hibernate | - | ORM |
| MyBatis | - | SQL 매퍼 |
| MySQL/PostgreSQL | - | 데이터베이스 |
| Redis | - | 캐시/세션 |

### Infrastructure (예정)
| 기술 | 용도 |
|------|------|
| Docker | 컨테이너화 |
| AWS/GCP | 클라우드 호스팅 |
| Nginx | 웹 서버/리버스 프록시 |

---

## 📁 프로젝트 구조

```
MY_SHOP_FRONT/
├── README.md
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── index.css
    ├── App.js
    ├── api/                          # API 통신 모듈
    │   ├── client.js                 # Axios 클라이언트 설정
    │   ├── auth.api.js               # 인증 API
    │   ├── member.api.js             # 회원 API
    │   ├── buyer.api.js              # 구매자 API (주문/결제)
    │   ├── product.api.js            # 상품 API
    │   └── seller.api.js             # 판매자 API
    ├── components/                   # 재사용 컴포넌트
    │   ├── common/                   # 공통 컴포넌트
    │   ├── layout/                   # 레이아웃 컴포넌트
    │   ├── product/                  # 상품 컴포넌트
    │   │   ├── ProductCard.jsx       # 상품 카드
    │   │   └── ProductGrid.jsx       # 상품 그리드
    │   ├── order/                    # 주문 컴포넌트
    │   │   ├── AddressForm.jsx       # 배송지 입력 폼
    │   │   ├── OrderItemList.jsx     # 주문 상품 목록
    │   │   └── OrderStatusBadge.jsx  # 주문 상태 뱃지
    │   └── seller/                   # 판매자 컴포넌트
    ├── pages/                        # 페이지 컴포넌트
    │   ├── client/                   # 고객용 페이지
    │   │   ├── HomePage.jsx          # 홈 페이지
    │   │   ├── ProductListPage.jsx   # 상품 목록
    │   │   ├── ProductDetailPage.jsx # 상품 상세
    │   │   ├── OrderFormPage.jsx     # 주문서 작성
    │   │   ├── PaymentPage.jsx       # 결제
    │   │   ├── OrderCompletePage.jsx # 주문 완료
    │   │   ├── MyOrdersPage.jsx      # 내 주문 목록
    │   │   └── OrderDetailPage.jsx   # 주문 상세
    │   ├── seller/                   # 판매자용 페이지
    │   │   ├── DashboardPage.jsx     # 대시보드
    │   │   └── ProductListPage.jsx   # 상품 관리
    │   └── auth/                     # 인증 페이지
    ├── hooks/                        # 커스텀 훅
    ├── utils/                        # 유틸리티
    └── styles/                       # 스타일
```

---

## 🚀 설치 및 실행

### 요구 사항
- Node.js 18+
- npm 9+

### 설치
```bash
# 저장소 클론
git clone https://github.com/your-username/my-shop-front.git
cd my-shop-front

# 의존성 설치
npm install
```

### 실행
```bash
# 개발 서버 실행
npm start

# 브라우저에서 http://localhost:3000 접속
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

---

## 🖥️ 화면 구성

### 모드 전환
화면 좌측 하단의 버튼으로 고객/관리자 화면을 전환할 수 있습니다.

### 고객용 쇼핑몰

| 화면 | 파일 경로 | 설명 | 상태 |
|------|-----------|------|------|
| 홈 | `/pages/client/HomePage.jsx` | 배너, 카테고리, 상품 섹션 | ✅ |
| 상품 목록 | `/pages/client/ProductListPage.jsx` | 상품 그리드, 페이지네이션 | ✅ |
| 상품 상세 | `/pages/client/ProductDetailPage.jsx` | 이미지 갤러리, 상품 정보, 구매 | ✅ |
| 주문서 작성 | `/pages/client/OrderFormPage.jsx` | 배송지 입력, 주문 상품 확인 | ✅ |
| 결제 | `/pages/client/PaymentPage.jsx` | 결제 수단 선택, 결제 진행 | ✅ |
| 주문 완료 | `/pages/client/OrderCompletePage.jsx` | 주문 완료 안내, 주문 정보 | ✅ |
| 내 주문 목록 | `/pages/client/MyOrdersPage.jsx` | 주문 목록, 상태별 필터 | ✅ |
| 주문 상세 | `/pages/client/OrderDetailPage.jsx` | 주문 상세 정보, 취소 | ✅ |

### 관리자 대시보드

| 화면 | 설명 |
|------|------|
| 대시보드 | 통계, 차트, 최근 활동 |
| 상품 관리 | CRUD, AI 설명 생성 |
| 주문 관리 | 주문 목록, 상태 변경 |
| 정산 관리 | 정산 내역, 수수료 |
| 리뷰 관리 | (준비 중) |
| 설정 | 스토어 정보, 알림 |

---

## 🔌 API 연동

### API 모듈 구조
모든 API 호출은 `/src/api` 디렉토리의 모듈을 통해 관리됩니다.

| 파일 | 설명 | 주요 함수 |
|------|------|-----------|
| `client.js` | Axios 인스턴스 설정, 인터셉터 | - |
| `auth.api.js` | 인증 API | `login`, `reissue`, `getMe` |
| `member.api.js` | 회원 API | `signup` |
| `buyer.api.js` | 구매자 API | `getProducts`, `getProductDetail`, `createOrder`, `getMyOrders`, `getOrderDetail`, `cancelOrder`, `requestPayment`, `confirmPayment` |
| `product.api.js` | 상품 API (공통) | - |
| `seller.api.js` | 판매자 API | `getProducts`, `createProduct`, `updateProduct`, `deleteProduct`, `uploadImage`, `getDashboardStats`, `getRecentOrders` |

### 구매자 API (buyer.api.js)

#### 상품 조회
```javascript
// 상품 목록 조회 (공개)
getProducts(page, size)

// 상품 상세 조회 (공개)
getProductDetail(productSeq)
```

#### 주문 관리
```javascript
// 주문 생성
createOrder(orderData)

// 내 주문 목록 조회
getMyOrders(page, size)

// 주문 상세 조회
getOrderDetail(orderSeq)

// 주문 취소
cancelOrder(orderSeq, reason)
```

#### 결제
```javascript
// 결제 요청
requestPayment(paymentData)

// 결제 확인
confirmPayment(paymentSeq)
```

### 백엔드 API 엔드포인트

#### 인증 API
```
POST   /v1/auth/login          # 로그인
POST   /v1/auth/reissue        # 토큰 재발급
GET    /v1/auth/me             # 내 정보 조회
```

#### 회원 API
```
POST   /v1/members/signup      # 회원가입
```

#### 구매자 상품 API (공개)
```
GET    /v1/products            # 상품 목록 조회
GET    /v1/products/{seq}      # 상품 상세 조회
```

#### 주문 API (인증 필요)
```
POST   /v1/orders              # 주문 생성
GET    /v1/orders              # 내 주문 목록
GET    /v1/orders/{orderSeq}   # 주문 상세
POST   /v1/orders/{orderSeq}/cancel  # 주문 취소
```

#### 결제 API (인증 필요, Mock)
```
POST   /v1/payments            # 결제 요청
POST   /v1/payments/{paymentSeq}/confirm  # 결제 확인
```

#### 판매자 상품 API (SELLER 권한)
```
GET    /v1/seller/products     # 내 상품 목록
GET    /v1/seller/products/{seq}  # 내 상품 상세
POST   /v1/seller/products     # 상품 등록
PUT    /v1/seller/products/{seq}  # 상품 수정
DELETE /v1/seller/products/{seq}  # 상품 삭제
POST   /v1/seller/products/{seq}/images  # 상품 이미지 업로드
```

#### 판매자 대시보드 API (SELLER 권한)
```
GET    /v1/seller/dashboard/stats  # 대시보드 통계
GET    /v1/seller/orders/recent    # 최근 주문 조회
```

#### 카테고리 API (공개)
```
GET    /v1/categories          # 전체 카테고리 목록
```

자세한 API 명세는 [백엔드 API 문서](/Users/bh/home/10.project/MY_SHOP/.agent/API_SPECIFICATION.md)를 참조하세요.

---

## 🗄️ 데이터베이스 설계

### 주요 엔티티

#### User (사용자)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('CUSTOMER', 'SELLER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Product (상품)
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    seller_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    original_price INT,
    stock INT DEFAULT 0,
    category VARCHAR(50),
    image_url VARCHAR(500),
    status ENUM('ACTIVE', 'INACTIVE', 'SOLD_OUT') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
```

#### Order (주문)
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id BIGINT NOT NULL,
    total_amount INT NOT NULL,
    status ENUM('PENDING', 'PAID', 'SHIPPING', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    shipping_address TEXT,
    shipping_name VARCHAR(100),
    shipping_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);
```

#### OrderItem (주문 상품)
```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### Settlement (정산)
```sql
CREATE TABLE settlements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    seller_id BIGINT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_sales INT NOT NULL,
    fee INT NOT NULL,
    settlement_amount INT NOT NULL,
    status ENUM('PENDING', 'COMPLETED') DEFAULT 'PENDING',
    settled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
```

---

## 📅 개발 로드맵

### Phase 1: MVP - 주문/결제 (완료)
- [x] 프론트엔드 UI 프로토타입
- [x] 고객용 쇼핑몰 화면
- [x] 관리자 대시보드 화면
- [x] 백엔드 API 개발
  - [x] 구매자 상품 API (공개)
  - [x] 주문 API (인증 필요)
  - [x] 결제 API (Mock)
- [x] 프론트엔드 페이지 구현
  - [x] 상품 목록/상세 페이지
  - [x] 주문서 작성 페이지
  - [x] 결제 페이지
  - [x] 주문 완료/목록/상세 페이지
- [x] 재사용 컴포넌트 구현
  - [x] ProductCard, ProductGrid
  - [x] AddressForm, OrderItemList, OrderStatusBadge
- [x] API 연동 모듈 (buyer.api.js)
- [x] 사용자 인증 구현 (JWT)

### Phase 2: 핵심 기능 (예정)
- [ ] 실제 결제 연동 (PG사 - 토스페이먼츠/카카오페이)
- [ ] 이미지 업로드 (S3/CloudFlare)
- [ ] 장바구니 기능
- [ ] 검색 기능 고도화 (ElasticSearch)
- [ ] 리뷰 시스템
- [ ] 알림 시스템 (WebSocket/SSE)
- [ ] 찜하기 기능

### Phase 3: AI 기능 (예정)
- [ ] AI 상품 설명 생성 (OpenAI/Claude API)
- [ ] AI 챗봇 고객 응대
- [ ] 개인화 추천 시스템

### Phase 4: 고도화 (예정)
- [ ] 성능 최적화 (캐싱, CDN)
- [ ] SEO 최적화 (SSR/SSG)
- [ ] 모바일 반응형 개선
- [ ] 모바일 앱 (React Native)
- [ ] 어드민 기능 확장
- [ ] 통계 및 분석 대시보드

---

## 🤝 기여 방법

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

<p align="center">
  Made with ❤️ by My Shop Team
</p>
