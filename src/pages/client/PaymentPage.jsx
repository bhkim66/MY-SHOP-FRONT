import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { requestPayment, confirmPayment } from '../../api/buyer.api';
import { useAuth } from '../../hooks/useAuth';

const PAY_METHODS = [
    { value: 'CARD', label: '신용/체크카드', icon: '💳' },
    { value: 'TRANSFER', label: '계좌이체', icon: '🏦' },
    { value: 'VBANK', label: '가상계좌', icon: '🧾' },
];

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [orderInfo, setOrderInfo] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState('CARD');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('select'); // select, processing, success

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        const order = location.state;
        if (!order?.orderSeq) {
            alert('주문 정보가 없습니다.');
            navigate('/products');
            return;
        }

        setOrderInfo(order);
    }, [location.state, isAuthenticated, navigate]);

    const handlePayment = async () => {
        if (!orderInfo) return;

        setLoading(true);
        setStep('processing');

        try {
            // 1. 결제 요청
            const paymentResponse = await requestPayment({
                orderSeq: orderInfo.orderSeq,
                payMethod: selectedPayMethod,
                payAmount: orderInfo.totalPayAmount,
                cardCompany: selectedPayMethod === 'CARD' ? 'MOCK_CARD' : null,
                cardNumber: selectedPayMethod === 'CARD' ? '****-****-****-1234' : null,
            });

            // 2. 결제 확인 (Mock이므로 바로 승인)
            const confirmResponse = await confirmPayment(paymentResponse.paymentSeq);

            // 3. 결제 완료 페이지로 이동
            navigate('/order/complete', {
                state: {
                    orderSeq: orderInfo.orderSeq,
                    orderNo: orderInfo.orderNo,
                    paymentSeq: paymentResponse.paymentSeq,
                    totalPayAmount: orderInfo.totalPayAmount,
                    payMethod: selectedPayMethod,
                },
            });
        } catch (error) {
            console.error('결제 실패:', error);
            setStep('select');
            alert(error.response?.data?.message || '결제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">결제하기</h1>

                {step === 'processing' ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            결제 처리 중입니다
                        </h2>
                        <p className="text-gray-500">
                            잠시만 기다려주세요...
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* 주문 정보 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                주문 정보
                            </h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">주문번호</span>
                                    <span className="font-medium">{orderInfo.orderNo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">상품</span>
                                    <span className="font-medium">
                                        {orderInfo.items?.[0]?.productName}
                                        {orderInfo.items?.length > 1 && ` 외 ${orderInfo.items.length - 1}건`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 결제 수단 선택 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                결제 수단 선택
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {PAY_METHODS.map((method) => (
                                    <button
                                        key={method.value}
                                        onClick={() => setSelectedPayMethod(method.value)}
                                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                                            selectedPayMethod === method.value
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-2xl mb-1">{method.icon}</div>
                                        <div className="text-sm font-medium">{method.label}</div>
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                * 테스트 환경이므로 실제 결제가 이루어지지 않습니다.
                            </p>
                        </div>

                        {/* 결제 금액 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">
                                    총 결제 금액
                                </span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {orderInfo.totalPayAmount.toLocaleString('ko-KR')}원
                                </span>
                            </div>
                        </div>

                        {/* 결제 버튼 */}
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? '처리 중...'
                                : `${orderInfo.totalPayAmount.toLocaleString('ko-KR')}원 결제하기`}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            결제 버튼을 클릭하면 결제가 진행됩니다.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default PaymentPage;
