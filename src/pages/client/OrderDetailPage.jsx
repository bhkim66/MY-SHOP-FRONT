import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';
import { getOrderDetail, cancelOrder } from '../../api/buyer.api';
import { useAuth } from '../../hooks/useAuth';

function OrderDetailPage() {
    const { orderSeq } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canceling, setCanceling] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        fetchOrderDetail();
    }, [orderSeq, isAuthenticated, navigate]);

    const fetchOrderDetail = async () => {
        setLoading(true);
        try {
            const response = await getOrderDetail(orderSeq);
            setOrder(response);
        } catch (error) {
            console.error('주문 상세 조회 실패:', error);
            alert('주문 정보를 불러올 수 없습니다.');
            navigate('/my-orders');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!window.confirm('주문을 취소하시겠습니까?')) {
            return;
        }

        const reason = window.prompt('취소 사유를 입력해주세요 (선택사항):');

        setCanceling(true);
        try {
            await cancelOrder(orderSeq, reason || '고객 요청으로 취소');
            alert('주문이 취소되었습니다.');
            fetchOrderDetail();
        } catch (error) {
            console.error('주문 취소 실패:', error);
            alert(error.response?.data?.message || '주문 취소에 실패했습니다.');
        } finally {
            setCanceling(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const canCancel = (status) => {
        return ['PENDING', 'PAYMENT_COMPLETED', 'PREPARING'].includes(status);
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/4" />
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            to="/my-orders"
                            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
                        >
                            ← 주문 목록으로
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            주문 상세
                        </h1>
                    </div>
                    <OrderStatusBadge status={order.orderStatus} />
                </div>

                <div className="space-y-6">
                    {/* 주문 정보 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            주문 정보
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">주문번호</span>
                                <p className="font-medium">{order.orderNo}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">주문일시</span>
                                <p className="font-medium">{formatDate(order.orderedAt)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">판매자</span>
                                <p className="font-medium">{order.marketName}</p>
                            </div>
                            {order.confirmedAt && (
                                <div>
                                    <span className="text-gray-500">결제완료일시</span>
                                    <p className="font-medium">{formatDate(order.confirmedAt)}</p>
                                </div>
                            )}
                            {order.canceledAt && (
                                <>
                                    <div>
                                        <span className="text-gray-500">취소일시</span>
                                        <p className="font-medium text-red-600">
                                            {formatDate(order.canceledAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">취소사유</span>
                                        <p className="font-medium text-red-600">
                                            {order.cancelReason || '-'}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 주문 상품 */}
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                주문 상품
                            </h2>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {order.items?.map((item) => (
                                <li key={item.seq} className="p-6 flex gap-4">
                                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <img
                                            src={item.thumbnailUrl || 'https://via.placeholder.com/80x80/E5E7EB/9CA3AF?text=No+Image'}
                                            alt={item.itemName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link
                                            to={`/products/${item.productSeq}`}
                                            className="font-medium text-gray-900 hover:text-blue-600"
                                        >
                                            {item.itemName}
                                        </Link>
                                        {item.itemOption && (
                                            <p className="text-sm text-gray-500">
                                                옵션: {item.itemOption}
                                            </p>
                                        )}
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">
                                                {item.unitPrice.toLocaleString('ko-KR')}원 x {item.qty}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                {item.itemAmount.toLocaleString('ko-KR')}원
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 배송 정보 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            배송 정보
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">수령인</span>
                                <p className="font-medium">{order.receiverName}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">연락처</span>
                                <p className="font-medium">{order.receiverPhone}</p>
                            </div>
                            <div className="md:col-span-2">
                                <span className="text-gray-500">배송지</span>
                                <p className="font-medium">
                                    {order.zipCode && `(${order.zipCode}) `}
                                    {order.address1}
                                    {order.address2 && ` ${order.address2}`}
                                </p>
                            </div>
                            {order.shippingMessage && (
                                <div className="md:col-span-2">
                                    <span className="text-gray-500">배송 메시지</span>
                                    <p className="font-medium">{order.shippingMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 결제 정보 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            결제 정보
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">상품 금액</span>
                                <span>
                                    {order.totalProductAmount.toLocaleString('ko-KR')}원
                                </span>
                            </div>
                            {order.totalDiscountAmount > 0 && (
                                <div className="flex justify-between text-red-600">
                                    <span>상품 할인</span>
                                    <span>
                                        -{order.totalDiscountAmount.toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                            )}
                            {order.couponDiscountAmount > 0 && (
                                <div className="flex justify-between text-red-600">
                                    <span>쿠폰 할인</span>
                                    <span>
                                        -{order.couponDiscountAmount.toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-500">배송비</span>
                                <span>
                                    {order.shippingFee > 0
                                        ? `${order.shippingFee.toLocaleString('ko-KR')}원`
                                        : '무료'}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3">
                                <span className="font-semibold text-gray-900">
                                    총 결제 금액
                                </span>
                                <span className="text-xl font-bold text-blue-600">
                                    {order.totalPayAmount.toLocaleString('ko-KR')}원
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 주문 취소 버튼 */}
                    {canCancel(order.orderStatus) && (
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancelOrder}
                                disabled={canceling}
                                className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {canceling ? '처리 중...' : '주문 취소'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default OrderDetailPage;
