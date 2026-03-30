import PropTypes from 'prop-types';
import Button from '../common/Button';

function CartSummary({ cart, onCheckout }) {
    const isFreeShipping = cart.shippingFee === 0;

    return (
        <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">주문 요약</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>상품 금액</span>
                    <span>{cart.totalProductAmount.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>배송비</span>
                    <span>
                        {isFreeShipping ? (
                            <span className="text-blue-600 font-medium">무료</span>
                        ) : (
                            `${cart.shippingFee.toLocaleString('ko-KR')}원`
                        )}
                    </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">총 결제 금액</span>
                    <span className="text-xl font-bold text-blue-600">
                        {cart.totalPayAmount.toLocaleString('ko-KR')}원
                    </span>
                </div>
            </div>

            <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onCheckout}
                disabled={cart.itemCount === 0}
            >
                주문하기 ({cart.itemCount}개)
            </Button>
        </div>
    );
}

CartSummary.propTypes = {
    cart: PropTypes.shape({
        totalProductAmount: PropTypes.number.isRequired,
        shippingFee: PropTypes.number.isRequired,
        totalPayAmount: PropTypes.number.isRequired,
        itemCount: PropTypes.number.isRequired,
    }).isRequired,
    onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
