import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { getProductDetail } from '../../api/buyer.api';
import { useAuth } from '../../hooks/useAuth';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getProductDetail(id);
            setProduct(response);
            setQuantity(response.minOrderQty || 1);
        } catch (error) {
            console.error('상품 조회 실패:', error);
            alert('상품을 찾을 수 없습니다.');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (delta) => {
        const newQty = quantity + delta;
        if (newQty < (product?.minOrderQty || 1)) return;
        if (product?.maxOrderQty && newQty > product.maxOrderQty) return;
        if (newQty > product?.stockQty) return;
        setQuantity(newQty);
    };

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login', { state: { from: `/products/${id}` } });
            return;
        }

        navigate('/order', {
            state: {
                items: [{
                    productSeq: product.seq,
                    qty: quantity,
                    productName: product.productName,
                    price: product.salePrice || product.price,
                    thumbnailUrl: product.thumbnailUrl,
                }],
            },
        });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-200 rounded-lg" />
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-1/4" />
                                <div className="h-8 bg-gray-200 rounded w-3/4" />
                                <div className="h-10 bg-gray-200 rounded w-1/3" />
                                <div className="h-32 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!product) {
        return null;
    }

    const displayPrice = product.salePrice || product.price;
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountRate = hasDiscount
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;
    const totalPrice = displayPrice * quantity;

    const images = product.imageUrls?.length > 0
        ? product.imageUrls
        : [product.thumbnailUrl || 'https://via.placeholder.com/600x600/E5E7EB/9CA3AF?text=No+Image'];

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 이미지 갤러리 */}
                    <div>
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <img
                                src={images[selectedImage]}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-md overflow-hidden border-2 ${
                                            selectedImage === idx
                                                ? 'border-blue-500'
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 상품 정보 */}
                    <div>
                        <p className="text-gray-500 text-sm mb-2">{product.marketName}</p>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {product.productName}
                        </h1>

                        {/* 가격 */}
                        <div className="mb-6">
                            {hasDiscount && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-500 font-bold">{discountRate}%</span>
                                    <span className="text-gray-400 line-through">
                                        {product.price.toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                            )}
                            <div className="text-3xl font-bold text-gray-900">
                                {displayPrice.toLocaleString('ko-KR')}원
                            </div>
                        </div>

                        {/* 평점 */}
                        {product.reviewCount > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {'★'.repeat(Math.round(product.ratingAvg || 0))}
                                    {'☆'.repeat(5 - Math.round(product.ratingAvg || 0))}
                                </div>
                                <span className="text-gray-600">
                                    {product.ratingAvg?.toFixed(1)} ({product.reviewCount}개 리뷰)
                                </span>
                            </div>
                        )}

                        {/* 재고 */}
                        <div className="mb-6">
                            {product.stockQty > 0 ? (
                                <span className="text-green-600">재고: {product.stockQty}개</span>
                            ) : (
                                <span className="text-red-600">품절</span>
                            )}
                        </div>

                        {/* 수량 선택 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                수량
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= (product.minOrderQty || 1)}
                                        className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={
                                            quantity >= product.stockQty ||
                                            (product.maxOrderQty && quantity >= product.maxOrderQty)
                                        }
                                        className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                                {product.minOrderQty > 1 && (
                                    <span className="text-sm text-gray-500">
                                        (최소 {product.minOrderQty}개)
                                    </span>
                                )}
                                {product.maxOrderQty && (
                                    <span className="text-sm text-gray-500">
                                        (최대 {product.maxOrderQty}개)
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* 총 금액 */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">총 상품 금액</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {totalPrice.toLocaleString('ko-KR')}원
                                </span>
                            </div>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stockQty <= 0}
                                className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {product.stockQty > 0 ? '바로 구매' : '품절'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 상품 설명 */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b">
                        상품 설명
                    </h2>
                    <div className="prose max-w-none">
                        {product.description ? (
                            <p className="whitespace-pre-wrap text-gray-700">
                                {product.description}
                            </p>
                        ) : (
                            <p className="text-gray-400">상품 설명이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProductDetailPage;
