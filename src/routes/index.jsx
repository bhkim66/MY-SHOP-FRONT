import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/client/HomePage';
import MainLayout from '../components/layout/MainLayout';

// 임시 플레이스홀더 컴포넌트
const Placeholder = ({ title }) => (
    <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800">{title} - 준비 중</h1>
        </div>
    </MainLayout>
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

                {/* 기본 라우트 */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* 404 */}
                <Route path="*" element={<Placeholder title="404 - 페이지를 찾을 수 없습니다" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
