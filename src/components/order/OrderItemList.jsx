import PropTypes from 'prop-types';

function OrderItemList({ items }) {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">주문 상품</h3>
            </div>
            <ul className="divide-y divide-gray-200">
                {items.map((item, index) => (
                    <li key={index} className="p-4 flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                            <img
                                src={item.thumbnailUrl || 'https://via.placeholder.com/80x80/E5E7EB/9CA3AF?text=No+Image'}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.productName}
                            </h4>
                            {item.optionText && (
                                <p className="text-sm text-gray-500">{item.optionText}</p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">
                                    {item.price.toLocaleString('ko-KR')}원 x {item.qty}
                                </span>
                                <span className="font-semibold text-gray-900">
                                    {(item.price * item.qty).toLocaleString('ko-KR')}원
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">상품 합계</span>
                    <span className="text-lg font-bold text-gray-900">
                        {totalAmount.toLocaleString('ko-KR')}원
                    </span>
                </div>
            </div>
        </div>
    );
}

OrderItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            productSeq: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            qty: PropTypes.number.isRequired,
            thumbnailUrl: PropTypes.string,
            optionText: PropTypes.string,
        })
    ).isRequired,
};

export default OrderItemList;
