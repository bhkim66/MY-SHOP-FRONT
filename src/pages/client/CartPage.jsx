import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import useCartStore from '../../store/cartStore';
import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from '../../api/buyer.api';

function CartPage() {
    const navigate = useNavigate();
    const { setCartCount } = useCartStore();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        try {
            const response = await getCart();
            setCart(response);
            setCartCount(response.itemCount ?? 0);
        } catch (error) {
            console.error('장바구니 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    }, [setCartCount]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleQuantityChange = async (cartSeq, qty) => {
        setActionLoading(true);
        try {
            await updateCartItem(cartSeq, { qty });
            await fetchCart();
        } catch (error) {
            console.error('수량 변경 실패:', error);
            alert(error.response?.data?.message || '수량 변경에 실패했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRemove = async (cartSeq) => {
        setActionLoading(true);
        try {
            await removeCartItem(cartSeq);
            await fetchCart();
        } catch (error) {
            console.error('항목 삭제 실패:', error);
            alert('항목 삭제에 실패했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm('장바구니를 전체 비우시겠습니까?')) return;
        setActionLoading(true);
        try {
            await clearCart();
            await fetchCart();
        } catch (error) {
            console.error('전체 삭제 실패:', error);
            alert('전체 삭제에 실패했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCheckout = () => {
        navigate('/order', {
            state: {
                items: cart.items.map((item) => ({
                    productSeq: item.productSeq,
                    qty: item.qty,
                    productName: item.productName,
                    price: item.price,
                    thumbnailUrl: item.thumbnailUrl,
                })),
            },
        });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <Loading text="장바구니를 불러오는 중..." />
                </div>
            </MainLayout>
        );
    }

    const isEmpty = !cart || !cart.items || cart.items.length === 0;

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">장바구니</h1>

                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 text-lg mb-6">장바구니가 비어있습니다.</p>
                        <Link to="/products">
                            <Button variant="outline" size="lg">
                                쇼핑 계속하기
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* 상품 목록 */}
                        <div className="flex-1">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-600">
                                        총 {cart.itemCount}개 상품
                                    </span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleClearCart}
                                        disabled={actionLoading}
                                    >
                                        전체 삭제
                                    </Button>
                                </div>

                                <div className={actionLoading ? 'opacity-60 pointer-events-none' : ''}>
                                    {cart.items.map((item) => (
                                        <CartItem
                                            key={item.cartSeq}
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemove}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <Link to="/products">
                                    <Button variant="secondary" size="sm">
                                        ← 쇼핑 계속하기
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* 주문 요약 */}
                        <div className="lg:w-80">
                            <CartSummary cart={cart} onCheckout={handleCheckout} />
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default CartPage;
