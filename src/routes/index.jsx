import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/client/HomePage';
import MainLayout from '../components/layout/MainLayout';
import SellerLayout from '../components/layout/SellerLayout';
import DashboardPage from '../pages/seller/DashboardPage';
import ProductListPage from '../pages/seller/ProductListPage';
import ProductFormPage from '../pages/seller/ProductFormPage';

// 임시 플레이스홀더 컴포넌트
const Placeholder = ({ title }) => (
    <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800">{title} - 준비 중</h1>
        </div>
    </MainLayout>
);

// 판매자 영역 플레이스홀더
const SellerPlaceholder = ({ title }) => (
    <div className="flex items-center justify-center h-64">
        <h1 className="text-xl font-bold text-gray-600">{title} - 준비 중</h1>
    </div>
);

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 인증 관련 라우트 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* 공개 라우트 */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<Placeholder title="상품 목록" />} />
                <Route path="/products/:id" element={<Placeholder title="상품 상세" />} />

                {/* 보호된 라우트 (로그인 필요) */}
                <Route
                    path="/my-page"
                    element={
                        <PrivateRoute>
                            <Placeholder title="마이페이지" />
                        </PrivateRoute>
                    }
                />

                {/* 판매자 전용 라우트 */}
                <Route
                    path="/seller"
                    element={
                        <RoleBasedRoute allowedRoles={['SELLER', 'ADMIN']}>
                            <SellerLayout />
                        </RoleBasedRoute>
                    }
                >
                    <Route index element={<Navigate to="/seller/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="products/new" element={<ProductFormPage />} />
                    <Route path="products/:id" element={<ProductFormPage />} />
                    <Route path="orders" element={<SellerPlaceholder title="주문 관리" />} />
                    <Route path="settings" element={<SellerPlaceholder title="설정" />} />
                </Route>

                {/* 기본 라우트 */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* 404 */}
                <Route path="*" element={<Placeholder title="404 - 페이지를 찾을 수 없습니다" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
