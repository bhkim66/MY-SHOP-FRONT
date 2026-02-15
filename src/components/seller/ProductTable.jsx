import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../common/Button';

const statusStyles = {
    ON_SALE: 'bg-green-100 text-green-800',
    SOLD_OUT: 'bg-red-100 text-red-800',
    HIDDEN: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
    ON_SALE: '판매중',
    SOLD_OUT: '품절',
    HIDDEN: '숨김',
};

function ProductTable({ products, onDelete }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ko-KR');
    };

    if (products.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
                <p className="mt-4 text-gray-500">등록된 상품이 없습니다.</p>
                <Link to="/seller/products/new">
                    <Button variant="primary" className="mt-4">
                        상품 등록하기
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상품
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            카테고리
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            가격
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            재고
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            등록일
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.seq} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        src={product.thumbnailUrl}
                                        alt={product.productName}
                                        className="w-10 h-10 rounded object-cover"
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.productName}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.categoryName || product.categoryCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatPrice(product.price)}원
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.stockQty}개
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={clsx(
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        statusStyles[product.status] || 'bg-gray-100 text-gray-800'
                                    )}
                                >
                                    {statusLabels[product.status] || product.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(product.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                    to={`/seller/products/${product.seq}`}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    수정
                                </Link>
                                <button
                                    onClick={() => onDelete(product)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ProductTable.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            seq: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            categoryCode: PropTypes.string.isRequired,
            categoryName: PropTypes.string,
            price: PropTypes.number.isRequired,
            stockQty: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            thumbnailUrl: PropTypes.string,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProductTable;
