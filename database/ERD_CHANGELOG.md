# ERD 변경 내역 (프론트엔드 기반 보강)

## 📋 변경 요약

| 구분 | 기존 | 보강 후 |
|------|------|---------|
| 테이블 수 | 10개 | 24개 (+14개) |
| 신규 테이블 | - | 14개 |
| 컬럼 추가 | - | 40+ 컬럼 |

---

## 🆕 신규 테이블 (14개)

### 1. CATEGORIES (카테고리)
프론트엔드의 카테고리 네비게이션 지원
```
- 계층형 구조 (PARENT_SEQ로 대/중/소분류)
- 아이콘, 정렬 순서, 활성 상태 관리
```

### 2. PRODUCT_IMAGES (상품 이미지)
상품 다중 이미지 지원 (기존: THUMBNAIL_URL 1개만)
```
- 썸네일/상세/설명 이미지 타입 구분
- 표시 순서 관리
```

### 3. REVIEWS (상품 리뷰)
프론트엔드 별점/리뷰 기능 지원
```
- 평점 (1~5)
- 구매 인증 (ORDER_ITEM_SEQ 연결)
- 포토리뷰 여부, 도움됨 수
```

### 4. REVIEW_IMAGES (리뷰 이미지)
포토리뷰 다중 이미지 지원

### 5. WISHLISTS (찜 목록)
프론트엔드 하트 버튼 찜하기 기능 지원
```
- 유저-상품 복합 유니크 인덱스
```

### 6. CARTS (장바구니)
```
- 유저당 1개의 장바구니
```

### 7. CART_ITEMS (장바구니 아이템)
```
- 상품, 옵션, 수량 관리
- 선택 여부 (체크박스)
```

### 8. SHIPPING_ADDRESSES (배송지 관리)
주문 외 배송지 사전 저장 기능
```
- 기본 배송지 설정
- 여러 배송지 관리
```

### 9. COUPONS (쿠폰)
프론트엔드 쿠폰 적용 기능 지원
```
- 정률/정액 할인
- 최소 주문금액, 최대 할인금액
- 유효기간, 발급 수량 관리
```

### 10. USER_COUPONS (유저 쿠폰)
```
- 발급/사용/만료 상태 관리
- 사용된 주문 연결
```

### 11. BANNERS (배너)
프론트엔드 슬라이더 배너 지원
```
- 메인/서브/팝업/이벤트 타입
- 노출 기간, 클릭 수 통계
```

### 12. NOTIFICATIONS (알림)
```
- 주문/리뷰/쿠폰/시스템/마케팅 알림
- 읽음 상태 관리
```

### 13. AI_CONTENTS (AI 생성 콘텐츠)
관리자 대시보드 AI 상품설명 생성 기능 지원
```
- 상품설명/마켓설명/리뷰답변/챗봇
- 프롬프트, 생성결과, 적용여부
```

### 14. CHATBOT_LOGS (챗봇 대화 로그)
관리자 대시보드 AI 챗봇 기능 지원
```
- 세션별 대화 기록
- 의도 인식 결과
```

### 15. PRODUCT_VIEW_LOGS (상품 조회 로그)
통계 대시보드용
```
- 조회수 상세 기록
- 유입 경로 분석
```

### 16. SEARCH_LOGS (검색 로그)
인기 검색어, 추천 기능용

---

## ✏️ 기존 테이블 컬럼 추가

### USER 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| EMAIL | varchar2 | 이메일 (로그인/알림용) |
| PHONE | varchar2 | 전화번호 |
| PROFILE_IMAGE_URL | varchar2 | 프로필 이미지 |
| STATUS | varchar2 | ACTIVE, INACTIVE, SUSPENDED |
| LAST_LOGIN_AT | timestamp | 마지막 로그인 일시 |

### MARKETS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| LOGO_IMAGE_URL | varchar2 | 마켓 로고 이미지 |
| BANNER_IMAGE_URL | varchar2 | 마켓 배너 이미지 |
| BUSINESS_NUMBER | varchar2 | 사업자 등록번호 |
| BANK_NAME | varchar2 | 정산 은행명 |
| BANK_ACCOUNT | varchar2 | 정산 계좌번호 |
| BANK_HOLDER | varchar2 | 예금주 |
| FEE_RATE | decimal(5,2) | 수수료율 (%) |

### PRODUCTS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| CATEGORY_SEQ | integer | 카테고리 FK |
| BRAND | varchar2 | 브랜드명 |
| ORIGINAL_PRICE | integer | 원가 |
| DISCOUNT_RATE | integer | 할인율 (%) |
| IS_FREE_SHIPPING | char(1) | 무료배송 여부 |
| IS_FAST_DELIVERY | char(1) | 빠른배송 여부 |
| SHIPPING_FEE | integer | 기본 배송비 |
| VIEW_COUNT | integer | 조회수 (비정규화) |
| REVIEW_COUNT | integer | 리뷰 수 (비정규화) |
| RATING_AVG | decimal(2,1) | 평균 평점 (비정규화) |

