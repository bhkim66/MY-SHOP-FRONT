import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* 로고 */}
                    <Link to="/home" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-blue-600">MY SHOP</div>
                    </Link>

                    {/* 검색바 (데스크톱) */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="상품을 검색하세요..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>

                    {/* 데스크톱 메뉴 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                            상품
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    {/* 장바구니 배지는 Phase 2에서 구현 */}
                                </Link>
                                <Link to="/my-page" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    마이페이지
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    로그인
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-blue-600"
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* 모바일 검색바 */}
                <div className="md:hidden pb-3">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="상품을 검색하세요..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 py-3 space-y-3">
                        <Link
                            to="/products"
                            className="block text-gray-700 hover:text-blue-600 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            상품
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/cart"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    장바구니
                                </Link>
                                <Link
                                    to="/my-page"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    마이페이지
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-gray-700 hover:text-blue-600 py-2"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block text-gray-700 hover:text-blue-600 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
