import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrderStatusBadge from '../order/OrderStatusBadge';
import * as sellerAPI from '../../api/seller.api';

function OrderDetailModal({ orderSeq, isOpen, onClose, onStatusChanged }) {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [shippingData, setShippingData] = useState({
        shippingCompany: '',
        trackingNumber: '',
    });
    const [cancelReason, setCancelReason] = useState('');

    useEffect(() => {
        if (isOpen && orderSeq) {
            loadOrderDetail();
        }
    }, [isOpen, orderSeq]);

    const loadOrderDetail = async () => {
        setIsLoading(true);
        try {
            const data = await sellerAPI.getSellerOrderDetail(orderSeq);
            setOrder(data);
        } catch (error) {
            console.error('Failed to load order detail:', error);
            alert('주문 상세 정보를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        if (!window.confirm(`주문 상태를 변경하시겠습니까?`)) return;

        setIsUpdating(true);
        try {
            if (newStatus === 'SHIPPED') {
                setShowShippingForm(true);
                setIsUpdating(false);
                return;
            }

            const reason = newStatus === 'CANCELED' ? cancelReason : '';
            await sellerAPI.updateOrderStatus(orderSeq, newStatus, reason);
            alert('주문 상태가 변경되었습니다.');
            await loadOrderDetail();
            if (onStatusChanged) onStatusChanged();
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert(error.message || '상태 변경에 실패했습니다.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleShipmentSubmit = async (e) => {
        e.preventDefault();
        if (!shippingData.shippingCompany || !shippingData.trackingNumber) {
            alert('배송 회사와 운송장 번호를 입력해주세요.');
            return;
        }

        setIsUpdating(true);
        try {
            await sellerAPI.registerShipment(
                orderSeq,
                shippingData.shippingCompany,
                shippingData.trackingNumber
            );
            alert('배송 정보가 등록되고 상태가 변경되었습니다.');
            setShowShippingForm(false);
            setShippingData({ shippingCompany: '', trackingNumber: '' });
            await loadOrderDetail();
            if (onStatusChanged) onStatusChanged();
        } catch (error) {
            console.error('Failed to register shipment:', error);
            alert('배송 정보 등록에 실패했습니다.');
        } finally {
            setIsUpdating(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR');
    };

    const getAvailableActions = (status) => {
        switch (status) {
            case 'PAYMENT_COMPLETED':
                return [
                    { label: '준비중으로 변경', status: 'PREPARING' },
                    { label: '주문 취소', status: 'CANCELED', variant: 'danger' },
                ];
            case 'PREPARING':
                return [
                    { label: '배송 시작', status: 'SHIPPED' },
                    { label: '주문 취소', status: 'CANCELED', variant: 'danger' },
                ];
            case 'SHIPPED':
                return [{ label: '배송 완료', status: 'DELIVERED' }];
            default:
                return [];
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="text-xl font-bold text-gray-900">주문 상세</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-gray-500">로딩 중...</div>
                        </div>
                    ) : order ? (
                        <div className="space-y-6">
                            {/* 주문 정보 */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">주문 정보</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">주문번호:</span>
                                        <span className="ml-2 font-medium">{order.orderSeq}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">주문일시:</span>
                                        <span className="ml-2">{formatDate(order.createdAt)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">상태:</span>
                                        <span className="ml-2"><OrderStatusBadge status={order.status} /></span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">결제금액:</span>
                                        <span className="ml-2 font-bold text-blue-600">{formatPrice(order.totalAmount)}원</span>
                                    </div>
                                </div>
                            </div>

                            {/* 구매자 정보 */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">구매자 정보</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">이름:</span>
                                        <span className="ml-2">{order.buyerName || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">연락처:</span>
                                        <span className="ml-2">{order.buyerPhone || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">이메일:</span>
                                        <span className="ml-2">{order.buyerEmail || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 배송지 정보 */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">배송지 정보</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">받는 사람:</span>
                                        <span className="ml-2">{order.recipientName || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">연락처:</span>
                                        <span className="ml-2">{order.recipientPhone || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">주소:</span>
                                        <span className="ml-2">{order.shippingAddress || '-'}</span>
                                    </div>
                                    {order.deliveryMessage && (
                                        <div>
                                            <span className="text-gray-500">배송 메시지:</span>
                                            <span className="ml-2">{order.deliveryMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 주문 상품 */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">주문 상품</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상품명</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">수량</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">단가</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">합계</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-500">{item.quantity}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-500">{formatPrice(item.price)}원</td>
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                            {formatPrice(item.price * item.quantity)}원
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-8 text-center text-sm text-gray-500">
                                                        주문 상품 정보가 없습니다.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 배송 정보 입력 폼 */}
                            {showShippingForm && (
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">배송 정보 입력</h3>
                                    <form onSubmit={handleShipmentSubmit} className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                택배사
                                            </label>
                                            <select
                                                value={shippingData.shippingCompany}
                                                onChange={(e) => setShippingData({ ...shippingData, shippingCompany: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">선택하세요</option>
                                                <option value="CJ대한통운">CJ대한통운</option>
                                                <option value="우체국택배">우체국택배</option>
                                                <option value="한진택배">한진택배</option>
                                                <option value="로젠택배">로젠택배</option>
                                                <option value="롯데택배">롯데택배</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                운송장 번호
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingData.trackingNumber}
                                                onChange={(e) => setShippingData({ ...shippingData, trackingNumber: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="운송장 번호를 입력하세요"
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={isUpdating}
                                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium"
                                            >
                                                {isUpdating ? '처리 중...' : '배송 시작'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowShippingForm(false)}
                                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-medium"
                                            >
                                                취소
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* 상태 변경 버튼 */}
                            {!showShippingForm && getAvailableActions(order.status).length > 0 && (
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex gap-2 flex-wrap">
                                        {getAvailableActions(order.status).map((action, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleStatusChange(action.status)}
                                                disabled={isUpdating}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 ${
                                                    action.variant === 'danger'
                                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-gray-500">주문 정보를 불러올 수 없습니다.</div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

OrderDetailModal.propTypes = {
    orderSeq: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onStatusChanged: PropTypes.func,
};

export default OrderDetailModal;
