import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../hooks/useAuth';

function OrderCompletePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const order = location.state;
        if (!order?.orderSeq) {
            navigate('/products');
            return;
        }

        setOrderInfo(order);
    }, [location.state, isAuthenticated, navigate]);

    if (!orderInfo) {
        return (
            <MainLayout>
                <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                    <div className="text-gray-400 text-6xl mb-4">⏳</div>
                    <p className="text-gray-500">로딩 중...</p>
                </div>
            </MainLayout>
        );
    }

    const getPayMethodLabel = (method) => {
        const methods = {
            CARD: '신용/체크카드',
            TRANSFER: '계좌이체',
            VBANK: '가상계좌',
        };
        return methods[method] || method;
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* 완료 아이콘 */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <svg
                            className="w-10 h-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        주문이 완료되었습니다!
                    </h1>
                    <p className="text-gray-600">
                        감사합니다. 주문이 정상적으로 접수되었습니다.
                    </p>
                </div>

                {/* 주문 정보 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        주문 정보
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">주문번호</span>
                            <span className="font-medium text-gray-900">
                                {orderInfo.orderNo}
                            </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">결제 수단</span>
                            <span className="font-medium text-gray-900">
                                {getPayMethodLabel(orderInfo.payMethod)}
                            </span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">결제 금액</span>
                            <span className="text-xl font-bold text-blue-600">
                                {orderInfo.totalPayAmount.toLocaleString('ko-KR')}원
                            </span>
                        </div>
                    </div>
                </div>

                {/* 안내 메시지 */}
                <div className="bg-blue-50 rounded-lg p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                주문 상세 내역은 마이페이지 &gt; 주문 목록에서 확인하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex gap-4">
                    <Link
                        to={`/my-orders/${orderInfo.orderSeq}`}
                        className="flex-1 text-center bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        주문 상세 보기
                    </Link>
                    <Link
                        to="/products"
                        className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        쇼핑 계속하기
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}

export default OrderCompletePage;
