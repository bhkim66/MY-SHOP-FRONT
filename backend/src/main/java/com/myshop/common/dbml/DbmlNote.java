package com.myshop.common.dbml;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * DBML 생성 시 컬럼 설명(note)을 추가하기 위한 커스텀 어노테이션
 *
 * 사용 예시:
 * @DbmlNote("유저 아이디")
 * @Column(name = "LOGIN_ID", nullable = false)
 * private String loginId;
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DbmlNote {
    /**
     * DBML note에 표시될 설명
     */
    String value();
}
