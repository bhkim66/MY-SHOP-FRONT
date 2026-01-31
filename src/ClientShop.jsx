import React, { useState, useEffect } from 'react';

// 스타일 정의
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

  :root {
    --primary: #35c5f0;
    --primary-dark: #00a9d4;
    --primary-light: #e8f7fc;
    --secondary: #f77;
    --dark: #2f3438;
    --gray-900: #2f3438;
    --gray-800: #424242;
    --gray-700: #757575;
    --gray-600: #828c94;
    --gray-500: #9e9e9e;
    --gray-400: #bdbdbd;
    --gray-300: #e0e0e0;
    --gray-200: #eeeeee;
    --gray-100: #f5f5f5;
    --white: #ffffff;
    --success: #00c73c;
    --warning: #ff9500;
    --danger: #ff3b30;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
    --shadow-xl: 0 16px 48px rgba(0,0,0,0.16);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-2xl: 24px;
    --transition: all 0.2s ease;
  }

  * {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
    box-sizing: border-box;
  }

  body {
    background: var(--gray-100);
    color: var(--gray-900);
    line-height: 1.6;
  }

  /* 버튼 스타일 */
  .btn-primary-custom {
    background: var(--primary);
    border: none;
    color: white;
    font-weight: 500;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    transition: var(--transition);
  }
  .btn-primary-custom:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-outline-custom {
    background: transparent;
    border: 1px solid var(--gray-300);
    color: var(--gray-800);
    font-weight: 500;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    transition: var(--transition);
  }
  .btn-outline-custom:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--primary-light);
  }

  /* 카드 스타일 */
  .product-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: var(--transition);
    border: none;
    box-shadow: var(--shadow-sm);
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .product-card:hover .product-image img {
    transform: scale(1.05);
  }
  .product-image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
  }
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  /* 배지 스타일 */
  .badge-best {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
  }
  .badge-sale {
    background: linear-gradient(135deg, #35c5f0, #00d4aa);
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
  }
  .badge-new {
    background: linear-gradient(135deg, #a855f7, #6366f1);
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
  }
  .badge-free-shipping {
    background: var(--gray-800);
    color: white;
    font-size: 10px;
    font-weight: 500;
    padding: 3px 6px;
    border-radius: var(--radius-sm);
  }

  /* 찜하기 버튼 */
  .wishlist-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(4px);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
  }
  .wishlist-btn:hover {
    background: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }
  .wishlist-btn.active {
    color: var(--secondary);
  }

  /* 헤더 */
  .header-main {
    background: var(--white);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  .header-top {
    border-bottom: 1px solid var(--gray-200);
    padding: 8px 0;
    font-size: 12px;
    color: var(--gray-600);
  }
  .logo {
    font-size: 26px;
    font-weight: 900;
    color: var(--primary);
    text-decoration: none;
    letter-spacing: -1px;
  }
  .search-box {
    position: relative;
    max-width: 400px;
    flex: 1;
  }
  .search-box input {
    width: 100%;
    padding: 12px 48px 12px 20px;
    border: 2px solid var(--gray-200);
    border-radius: 24px;
    font-size: 14px;
    transition: var(--transition);
    background: var(--gray-100);
  }
  .search-box input:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(53, 197, 240, 0.1);
  }
  .search-box button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  .search-box button:hover {
    background: var(--primary-dark);
  }

  /* 카테고리 네비게이션 */
  .category-nav {
    display: flex;
    gap: 32px;
    padding: 16px 0;
    overflow-x: auto;
  }
  .category-nav::-webkit-scrollbar {
    display: none;
  }
  .category-link {
    font-size: 15px;
    font-weight: 500;
    color: var(--gray-700);
    text-decoration: none;
    white-space: nowrap;
    padding: 8px 0;
    border-bottom: 2px solid transparent;
    transition: var(--transition);
  }
  .category-link:hover {
    color: var(--gray-900);
  }
  .category-link.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
    font-weight: 700;
  }

  /* 배너 */
  .main-banner {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    margin-bottom: 48px;
  }
  .banner-slide {
    height: 380px;
    display: flex;
    align-items: center;
    padding: 0 60px;
    background-size: cover;
    background-position: center;
  }
  .banner-content {
    max-width: 500px;
  }
  .banner-content h2 {
    font-size: 36px;
    font-weight: 900;
    line-height: 1.3;
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .banner-content p {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 24px;
  }
  .banner-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }
  .banner-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    border: none;
    cursor: pointer;
    transition: var(--transition);
  }
  .banner-dot.active {
    background: white;
    width: 24px;
    border-radius: 4px;
  }
  .banner-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    font-size: 20px;
    color: var(--gray-800);
    box-shadow: var(--shadow-md);
  }
  .banner-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
  .banner-arrow.prev { left: 20px; }
  .banner-arrow.next { right: 20px; }

  /* 섹션 */
  .section {
    margin-bottom: 64px;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .section-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--gray-900);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-more {
    font-size: 14px;
    color: var(--gray-600);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: var(--transition);
  }
  .section-more:hover {
    color: var(--primary);
  }

  /* 카테고리 아이콘 그리드 */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
  .category-item {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 24px 16px;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    border: 1px solid var(--gray-200);
  }
  .category-item:hover {
    border-color: var(--primary);
    background: var(--primary-light);
    transform: translateY(-2px);
  }
  .category-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 28px;
  }
  .category-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-800);
  }

  /* 상품 그리드 */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  @media (max-width: 992px) {
    .product-grid { grid-template-columns: repeat(3, 1fr); }
    .category-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
    .category-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* 상품 정보 */
  .product-info {
    padding: 16px;
  }
  .product-seller {
    font-size: 12px;
    color: var(--gray-600);
    margin-bottom: 6px;
  }
  .product-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-900);
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    min-height: 40px;
  }
  .product-price-wrap {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 8px;
  }
  .product-discount {
    font-size: 16px;
    font-weight: 700;
    color: var(--secondary);
  }
  .product-price {
    font-size: 16px;
    font-weight: 700;
    color: var(--gray-900);
  }
  .product-original-price {
    font-size: 12px;
    color: var(--gray-500);
    text-decoration: line-through;
  }
  .product-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--gray-600);
  }
  .product-rating {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .star-icon {
    color: #ffc107;
    font-size: 12px;
  }

  /* 장바구니 슬라이드 */
  .cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1040;
    opacity: 0;
    animation: fadeIn 0.2s forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .cart-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 420px;
    height: 100%;
    background: var(--white);
    z-index: 1050;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-xl);
    transform: translateX(100%);
    animation: slideIn 0.3s forwards;
  }
  @keyframes slideIn {
    to { transform: translateX(0); }
  }
  .cart-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart-header h3 {
    font-size: 18px;
    font-weight: 700;
  }
  .cart-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;
  }
  .cart-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--gray-200);
  }
  .cart-item-image {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    overflow: hidden;
    flex-shrink: 0;
  }
  .cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cart-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--gray-200);
    background: var(--gray-100);
  }

  /* 상품 상세 */
  .detail-images {
    position: sticky;
    top: 100px;
  }
  .detail-main-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 12px;
    background: var(--gray-100);
  }
  .detail-main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .detail-thumbnails {
    display: flex;
    gap: 8px;
  }
  .detail-thumbnail {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: var(--transition);
    opacity: 0.6;
  }
  .detail-thumbnail:hover, .detail-thumbnail.active {
    border-color: var(--primary);
    opacity: 1;
  }
  .detail-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .detail-info {
    padding-left: 48px;
  }
  .detail-breadcrumb {
    font-size: 13px;
    color: var(--gray-600);
    margin-bottom: 16px;
  }
  .detail-breadcrumb a {
    color: var(--gray-600);
    text-decoration: none;
  }
  .detail-breadcrumb a:hover {
    color: var(--primary);
  }
  .detail-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: 16px;
    line-height: 1.4;
  }
  .detail-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray-200);
  }
  .detail-price-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray-200);
  }
  .detail-original-price {
    font-size: 14px;
    color: var(--gray-500);
    text-decoration: line-through;
    margin-bottom: 4px;
  }
  .detail-price-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .detail-discount {
    font-size: 28px;
    font-weight: 900;
    color: var(--secondary);
  }
  .detail-price {
    font-size: 28px;
    font-weight: 900;
    color: var(--gray-900);
  }
  .detail-info-list {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray-200);
  }
  .detail-info-item {
    display: flex;
    padding: 12px 0;
    font-size: 14px;
  }
  .detail-info-label {
    width: 100px;
    color: var(--gray-600);
  }
  .detail-info-value {
    color: var(--gray-900);
  }

  .quantity-control {
    display: flex;
    align-items: center;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .quantity-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--gray-100);
    font-size: 18px;
    cursor: pointer;
    transition: var(--transition);
  }
  .quantity-btn:hover {
    background: var(--gray-200);
  }
  .quantity-input {
    width: 60px;
    height: 40px;
    border: none;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }

  .total-section {
    background: var(--gray-100);
    padding: 20px;
    border-radius: var(--radius-lg);
    margin: 24px 0;
  }
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .total-label {
    font-size: 14px;
    color: var(--gray-700);
  }
  .total-price {
    font-size: 24px;
    font-weight: 900;
    color: var(--primary);
  }

  .action-buttons {
    display: flex;
    gap: 12px;
  }
  .btn-cart {
    flex: 1;
    padding: 16px;
    border: 2px solid var(--gray-300);
    background: var(--white);
    border-radius: var(--radius-lg);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-cart:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .btn-buy {
    flex: 2;
    padding: 16px;
    border: none;
    background: var(--primary);
    color: white;
    border-radius: var(--radius-lg);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition);
  }
  .btn-buy:hover {
    background: var(--primary-dark);
  }

  /* 탭 네비게이션 */
  .tab-nav {
    display: flex;
    border-bottom: 1px solid var(--gray-300);
    margin-top: 48px;
    position: sticky;
    top: 70px;
    background: var(--white);
    z-index: 100;
  }
  .tab-item {
    padding: 16px 32px;
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-600);
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    transition: var(--transition);
  }
  .tab-item:hover {
    color: var(--gray-900);
  }
  .tab-item.active {
    color: var(--primary);
  }
  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary);
  }

  /* 리뷰 */
  .review-summary {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px;
    background: var(--gray-100);
    border-radius: var(--radius-lg);
    margin-bottom: 24px;
  }
  .review-score {
    text-align: center;
  }
  .review-score-number {
    font-size: 48px;
    font-weight: 900;
    color: var(--gray-900);
    line-height: 1;
  }
  .review-score-stars {
    color: #ffc107;
    font-size: 20px;
    margin: 8px 0;
  }
  .review-score-count {
    font-size: 14px;
    color: var(--gray-600);
  }
  .review-bars {
    flex: 1;
  }
  .review-bar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  .review-bar-label {
    width: 50px;
    font-size: 13px;
    color: var(--gray-600);
  }
  .review-bar-track {
    flex: 1;
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
  }
  .review-bar-fill {
    height: 100%;
    background: var(--primary);
    border-radius: 4px;
  }
  .review-item {
    padding: 24px 0;
    border-bottom: 1px solid var(--gray-200);
  }
  .review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .review-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .review-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gray-200);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  .review-user-info {
    font-size: 14px;
  }
  .review-user-name {
    font-weight: 600;
    color: var(--gray-900);
  }
  .review-date {
    color: var(--gray-500);
    font-size: 13px;
  }
  .review-rating {
    color: #ffc107;
    font-size: 14px;
  }
  .review-content {
    font-size: 14px;
    color: var(--gray-800);
    line-height: 1.7;
  }
  .review-photos {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  .review-photo {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
  }
  .review-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 푸터 */
  .footer {
    background: var(--gray-900);
    color: var(--gray-400);
    padding: 64px 0 32px;
    margin-top: 80px;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--gray-800);
  }
  .footer-logo {
    font-size: 28px;
    font-weight: 900;
    color: var(--primary);
    margin-bottom: 16px;
  }
  .footer-desc {
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .footer-social {
    display: flex;
    gap: 12px;
  }
  .footer-social a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gray-800);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-400);
    text-decoration: none;
    transition: var(--transition);
    font-size: 18px;
  }
  .footer-social a:hover {
    background: var(--primary);
    color: white;
  }
  .footer-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 20px;
  }
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer-links li {
    margin-bottom: 12px;
  }
  .footer-links a {
    color: var(--gray-500);
    text-decoration: none;
    font-size: 14px;
    transition: var(--transition);
  }
  .footer-links a:hover {
    color: var(--white);
  }
  .footer-cs {
    font-size: 24px;
    font-weight: 900;
    color: var(--white);
    margin-bottom: 8px;
  }
  .footer-cs-time {
    font-size: 13px;
    color: var(--gray-500);
    line-height: 1.7;
  }
  .footer-bottom {
    padding-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }
  .footer-copyright {
    color: var(--gray-600);
  }
  .footer-policy {
    display: flex;
    gap: 24px;
  }
  .footer-policy a {
    color: var(--gray-500);
    text-decoration: none;
  }
  .footer-policy a:hover {
    color: var(--white);
  }

  /* 모달 */
  .modal-custom {
    position: fixed;
    inset: 0;
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
  }
  .modal-content-custom {
    position: relative;
    background: var(--white);
    border-radius: var(--radius-xl);
    max-width: 480px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-xl);
    animation: modalIn 0.3s ease;
  }
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: none;
    background: var(--gray-100);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
  }
  .modal-close:hover {
    background: var(--gray-200);
  }

  /* 필터 바 */
  .filter-bar {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 16px 24px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-sm);
  }
  .filter-count {
    font-size: 14px;
    color: var(--gray-600);
  }
  .filter-count strong {
    color: var(--primary);
    font-weight: 700;
  }
  .filter-sort {
    display: flex;
    gap: 8px;
  }
  .sort-btn {
    padding: 8px 16px;
    border: 1px solid var(--gray-300);
    background: var(--white);
    border-radius: 20px;
    font-size: 13px;
    color: var(--gray-700);
    cursor: pointer;
    transition: var(--transition);
  }
  .sort-btn:hover {
    border-color: var(--gray-400);
  }
  .sort-btn.active {
    background: var(--gray-900);
    border-color: var(--gray-900);
    color: var(--white);
  }

  /* 결제 모달 */
  .checkout-modal {
    max-width: 800px;
  }
  .checkout-section {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    margin-bottom: 16px;
    overflow: hidden;
  }
  .checkout-section-header {
    padding: 16px 20px;
    background: var(--gray-50);
    border-bottom: 1px solid var(--gray-200);
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .checkout-section-body {
    padding: 20px;
  }
  .form-label-custom {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 6px;
  }
  .form-control-custom {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    font-size: 14px;
    transition: var(--transition);
  }
  .form-control-custom:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(53, 197, 240, 0.1);
  }
  .payment-method {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .payment-option {
    flex: 1;
    min-width: 120px;
    padding: 16px;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
  }
  .payment-option:hover {
    border-color: var(--gray-300);
  }
  .payment-option.selected {
    border-color: var(--primary);
    background: var(--primary-light);
  }
  .payment-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .payment-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-800);
  }

  /* 헤더 아이콘 버튼 */
  .header-icon-btn {
    position: relative;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    transition: var(--transition);
  }
  .header-icon-btn:hover {
    background: var(--gray-100);
  }
  .header-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 18px;
    height: 18px;
    background: var(--secondary);
    color: white;
    font-size: 11px;
    font-weight: 700;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }

  /* 로그인 버튼 */
  .login-btn {
    padding: 10px 24px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  .login-btn:hover {
    background: var(--primary-dark);
  }

  /* 유저 드롭다운 */
  .user-dropdown {
    position: relative;
  }
  .user-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid var(--gray-300);
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: var(--transition);
  }
  .user-btn:hover {
    border-color: var(--primary);
  }
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .dropdown-menu-custom {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    min-width: 180px;
    overflow: hidden;
    z-index: 100;
    animation: dropdownIn 0.2s ease;
  }
  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .dropdown-item-custom {
    display: block;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: none;
    text-align: left;
    font-size: 14px;
    color: var(--gray-800);
    cursor: pointer;
    transition: var(--transition);
  }
  .dropdown-item-custom:hover {
    background: var(--gray-100);
  }
  .dropdown-divider {
    height: 1px;
    background: var(--gray-200);
    margin: 4px 0;
  }
