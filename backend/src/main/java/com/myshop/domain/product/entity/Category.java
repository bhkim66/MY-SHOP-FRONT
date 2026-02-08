package com.myshop.domain.product.entity;

import com.myshop.common.dbml.DbmlNote;
import com.myshop.domain.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 카테고리 Entity (계층형 구조)
 */
@Entity
@Table(name = "CATEGORIES",
    uniqueConstraints = {
        @UniqueConstraint(name = "UK_CATEGORY_SLUG", columnNames = {"CATEGORY_SLUG"})
    },
    indexes = {
        @Index(name = "IDX_CATEGORY_PARENT", columnList = "PARENT_SEQ")
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("카테고리 고유 번호")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_SEQ")
    @DbmlNote("상위 카테고리 SEQ (NULL이면 대분류)")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Category> children = new ArrayList<>();

    @Column(name = "CATEGORY_NAME", nullable = false, length = 100)
    @DbmlNote("카테고리명")
    private String categoryName;

    @Column(name = "CATEGORY_SLUG", nullable = false, length = 100)
    @DbmlNote("카테고리 식별자(URL용)")
    private String categorySlug;

    @Column(name = "ICON_NAME", length = 50)
    @DbmlNote("아이콘명 (예: fa-couch)")
    private String iconName;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    @DbmlNote("표시 순서")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "IS_ACTIVE", nullable = false, length = 1)
    @DbmlNote("활성 여부 (Y/N)")
    @Builder.Default
    private String isActive = "Y";
}
