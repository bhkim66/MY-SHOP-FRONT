import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setToken, removeToken, getToken } from '../utils/storage';
import * as authAPI from '../api/auth.api';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: false,

            // 초기화 - 앱 시작 시 토큰이 있으면 사용자 정보 로드
            initialize: async () => {
                // 이미 초기화되었으면 스킵
                if (get().isInitialized) return;

                const token = getToken();
                if (token) {
                    set({ isLoading: true });
                    try {
                        const userData = await authAPI.getCurrentUser();
                        set({ user: userData, isAuthenticated: true });
                    } catch (error) {
                        console.error('Failed to load user:', error);
                        removeToken();
                        set({ user: null, isAuthenticated: false });
                    } finally {
                        set({ isLoading: false });
                    }
                }
                set({ isInitialized: true });
            },

            // 로그인
            login: async (credentials) => {
                try {
                    const response = await authAPI.login(credentials);
                    setToken(response.accessToken);

                    // 로그인 후 사용자 정보 조회
                    const userData = await authAPI.getCurrentUser();
                    set({ user: userData, isAuthenticated: true });

                    return { success: true };
                } catch (error) {
                    console.error('로그인 실패:', error);
                    return {
                        success: false,
                        error: error.response?.data?.message || '로그인에 실패했습니다.',
                    };
                }
            },

            // 로그아웃
            logout: async () => {
                try {
                    await authAPI.logout();
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
                    removeToken();
                    set({ user: null, isAuthenticated: false });
                }
            },

            // 사용자 정보 업데이트
            updateUser: (userData) => {
                set({ user: userData });
            },
        }),
        {
            name: 'auth-storage',
            partialUpdate: true,
        }
    )
);

export default useAuthStore;