`;

// 상품 데이터
const allProducts = [
  { id: 1, name: '오크 원목 4인용 식탁 세트', price: 489000, originalPrice: 650000, category: '가구', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', rating: 4.9, reviews: 2847, seller: '우드라이프', badge: 'BEST', description: '20년 경력 장인이 만드는 프리미엄 오크 원목 식탁. 자연 그대로의 나뭇결이 살아있어 인테리어의 포인트가 됩니다. 4인 가족에게 딱 맞는 사이즈로 제작되었습니다.', freeShipping: true },
  { id: 2, name: '북유럽 감성 펜던트 조명 3등', price: 89000, originalPrice: 129000, category: '조명', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop', rating: 4.7, reviews: 1523, seller: '라이팅하우스', badge: 'SALE', description: '심플하면서도 세련된 북유럽 스타일의 펜던트 조명입니다. 따뜻한 LED 전구가 포함되어 있어 분위기 있는 공간을 연출할 수 있습니다.', freeShipping: true },
  { id: 3, name: '프리미엄 호텔식 거위털 이불', price: 159000, originalPrice: 230000, category: '패브릭', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop', rating: 4.8, reviews: 3256, seller: '슬립웰', badge: 'BEST', description: '5성급 호텔에서 사용하는 최고급 거위털 이불. 가볍지만 따뜻하고, 통기성이 뛰어나 사계절 내내 쾌적하게 사용하실 수 있습니다.', freeShipping: true },
  { id: 4, name: '미니멀 디자인 벽걸이 시계', price: 45000, originalPrice: 59000, category: '소품', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', rating: 4.6, reviews: 892, seller: '타임데코', badge: '', description: '군더더기 없는 미니멀한 디자인의 벽걸이 시계. 무소음 무브먼트로 조용한 공간에서도 방해 없이 사용할 수 있습니다.', freeShipping: false },
  { id: 5, name: '빈티지 페르시안 러그 200x300', price: 289000, originalPrice: 450000, category: '패브릭', image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop', rating: 4.9, reviews: 678, seller: '러그마스터', badge: 'SALE', description: '클래식한 페르시안 패턴이 돋보이는 프리미엄 러그. 거실이나 침실에 품격을 더해주며, 발 닿는 감촉이 부드럽습니다.', freeShipping: true },
  { id: 6, name: '모듈형 오픈 선반장 5단', price: 129000, originalPrice: 169000, category: '가구', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop', rating: 4.5, reviews: 2134, seller: '모던리빙', badge: '', description: '자유롭게 조합 가능한 모듈형 오픈 선반장. 책, 소품, 식물 등을 디스플레이하기 좋으며 공간 활용도가 높습니다.', freeShipping: true },
  { id: 7, name: '핸드메이드 라탄 바구니 세트', price: 68000, originalPrice: 89000, category: '소품', image: 'https://images.unsplash.com/photo-1595435193556-fba040e73e5d?w=400&h=400&fit=crop', rating: 4.8, reviews: 1456, seller: '크래프트룸', badge: 'NEW', description: '숙련된 장인이 하나하나 수작업으로 만든 라탄 바구니 3종 세트. 수납은 물론 인테리어 소품으로도 활용도가 높습니다.', freeShipping: false },
  { id: 8, name: 'LED 밝기조절 플로어 스탠드', price: 119000, originalPrice: 159000, category: '조명', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', rating: 4.7, reviews: 987, seller: '라이팅하우스', badge: '', description: '터치로 밝기를 4단계로 조절할 수 있는 플로어 스탠드. 독서등부터 무드등까지 다양하게 활용할 수 있습니다.', freeShipping: true },
  { id: 9, name: '천연 대나무 6인용 식탁', price: 359000, originalPrice: 480000, category: '가구', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop', rating: 4.6, reviews: 534, seller: '에코홈', badge: 'NEW', description: '친환경 대나무 소재로 제작된 6인용 대형 식탁. 단단하면서도 가벼워 이동이 편리합니다.', freeShipping: true },
  { id: 10, name: '보헤미안 마크라메 월행잉', price: 38000, originalPrice: 52000, category: '소품', image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400&h=400&fit=crop', rating: 4.9, reviews: 2341, seller: '핸드크래프트', badge: 'BEST', description: '100% 수작업으로 제작된 보헤미안 스타일 마크라메. 빈 벽을 채워줄 완벽한 아이템입니다.', freeShipping: false },
];

const categories = [
  { id: 'all', name: '전체', icon: '🏠', color: '#35c5f0' },
  { id: 'furniture', name: '가구', icon: '🪑', color: '#ff6b6b' },
  { id: 'lighting', name: '조명', icon: '💡', color: '#ffd93d' },
  { id: 'fabric', name: '패브릭', icon: '🛋️', color: '#6bcb77' },
  { id: 'deco', name: '소품', icon: '🏺', color: '#a855f7' },
  { id: 'kitchen', name: '주방', icon: '🍳', color: '#4d96ff' },
];

const banners = [
  { id: 1, title: '2026 신년맞이\n인테리어 대전', subtitle: '전 상품 최대 70% 할인', cta: '할인 상품 보러가기', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: 'white' },
  { id: 2, title: '프리미엄 가구\n기획전', subtitle: '지금 구매하면 무료 배송', cta: '기획전 바로가기', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: 'white' },
  { id: 3, title: '따뜻한 겨울 준비\n패브릭 컬렉션', subtitle: '이불, 러그, 커튼 총집합', cta: '컬렉션 보기', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: 'white' },
];

export default function ClientShop() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('popular');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  // 배너 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 필터링 및 정렬
  const filteredProducts = allProducts
    .filter(p => selectedCategory === '전체' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'popular') return b.reviews - a.reviews;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  // 장바구니 함수
  const addToCart = (product, qty = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty < 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const getDiscount = (original, current) => Math.round((1 - current / original) * 100);

  // 상품 카드 컴포넌트
  const ProductCard = ({ product }) => (
    <div className="product-card" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className={`badge-${product.badge.toLowerCase()}`} style={{ position: 'absolute', top: '12px', left: '12px' }}>
            {product.badge}
          </span>
        )}
        <button
          className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
          style={{ position: 'absolute', top: '12px', right: '12px' }}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
        >
          {wishlist.includes(product.id) ? '❤️' : '🤍'}
        </button>
        {product.freeShipping && (
          <span className="badge-free-shipping" style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
            무료배송
          </span>
        )}
      </div>
      <div className="product-info">
        <p className="product-seller">{product.seller}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-wrap">
          <span className="product-discount">{getDiscount(product.originalPrice, product.price)}%</span>
          <span className="product-price">₩{product.price.toLocaleString()}</span>
        </div>
        <div className="product-meta">
          <div className="product-rating">
            <span className="star-icon">★</span>
            <span>{product.rating}</span>
          </div>
          <span>리뷰 {product.reviews.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      {/* 헤더 */}
      <header className="header-main">
        {/* 상단 바 */}
        <div className="header-top">
          <div className="container d-flex justify-content-end gap-4">
            <a href="#!" style={{ color: 'inherit', textDecoration: 'none' }}>고객센터</a>
            <a href="#!" style={{ color: 'inherit', textDecoration: 'none' }}>판매자 센터</a>
          </div>
        </div>

        {/* 메인 헤더 */}
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3 gap-4">
            <a href="#!" className="logo" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setSelectedProduct(null); }}>
              마이샵
            </a>

            <div className="search-box">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setCurrentPage('products')}
              />
              <button onClick={() => setCurrentPage('products')}>
                🔍
              </button>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button className="header-icon-btn" onClick={() => setShowCart(true)}>
                🛒
                {cartCount > 0 && <span className="header-badge">{cartCount}</span>}
              </button>

              {isLoggedIn ? (
                <div className="user-dropdown">
                  <button className="user-btn" onClick={() => setShowDropdown(!showDropdown)}>
                    <span className="user-avatar">👤</span>
                    <span>김고객</span>
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu-custom">
                      <button className="dropdown-item-custom">마이페이지</button>
                      <button className="dropdown-item-custom">주문/배송 조회</button>
                      <button className="dropdown-item-custom">찜한 상품</button>
                      <div className="dropdown-divider" />
                      <button className="dropdown-item-custom" onClick={() => { setIsLoggedIn(false); setShowDropdown(false); }}>
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                  로그인
                </button>
              )}
            </div>
          </div>

          {/* 카테고리 네비게이션 */}
          <nav className="category-nav">
            {['전체', '가구', '조명', '패브릭', '소품', '주방', '베스트', '신상품', '이벤트'].map(cat => (
              <a
                key={cat}
                href="#!"
                className={`category-link ${selectedCategory === cat ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setSelectedCategory(cat === '베스트' || cat === '신상품' || cat === '이벤트' ? '전체' : cat); setCurrentPage('products'); }}
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main>
        {/* 홈 페이지 */}
        {currentPage === 'home' && !selectedProduct && (
          <div className="container py-4">
            {/* 메인 배너 */}
            <div className="main-banner">
              <div
                className="banner-slide"
                style={{ background: banners[currentBanner].bg, color: banners[currentBanner].textColor }}
              >
                <div className="banner-content">
                  <h2 style={{ whiteSpace: 'pre-line' }}>{banners[currentBanner].title}</h2>
                  <p>{banners[currentBanner].subtitle}</p>
                  <button className="btn-primary-custom" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                    {banners[currentBanner].cta} →
                  </button>
                </div>
              </div>
              <button className="banner-arrow prev" onClick={() => setCurrentBanner((currentBanner - 1 + banners.length) % banners.length)}>‹</button>
              <button className="banner-arrow next" onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}>›</button>
              <div className="banner-dots">
                {banners.map((_, i) => (
                  <button key={i} className={`banner-dot ${i === currentBanner ? 'active' : ''}`} onClick={() => setCurrentBanner(i)} />
                ))}
              </div>
            </div>

            {/* 카테고리 */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">카테고리</h2>
              </div>
              <div className="category-grid">
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    className="category-item"
                    onClick={() => { setSelectedCategory(cat.name); setCurrentPage('products'); }}
                  >
                    <div className="category-icon" style={{ background: `${cat.color}15` }}>
                      {cat.icon}
                    </div>
                    <div className="category-name">{cat.name}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 베스트 상품 */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">
                  <span style={{ color: '#ff6b6b' }}>🔥</span> 베스트 상품
                </h2>
                <a href="#!" className="section-more" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>
                  더보기 <span>›</span>
                </a>
              </div>
              <div className="product-grid">
                {allProducts.filter(p => p.badge === 'BEST').map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* 특가 상품 */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">
                  <span style={{ color: '#35c5f0' }}>💰</span> 특가 세일
                </h2>
                <a href="#!" className="section-more" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>
                  더보기 <span>›</span>
                </a>
              </div>
              <div className="product-grid">
                {allProducts.filter(p => p.badge === 'SALE').map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* 신상품 */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">
                  <span style={{ color: '#a855f7' }}>✨</span> 신상품
                </h2>
                <a href="#!" className="section-more" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>
                  더보기 <span>›</span>
                </a>
              </div>
              <div className="product-grid">
                {allProducts.filter(p => p.badge === 'NEW').map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 상품 목록 페이지 */}
        {currentPage === 'products' && !selectedProduct && (
          <div className="container py-4">
            <div className="filter-bar">
              <div className="filter-count">
                총 <strong>{filteredProducts.length}</strong>개의 상품
              </div>
              <div className="filter-sort">
                {[
                  { id: 'popular', label: '인기순' },
                  { id: 'newest', label: '최신순' },
                  { id: 'rating', label: '평점순' },
                  { id: 'priceLow', label: '낮은가격순' },
                  { id: 'priceHigh', label: '높은가격순' },
                ].map(sort => (
                  <button
                    key={sort.id}
                    className={`sort-btn ${sortBy === sort.id ? 'active' : ''}`}
                    onClick={() => setSortBy(sort.id)}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-500)' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <p>검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        )}

        {/* 상품 상세 페이지 */}
        {selectedProduct && (
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-images">
                  <div className="detail-main-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                  <div className="detail-thumbnails">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`detail-thumbnail ${i === 1 ? 'active' : ''}`}>
                        <img src={selectedProduct.image} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="detail-info">
                  <div className="detail-breadcrumb">
                    <a href="#!" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setCurrentPage('home'); }}>홈</a>
                    <span> › </span>
                    <a href="#!" onClick={(e) => { e.preventDefault(); setSelectedCategory(selectedProduct.category); setCurrentPage('products'); setSelectedProduct(null); }}>{selectedProduct.category}</a>
                    <span> › </span>
                    <span>{selectedProduct.name}</span>
                  </div>

                  {selectedProduct.badge && (
                    <span className={`badge-${selectedProduct.badge.toLowerCase()}`} style={{ marginBottom: '12px', display: 'inline-block' }}>
                      {selectedProduct.badge}
                    </span>
                  )}

                  <h1 className="detail-title">{selectedProduct.name}</h1>

                  <div className="detail-rating">
                    <span style={{ color: '#ffc107', fontSize: '18px' }}>★★★★★</span>
                    <span style={{ fontWeight: '700' }}>{selectedProduct.rating}</span>
                    <span style={{ color: 'var(--gray-500)' }}>({selectedProduct.reviews.toLocaleString()}개 리뷰)</span>
                  </div>

                  <div className="detail-price-section">
                    <div className="detail-original-price">₩{selectedProduct.originalPrice.toLocaleString()}</div>
                    <div className="detail-price-row">
                      <span className="detail-discount">{getDiscount(selectedProduct.originalPrice, selectedProduct.price)}%</span>
                      <span className="detail-price">₩{selectedProduct.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="detail-info-list">
                    <div className="detail-info-item">
                      <span className="detail-info-label">판매자</span>
                      <span className="detail-info-value">{selectedProduct.seller}</span>
                    </div>
                    <div className="detail-info-item">
                      <span className="detail-info-label">배송비</span>
                      <span className="detail-info-value">{selectedProduct.freeShipping ? <strong style={{ color: 'var(--primary)' }}>무료배송</strong> : '3,000원'}</span>
                    </div>
                    <div className="detail-info-item">
                      <span className="detail-info-label">배송정보</span>
                      <span className="detail-info-value">오늘 주문시 내일 출발</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.8', marginBottom: '24px' }}>
                    {selectedProduct.description}
                  </p>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <span style={{ color: 'var(--gray-600)', fontSize: '14px' }}>수량</span>
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                      <input className="quantity-input" type="text" value={quantity} readOnly />
                      <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                  </div>

                  <div className="total-section">
                    <div className="total-row">
                      <span className="total-label">총 상품금액</span>
                      <span className="total-price">₩{(selectedProduct.price * quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-cart" onClick={() => { addToCart(selectedProduct, quantity); setShowCart(true); }}>
                      🛒 장바구니
                    </button>
                    <button className="btn-buy" onClick={() => { addToCart(selectedProduct, quantity); setShowCheckout(true); }}>
                      바로 구매하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="tab-nav">
              <button className="tab-item active">상품정보</button>
              <button className="tab-item">리뷰 ({selectedProduct.reviews.toLocaleString()})</button>
              <button className="tab-item">문의</button>
              <button className="tab-item">배송/교환/반품</button>
            </div>

            {/* 리뷰 섹션 */}
            <div style={{ padding: '48px 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>구매 리뷰</h3>

              <div className="review-summary">
                <div className="review-score">
                  <div className="review-score-number">{selectedProduct.rating}</div>
                  <div className="review-score-stars">★★★★★</div>
                  <div className="review-score-count">{selectedProduct.reviews.toLocaleString()}개 리뷰</div>
                </div>
                <div className="review-bars">
                  {[
                    { label: '5점', percent: 75 },
                    { label: '4점', percent: 18 },
                    { label: '3점', percent: 5 },
                    { label: '2점', percent: 1 },
                    { label: '1점', percent: 1 },
                  ].map(item => (
                    <div key={item.label} className="review-bar-item">
                      <span className="review-bar-label">{item.label}</span>
                      <div className="review-bar-track">
                        <div className="review-bar-fill" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 리뷰 목록 */}
              {[
                { name: '김*영', rating: 5, date: '2026.01.28', content: '배송도 빠르고 품질도 너무 좋아요! 사진보다 실물이 더 예쁩니다. 거실에 딱 맞는 사이즈고 가족들도 다 만족해요. 재구매 의사 100%입니다 👍', hasPhoto: true },
                { name: '이*수', rating: 5, date: '2026.01.25', content: '고민하다 구매했는데 정말 잘 샀어요. 인테리어가 확 살아났습니다. 배송 기사님도 친절하시고 설치도 깔끔하게 해주셨어요.', hasPhoto: true },
                { name: '박*현', rating: 4, date: '2026.01.22', content: '전체적으로 만족합니다. 가격 대비 퀄리티가 좋아요. 조립이 좀 어려웠지만 설명서대로 하니까 됐어요.', hasPhoto: false },
              ].map((review, i) => (
                <div key={i} className="review-item">
                  <div className="review-header">
                    <div className="review-user">
                      <div className="review-avatar">👤</div>
                      <div className="review-user-info">
                        <div className="review-user-name">{review.name}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  </div>
                  <p className="review-content">{review.content}</p>
                  {review.hasPhoto && (
                    <div className="review-photos">
                      <div className="review-photo"><img src={selectedProduct.image} alt="" /></div>
                      <div className="review-photo"><img src={selectedProduct.image} alt="" /></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 장바구니 슬라이드 패널 */}
      {showCart && (
        <>
          <div className="cart-overlay" onClick={() => setShowCart(false)} />
          <div className="cart-panel">
            <div className="cart-header">
              <h3>🛒 장바구니 ({cartCount})</h3>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <div className="cart-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                  <p>장바구니가 비어있습니다</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>{item.seller}</p>
                          <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{item.name}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="quantity-control" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                          <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>−</button>
                          <input className="quantity-input" type="text" value={item.quantity} readOnly />
                          <button className="quantity-btn" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₩{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: 'var(--gray-600)' }}>총 상품금액</span>
                  <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>₩{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  className="btn-buy"
                  style={{ width: '100%' }}
                  onClick={() => { setShowCart(false); setShowCheckout(true); }}
                >
                  주문하기
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* 결제 모달 */}
      {showCheckout && (
        <div className="modal-custom">
          <div className="modal-backdrop" onClick={() => setShowCheckout(false)} />
          <div className="modal-content-custom checkout-modal" style={{ maxWidth: '720px' }}>
            <button className="modal-close" onClick={() => setShowCheckout(false)}>✕</button>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>주문/결제</h2>

              {/* 배송 정보 */}
              <div className="checkout-section">
                <div className="checkout-section-header">📦 배송 정보</div>
                <div className="checkout-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">받는분 *</label>
                      <input className="form-control-custom" placeholder="이름을 입력하세요" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">연락처 *</label>
                      <input className="form-control-custom" placeholder="010-0000-0000" />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">주소 *</label>
                      <div className="d-flex gap-2 mb-2">
                        <input className="form-control-custom" placeholder="우편번호" style={{ maxWidth: '140px' }} />
                        <button className="btn-outline-custom" style={{ whiteSpace: 'nowrap' }}>주소 찾기</button>
                      </div>
                      <input className="form-control-custom mb-2" placeholder="기본 주소" />
                      <input className="form-control-custom" placeholder="상세 주소" />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">배송 메모</label>
                      <select className="form-control-custom">
                        <option>배송 시 요청사항을 선택하세요</option>
                        <option>문 앞에 놓아주세요</option>
                        <option>경비실에 맡겨주세요</option>
                        <option>배송 전 연락 부탁드립니다</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주문 상품 */}
              <div className="checkout-section">
                <div className="checkout-section-header">🛍️ 주문 상품 ({cart.length})</div>
                <div className="checkout-section-body" style={{ padding: 0 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px 20px', borderBottom: '1px solid var(--gray-200)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontSize: '14px', marginBottom: '4px' }}>{item.name}</p>
                        <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '4px' }}>수량: {item.quantity}개</p>
                        <p style={{ fontWeight: '700', color: 'var(--primary)' }}>₩{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 결제 수단 */}
              <div className="checkout-section">
                <div className="checkout-section-header">💳 결제 수단</div>
                <div className="checkout-section-body">
                  <div className="payment-method">
                    {[
                      { id: 'card', icon: '💳', name: '신용카드' },
                      { id: 'kakao', icon: '🟡', name: '카카오페이' },
                      { id: 'naver', icon: '🟢', name: '네이버페이' },
                      { id: 'bank', icon: '🏦', name: '무통장입금' },
                    ].map(method => (
                      <div
                        key={method.id}
                        className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="payment-icon">{method.icon}</div>
                        <div className="payment-name">{method.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 결제 금액 */}
              <div className="checkout-section">
                <div className="checkout-section-header">💰 결제 금액</div>
                <div className="checkout-section-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span style={{ color: 'var(--gray-600)' }}>상품 금액</span>
                    <span>₩{cartTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span style={{ color: 'var(--gray-600)' }}>배송비</span>
                    <span style={{ color: cartTotal >= 50000 ? 'var(--primary)' : 'inherit' }}>{cartTotal >= 50000 ? '무료' : '₩3,000'}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700' }}>총 결제금액</span>
                    <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)' }}>
                      ₩{(cartTotal + (cartTotal >= 50000 ? 0 : 3000)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="btn-buy"
                style={{ width: '100%', marginTop: '16px', fontSize: '18px', padding: '18px' }}
                onClick={() => { alert('주문이 완료되었습니다! 🎉'); setCart([]); setShowCheckout(false); }}
              >
                ₩{(cartTotal + (cartTotal >= 50000 ? 0 : 3000)).toLocaleString()} 결제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="modal-custom">
          <div className="modal-backdrop" onClick={() => setShowLoginModal(false)} />
          <div className="modal-content-custom" style={{ maxWidth: '420px' }}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
            <div style={{ padding: '48px 40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏠</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>마이샵</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>로그인하고 더 많은 혜택을 누리세요</p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label-custom">이메일</label>
                <input className="form-control-custom" type="email" placeholder="이메일을 입력하세요" />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label-custom">비밀번호</label>
                <input className="form-control-custom" type="password" placeholder="비밀번호를 입력하세요" />
              </div>

              <button
                className="btn-buy"
                style={{ width: '100%', marginBottom: '16px' }}
                onClick={() => { setIsLoggedIn(true); setShowLoginModal(false); }}
              >
                로그인
              </button>

              <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--gray-500)', marginBottom: '24px' }}>
                계정이 없으신가요? <a href="#!" style={{ color: 'var(--primary)', fontWeight: '600' }}>회원가입</a>
              </div>

              <div style={{ position: 'relative', textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ background: 'var(--white)', padding: '0 16px', color: 'var(--gray-400)', fontSize: '13px', position: 'relative', zIndex: 1 }}>또는</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--gray-200)' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-outline-custom" style={{ flex: 1, padding: '12px' }}>🟡 카카오</button>
                <button className="btn-outline-custom" style={{ flex: 1, padding: '12px' }}>🟢 네이버</button>
                <button className="btn-outline-custom" style={{ flex: 1, padding: '12px' }}>🔵 구글</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-logo">마이샵</div>
              <p className="footer-desc">
                집을 더 아름답게, 삶을 더 행복하게.<br />
                당신의 공간을 완성하는 인테리어 쇼핑몰
              </p>
              <div className="footer-social">
                <a href="#!">📷</a>
                <a href="#!">📘</a>
                <a href="#!">🐦</a>
                <a href="#!">📺</a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">고객센터</h4>
              <ul className="footer-links">
                <li><a href="#!">자주 묻는 질문</a></li>
                <li><a href="#!">1:1 문의</a></li>
                <li><a href="#!">배송 조회</a></li>
                <li><a href="#!">교환/반품 안내</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">마이샵 소개</h4>
              <ul className="footer-links">
                <li><a href="#!">회사 소개</a></li>
                <li><a href="#!">채용 안내</a></li>
                <li><a href="#!">제휴/협력 문의</a></li>
                <li><a href="#!">판매자 입점</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">고객센터</h4>
              <p className="footer-cs">1588-0000</p>
              <p className="footer-cs-time">
                평일 10:00 - 18:00<br />
                점심시간 12:30 - 13:30<br />
                주말, 공휴일 휴무
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2026 마이샵 Inc. All rights reserved.
            </div>
            <div className="footer-policy">
              <a href="#!">이용약관</a>
              <a href="#!">개인정보처리방침</a>
              <a href="#!">사업자정보확인</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
