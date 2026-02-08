import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
    const { user, isAuthenticated, isLoading, initialize, login, logout, updateUser } =
        useAuthStore();

    // 앱 시작 시 인증 상태 초기화 (한 번만 실행)
    useEffect(() => {
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
    };
};
