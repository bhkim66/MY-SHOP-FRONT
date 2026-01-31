# 🏠 My Shop Front

> 오늘의집 스타일의 인테리어 쇼핑몰 플랫폼

당신의 공간을 완성하는 프리미엄 인테리어 쇼핑몰입니다. 고객용 쇼핑몰과 판매자/관리자용 대시보드를 포함한 풀스택 커머스 솔루션을 목표로 합니다.

---

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
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
| 🛍️ 상품 등록 및 관리 | 상품 CRUD, 카테고리 관리, 이미지 업로드 | 🟡 UI 완료 |
| 🧾 주문/결제/정산 관리 | 주문 목록, 상태 관리, 결제 내역, 정산 조회 | 🟡 UI 완료 |
| 📊 매출 및 통계 대시보드 | 매출 차트, KPI 지표, 인기 상품 분석 | 🟡 UI 완료 |
| 🔐 사용자 인증 및 권한 관리 | 로그인/회원가입, 판매자/고객 권한 분리 | 🟡 UI 완료 |
| 💻 AI 기반 마켓 설명 서비스 | 상품 설명 자동 생성, AI 챗봇 고객 응대 | 🟡 UI 완료 |

---

## ✨ 주요 기능

### 🛍️ 고객용 쇼핑몰 (ClientShop)

#### 홈 화면
- 메인 배너 슬라이더 (자동 전환)
- 카테고리 네비게이션
- 베스트 상품, 특가 상품, 신상품 섹션

#### 상품
- 상품 목록 (필터링, 정렬)
- 상품 상세 (이미지 갤러리, 리뷰, 수량 선택)
- 찜하기 기능

#### 구매
- 장바구니 (슬라이드 패널)
- 주문/결제 (배송정보, 결제수단 선택)

#### 사용자
- 로그인/회원가입 (소셜 로그인 UI)
- 마이페이지

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
├── package.json              # 앱 이름: my-shop-front
├── public/
│   └── index.html            # Bootstrap CDN 포함
└── src/
    ├── index.js              # 진입점
    ├── index.css             # 기본 스타일
    ├── App.js                # 메인 앱 (모드 전환)
    ├── ClientShop.jsx        # 고객용 쇼핑몰 (1,900+ lines)
    └── AdminDashboard.jsx    # 관리자 대시보드 (860+ lines)
```

### 향후 구조 (예정)
```
my-shop-front/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/       # 재사용 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── hooks/            # 커스텀 훅
│   │   ├── services/         # API 호출
│   │   ├── store/            # 상태 관리
│   │   └── utils/            # 유틸리티
│   └── ...
│
└── backend/                  # Spring Boot 백엔드
    ├── src/main/java/
    │   └── com/myshop/
    │       ├── domain/       # 엔티티
    │       ├── repository/   # 레포지토리
    │       ├── service/      # 비즈니스 로직
    │       ├── controller/   # REST API
    │       ├── dto/          # 데이터 전송 객체
    │       ├── config/       # 설정
    │       └── security/     # 인증/인가
    └── src/main/resources/
        ├── application.yml
        └── mapper/           # MyBatis XML
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

| 화면 | 설명 |
|------|------|
| 홈 | 배너, 카테고리, 상품 섹션 |
| 상품 목록 | 필터, 정렬, 상품 그리드 |
| 상품 상세 | 이미지, 정보, 리뷰, 구매 |
| 장바구니 | 슬라이드 패널 |
| 결제 | 배송정보, 결제수단, 금액 |
| 로그인 | 이메일, 소셜 로그인 |

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

## 🔌 API 설계

### 인증 API
```
POST   /api/auth/login         # 로그인
POST   /api/auth/register      # 회원가입
POST   /api/auth/logout        # 로그아웃
POST   /api/auth/refresh       # 토큰 갱신
```

### 상품 API
```
GET    /api/products           # 상품 목록 조회
GET    /api/products/{id}      # 상품 상세 조회
POST   /api/products           # 상품 등록 (판매자)
PUT    /api/products/{id}      # 상품 수정 (판매자)
DELETE /api/products/{id}      # 상품 삭제 (판매자)
GET    /api/products/category/{category}  # 카테고리별 조회
```

### 주문 API
```
GET    /api/orders             # 주문 목록 조회
GET    /api/orders/{id}        # 주문 상세 조회
POST   /api/orders             # 주문 생성
PUT    /api/orders/{id}/status # 주문 상태 변경 (판매자)
POST   /api/orders/{id}/cancel # 주문 취소
```

### 장바구니 API
```
GET    /api/cart               # 장바구니 조회
POST   /api/cart               # 장바구니 추가
PUT    /api/cart/{id}          # 수량 변경
DELETE /api/cart/{id}          # 항목 삭제
```

### 정산 API
```
GET    /api/settlements        # 정산 내역 조회 (판매자)
GET    /api/settlements/{id}   # 정산 상세 조회 (판매자)
```

### 통계 API
```
GET    /api/stats/sales        # 매출 통계 (판매자)
GET    /api/stats/products     # 상품 통계 (판매자)
GET    /api/stats/orders       # 주문 통계 (판매자)
```

### AI API
```
POST   /api/ai/description     # AI 상품 설명 생성
POST   /api/ai/chat            # AI 챗봇 응답
```

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

### Phase 1: MVP (현재)
- [x] 프론트엔드 UI 프로토타입
- [x] 고객용 쇼핑몰 화면
- [x] 관리자 대시보드 화면
- [ ] 백엔드 API 개발
- [ ] 데이터베이스 연동
- [ ] 사용자 인증 구현

### Phase 2: 핵심 기능
- [ ] 실제 결제 연동 (PG사)
- [ ] 이미지 업로드 (S3)
- [ ] 검색 기능 고도화
- [ ] 리뷰 시스템
- [ ] 알림 시스템

### Phase 3: AI 기능
- [ ] AI 상품 설명 생성 (OpenAI/Claude API)
- [ ] AI 챗봇 고객 응대
- [ ] 추천 시스템

### Phase 4: 고도화
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 모바일 앱 (React Native)
- [ ] 어드민 기능 확장

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
