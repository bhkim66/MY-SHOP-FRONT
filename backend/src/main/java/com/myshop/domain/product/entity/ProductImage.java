package com.myshop.domain.product.entity;

import com.myshop.common.dbml.DbmlNote;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 상품 이미지 Entity (다중 이미지 지원)
 */
@Entity
@Table(name = "PRODUCT_IMAGES",
    indexes = {
        @Index(name = "IDX_PRODUCT_IMAGE_PRODUCT", columnList = "PRODUCT_SEQ")
    }
)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("이미지 고유 번호")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_SEQ", nullable = false)
    @DbmlNote("상품 SEQ")
    private Product product;

    @Column(name = "IMAGE_URL", nullable = false, length = 500)
    @DbmlNote("이미지 URL")
    private String imageUrl;

    @Column(name = "IMAGE_TYPE", nullable = false, length = 20)
    @DbmlNote("THUMBNAIL, DETAIL, DESCRIPTION")
    @Builder.Default
    private String imageType = "DETAIL";

    @Column(name = "DISPLAY_ORDER", nullable = false)
    @DbmlNote("표시 순서")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @DbmlNote("생성일")
    private LocalDateTime createdAt;

    @Column(name = "CREATED_BY", nullable = false, updatable = false)
    @DbmlNote("생성자")
    private Long createdBy;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
