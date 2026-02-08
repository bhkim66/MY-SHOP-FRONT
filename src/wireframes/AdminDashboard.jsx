import React, { useState } from 'react';

// 샘플 데이터
const initialProducts = [
  { id: 1, name: '모던 원목 책상', price: 189000, stock: 15, category: '가구', image: 'https://via.placeholder.com/80x80/35cfc2/fff?text=책상', sales: 45, status: '판매중' },
  { id: 2, name: '북유럽 스타일 조명', price: 45000, stock: 32, category: '조명', image: 'https://via.placeholder.com/80x80/ff9500/fff?text=조명', sales: 128, status: '판매중' },
  { id: 3, name: '린넨 쿠션 커버 세트', price: 23000, stock: 50, category: '패브릭', image: 'https://via.placeholder.com/80x80/5856d6/fff?text=쿠션', sales: 89, status: '판매중' },
  { id: 4, name: '미니멀 벽시계', price: 35000, stock: 0, category: '소품', image: 'https://via.placeholder.com/80x80/ff2d55/fff?text=시계', sales: 67, status: '품절' },
  { id: 5, name: '프리미엄 러그 (대형)', price: 250000, stock: 8, category: '패브릭', image: 'https://via.placeholder.com/80x80/34c759/fff?text=러그', sales: 23, status: '판매중' },
];

const initialOrders = [
  { id: 'ORD-2026-001', customer: '김민수', email: 'kim@email.com', phone: '010-1234-5678', products: ['모던 원목 책상'], amount: 189000, status: '결제완료', payMethod: '카드', date: '2026-01-30 14:23', address: '서울시 강남구 테헤란로 123' },
  { id: 'ORD-2026-002', customer: '이지연', email: 'lee@email.com', phone: '010-2345-6789', products: ['북유럽 스타일 조명', '린넨 쿠션 커버 세트'], amount: 68000, status: '배송중', payMethod: '카드', date: '2026-01-29 09:15', address: '경기도 성남시 분당구 판교로 456' },
  { id: 'ORD-2026-003', customer: '박준호', email: 'park@email.com', phone: '010-3456-7890', products: ['린넨 쿠션 커버 세트'], amount: 46000, status: '배송완료', payMethod: '무통장', date: '2026-01-28 18:42', address: '부산시 해운대구 해운대로 789' },
  { id: 'ORD-2026-004', customer: '최수진', email: 'choi@email.com', phone: '010-4567-8901', products: ['프리미엄 러그 (대형)'], amount: 250000, status: '결제완료', payMethod: '카드', date: '2026-01-30 11:05', address: '인천시 연수구 송도대로 321' },
  { id: 'ORD-2026-005', customer: '정다영', email: 'jung@email.com', phone: '010-5678-9012', products: ['미니멀 벽시계', '북유럽 스타일 조명'], amount: 80000, status: '취소요청', payMethod: '카드', date: '2026-01-27 16:30', address: '대구시 수성구 수성로 654' },
];

const initialSettlements = [
  { id: 'SET-001', period: '2026년 1월 3주차', sales: 1234000, fee: 123400, settlement: 1110600, status: '정산완료', date: '2026-01-28' },
  { id: 'SET-002', period: '2026년 1월 2주차', sales: 987000, fee: 98700, settlement: 888300, status: '정산완료', date: '2026-01-21' },
  { id: 'SET-003', period: '2026년 1월 1주차', sales: 1567000, fee: 156700, settlement: 1410300, status: '정산완료', date: '2026-01-14' },
];

