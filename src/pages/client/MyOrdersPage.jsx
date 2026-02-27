import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';
import { getMyOrders } from '../../api/buyer.api';
import { useAuth } from '../../hooks/useAuth';

function MyOrdersPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 0,
        totalPages: 0,
        totalElements: 0,
    });

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        fetchOrders();
    }, [isAuthenticated, navigate]);

    const fetchOrders = async (page = 0) => {
        setLoading(true);
        try {
            const response = await getMyOrders({ page, size: 10 });
            setOrders(response.content || []);
            setPagination({
                page: response.number || 0,
                totalPages: response.totalPages || 0,
                totalElements: response.totalElements || 0,
            });
        } catch (error) {
            console.error('주문 목록 조회 실패:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handlePageChange = (newPage) => {
        fetchOrders(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">주문 내역</h1>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
                            >
                                <div className="flex justify-between mb-4">
                                    <div className="h-4 bg-gray-200 rounded w-32" />
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                </div>
                                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            주문 내역이 없습니다
                        </h2>
                        <p className="text-gray-500 mb-6">
                            아직 주문하신 상품이 없습니다.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            쇼핑하러 가기
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Link
                                    key={order.orderSeq}
                                    to={`/my-orders/${order.orderSeq}`}
                                    className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(order.orderedAt)}
                                        </div>
                                        <OrderStatusBadge status={order.orderStatus} />
                                    </div>
                                    <div className="mb-2">
                                        <h3 className="font-semibold text-gray-900">
                                            {order.firstItemName}
                                            {order.itemCount > 1 && (
                                                <span className="text-gray-500 font-normal">
                                                    {' '}외 {order.itemCount - 1}건
                                                </span>
                                            )}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            {order.marketName}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {order.totalPayAmount.toLocaleString('ko-KR')}원
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2">
                                        주문번호: {order.orderNo}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* 페이지네이션 */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 0}
                                        className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        이전
                                    </button>
                                    <span className="px-4 py-2 text-gray-600">
                                        {pagination.page + 1} / {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page >= pagination.totalPages - 1}
                                        className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        다음
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}

export default MyOrdersPage;
