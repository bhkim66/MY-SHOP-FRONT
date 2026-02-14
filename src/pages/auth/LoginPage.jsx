import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

// 유효성 검사 스키마
const loginSchema = yup.object({
    email: yup
        .string()
        .required('이메일을 입력해주세요')
        .email('올바른 이메일 형식이 아닙니다'),
    password: yup
        .string()
        .required('비밀번호를 입력해주세요')
        .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError('');

        try {
            const result = await login({
                email: data.email,
                password: data.password,
            });

            if (result.success) {
                // 로그인 성공 시 홈으로 이동
                navigate('/home');
            } else {
                setApiError(result.error || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setApiError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    MY SHOP
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    로그인하여 쇼핑을 시작하세요
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* API 에러 표시 */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {apiError}
                            </div>
                        )}

                        {/* 이메일 */}
                        <Input
                            label="이메일"
                            type="text"
                            name="email"
                            placeholder="your@email.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        {/* 비밀번호 */}
                        <Input
                            label="비밀번호"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        {/* 로그인 버튼 */}
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            로그인
                        </Button>
                    </form>

                    {/* 회원가입 링크 */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">또는</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/signup"
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                계정이 없으신가요? 회원가입
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
