package com.myshop.common.dbml;

import java.util.ArrayList;
import java.util.List;

/**
 * DBML 생성 대상 Entity 클래스 등록소
 *
 * 새로운 Entity를 추가할 때마다 이 파일에 등록해야 DBML에 포함됨
 *
 * TODO: Reflections 라이브러리 사용 시 자동 스캔으로 대체 가능
 *       implementation 'org.reflections:reflections:0.10.2'
 */
public class EntityRegistry {

    /**
     * DBML 생성 대상 Entity 클래스 목록 반환
     * 새 Entity 추가 시 여기에 등록
     */
    public static List<Class<?>> getEntityClasses() {
        List<Class<?>> entities = new ArrayList<>();

        // ============================================
        // 🔐 사용자 관련
        // ============================================
        // entities.add(com.myshop.domain.user.entity.User.class);
        // entities.add(com.myshop.domain.user.entity.UserSocialAccount.class);
        // entities.add(com.myshop.domain.user.entity.ShippingAddress.class);

        // ============================================
        // 🏪 마켓 관련
        // ============================================
        // entities.add(com.myshop.domain.market.entity.Market.class);

        // ============================================
        // 📦 상품 관련
        // ============================================
        // entities.add(com.myshop.domain.product.entity.Category.class);
        // entities.add(com.myshop.domain.product.entity.Product.class);
        // entities.add(com.myshop.domain.product.entity.ProductImage.class);
        // entities.add(com.myshop.domain.product.entity.ProductOption.class);

        // ============================================
        // ⭐ 리뷰 & 위시리스트
        // ============================================
        // entities.add(com.myshop.domain.review.entity.Review.class);
        // entities.add(com.myshop.domain.review.entity.ReviewImage.class);
        // entities.add(com.myshop.domain.wishlist.entity.Wishlist.class);

        // ============================================
        // 🛒 장바구니
        // ============================================
        // entities.add(com.myshop.domain.cart.entity.Cart.class);
        // entities.add(com.myshop.domain.cart.entity.CartItem.class);

        // ============================================
        // 🧾 주문 / 결제
        // ============================================
        // entities.add(com.myshop.domain.order.entity.Order.class);
        // entities.add(com.myshop.domain.order.entity.OrderItem.class);
        // entities.add(com.myshop.domain.payment.entity.Payment.class);

        // ============================================
        // 🎟️ 쿠폰
        // ============================================
        // entities.add(com.myshop.domain.coupon.entity.Coupon.class);
        // entities.add(com.myshop.domain.coupon.entity.UserCoupon.class);

        // ============================================
        // 💰 정산
        // ============================================
        // entities.add(com.myshop.domain.settlement.entity.Settlement.class);
        // entities.add(com.myshop.domain.settlement.entity.SettlementOrder.class);

        // ============================================
        // 🎨 배너 / 알림
        // ============================================
        // entities.add(com.myshop.domain.banner.entity.Banner.class);
        // entities.add(com.myshop.domain.notification.entity.Notification.class);

        // ============================================
        // 🤖 AI 기능
        // ============================================
        // entities.add(com.myshop.domain.ai.entity.AiContent.class);
        // entities.add(com.myshop.domain.ai.entity.ChatbotLog.class);

        // ============================================
        // 📊 로그
        // ============================================
        // entities.add(com.myshop.domain.log.entity.ProductViewLog.class);
        // entities.add(com.myshop.domain.log.entity.SearchLog.class);

        return entities;
    }
}
