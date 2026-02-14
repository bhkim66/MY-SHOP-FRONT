# Walkthrough: Refactor Member API

I have extracted the member registration functionality from `auth.api.js` to a new dedicated `member.api.js` file and updated the application structure to support separate Member and Auth APIs.

## Changes

### 1. New Member API (`src/api/member.api.js`)
Created a new API file for member-related operations.

```javascript
import apiClient from './client';

export const signup = async (userData) => {
    return await apiClient.post('/members/signup', userData);
};
```

### 2. Auth API (`src/api/auth.api.js`)
Removed the `signup` function from the Auth API as it has been moved to the Member API.

### 3. Signup Page (`src/pages/auth/SignupPage.jsx`)
Updated imports to use the new `member.api.js` for registration.

```javascript
import * as memberAPI from '../../api/member.api';
// ...
await memberAPI.signup({ ... });
```

### 4. Constants (`src/utils/constants.js`)
Reorganized API endpoints to include a `MEMBERS` section.

```javascript
export const API_ENDPOINTS = {
    AUTH: { ... },
    MEMBERS: {
        SIGNUP: '/members/signup',
    },
    // ...
};
```

### 5. Documentation (`README.md`)
Updated the API documentation to separate "Member API" from "Auth API".

```markdown
### 인증 API
POST   /api/auth/login         # 로그인
POST   /api/auth/logout        # 로그아웃
POST   /api/auth/refresh       # 토큰 갱신

### 회원 API
POST   /api/members/signup      # 회원가입
```

## Verification Results

### Manual Verification
- Verified `src/api/member.api.js` exists and contains correct code.
- Verified `src/api/auth.api.js` no longer has `signup`.
- Verified `SignupPage.jsx` imports `memberAPI`.
- Verified `README.md` documentation is correct and readable.
