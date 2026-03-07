import { useState, useEffect } from 'react';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';
import OrderDetailModal from '../../components/seller/OrderDetailModal';
import * as sellerAPI from '../../api/seller.api';

const STATUS_TABS = [
    { value: 'ALL', label: '전체' },
    { value: 'PAYMENT_COMPLETED', label: '결제완료' },
    { value: 'PREPARING', label: '준비중' },
    { value: 'SHIPPED', label: '배송중' },
    { value: 'DELIVERED', label: '배송완료' },
    { value: 'CANCELED', label: '취소' },
];

function SellerOrderListPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    });
    const [selectedOrderSeq, setSelectedOrderSeq] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadOrders();
    }, [selectedStatus, pagination.page]);

    const loadOrders = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: pagination.page,
                size: pagination.size,
                status: selectedStatus,
                ...(dateRange.startDate && { startDate: dateRange.startDate }),
                ...(dateRange.endDate && { endDate: dateRange.endDate }),
            };

            const response = await sellerAPI.getSellerOrders(params);

            // API 응답이 페이지네이션 형태인 경우
            if (response.content) {
                setOrders(response.content);
                setPagination({
                    ...pagination,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                });
            } else {
                // 배열 형태인 경우
                setOrders(Array.isArray(response) ? response : []);
            }
        } catch (error) {
            console.error('Failed to load orders:', error);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateFilter = () => {
        setPagination({ ...pagination, page: 0 });
        loadOrders();
    };

    const handleStatusTabChange = (status) => {
        setSelectedStatus(status);
        setPagination({ ...pagination, page: 0 });
    };

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    const handleRowClick = (orderSeq) => {
        setSelectedOrderSeq(orderSeq);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedOrderSeq(null);
    };

    const handleStatusChanged = () => {
        loadOrders();
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusCount = (status) => {
        if (!orders) return 0;
        if (status === 'ALL') return pagination.totalElements || orders.length;
        return orders.filter(order => order.status === status).length;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
                <div className="text-sm text-gray-500">
                    전체 주문 {pagination.totalElements || orders.length}건
                </div>
            </div>

            {/* 날짜 필터 */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">주문 기간</label>
                    <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">~</span>
                    <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleDateFilter}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                        조회
                    </button>
                    <button
                        onClick={() => {
                            setDateRange({ startDate: '', endDate: '' });
                            setPagination({ ...pagination, page: 0 });
                            setTimeout(loadOrders, 0);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                    >
                        초기화
                    </button>
                </div>
            </div>

            {/* 상태별 탭 */}
            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px overflow-x-auto">
                        {STATUS_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleStatusTabChange(tab.value)}
                                className={`
                                    flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                                    ${selectedStatus === tab.value
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                {tab.label}
                                {selectedStatus === tab.value && (
                                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                                        {pagination.totalElements || orders.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* 주문 테이블 */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    주문번호
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    고객명
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상품명
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    수량
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    금액
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상태
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    주문일시
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        로딩 중...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        주문 내역이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr
                                        key={order.orderSeq}
                                        onClick={() => handleRowClick(order.orderSeq)}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.orderSeq}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.buyerName || order.recipientName || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="max-w-xs truncate">
                                                {order.productName || order.items?.[0]?.productName || '-'}
                                                {order.items?.length > 1 && (
                                                    <span className="text-gray-500 ml-1">
                                                        외 {order.items.length - 1}건
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.quantity || order.items?.reduce((sum, item) => sum + item.quantity, 0) || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatPrice(order.totalAmount || order.totalPrice || 0)}원
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(order.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                {pagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            {pagination.totalElements}개 중 {pagination.page * pagination.size + 1}-
                            {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}개 표시
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 0}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                이전
                            </button>
                            <div className="flex gap-1">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    const pageNum = Math.max(0, Math.min(pagination.page - 2, pagination.totalPages - 5)) + i;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`
                                                px-3 py-2 rounded-lg text-sm font-medium
                                                ${pagination.page === pageNum
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            {pageNum + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page >= pagination.totalPages - 1}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                다음
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 주문 상세 모달 */}
            <OrderDetailModal
                orderSeq={selectedOrderSeq}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onStatusChanged={handleStatusChanged}
            />
        </div>
    );
}

export default SellerOrderListPage;