const categories = ['전체', '가구', '조명', '패브릭', '소품', '주방', '욕실'];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [settlements] = useState(initialSettlements);
  const [showChat, setShowChat] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', category: '가구', description: '', image: ''
  });

  // 로그인 화면
  if (!isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card shadow-lg border-0" style={{ width: '400px', borderRadius: '16px' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div style={{ fontSize: '48px' }}>🏠</div>
              <h3 className="mt-2" style={{ color: '#35cfc2' }}>마이샵 판매자센터</h3>
              <p className="text-muted">판매자 계정으로 로그인하세요</p>
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted">이메일</label>
              <input type="email" className="form-control form-control-lg" placeholder="seller@example.com" />
            </div>
            <div className="mb-4">
              <label className="form-label small text-muted">비밀번호</label>
              <input type="password" className="form-control form-control-lg" placeholder="••••••••" />
            </div>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="btn btn-lg w-100 text-white"
              style={{ background: 'linear-gradient(135deg, #35cfc2 0%, #28a99e 100%)', border: 'none' }}
            >
              로그인
            </button>
            <div className="text-center mt-4">
              <a href="#!" className="text-muted small me-3">비밀번호 찾기</a>
              <a href="#!" className="small" style={{ color: '#35cfc2' }}>판매자 가입</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI 설명 생성
  const generateAIDescription = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const descriptions = [
        '✨ 세련된 디자인과 뛰어난 내구성을 갖춘 프리미엄 제품입니다. 모던한 인테리어에 완벽하게 어울리며, 고급 소재를 사용하여 오래도록 사용하실 수 있습니다.',
        '🏡 집안 분위기를 한층 업그레이드해줄 감각적인 아이템! 심플하면서도 세련된 디자인으로 어떤 공간에도 자연스럽게 녹아듭니다.',
        '💫 일상에 특별함을 더하는 프리미엄 인테리어 소품. 높은 품질의 소재와 정교한 마감으로 오랫동안 사랑받을 제품입니다.'
      ];
      setAiDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  // 상품 추가/수정
  const saveProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...newProduct, price: parseInt(newProduct.price), stock: parseInt(newProduct.stock) || 0 } : p));
    } else {
      setProducts([...products, {
        id: products.length + 1,
        ...newProduct,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        sales: 0,
        status: '판매중',
        image: newProduct.image || 'https://via.placeholder.com/80x80/35cfc2/fff?text=NEW'
      }]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', stock: '', category: '가구', description: '', image: '' });
    setAiDescription('');
  };

  // 주문 상태 변경
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // 상태 배지 색상
  const getStatusBadge = (status) => {
    const badges = {
      '배송완료': 'success', '배송중': 'primary', '결제완료': 'warning',
      '취소요청': 'danger', '품절': 'secondary', '판매중': 'success', '정산완료': 'success', '정산대기': 'warning'
    };
    return badges[status] || 'secondary';
  };

  // 필터링된 상품
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === '전체' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // 필터링된 주문
  const filteredOrders = orders.filter(o => {
    const matchSearch = o.customer.includes(searchTerm) || o.id.includes(searchTerm);
    const matchStatus = filterStatus === '전체' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // 통계 계산
  const todaySales = orders.filter(o => o.date.includes('2026-01-30')).reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === '결제완료').length;
  const cancelRequests = orders.filter(o => o.status === '취소요청').length;

  // 메뉴
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: '대시보드' },
    { id: 'products', icon: '🛍️', label: '상품 관리' },
    { id: 'orders', icon: '🧾', label: '주문 관리' },
    { id: 'settlements', icon: '💰', label: '정산 관리' },
    { id: 'reviews', icon: '⭐', label: '리뷰 관리' },
    { id: 'settings', icon: '⚙️', label: '설정' },
  ];

  return (
    <div className="d-flex vh-100">
      {/* 사이드바 */}
      <div className="d-flex flex-column text-white" style={{ width: '240px', background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}>
        <div className="p-4 border-bottom border-secondary">
          <h4 className="mb-0" style={{ color: '#35cfc2' }}>🏠 마이샵</h4>
          <small className="text-muted">판매자센터</small>
        </div>
        <nav className="flex-grow-1 p-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${currentPage === item.id ? 'text-white' : 'text-secondary'}`}
              style={{ background: currentPage === item.id ? 'rgba(53, 207, 194, 0.2)' : 'transparent', borderRadius: '8px' }}
              onClick={() => setCurrentPage(item.id)}
            >
              <span className="me-3" style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
              {item.id === 'orders' && cancelRequests > 0 && (
                <span className="badge bg-danger ms-auto">{cancelRequests}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-top border-secondary">
          <div className="d-flex align-items-center mb-3">
            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
              👤
            </div>
            <div>
              <div className="small">인테리어마켓</div>
              <div className="text-muted" style={{ fontSize: '11px' }}>seller@example.com</div>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-outline-secondary btn-sm w-100">
            로그아웃
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-grow-1 bg-light overflow-auto">
        {/* 상단 헤더 */}
        <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">{menuItems.find(m => m.id === currentPage)?.label}</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative">
              🔔
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>3</span>
            </button>
            <button className="btn btn-light">❓ 도움말</button>
          </div>
        </div>

        <div className="p-4">
          {/* ==================== 대시보드 ==================== */}
          {currentPage === 'dashboard' && (
            <>
              {/* 요약 카드 */}
              <div className="row g-4 mb-4">
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted small mb-1">오늘 매출</p>
                          <h3 className="mb-0" style={{ color: '#35cfc2' }}>₩{todaySales.toLocaleString()}</h3>
                          <small className="text-success">▲ 12.5% vs 어제</small>
                        </div>
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(53, 207, 194, 0.1)' }}>
                          💰
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted small mb-1">신규 주문</p>
                          <h3 className="mb-0 text-primary">{pendingOrders}건</h3>
                          <small className="text-muted">처리 대기중</small>
                        </div>
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(13, 110, 253, 0.1)' }}>
                          📦
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted small mb-1">총 주문</p>
                          <h3 className="mb-0 text-info">{totalOrders}건</h3>
                          <small className="text-muted">이번 달</small>
                        </div>
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(13, 202, 240, 0.1)' }}>
                          🧾
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted small mb-1">등록 상품</p>
                          <h3 className="mb-0 text-secondary">{products.length}개</h3>
                          <small className="text-danger">{products.filter(p => p.stock === 0).length}개 품절</small>
                        </div>
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(108, 117, 125, 0.1)' }}>
                          🛍️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 차트 영역 */}
              <div className="row g-4 mb-4">
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">📈 주간 매출 추이</h6>
                      <select className="form-select form-select-sm" style={{ width: '120px' }}>
                        <option>최근 7일</option>
                        <option>최근 30일</option>
                        <option>최근 3개월</option>
                      </select>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-end justify-content-between" style={{ height: '200px' }}>
                        {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => {
                          const heights = [60, 80, 45, 90, 70, 100, 85];
                          return (
                            <div key={day} className="text-center" style={{ width: '12%' }}>
                              <div
                                className="mx-auto mb-2"
                                style={{
                                  width: '100%',
                                  height: `${heights[i] * 1.8}px`,
                                  background: i === 6 ? 'linear-gradient(180deg, #35cfc2, #28a99e)' : '#e9ecef',
                                  borderRadius: '8px'
                                }}
                              />
                              <small className="text-muted">{day}</small>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-header bg-white border-0">
                      <h6 className="mb-0">🏷️ 카테고리별 매출</h6>
                    </div>
                    <div className="card-body">
                      {[
                        { name: '가구', percent: 45, color: '#35cfc2' },
                        { name: '조명', percent: 25, color: '#ff9500' },
                        { name: '패브릭', percent: 20, color: '#5856d6' },
                        { name: '소품', percent: 10, color: '#ff2d55' },
                      ].map(cat => (
                        <div key={cat.name} className="mb-3">
                          <div className="d-flex justify-content-between small mb-1">
                            <span>{cat.name}</span>
                            <span>{cat.percent}%</span>
                          </div>
                          <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                            <div className="progress-bar" style={{ width: `${cat.percent}%`, background: cat.color, borderRadius: '4px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 최근 주문 & 인기 상품 */}
              <div className="row g-4">
                <div className="col-md-7">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">🧾 최근 주문</h6>
                      <a href="#!" className="small" style={{ color: '#35cfc2' }} onClick={() => setCurrentPage('orders')}>전체보기 →</a>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0">주문번호</th>
                            <th className="border-0">고객</th>
                            <th className="border-0">금액</th>
                            <th className="border-0">상태</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 4).map(order => (
                            <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                              <td><code className="small">{order.id}</code></td>
                              <td>{order.customer}</td>
                              <td>₩{order.amount.toLocaleString()}</td>
                              <td><span className={`badge bg-${getStatusBadge(order.status)}`}>{order.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-header bg-white border-0">
                      <h6 className="mb-0">🔥 인기 상품 TOP 3</h6>
                    </div>
                    <div className="card-body">
                      {products.sort((a, b) => b.sales - a.sales).slice(0, 3).map((product, i) => (
                        <div key={product.id} className="d-flex align-items-center mb-3">
                          <span className="badge me-3" style={{
                            background: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : '#cd7f32',
                            width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {i + 1}
                          </span>
                          <img src={product.image} alt={product.name} className="rounded me-3" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                          <div className="flex-grow-1">
                            <div className="small fw-bold">{product.name}</div>
                            <div className="text-muted" style={{ fontSize: '12px' }}>판매 {product.sales}개</div>
                          </div>
                          <div className="text-end">
                            <div className="small fw-bold" style={{ color: '#35cfc2' }}>₩{product.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==================== 상품 관리 ==================== */}
          {currentPage === 'products' && (
            <>
              {/* 검색 및 필터 */}
              <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-4">
                      <div className="input-group">
                        <span className="input-group-text bg-white">🔍</span>
                        <input
                          className="form-control"
                          placeholder="상품명 검색..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select className="form-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="col-md-5 text-end">
                      <button
                        className="btn text-white"
                        style={{ background: 'linear-gradient(135deg, #35cfc2 0%, #28a99e 100%)' }}
                        onClick={() => { setShowProductModal(true); setEditingProduct(null); setNewProduct({ name: '', price: '', stock: '', category: '가구', description: '', image: '' }); }}
                      >
                        ➕ 새 상품 등록
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 상품 목록 */}
              <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0" style={{ width: '80px' }}>이미지</th>
                        <th className="border-0">상품명</th>
                        <th className="border-0">카테고리</th>
                        <th className="border-0">가격</th>
                        <th className="border-0">재고</th>
                        <th className="border-0">판매량</th>
                        <th className="border-0">상태</th>
                        <th className="border-0">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id}>
                          <td><img src={product.image} alt={product.name} className="rounded" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                          <td className="fw-bold">{product.name}</td>
                          <td><span className="badge bg-light text-dark">{product.category}</span></td>
                          <td>₩{product.price.toLocaleString()}</td>
                          <td className={product.stock === 0 ? 'text-danger' : ''}>{product.stock}개</td>
                          <td>{product.sales}개</td>
                          <td><span className={`badge bg-${getStatusBadge(product.status)}`}>{product.status}</span></td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => { setEditingProduct(product); setNewProduct(product); setShowProductModal(true); }}
                            >
                              수정
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ==================== 주문 관리 ==================== */}
          {currentPage === 'orders' && (
            <>
              {/* 주문 상태 탭 */}
              <div className="d-flex gap-2 mb-4">
                {['전체', '결제완료', '배송중', '배송완료', '취소요청'].map(status => (
                  <button
                    key={status}
                    className={`btn ${filterStatus === status ? 'btn-dark' : 'btn-outline-secondary'}`}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status}
                    {status !== '전체' && <span className="badge bg-light text-dark ms-2">{orders.filter(o => o.status === status).length}</span>}
                  </button>
                ))}
              </div>

              {/* 검색 */}
              <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                  <div className="input-group" style={{ maxWidth: '400px' }}>
                    <span className="input-group-text bg-white">🔍</span>
                    <input
                      className="form-control"
                      placeholder="주문번호 또는 고객명 검색..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 주문 목록 */}
              <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0">주문번호</th>
                        <th className="border-0">주문일시</th>
                        <th className="border-0">고객</th>
                        <th className="border-0">상품</th>
                        <th className="border-0">결제금액</th>
                        <th className="border-0">결제방법</th>
                        <th className="border-0">상태</th>
                        <th className="border-0">상태변경</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <code className="small" style={{ cursor: 'pointer', color: '#35cfc2' }} onClick={() => setSelectedOrder(order)}>
                              {order.id}
                            </code>
                          </td>
                          <td className="small">{order.date}</td>
                          <td>
                            <div>{order.customer}</div>
                            <div className="text-muted" style={{ fontSize: '11px' }}>{order.phone}</div>
                          </td>
                          <td className="small">{order.products.join(', ')}</td>
                          <td className="fw-bold">₩{order.amount.toLocaleString()}</td>
                          <td><span className="badge bg-light text-dark">{order.payMethod}</span></td>
                          <td><span className={`badge bg-${getStatusBadge(order.status)}`}>{order.status}</span></td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              style={{ width: '110px' }}
                              value={order.status}
                              onChange={e => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="결제완료">결제완료</option>
                              <option value="배송중">배송중</option>
                              <option value="배송완료">배송완료</option>
                              <option value="취소요청">취소요청</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ==================== 정산 관리 ==================== */}
          {currentPage === 'settlements' && (
            <>
              {/* 정산 요약 */}
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #35cfc2 0%, #28a99e 100%)' }}>
                    <div className="card-body text-white">
                      <p className="small mb-1 opacity-75">이번 달 예상 정산금</p>
                      <h2 className="mb-0">₩3,409,200</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <p className="text-muted small mb-1">총 매출</p>
                      <h3 className="mb-0">₩3,788,000</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <p className="text-muted small mb-1">수수료 (10%)</p>
                      <h3 className="mb-0 text-danger">-₩378,800</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* 정산 내역 */}
              <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-header bg-white border-0">
                  <h6 className="mb-0">💰 정산 내역</h6>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0">정산번호</th>
                        <th className="border-0">정산기간</th>
                        <th className="border-0">매출액</th>
                        <th className="border-0">수수료</th>
                        <th className="border-0">정산금액</th>
                        <th className="border-0">정산일</th>
                        <th className="border-0">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settlements.map(s => (
                        <tr key={s.id}>
                          <td><code>{s.id}</code></td>
                          <td>{s.period}</td>
                          <td>₩{s.sales.toLocaleString()}</td>
                          <td className="text-danger">-₩{s.fee.toLocaleString()}</td>
                          <td className="fw-bold" style={{ color: '#35cfc2' }}>₩{s.settlement.toLocaleString()}</td>
                          <td>{s.date}</td>
                          <td><span className={`badge bg-${getStatusBadge(s.status)}`}>{s.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ==================== 리뷰 관리 ==================== */}
          {currentPage === 'reviews' && (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center py-5">
                <div style={{ fontSize: '64px' }}>⭐</div>
                <h5 className="mt-3">리뷰 관리</h5>
                <p className="text-muted">고객 리뷰를 확인하고 답변을 달 수 있습니다.</p>
                <p className="text-muted small">(준비 중인 기능입니다)</p>
              </div>
            </div>
          )}

          {/* ==================== 설정 ==================== */}
          {currentPage === 'settings' && (
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <div className="card-header bg-white border-0">
                    <h6 className="mb-0">🏪 스토어 정보</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label small">스토어명</label>
                      <input className="form-control" defaultValue="인테리어마켓" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">대표자명</label>
                      <input className="form-control" defaultValue="홍길동" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">사업자등록번호</label>
                      <input className="form-control" defaultValue="123-45-67890" />
                    </div>
                    <button className="btn btn-primary">저장</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <div className="card-header bg-white border-0">
                    <h6 className="mb-0">🔔 알림 설정</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">신규 주문 알림</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">리뷰 알림</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">마케팅 알림</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 상품 등록/수정 모달 */}
      {showProductModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title">{editingProduct ? '상품 수정' : '새 상품 등록'}</h5>
                <button className="btn-close" onClick={() => setShowProductModal(false)} />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label small">상품명 *</label>
                    <input className="form-control" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small">카테고리</label>
                    <select className="form-select" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                      {categories.filter(c => c !== '전체').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">가격 (원) *</label>
                    <input type="number" className="form-control" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">재고</label>
                    <input type="number" className="form-control" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small">이미지 URL</label>
                    <input className="form-control" placeholder="https://..." value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small">상품 설명</label>
                    <textarea className="form-control" rows={3} value={newProduct.description || aiDescription} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                    <button
                      className="btn btn-outline-secondary btn-sm mt-2"
                      onClick={generateAIDescription}
                      disabled={isGenerating}
                    >
                      {isGenerating ? '⏳ AI 생성 중...' : '✨ AI로 설명 생성'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setShowProductModal(false)}>취소</button>
                <button className="btn text-white" style={{ background: '#35cfc2' }} onClick={saveProduct}>
                  {editingProduct ? '수정' : '등록'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 주문 상세 모달 */}
      {selectedOrder && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title">주문 상세</h5>
                <button className="btn-close" onClick={() => setSelectedOrder(null)} />
              </div>
              <div className="modal-body">
                <table className="table table-sm">
                  <tbody>
                    <tr><th width="100">주문번호</th><td><code>{selectedOrder.id}</code></td></tr>
                    <tr><th>주문일시</th><td>{selectedOrder.date}</td></tr>
                    <tr><th>고객명</th><td>{selectedOrder.customer}</td></tr>
                    <tr><th>연락처</th><td>{selectedOrder.phone}</td></tr>
                    <tr><th>이메일</th><td>{selectedOrder.email}</td></tr>
                    <tr><th>배송지</th><td>{selectedOrder.address}</td></tr>
                    <tr><th>상품</th><td>{selectedOrder.products.join(', ')}</td></tr>
                    <tr><th>결제금액</th><td className="fw-bold" style={{ color: '#35cfc2' }}>₩{selectedOrder.amount.toLocaleString()}</td></tr>
                    <tr><th>결제방법</th><td>{selectedOrder.payMethod}</td></tr>
                    <tr><th>상태</th><td><span className={`badge bg-${getStatusBadge(selectedOrder.status)}`}>{selectedOrder.status}</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI 챗봇 플로팅 버튼 */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="btn rounded-circle position-fixed shadow-lg"
        style={{ bottom: '24px', right: '24px', width: '60px', height: '60px', fontSize: '24px', background: 'linear-gradient(135deg, #35cfc2 0%, #28a99e 100%)', border: 'none', color: 'white' }}
      >
        💬
      </button>

      {/* AI 챗봇 */}
      {showChat && (
        <div className="card position-fixed shadow-lg border-0" style={{ bottom: '96px', right: '24px', width: '350px', borderRadius: '16px' }}>
          <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #35cfc2 0%, #28a99e 100%)', borderRadius: '16px 16px 0 0' }}>
            <div className="d-flex align-items-center">
              <span className="me-2">🤖</span>
              <div>
                <div className="fw-bold">AI 고객응대 봇</div>
                <small className="opacity-75">항상 온라인</small>
              </div>
            </div>
          </div>
          <div className="card-body bg-light" style={{ height: '280px', overflowY: 'auto' }}>
            <div className="mb-3">
              <div className="d-inline-block bg-white rounded-3 p-3 shadow-sm" style={{ maxWidth: '85%' }}>
                안녕하세요! 무엇을 도와드릴까요? 🙌
              </div>
            </div>
            <div className="mb-3 text-end">
              <div className="d-inline-block rounded-3 p-3 text-white" style={{ maxWidth: '85%', background: '#35cfc2' }}>
                배송 문의드립니다
              </div>
            </div>
            <div className="mb-3">
              <div className="d-inline-block bg-white rounded-3 p-3 shadow-sm" style={{ maxWidth: '85%' }}>
                배송 조회를 도와드리겠습니다. 주문번호를 알려주시겠어요? 📦
              </div>
            </div>
          </div>
          <div className="card-footer bg-white border-0 p-3" style={{ borderRadius: '0 0 16px 16px' }}>
            <div className="d-flex gap-2">
              <input className="form-control" placeholder="메시지를 입력하세요..." style={{ borderRadius: '20px' }} />
              <button className="btn text-white px-3" style={{ background: '#35cfc2', borderRadius: '20px' }}>전송</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
