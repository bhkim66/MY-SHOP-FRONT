import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as memberAPI from '../../api/member.api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

// 유효성 검사 스키마
const signupSchema = yup.object({
    email: yup
        .string()
        .required('이메일을 입력해주세요')
        .email('올바른 이메일 형식이 아닙니다'),
    password: yup
        .string()
        .required('비밀번호를 입력해주세요')
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'
        ),
    passwordConfirm: yup
        .string()
        .required('비밀번호 확인을 입력해주세요')
        .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
    name: yup
        .string()
        .required('이름을 입력해주세요')
        .min(2, '이름은 최소 2자 이상이어야 합니다'),
    phoneNumber: yup
        .string()
        .required('전화번호를 입력해주세요')
        .matches(/^01[0-9]{8,9}$/, '올바른 전화번호 형식이 아닙니다 (예: 01012345678)'),
    role: yup
        .string()
        .required('역할을 선택해주세요')
        .oneOf(['BUYER', 'SELLER'], '유효하지 않은 역할입니다'),
});

function SignupPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            role: 'BUYER',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError('');

        try {
            await memberAPI.signup({
                email: data.email,
                password: data.password,
                name: data.name,
                phoneNumber: data.phoneNumber,
                role: data.role,
            });

            // 회원가입 성공 시 로그인 페이지로 이동
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            setApiError(
                error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    회원가입
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    MY SHOP에 오신 것을 환영합니다
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
                            placeholder="영문 대소문자, 숫자 포함 8자 이상"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        {/* 비밀번호 확인 */}
                        <Input
                            label="비밀번호 확인"
                            type="password"
                            name="passwordConfirm"
                            placeholder="비밀번호를 다시 입력해주세요"
                            error={errors.passwordConfirm?.message}
                            {...register('passwordConfirm')}
                        />

                        {/* 이름 */}
                        <Input
                            label="이름"
                            type="text"
                            name="name"
                            placeholder="홍길동"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        {/* 전화번호 */}
                        <Input
                            label="전화번호"
                            type="tel"
                            name="phoneNumber"
                            placeholder="01012345678 (- 없이 입력)"
                            error={errors.phoneNumber?.message}
                            {...register('phoneNumber')}
                        />

                        {/* 역할 선택 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                가입 유형
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="mt-2 space-y-2">
                                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        value="BUYER"
                                        {...register('role')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900">
                                            구매자
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            상품을 구매하고 싶어요
                                        </span>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        value="SELLER"
                                        {...register('role')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900">
                                            판매자
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            상품을 판매하고 싶어요
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                            )}
                        </div>

                        {/* 회원가입 버튼 */}
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            회원가입
                        </Button>
                    </form>

                    {/* 로그인 링크 */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                            이미 계정이 있으신가요? 로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
