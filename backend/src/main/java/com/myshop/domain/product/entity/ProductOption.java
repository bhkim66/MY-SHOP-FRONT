package com.myshop.domain.product.entity;

import com.myshop.common.dbml.DbmlNote;
import com.myshop.domain.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * 상품 옵션 Entity
 */
@Entity
@Table(name = "PRODUCT_OPTIONS",
    indexes = {
        @Index(name = "IDX_PRODUCT_OPTION_PRODUCT", columnList = "PRODUCT_SEQ")
    }
)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProductOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("옵션 고유 번호")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_SEQ", nullable = false)
    @DbmlNote("상품 SEQ")
    private Product product;

    @Column(name = "OPTION_NAME", nullable = false, length = 100)
    @DbmlNote("옵션명 (예: 색상/사이즈)")
    private String optionName;

    @Column(name = "OPTION_VALUE", nullable = false, length = 100)
    @DbmlNote("옵션값 (예: 블랙/M)")
    private String optionValue;

    @Column(name = "ADDITIONAL_PRICE", nullable = false)
    @DbmlNote("추가 금액(원)")
    @Builder.Default
    private Integer additionalPrice = 0;

    @Column(name = "STOCK_QTY", nullable = false)
    @DbmlNote("옵션 재고")
    @Builder.Default
    private Integer stockQty = 0;

    @Column(name = "STATUS", nullable = false, length = 20)
    @DbmlNote("ACTIVE, INACTIVE")
    @Builder.Default
    private String status = "ACTIVE";

    // ============================================
    // Business Methods
    // ============================================

    /**
     * 재고 감소
     */
    public void decreaseStock(int qty) {
        if (this.stockQty < qty) {
            throw new IllegalStateException("옵션 재고가 부족합니다.");
        }
        this.stockQty -= qty;
    }

    /**
     * 재고 증가
     */
    public void increaseStock(int qty) {
        this.stockQty += qty;
    }
}
