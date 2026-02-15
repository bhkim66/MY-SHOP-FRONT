# Walkthrough: Seller Dashboard & Product Management Implementation

이 문서는 2026-02-15에 진행된 판매자 기능 및 관련 인프라 구현에 대한 상세 기술 내용을 설명합니다.

## 1. 판매자 API 계층 (`src/api/seller.api.js`)
기존 `auth.api.js`와 분리하여 판매자 관련 도메인 로직을 전담하는 API 모듈을 구축했습니다.
- `apiClient`를 사용하여 백엔드 REST API와 통신합니다.
- 대시보드 통계(`getDashboardStats`), 최근 주문(`getRecentOrders`), 상품 CRUD(`getProducts`, `createProduct`, `updateProduct`, `deleteProduct`) 등이 포함되었습니다.
- `FormData`를 사용한 대용량 이미지 업로드 로직(`uploadProductImage`)이 구현되었습니다.

## 2. 권한 기반 라우팅 (`src/routes/RoleBasedRoute.jsx`)
보안 강화를 위해 단순 로그인 여부뿐만 아니라 사용자 '역할(Role)'을 검사하는 기능을 추가했습니다.
- `useAuth` 훅을 통해 현재 로그인 유저의 `role`을 가져옵니다.
- `allowedRoles` 배열에 포함되지 않은 유저(예: 일반 고객이 판매자 페이지 접근)가 접근 시 경고 메시지와 함께 홈으로 리다이렉트합니다.

## 3. 판매자 대시보드 (`src/pages/seller/DashboardPage.jsx`)
판매자가 자신의 비즈니스 현황을 한눈에 볼 수 있는 메인 화면입니다.
- `StatsCard` 컴포넌트를 사용하여 오늘 매출, 신규 주문량, 등록 상품 수 등을 시각화했습니다.
- 최근 발생한 주문 목록을 테이블 형태로 요약하여 보여줍니다.

## 4. 상품 관리 시스템
- **목록 페이지 (`ProductListPage`)**: 
  - 상품 상태(판매중/품절 등) 및 카테고리에 따른 필터링 기능.
  - `memberAPI`를 사용한 실시간 검색 기능 연동.
- **등록/수정 폼 (`ProductFormPage`)**:
  - `react-hook-form`과 `yup`을 사용한 강력한 입력 유효성 검사.
  - `ImageUploader`를 통한 다중 이미지 업로드 및 미리보기 지원.

## 5. 공통 UI 컴포넌트
효율적인 개발을 위해 다음 컴포넌트들을 `src/components/common`에 정규화했습니다.
- `ImageUploader`: 드래그 앤 드롭 지원 이미지 업로더.
- `Modal`: 재사용 가능한 팝업창 레이아웃.
- `Select/Textarea`: 스타일이 통일된 폼 입력 컴포넌트.

## 6. 상수 리팩토링 (`src/utils/constants.js`)
하드코딩된 API 주소들을 상수로 관리하여 유지보수성을 높였습니다.
- `API_ENDPOINTS.SELLER` 객체로 판매자 관련 엔드포인트 관리.
- `PRODUCT_STATUS`, `CATEGORY_CODES` 등 백엔드 API 명세와 일치하는 코드 체계 정의.

---
*모든 기능은 `feat/seller-dashboard-implementation` 브랜치에 반영되었습니다.*
