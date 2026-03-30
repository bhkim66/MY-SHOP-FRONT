import PropTypes from 'prop-types';

function CartItem({ item, onQuantityChange, onRemove }) {
    const thumbnailSrc =
        item.thumbnailUrl ||
        'https://via.placeholder.com/60x60/E5E7EB/9CA3AF?text=No+Image';

    const handleDecrease = () => {
        if (item.qty <= 1) return;
        onQuantityChange(item.cartSeq, item.qty - 1);
    };

    const handleIncrease = () => {
        if (item.qty >= item.stockQty) return;
        onQuantityChange(item.cartSeq, item.qty + 1);
    };

    return (
        <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
            {/* 썸네일 */}
            <img
                src={thumbnailSrc}
                alt={item.productName}
                className="w-15 h-15 rounded-md object-cover flex-shrink-0 border border-gray-200"
                style={{ width: 60, height: 60 }}
            />

            {/* 상품 정보 */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                {item.optionName && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.optionName}</p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                    {item.price.toLocaleString('ko-KR')}원
                </p>

                {/* 수량 조절 */}
                <div className="flex items-center mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                            onClick={handleDecrease}
                            disabled={item.qty <= 1}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-l-md transition-colors"
                            aria-label="수량 감소"
                        >
                            -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 min-w-[36px] text-center text-sm">
                            {item.qty}
                        </span>
                        <button
                            onClick={handleIncrease}
                            disabled={item.qty >= item.stockQty}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-r-md transition-colors"
                            aria-label="수량 증가"
                        >
                            +
                        </button>
                    </div>
                    {item.stockQty <= 5 && (
                        <span className="ml-2 text-xs text-orange-500">
                            재고 {item.stockQty}개 남음
                        </span>
                    )}
                </div>
            </div>

            {/* 소계 + 삭제 */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <button
                    onClick={() => onRemove(item.cartSeq)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                    aria-label="항목 삭제"
                >
                    ×
                </button>
                <p className="text-sm font-semibold text-gray-900">
                    {item.totalPrice.toLocaleString('ko-KR')}원
                </p>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        cartSeq: PropTypes.number.isRequired,
        productSeq: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string,
        productOptionSeq: PropTypes.number,
        optionName: PropTypes.string,
        price: PropTypes.number.isRequired,
        qty: PropTypes.number.isRequired,
        stockQty: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
    }).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartItem;
