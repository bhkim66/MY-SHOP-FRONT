package com.myshop.domain.user.entity;

import com.myshop.common.dbml.DbmlNote;
import com.myshop.domain.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 사용자 Entity
 */
@Entity
@Table(name = "USER",
    uniqueConstraints = {
        @UniqueConstraint(name = "UK_USER_LOGIN_ID", columnNames = {"LOGIN_ID"}),
        @UniqueConstraint(name = "UK_USER_EMAIL", columnNames = {"EMAIL"})
    },
    indexes = {
        @Index(name = "IDX_USER_ROLE", columnList = "ROLE"),
        @Index(name = "IDX_USER_STATUS", columnList = "STATUS")
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("유저 고유 번호")
    private Long seq;

    @Column(name = "LOGIN_ID", nullable = false, length = 50)
    @DbmlNote("유저 아이디")
    private String loginId;

    @Column(name = "PASSWORD", nullable = false, length = 255)
    @DbmlNote("유저 비번 (BCrypt 암호화)")
    private String password;

    @Column(name = "NAME", nullable = false, length = 100)
    @DbmlNote("유저 이름")
    private String name;

    @Column(name = "EMAIL", length = 255)
    @DbmlNote("이메일 (로그인/알림용)")
    private String email;

    @Column(name = "PHONE", length = 20)
    @DbmlNote("전화번호")
    private String phone;

    @Column(name = "PROFILE_IMAGE_URL", length = 500)
    @DbmlNote("프로필 이미지 URL")
    private String profileImageUrl;

    @Column(name = "ROLE", nullable = false, length = 20)
    @DbmlNote("BUYER, SELLER, ADMIN")
    @Builder.Default
    private String role = "BUYER";

    @Column(name = "STATUS", nullable = false, length = 20)
    @DbmlNote("ACTIVE, INACTIVE, SUSPENDED")
    @Builder.Default
    private String status = "ACTIVE";

    @Column(name = "LAST_LOGIN_AT")
    @DbmlNote("마지막 로그인 일시")
    private LocalDateTime lastLoginAt;

    // ============================================
    // Business Methods
    // ============================================

    /**
     * 로그인 시간 갱신
     */
    public void updateLastLoginAt() {
        this.lastLoginAt = LocalDateTime.now();
    }

    /**
     * 비밀번호 변경
     */
    public void changePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    /**
     * 프로필 정보 수정
     */
    public void updateProfile(String name, String email, String phone, String profileImageUrl) {
        if (name != null) this.name = name;
        if (email != null) this.email = email;
        if (phone != null) this.phone = phone;
        if (profileImageUrl != null) this.profileImageUrl = profileImageUrl;
    }

    /**
     * 계정 상태 변경
     */
    public void changeStatus(String status) {
        this.status = status;
    }

    /**
     * 판매자로 역할 변경
     */
    public void promoteToSeller() {
        this.role = "SELLER";
    }
}
