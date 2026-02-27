import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const displayPrice = product.salePrice || product.price;
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountRate = hasDiscount
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;

    return (
        <Link
            to={`/products/${product.seq}`}
            className="group bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
        >
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.thumbnailUrl || 'https://via.placeholder.com/300x300/E5E7EB/9CA3AF?text=No+Image'}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {discountRate}% OFF
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.marketName}</p>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.productName}
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-blue-600">
                        {displayPrice.toLocaleString('ko-KR')}원
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                            {product.price.toLocaleString('ko-KR')}원
                        </span>
                    )}
                </div>
                {product.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                        <span className="text-yellow-500">★</span>
                        <span>{product.ratingAvg?.toFixed(1) || '0.0'}</span>
                        <span className="text-gray-400">({product.reviewCount})</span>
                    </div>
                )}
            </div>
        </Link>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        seq: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        salePrice: PropTypes.number,
        thumbnailUrl: PropTypes.string,
        marketName: PropTypes.string,
        reviewCount: PropTypes.number,
        ratingAvg: PropTypes.number,
    }).isRequired,
};

export default ProductCard;
