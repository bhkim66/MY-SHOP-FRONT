import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 회사 정보 */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">MY SHOP</h3>
                        <p className="text-gray-400 mb-4">
                            최고의 쇼핑 경험을 제공하는 온라인 마켓플레이스
                        </p>
                        <div className="text-sm text-gray-400">
                            <p>대표자: 홍길동</p>
                            <p>사업자등록번호: 123-45-67890</p>
                            <p>통신판매업신고: 2024-서울강남-12345</p>
                        </div>
                    </div>

                    {/* 고객 지원 */}
                    <div>
                        <h4 className="font-semibold mb-4">고객 지원</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/faq" className="hover:text-white transition-colors">
                                    자주 묻는 질문
                                </Link>
                            </li>
                            <li>
                                <Link to="/notice" className="hover:text-white transition-colors">
                                    공지사항
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    고객센터
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 정책 */}
                    <div>
                        <h4 className="font-semibold mb-4">정책</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/terms" className="hover:text-white transition-colors">
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-white transition-colors">
                                    개인정보처리방침
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="hover:text-white transition-colors">
                                    환불정책
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 정보 */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
                    <p>&copy; {currentYear} MY SHOP. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
