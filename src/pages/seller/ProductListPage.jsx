import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductTable from '../../components/seller/ProductTable';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import * as sellerAPI from '../../api/seller.api';
import { PRODUCT_STATUS_OPTIONS, CATEGORY_OPTIONS } from '../../utils/constants';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'ALL',
        categoryCode: 'ALL',
        search: '',
    });
    const [pagination, setPagination] = useState({
        page: 0,
        totalPages: 0,
        totalElements: 0,
        first: true,
        last: true,
    });
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        product: null,
    });
    const [isDeleting, setIsDeleting] = useState(false);

    const statusOptions = [
        { value: 'ALL', label: '전체 상태' },
        ...PRODUCT_STATUS_OPTIONS,
    ];

    const categoryOptions = [
        { value: 'ALL', label: '전체 카테고리' },
        ...CATEGORY_OPTIONS,
    ];

    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, pagination.page]);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const result = await sellerAPI.getProducts({
                ...filters,
                page: pagination.page,
                size: 10,
            });
            setProducts(result.content || []);
            setPagination((prev) => ({
                ...prev,
                totalPages: result.totalPages || 0,
                totalElements: result.totalElements || 0,
                first: result.first ?? true,
                last: result.last ?? true,
            }));
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPagination((prev) => ({ ...prev, page: 0 }));
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handleDeleteClick = (product) => {
        setDeleteModal({ isOpen: true, product });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.product) return;

        setIsDeleting(true);
        try {
            await sellerAPI.deleteProduct(deleteModal.product.seq);
            setProducts((prev) =>
                prev.filter((p) => p.seq !== deleteModal.product.seq)
            );
            setDeleteModal({ isOpen: false, product: null });
        } catch (error) {
            console.error('Failed to delete product:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteClose = () => {
        setDeleteModal({ isOpen: false, product: null });
    };

    const renderPagination = () => {
        if (pagination.totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(0, pagination.page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pagination.totalPages - 1, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="flex items-center justify-center gap-2 mt-6">
                <button
                    onClick={() => handlePageChange(0)}
                    disabled={pagination.first}
                    className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    처음
                </button>
                <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.first}
                    className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    이전
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm border rounded-lg ${
                            page === pagination.page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'hover:bg-gray-50'
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.last}
                    className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    다음
                </button>
                <button
                    onClick={() => handlePageChange(pagination.totalPages - 1)}
                    disabled={pagination.last}
                    className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    마지막
                </button>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
                <Link
                    to="/seller/products/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    상품 등록
                </Link>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="상품명 검색"
                            value={filters.search}
                            onChange={(e) =>
                                handleFilterChange('search', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Select
                        name="status"
                        options={statusOptions}
                        value={filters.status}
                        onChange={(e) =>
                            handleFilterChange('status', e.target.value)
                        }
                    />
                    <Select
                        name="categoryCode"
                        options={categoryOptions}
                        value={filters.categoryCode}
                        onChange={(e) =>
                            handleFilterChange('categoryCode', e.target.value)
                        }
                    />
                    <div className="flex items-center text-sm text-gray-500">
                        총 {pagination.totalElements}개의 상품
                    </div>
                </div>
            </div>

            {/* 상품 목록 */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">로딩 중...</div>
                </div>
            ) : (
                <>
                    <ProductTable
                        products={products}
                        onDelete={handleDeleteClick}
                    />
                    {renderPagination()}
                </>
            )}

            {/* 삭제 확인 모달 */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                title="상품 삭제"
                confirmText="삭제"
                variant="danger"
                loading={isDeleting}
            >
                <p className="text-gray-600">
                    <span className="font-medium text-gray-900">
                        {deleteModal.product?.productName}
                    </span>
                    을(를) 삭제하시겠습니까?
                </p>
                <p className="mt-2 text-sm text-red-600">
                    이 작업은 되돌릴 수 없습니다.
                </p>
            </Modal>
        </div>
    );
}

export default ProductListPage;
