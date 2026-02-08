# Walkthrough: MY_SHOP 프론트엔드 Phase 1 구현

## 작업 요약

MY_SHOP 프론트엔드 프로젝트의 기본 인프라를 구축했습니다. 와이어프레임 수준이었던 프로젝트를 본격적인 개발이 가능한 현대적인 React 애플리케이션으로 재구성했습니다.

## 완료된 작업

### 1. 의존성 설치

**주요 라이브러리:**
- **React Router** (`react-router-dom ^6.21.0`): SPA 라우팅
- **Zustand** (`zustand ^4.4.7`): 경량 상태 관리
- **Axios** (`axios ^1.6.5`): HTTP 클라이언트
- **React Query** (`@tanstack/react-query ^5.17.19`): 서버 상태 관리
- **TailwindCSS** (`tailwindcss ^3.4.1`): 유틸리티 CSS 프레임워크
- **Headless UI** (`@headlessui/react ^1.7.17`): 접근성 보장 UI 컴포넌트
- **기타**: react-hook-form, yup, dayjs, lodash, jwt-decode, prop-types

### 2. 프로젝트 설정 파일

#### [`tailwind.config.js`](file:///Users/bh/project/MY_SHOP_FRONT/tailwind.config.js)
- TailwindCSS 설정 및 커스텀 컬러 팔레트 정의
- Primary 컬러 스케일 (50-900) 설정

#### [`postcss.config.js`](file:///Users/bh/project/MY_SHOP_FRONT/postcss.config.js)
- PostCSS 플러그인 설정 (tailwindcss, autoprefixer)

