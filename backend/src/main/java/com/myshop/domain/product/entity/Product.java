package com.myshop.domain.product.entity;

import com.myshop.common.dbml.DbmlNote;
import com.myshop.domain.common.entity.BaseEntity;
import com.myshop.domain.market.entity.Market;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * 상품 Entity
 */
@Entity
@Table(name = "PRODUCTS",
    indexes = {
        @Index(name = "IDX_PRODUCT_MARKET", columnList = "MARKET_SEQ"),
        @Index(name = "IDX_PRODUCT_CATEGORY", columnList = "CATEGORY_SEQ"),
        @Index(name = "IDX_PRODUCT_STATUS", columnList = "STATUS"),
        @Index(name = "IDX_PRODUCT_PRICE", columnList = "PRICE")
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("상품 고유 번호")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MARKET_SEQ", nullable = false)
    @DbmlNote("마켓 SEQ")
    private Market market;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ")
    @DbmlNote("카테고리 SEQ")
    private Category category;

    @Column(name = "PRODUCT_NAME", nullable = false, length = 200)
    @DbmlNote("상품명")
    private String productName;

    @Column(name = "BRAND", length = 100)
    @DbmlNote("브랜드명")
    private String brand;

    @Column(name = "DESCRIPTION", length = 4000)
    @DbmlNote("상품 설명")
    private String description;

    @Column(name = "ORIGINAL_PRICE", nullable = false)
    @DbmlNote("원가(원)")
    private Integer originalPrice;

    @Column(name = "PRICE", nullable = false)
    @DbmlNote("판매가(원)")
    private Integer price;

    @Column(name = "DISCOUNT_RATE")
    @DbmlNote("할인율 (%)")
    @Builder.Default
    private Integer discountRate = 0;

    @Column(name = "STOCK_QTY", nullable = false)
    @DbmlNote("재고 수량")
    @Builder.Default
    private Integer stockQty = 0;

    @Column(name = "STATUS", nullable = false, length = 20)
    @DbmlNote("ON_SALE, SOLD_OUT, HIDDEN")
    @Builder.Default
    private String status = "ON_SALE";

    @Column(name = "THUMBNAIL_URL", length = 500)
    @DbmlNote("대표 이미지 URL")
    private String thumbnailUrl;

    @Column(name = "IS_FREE_SHIPPING", nullable = false, length = 1)
    @DbmlNote("무료배송 여부 (Y/N)")
    @Builder.Default
    private String isFreeShipping = "N";

    @Column(name = "IS_FAST_DELIVERY", nullable = false, length = 1)
    @DbmlNote("빠른배송 여부 (Y/N)")
    @Builder.Default
    private String isFastDelivery = "N";

    @Column(name = "SHIPPING_FEE")
    @DbmlNote("기본 배송비(원)")
    @Builder.Default
    private Integer shippingFee = 0;

    @Column(name = "VIEW_COUNT", nullable = false)
    @DbmlNote("조회수")
    @Builder.Default
    private Integer viewCount = 0;

    @Column(name = "REVIEW_COUNT", nullable = false)
    @DbmlNote("리뷰 수 (비정규화)")
    @Builder.Default
    private Integer reviewCount = 0;

    @Column(name = "RATING_AVG", precision = 2, scale = 1)
    @DbmlNote("평균 평점 (비정규화)")
    @Builder.Default
    private BigDecimal ratingAvg = BigDecimal.ZERO;

    // ============================================
    // 연관관계
    // ============================================

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductOption> options = new ArrayList<>();

    // ============================================
    // Business Methods
    // ============================================

    /**
     * 조회수 증가
     */
    public void increaseViewCount() {
        this.viewCount++;
    }

    /**
     * 재고 감소
     */
    public void decreaseStock(int qty) {
        if (this.stockQty < qty) {
            throw new IllegalStateException("재고가 부족합니다.");
        }
        this.stockQty -= qty;
        if (this.stockQty == 0) {
            this.status = "SOLD_OUT";
        }
    }

    /**
     * 재고 증가 (취소/반품 시)
     */
    public void increaseStock(int qty) {
        this.stockQty += qty;
        if ("SOLD_OUT".equals(this.status) && this.stockQty > 0) {
            this.status = "ON_SALE";
        }
    }

    /**
     * 리뷰 통계 갱신
     */
    public void updateReviewStats(int reviewCount, BigDecimal ratingAvg) {
        this.reviewCount = reviewCount;
        this.ratingAvg = ratingAvg;
    }

    /**
     * 상품 정보 수정
     */
    public void update(String productName, String brand, String description,
                       Integer originalPrice, Integer price, Integer discountRate,
                       String thumbnailUrl, String isFreeShipping, String isFastDelivery,
                       Integer shippingFee) {
        if (productName != null) this.productName = productName;
        if (brand != null) this.brand = brand;
        if (description != null) this.description = description;
        if (originalPrice != null) this.originalPrice = originalPrice;
        if (price != null) this.price = price;
        if (discountRate != null) this.discountRate = discountRate;
        if (thumbnailUrl != null) this.thumbnailUrl = thumbnailUrl;
        if (isFreeShipping != null) this.isFreeShipping = isFreeShipping;
        if (isFastDelivery != null) this.isFastDelivery = isFastDelivery;
        if (shippingFee != null) this.shippingFee = shippingFee;
    }

    /**
     * 이미지 추가
     */
    public void addImage(ProductImage image) {
        this.images.add(image);
        image.setProduct(this);
    }

    /**
     * 옵션 추가
     */
    public void addOption(ProductOption option) {
        this.options.add(option);
        option.setProduct(this);
    }
}
