import React, { useState } from 'react';
import ClientShop from './ClientShop';
import AdminDashboard from './AdminDashboard';

function App() {
  const [mode, setMode] = useState('client'); // 'client' 또는 'admin'

  return (
    <div>
      {/* 모드 전환 버튼 (개발용) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 9999,
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={() => setMode('client')}
          style={{
            padding: '10px 16px',
            background: mode === 'client' ? '#35c5f0' : '#e0e0e0',
            color: mode === 'client' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          🛍️ 고객 화면
        </button>
        <button
          onClick={() => setMode('admin')}
          style={{
            padding: '10px 16px',
            background: mode === 'admin' ? '#35c5f0' : '#e0e0e0',
            color: mode === 'admin' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          📊 관리자 화면
        </button>
      </div>

      {/* 화면 렌더링 */}
      {mode === 'client' ? <ClientShop /> : <AdminDashboard />}
    </div>
  );
}

export default App;
