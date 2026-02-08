import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

function HomePage() {
    // 임시 데이터 (Phase 1-4에서 API 연동)
    const categories = [
        { id: 1, name: '전자기기', icon: '💻' },
        { id: 2, name: '패션', icon: '👔' },
        { id: 3, name: '식품', icon: '🍔' },
        { id: 4, name: '뷰티', icon: '💄' },
        { id: 5, name: '도서', icon: '📚' },
        { id: 6, name: '스포츠', icon: '⚽' },
    ];

    const featuredProducts = [
        {
            id: 1,
            name: '무선 이어폰',
            price: 89000,
            image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Product+1',
        },
        {
            id: 2,
            name: '스마트 워치',
            price: 249000,
            image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Product+2',
        },
        {
            id: 3,
            name: '블루투스 스피커',
            price: 59000,
            image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Product+3',
        },
        {
            id: 4,
            name: '노트북 거치대',
            price: 35000,
            image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Product+4',
        },
    ];

    return (
        <MainLayout>
            {/* 배너 섹션 */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        MY SHOP에 오신 것을 환영합니다
                    </h1>
                    <p className="text-xl mb-8 text-blue-100">
                        최고의 상품을 합리적인 가격으로 만나보세요
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        쇼핑 시작하기
                    </Link>
                </div>
            </section>

            {/* 카테고리 섹션 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">카테고리</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.id}`}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="text-4xl mb-2">{category.icon}</div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 추천 상품 섹션 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">추천 상품</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        전체보기 →
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-lg font-bold text-blue-600">
                                    {product.price.toLocaleString('ko-KR')}원
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="bg-blue-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        판매자가 되어보세요
                    </h2>
                    <p className="text-gray-600 mb-8">
                        MY SHOP에서 당신의 상품을 판매하고 수익을 창출하세요
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        판매자 등록하기
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}

export default HomePage;