### ORDERS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| COUPON_DISCOUNT_AMOUNT | integer | 쿠폰 할인금액 |
| DELIVERY_MESSAGE | varchar2 | 배송 메모 |
| TRACKING_NUMBER | varchar2 | 운송장 번호 |
| SHIPPED_AT | timestamp | 배송 시작일 |
| DELIVERED_AT | timestamp | 배송 완료일 |

### ORDER_ITEMS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| ITEM_IMAGE_URL | varchar2 | 주문 시점 상품 이미지 (스냅샷) |
| ITEM_STATUS | varchar2 | 개별 아이템 상태 |

### PAYMENTS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| CARD_NAME | varchar2 | 카드사명 |
| CARD_NUMBER | varchar2 | 마스킹된 카드번호 |
| INSTALLMENT | integer | 할부 개월 |
| RECEIPT_URL | varchar2 | 영수증 URL |

### SETTLEMENTS 테이블
| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| TOTAL_ORDER_COUNT | integer | 총 주문 건수 |
| FEE_RATE | decimal(5,2) | 적용 수수료율 |
| BANK_NAME | varchar2 | 정산 은행명 (스냅샷) |
| BANK_ACCOUNT | varchar2 | 정산 계좌번호 (스냅샷) |
| BANK_HOLDER | varchar2 | 예금주 (스냅샷) |

---

## 🔗 추가된 관계 (Relationships)

```
PRODUCTS.CATEGORY_SEQ → CATEGORIES.SEQ
REVIEWS.PRODUCT_SEQ → PRODUCTS.SEQ
REVIEWS.ORDER_ITEM_SEQ → ORDER_ITEMS.SEQ
REVIEWS.USER_SEQ → USER.SEQ
REVIEW_IMAGES.REVIEW_SEQ → REVIEWS.SEQ
WISHLISTS.USER_SEQ → USER.SEQ
WISHLISTS.PRODUCT_SEQ → PRODUCTS.SEQ
CARTS.USER_SEQ → USER.SEQ
CART_ITEMS.CART_SEQ → CARTS.SEQ
CART_ITEMS.PRODUCT_SEQ → PRODUCTS.SEQ
CART_ITEMS.PRODUCT_OPTION_SEQ → PRODUCT_OPTIONS.SEQ
SHIPPING_ADDRESSES.USER_SEQ → USER.SEQ
COUPONS.MARKET_SEQ → MARKETS.SEQ
USER_COUPONS.USER_SEQ → USER.SEQ
USER_COUPONS.COUPON_SEQ → COUPONS.SEQ
USER_COUPONS.ORDER_SEQ → ORDERS.SEQ
BANNERS.MARKET_SEQ → MARKETS.SEQ
NOTIFICATIONS.USER_SEQ → USER.SEQ
AI_CONTENTS.MARKET_SEQ → MARKETS.SEQ
AI_CONTENTS.PRODUCT_SEQ → PRODUCTS.SEQ
CHATBOT_LOGS.MARKET_SEQ → MARKETS.SEQ
CHATBOT_LOGS.USER_SEQ → USER.SEQ
PRODUCT_VIEW_LOGS.PRODUCT_SEQ → PRODUCTS.SEQ
PRODUCT_VIEW_LOGS.USER_SEQ → USER.SEQ
SEARCH_LOGS.USER_SEQ → USER.SEQ
```

---

## 📐 인덱스 추가

| 테이블 | 인덱스 | 타입 |
|--------|--------|------|
| USER_SOCIAL_ACCOUNTS | (PROVIDER, PROVIDER_USER_ID) | UNIQUE |
| WISHLISTS | (USER_SEQ, PRODUCT_SEQ) | UNIQUE |
| CARTS | USER_SEQ | UNIQUE |
| CART_ITEMS | (CART_SEQ, PRODUCT_SEQ, PRODUCT_OPTION_SEQ) | UNIQUE |

---

## 💡 프론트엔드 기능 매핑

| 프론트엔드 기능 | 관련 테이블 |
|----------------|-------------|
| 카테고리 네비게이션 | CATEGORIES |
| 상품 상세 이미지 슬라이더 | PRODUCT_IMAGES |
| 별점/리뷰 | REVIEWS, REVIEW_IMAGES |
| 찜하기 (하트) | WISHLISTS |
| 장바구니 | CARTS, CART_ITEMS |
| 배송지 선택 | SHIPPING_ADDRESSES |
| 쿠폰 적용 | COUPONS, USER_COUPONS |
| 메인 배너 슬라이더 | BANNERS |
| 무료배송/빠른배송 뱃지 | PRODUCTS (IS_FREE_SHIPPING, IS_FAST_DELIVERY) |
| 할인율 표시 | PRODUCTS (ORIGINAL_PRICE, DISCOUNT_RATE) |
| AI 상품설명 생성 | AI_CONTENTS |
| AI 챗봇 | CHATBOT_LOGS |
| 알림 | NOTIFICATIONS |
| 통계 대시보드 | PRODUCT_VIEW_LOGS, SEARCH_LOGS |
