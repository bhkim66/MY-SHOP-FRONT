package com.myshop.domain.market.entity;

import com.myshop.common.dbml.DbmlNote;
import com.myshop.domain.common.entity.BaseEntity;
import com.myshop.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * 마켓(상점) Entity
 */
@Entity
@Table(name = "MARKETS",
    uniqueConstraints = {
        @UniqueConstraint(name = "UK_MARKET_SLUG", columnNames = {"MARKET_SLUG"})
    },
    indexes = {
        @Index(name = "IDX_MARKET_OWNER", columnList = "OWNER_USER_SEQ"),
        @Index(name = "IDX_MARKET_STATUS", columnList = "STATUS")
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Market extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("마켓 고유 번호")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_USER_SEQ", nullable = false)
    @DbmlNote("마켓 소유자(판매자) 유저 SEQ")
    private User owner;

    @Column(name = "MARKET_NAME", nullable = false, length = 100)
    @DbmlNote("마켓명")
    private String marketName;

    @Column(name = "MARKET_SLUG", nullable = false, length = 100)
    @DbmlNote("마켓 식별자(URL용)")
    private String marketSlug;

    @Column(name = "DESCRIPTION", length = 2000)
    @DbmlNote("마켓 소개")
    private String description;

    @Column(name = "LOGO_IMAGE_URL", length = 500)
    @DbmlNote("마켓 로고 이미지")
    private String logoImageUrl;

    @Column(name = "BANNER_IMAGE_URL", length = 500)
    @DbmlNote("마켓 배너 이미지")
    private String bannerImageUrl;

    @Column(name = "BUSINESS_NUMBER", length = 20)
    @DbmlNote("사업자 등록번호")
    private String businessNumber;

    @Column(name = "BANK_NAME", length = 50)
    @DbmlNote("정산 은행명")
    private String bankName;

    @Column(name = "BANK_ACCOUNT", length = 50)
    @DbmlNote("정산 계좌번호")
    private String bankAccount;

    @Column(name = "BANK_HOLDER", length = 50)
    @DbmlNote("예금주")
    private String bankHolder;

    @Column(name = "FEE_RATE", nullable = false, precision = 5, scale = 2)
    @DbmlNote("수수료율 (%)")
    @Builder.Default
    private BigDecimal feeRate = new BigDecimal("3.00");

    @Column(name = "STATUS", nullable = false, length = 20)
    @DbmlNote("ACTIVE, INACTIVE, SUSPENDED")
    @Builder.Default
    private String status = "ACTIVE";

    // ============================================
    // Business Methods
    // ============================================

    /**
     * 마켓 정보 수정
     */
    public void update(String marketName, String description, String logoImageUrl, String bannerImageUrl) {
        if (marketName != null) this.marketName = marketName;
        if (description != null) this.description = description;
        if (logoImageUrl != null) this.logoImageUrl = logoImageUrl;
        if (bannerImageUrl != null) this.bannerImageUrl = bannerImageUrl;
    }

    /**
     * 정산 계좌 정보 수정
     */
    public void updateBankInfo(String bankName, String bankAccount, String bankHolder) {
        this.bankName = bankName;
        this.bankAccount = bankAccount;
        this.bankHolder = bankHolder;
    }

    /**
     * 상태 변경
     */
    public void changeStatus(String status) {
        this.status = status;
    }
}
