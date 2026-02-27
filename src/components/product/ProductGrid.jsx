import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function ProductGrid({ products, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
                        <div className="aspect-square bg-gray-200" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                            <div className="h-5 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                <p className="text-gray-500 text-lg">등록된 상품이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.seq} product={product} />
            ))}
        </div>
    );
}

ProductGrid.propTypes = {
    products: PropTypes.array,
    loading: PropTypes.bool,
};

ProductGrid.defaultProps = {
    products: [],
    loading: false,
};

export default ProductGrid;
