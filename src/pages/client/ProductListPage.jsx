import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import ProductGrid from '../../components/product/ProductGrid';
import { getProducts } from '../../api/buyer.api';

function ProductListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 0,
        totalPages: 0,
        totalElements: 0,
    });

    const currentPage = parseInt(searchParams.get('page') || '0', 10);
    const sortBy = searchParams.get('sort') || 'createdAt,desc';

    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortBy]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts({
                page: currentPage,
                size: 12,
                sort: sortBy,
            });
            setProducts(response.content || []);
            setPagination({
                page: response.number || 0,
                totalPages: response.totalPages || 0,
                totalElements: response.totalElements || 0,
            });
        } catch (error) {
            console.error('상품 목록 조회 실패:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSearchParams({ page: '0', sort: newSort });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString(), sort: sortBy });
        window.scrollTo(0, 0);
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 헤더 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">상품 목록</h1>
                        <p className="text-gray-500 mt-1">
                            총 {pagination.totalElements.toLocaleString()}개의 상품
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="createdAt,desc">최신순</option>
                            <option value="saleCount,desc">인기순</option>
                            <option value="price,asc">낮은 가격순</option>
                            <option value="price,desc">높은 가격순</option>
                            <option value="viewCount,desc">조회순</option>
                        </select>
                    </div>
                </div>

                {/* 상품 그리드 */}
                <ProductGrid products={products} loading={loading} />

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
                            {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                                const startPage = Math.max(
                                    0,
                                    Math.min(
                                        pagination.page - 2,
                                        pagination.totalPages - 5
                                    )
                                );
                                const pageNum = startPage + idx;
                                if (pageNum >= pagination.totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-4 py-2 border rounded-md ${
                                            pagination.page === pageNum
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum + 1}
                                    </button>
                                );
                            })}
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
            </div>
        </MainLayout>
    );
}

export default ProductListPage;
