import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import AddressForm from '../../components/order/AddressForm';
import OrderItemList from '../../components/order/OrderItemList';
import { createOrder } from '../../api/buyer.api';
import { useAuth } from '../../hooks/useAuth';

const SHIPPING_FEE = 3000;

function OrderFormPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState({
        receiverName: '',
        receiverPhone: '',
        zipCode: '',
        address1: '',
        address2: '',
        shippingMessage: '',
        customMessage: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        const orderItems = location.state?.items;
        if (!orderItems || orderItems.length === 0) {
            alert('주문할 상품이 없습니다.');
            navigate('/products');
            return;
        }

        setItems(orderItems);

        // 사용자 정보로 기본값 설정
        if (user) {
            setAddress((prev) => ({
                ...prev,
                receiverName: user.name || '',
                receiverPhone: user.phone || '',
            }));
        }
    }, [location.state, isAuthenticated, user, navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!address.receiverName?.trim()) {
            newErrors.receiverName = '수령인 이름을 입력해주세요.';
        }
        if (!address.receiverPhone?.trim()) {
            newErrors.receiverPhone = '연락처를 입력해주세요.';
        }
        if (!address.address1?.trim()) {
            newErrors.address1 = '주소를 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const shippingMessage =
                address.shippingMessage === 'custom'
                    ? address.customMessage
                    : address.shippingMessage;

            const orderData = {
                items: items.map((item) => ({
                    productSeq: item.productSeq,
                    qty: item.qty,
                })),
                receiverName: address.receiverName,
                receiverPhone: address.receiverPhone,
                zipCode: address.zipCode,
                address1: address.address1,
                address2: address.address2,
                shippingMessage: shippingMessage || '',
            };

            const response = await createOrder(orderData);

            // 결제 페이지로 이동
            navigate('/payment', {
                state: {
                    orderSeq: response.orderSeq,
                    orderNo: response.orderNo,
                    totalPayAmount: response.totalPayAmount,
                    items: items,
                },
            });
        } catch (error) {
            console.error('주문 생성 실패:', error);
            alert(error.response?.data?.message || '주문 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const totalProductAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalPayAmount = totalProductAmount + SHIPPING_FEE;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">주문서 작성</h1>

                <div className="space-y-6">
                    {/* 주문 상품 */}
                    <OrderItemList items={items} />

                    {/* 배송 정보 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            배송 정보
                        </h2>
                        <AddressForm
                            address={address}
                            onChange={setAddress}
                            errors={errors}
                        />
                    </div>

                    {/* 결제 금액 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            결제 금액
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>상품 금액</span>
                                <span>{totalProductAmount.toLocaleString('ko-KR')}원</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>배송비</span>
                                <span>{SHIPPING_FEE.toLocaleString('ko-KR')}원</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-900">
                                        총 결제 금액
                                    </span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {totalPayAmount.toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 결제 버튼 */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? '처리 중...' : `${totalPayAmount.toLocaleString('ko-KR')}원 결제하기`}
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

export default OrderFormPage;
