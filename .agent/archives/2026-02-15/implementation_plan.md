# Implementation Plan: Seller Dashboard & Product Management

## Goal Description
Implement the core management functionalities for sellers, including a dashboard with statistics and a comprehensive product management system (CRUD).

## Proposed Changes

### [Frontend - API Layer]
- **Create `src/api/seller.api.js`**: Implement functions for fetching dashboard stats, recent orders, and product CRUD (Create, Read, Update, Delete) operations.
- **Update `src/utils/constants.js`**: Define API endpoints and status/category constants matching the backend specification.

### [Frontend - Components]
- **Common UI**: Create reusable components like `ImageUploader`, `Modal`, `Select`, and `Textarea`.
- **Seller Layout**: Implement `SellerLayout` with a sidebar navigation tailored for sellers.
- **Security**: Create `RoleBasedRoute` to restrict access to seller pages based on the user's role (SELLER/ADMIN).

### [Frontend - Pages]
- **Dashboard**: `DashboardPage` to show sales statistics and recent activities.
- **Product Management**: 
    - `ProductListPage`: Table view with filtering and search.
    - `ProductFormPage`: Form for adding and editing products with image upload support.

### [Documentation]
- **Create `LOCAL_DEVELOPMENT.md`**: Simplified guide for running the frontend and backend servers.

## Verification Plan
- Manual testing of role-based access control.
- Verification of API calling logic in the new seller API module.
- Layout and responsive design check for the new seller dashboard.