#### 환경 변수 파일
- [`.env.development`](file:///Users/bh/project/MY_SHOP_FRONT/.env.development): 로컬 API 엔드포인트 (`http://localhost:8080/api/v1`)
- [`.env.production`](file:///Users/bh/project/MY_SHOP_FRONT/.env.production): 프로덕션 API 엔드포인트

### 3. 디렉토리 구조

```
src/
├── api/                   # API 레이어
│   ├── client.js         # Axios 인스턴스 (인터셉터 포함)
│   ├── auth.api.js       # 인증 API
│   └── product.api.js    # 상품 API
│
├── store/                # Zustand 상태 관리
│   └── authStore.js      # 인증 상태 (로그인, 로그아웃, 사용자 정보)
│
├── hooks/                # Custom Hooks
│   ├── useAuth.js        # 인증 훅 (authStore 래핑)
│   └── useDebounce.js    # 검색 최적화용 디바운스 훅
│
├── routes/               # 라우팅
│   ├── index.jsx         # 메인 라우터 (플레이스홀더 페이지 포함)
│   └── PrivateRoute.jsx  # 인증 보호 라우트
│
├── utils/                # 유틸리티 함수
│   ├── storage.js        # LocalStorage 관리
│   ├── formatters.js     # 가격/날짜 포맷팅
│   └── constants.js      # API 엔드포인트, 상태 상수
│
├── components/           # 재사용 컴포넌트 (Phase 1-3, 1-4에서 추가)
├── pages/                # 페이지 컴포넌트 (Phase 1-2, 1-3, 1-4에서 추가)
└── wireframes/           # 기존 와이어프레임 (참고용)
    ├── AdminDashboard.jsx
    └── ClientShop.jsx
```

### 4. 핵심 인프라 구현

#### API Client ([`src/api/client.js`](file:///Users/bh/project/MY_SHOP_FRONT/src/api/client.js:1-45))
```javascript
// 자동 JWT 토큰 주입
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 에러 시 자동 로그아웃
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
```

#### Zustand Store ([`src/store/authStore.js`](file:///Users/bh/project/MY_SHOP_FRONT/src/store/authStore.js:1-72))
- 로그인, 로그아웃, 사용자 정보 관리
- LocalStorage에 자동 persist
- 앱 시작 시 토큰 기반 자동 로그인 (`initialize` 함수)

#### 라우팅 시스템 ([`src/routes/index.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/routes/index.jsx:1-53))
- React Router v6 기반
- 플레이스홀더 페이지로 구조만 설정
- 공개 라우트: `/home`, `/products`, `/products/:id`
- 보호 라우트: `/my-page` (PrivateRoute 사용)
- `/login`, `/register` 라우트

#### App.js 업데이트 ([`src/App.js`](file:///Users/bh/project/MY_SHOP_FRONT/src/App.js:1-23))
- React Query Provider 설정
- 기존 와이어프레임 코드 제거

### 5. TailwindCSS 스타일 ([`src/index.css`](file:///Users/bh/project/MY_SHOP_FRONT/src/index.css:1-23))
커스텀 컴포넌트 클래스 정의:
- `.btn-primary`: 파란색 주요 버튼
- `.btn-secondary`: 회색 보조 버튼
- `.input-base`: 기본 입력 필드
- `.card`: 카드 컴포넌트

---

## 검증 결과

### 개발 서버 실행
```bash
npm start
```

✅ **결과**: 개발 서버가 성공적으로 실행되었습니다.

### 라우팅 테스트
- ✅ `/` → `/home`으로 리다이렉트
- ✅ `/login`, `/register`, `/products` 플레이스홀더 페이지 표시
- ✅ `/my-page` → 로그인되지 않은 상태에서 `/login`으로 리다이렉트

### 빌드 테스트
```bash
npm run build
```
(아직 실행하지 않음 - Phase 1 완료 후 진행 예정)

---

## Phase 1-2: 인증 기능 구현 완료

### 완료된 작업

#### 1. 공통 컴포넌트 생성

**Button 컴포넌트** ([`src/components/common/Button.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/common/Button.jsx))
- variant: `primary`, `secondary`, `danger`, `outline`
- size: `sm`, `md`, `lg`
- loading 상태 지원 (스피너 애니메이션)
- fullWidth 옵션
- TailwindCSS + clsx로 동적 스타일링

**Input 컴포넌트** ([`src/components/common/Input.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/common/Input.jsx))
- label, error 메시지 표시
- required 필드 표시 (빨간 별표)
- 에러 상태에 따른 스타일 변경
- react-hook-form과 완벽하게 통합

**Loading 컴포넌트** ([`src/components/common/Loading.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/common/Loading.jsx))
- 회전 애니메이션 스피너
- 커스터마이징 가능한 로딩 텍스트

#### 2. 로그인 페이지 구현

**위치:** [`src/pages/auth/LoginPage.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/pages/auth/LoginPage.jsx)

**주요 기능:**
- 이메일/비밀번호 입력 폼
- react-hook-form + yup을 이용한 클라이언트 측 유효성 검사
  - 이메일 형식 검증
  - 비밀번호 최소 길이 (6자) 검증
- Zustand authStore와 통합 (login 함수 호출)
- 로딩 상태 표시
- API 에러 메시지 표시
- 회원가입 페이지로 링크

![로그인 페이지](/Users/bh/.gemini/antigravity/brain/dece5ca8-44dd-41c5-9bc5-ab5e5fa0a1cd/login_page_1770545414471.png)

#### 3. 회원가입 페이지 구현

**위치:** [`src/pages/auth/RegisterPage.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/pages/auth/RegisterPage.jsx)

**주요 기능:**
- 이메일, 비밀번호, 비밀번호 확인, 이름, 전화번호 입력
- 역할 선택 (BUYER/SELLER) - 라디오 버튼으로 구현
- 강력한 유효성 검사:
  - 이메일 형식 검증
  - 비밀번호 강도 검증 (8자 이상, 영문 대소문자 + 숫자 포함)
  - 비밀번호 일치 확인
  - 전화번호 형식 검증 (01012345678)
- 회원가입 성공 시 로그인 페이지로 리다이렉트
- 로그인 페이지로 링크

![회원가입 페이지](/Users/bh/.gemini/antigravity/brain/dece5ca8-44dd-41c5-9bc5-ab5e5fa0a1cd/register_page_1770545426341.png)

#### 4. 라우터 업데이트

[`src/routes/index.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/routes/index.jsx)에 로그인/회원가입 페이지 연결:
```javascript
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
```

### 검증 결과

#### 브라우저 테스트

✅ **로그인 페이지** (`http://localhost:3000/login`)
- UI가 정상적으로 렌더링됨
- 빈 필드로 제출 시 HTML5 유효성 검사 작동
- 잘못된 이메일 형식 입력 시 에러 메시지 표시
- TailwindCSS 스타일이 올바르게 적용됨

✅ **회원가입 페이지** (`http://localhost:3000/register`)
- 모든 입력 필드가 정상적으로 렌더링됨
- 역할 선택 (BUYER/SELLER) 라디오 버튼 작동
- 폼 유효성 검사 정상 작동
- 회원가입 버튼 클릭 시 유효성 검사 트리거

#### 유효성 검사 테스트

✅ **로그인 폼**
- 이메일 필드 비어있을 때: "이메일을 입력해주세요" 에러
- 잘못된 이메일 형식: "올바른 이메일 형식이 아닙니다" 에러
- 비밀번호 6자 미만: "비밀번호는 최소 6자 이상이어야 합니다" 에러

✅ **회원가입 폼**
- 비밀번호 강도 검증: 영문 대소문자 + 숫자 필수
- 비밀번호 일치 확인
- 전화번호 형식 검증: `01012345678` 형태만 허용
- 모든 필수 필드 검증

### 기술 스택 활용

#### react-hook-form
```javascript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(loginSchema),
});
```
- 폼 상태 관리 자동화
- 불필요한 리렌더링 최소화
- yup과의 완벽한 통합

#### yup 유효성 검사
```javascript
const registerSchema = yup.object({
  email: yup.string().required('이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: yup.string().required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'),
  // ...
});
```
- 선언적 스키마 정의
- 명확한 에러 메시지
- 복잡한 유효성 규칙 지원 (정규식 등)

---

## Phase 1-3: 메인 화면 및 네비게이션 구현 완료

### 완료된 작업

#### 1. 레이아웃 컴포넌트

##### Header 컴포넌트 ([`src/components/layout/Header.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/layout/Header.jsx))

**주요 기능:**
- **로고**: MY SHOP 브랜드 로고 (홈페이지 링크)
- **검색바**: 데스크톱과 모바일에서 모두 사용 가능
- **네비게이션 메뉴**:
  - 비로그인 상태: 로그인, 회원가입
  - 로그인 상태: 장바구니, 마이페이지, 로그아웃
- **모바일 메뉴**: 햄버거 아이콘으로 토글, 오버레이 형태
- **반응형**: md 브레이크포인트 기준
- **Sticky**: 상단 고정 (z-50)

**사용 기술:**
- `@heroicons/react` 아이콘
- Zustand authStore 통합
- react-router-dom Navigation

##### Footer 컴포넌트 ([`src/components/layout/Footer.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/layout/Footer.jsx))

**구성:**
- 회사 정보 (대표자, 사업자등록번호, 통신판매업신고)
- 고객 지원 링크 (FAQ, 공지사항, 고객센터)
- 정책 링크 (이용약관, 개인정보처리방침, 환불정책)
- 저작권 표시
- 4단 그리드 레이아웃 (반응형)

##### MainLayout 컴포넌트 ([`src/components/layout/MainLayout.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/components/layout/MainLayout.jsx))

**기능:**
- Header + Content + Footer 구조
- Flexbox로 min-h-screen 보장
- Footer가 항상 하단에 위치
- children을 main 영역에 렌더링

#### 2. 홈페이지 구현

**위치:** [`src/pages/client/HomePage.jsx`](file:///Users/bh/project/MY_SHOP_FRONT/src/pages/client/HomePage.jsx)

**섹션 구성:**

1. **히어로 배너**
   - 그라디언트 배경 (blue-600 → blue-800)
   - 메인 타이틀 및 설명
   - CTA 버튼 ("쇼핑 시작하기")

2. **카테고리**
   - 6개 카테고리 (전자기기, 패션, 식품, 뷰티, 도서, 스포츠)
   - 이모지 아이콘으로 시각화
   - Hover 효과 (shadow 증가)
   - 2/3/6 컨럼 그리드 (반응형)

3. **추천 상품**
   - 4개 상품 카드
   - Placeholder 이미지 (임시)
   - 상품명, 가격 표시
   - "전체보기" 링크
   - 1/2/4 컨럼 그리드 (반응형)

4. **CTA 섹션**
   - "판매자가 되어보세요" 프로모션
   - 회원가입 페이지로 링크
   - 파란색 배경 (blue-50)

### 검증 결과

#### 브라우저 테스트

✅ **데스크톱 뷰** (`http://localhost:3000/home`)
- 히어로 배너 정상 렌더링
- 검색바가 헤더에 표시됨
- 네비게이션 메뉴 정렬 (상품, 로그인, 회원가입)
- 카테고리 6컨럼 그리드
- 추천 상품 4컨럼 그리드
- Footer 하단 고정

✅ **모바일 뷰** (400px 폭)
- 햄버거 메뉴 버튼 표시
- 기존 네비게이션 메뉴 숨김
- 모바일 검색바 별도 표시
- 햄버거 클릭 시 오버레이 메뉴 열림
- 카테고리 2컨럼 그리드
- 상품 1컨럼 그리드

✅ **기능 테스트**
- 검색: "test" 입력 후 Enter → `/products?search=test`로 리다이렉트
- 카테고리 클릭: "전자기기" 클릭 → `/products?category=1`로 리다이렉트
- 로고 클릭: 홈페이지로 돌아가기 정상 작동
- 모바일 메뉴: 열기/닫기 정상 작동

#### 반응형 확인

✅ **브레이크포인트**
- Mobile: < 768px (md)
- Tablet: 768px ~ 1024px
- Desktop: > 1024px

✅ **레이아웃 변화**
- 헤더 네비게이션 토글
- 검색바 위치 조정
- 그리드 컨럼 자동 조정
- 폰트 크기 및 여백 최적화

### 기술 스택 활용

#### Heroicons
```javascript
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
```
- 고품질 SVG 아이콘
- Outline 스타일 사용
- TailwindCSS와 완벽한 통합

#### 모바일 메뉴 구현
```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

{mobileMenuOpen && (
  <div className="md:hidden border-t border-gray-200 bg-white">
    {/* 메뉴 아이템 */}
  </div>
)}
```
- useState로 메뉴 상태 관리
- 조건부 렌더링
- md 브레이크포인트에서 숨김

#### TailwindCSS 반응형 유틸리티
```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 컨텐츠 */}
</div>
```
- mobile-first 접근
- sm, md, lg 브레이크포인트
- 자동 그리드 레이아웃

---

## Phase 1 완료 요약

### 전체 구현 내용

**Phase 1-1: 프로젝트 셋업**
- TailwindCSS, Zustand, React Router 설정
- API Client, 유틸리티 함수
- 라우팅 시스템 구축

**Phase 1-2: 인증 기능**
- 공통 컴포넌트 (Button, Input, Loading)
- 로그인/회원가입 페이지
- react-hook-form + yup 유효성 검사

**Phase 1-3: 메인 화면 및 네비게이션**
- Header/Footer/MainLayout
- 홈페이지 (배너, 카테고리, 추천 상품)
- 반응형 네비게이션

### 주요 성과

✅ 현대적인 프론트엔드 인프라 구축  
✅ 완전한 인증 시스템  
✅ 반응형 UI/UX  
✅ 모든 기능 브라우저 테스트 완료  

---

## 다음 단계: Phase 1-4 (상품 조회 기능)

### 작업 계획
1. **레이아웃 컴포넌트**
   - Header (로고, 검색바, 사용자 메뉴)
   - Footer
   - 반응형 Navigation
   
2. **홈페이지** (`src/pages/client/HomePage.jsx`)
   - 배너 섹션
   - 추천 상품 목록
   - 카테고리 바로가기

3. **네비게이션**
   - 모바일/데스크톱 반응형 메뉴
   - 로그인 상태에 따른 메뉴 표시
   - 장바구니 아이콘 (Phase 2)

---

## 기술적 고려사항

### Zustand vs Context API
- 초기 계획에서는 Context API를 고려했으나 사용자 요청에 따라 **Zustand로 확정**
- Zustand의 장점:
  - 작은 번들 사이즈 (1KB)
  - 간단한 API
  - Redux DevTools 지원
  - Context API보다 우수한 성능

### TailwindCSS Lint 경고
- `@tailwind`, `@apply` 관련 CSS lint 경고는 정상입니다
- CSS Linter가 TailwindCSS 구문을 인식하지 못해 발생

### 백엔드 API 연동 참고
백엔드 프로젝트 문서는 다음 경로에 동기화되어 있습니다:
- **프로젝트 지침**: `/Users/bh/project/MY_SHOP/.agent/PROJECT.md`
- **요구사항**: `/Users/bh/project/MY_SHOP/.agent/REQUIREMENTS.md`
- **Entity 구조**: `/Users/bh/project/MY_SHOP/.agent/ENTITY_STRUCTURE.md`
- **DB 스키마**: `/Users/bh/project/MY_SHOP/.agent/TABLE_SCHEMA.dbml`

문서 동기화는 `/sync-backend-docs` workflow를 사용하여 수행할 수 있습니다.
