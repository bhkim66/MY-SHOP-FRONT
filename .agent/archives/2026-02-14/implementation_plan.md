# Refactor Member API

## Goal Description
Extract member-related functionality (specifically `signup`) from `auth.api.js` to a new `member.api.js` file to better organize the API layer.

## Proposed Changes

### [Frontend Code]
#### [NEW] [member.api.js](file:///Users/bh/project/MY_SHOP_FRONT/src/api/member.api.js)
- Create new file to handle member-related API calls.
- Move `signup` function here.

#### [MODIFY] [auth.api.js](file:///Users/bh/project/MY_SHOP_FRONT/src/api/auth.api.js)
- Remove `signup` function.

#### [MODIFY] [SignupPage.jsx](file:///Users/bh/project/MY_SHOP_FRONT/src/pages/auth/SignupPage.jsx)
- Update import to use `member.api.js` for `signup`.

## Verification Plan

### Manual Verification
1.  Verify `signup` function exists in `member.api.js`.
2.  Verify `signup` function is removed from `auth.api.js`.
3.  Verify `SignupPage.jsx` imports `signup` from `member.api.js` and calls it correctly.
