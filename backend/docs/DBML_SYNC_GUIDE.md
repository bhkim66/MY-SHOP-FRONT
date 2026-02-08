# 📐 JPA Entity → DBML 자동 동기화 가이드

## 🎯 개요

JPA Entity 클래스를 수정하면 **자동으로 DBML 파일이 생성**되고 **dbdocs.io에 배포**됩니다.

```
[JPA Entity 수정] → [git push] → [GitHub Actions] → [DBML 생성] → [dbdocs 배포]
```

---

## 🚀 빠른 시작

### 1. dbdocs CLI 설치 및 로그인

```bash
# dbdocs CLI 설치
npm install -g dbdocs

# 로그인 (GitHub 계정 연동)
dbdocs login
```

### 2. GitHub Secrets 설정

GitHub 저장소 → Settings → Secrets and variables → Actions에서:

| Secret 이름 | 값 |
|------------|-----|
| `DBDOCS_TOKEN` | dbdocs 토큰 (dbdocs login 후 ~/.dbdocs/token 확인) |

### 3. 로컬에서 테스트

```bash
# DBML 생성
./gradlew generateDbml

# 생성된 파일 확인
cat database/schema_generated.dbml

# dbdocs에 수동 배포
dbdocs build database/schema_generated.dbml --project my-shop-front
```

---

## 📝 Entity 작성 가이드

### @DbmlNote 어노테이션 사용

컬럼 설명을 DBML에 포함시키려면 `@DbmlNote` 어노테이션을 사용하세요.

```java
import com.myshop.common.dbml.DbmlNote;

@Entity
@Table(name = "USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEQ")
    @DbmlNote("유저 고유 번호")  // ← 이 설명이 DBML note로 변환됨
    private Long seq;

    @Column(name = "LOGIN_ID", nullable = false, length = 50)
    @DbmlNote("유저 아이디")
    private String loginId;
}
```

**생성되는 DBML:**

```dbml
Table USER {
  SEQ integer [primary key, increment, note: "유저 고유 번호"]
  LOGIN_ID varchar2(50) [not null, note: "유저 아이디"]
}
```

### 지원되는 JPA 어노테이션

| JPA 어노테이션 | DBML 변환 결과 |
|---------------|----------------|
| `@Id` | `primary key` |
| `@GeneratedValue` | `increment` |
| `@Column(nullable = false)` | `not null` |
| `@Column(unique = true)` | `unique` |
| `@Column(length = 100)` | `varchar2(100)` |
| `@ManyToOne` / `@JoinColumn` | FK 관계 (`Ref:`) |
| `@Table(uniqueConstraints)` | 복합 유니크 인덱스 |
| `@Table(indexes)` | 인덱스 |

### 타입 매핑

| Java 타입 | DBML 타입 |
|-----------|-----------|
| `Long` / `long` | `bigint` |
| `Integer` / `int` | `integer` |
| `String` | `varchar2(length)` |
| `Boolean` / `boolean` | `char(1)` |
| `LocalDateTime` | `timestamp` |
| `LocalDate` | `date` |
| `BigDecimal` | `decimal(19,2)` |

---

## 🔧 Entity 등록

새로운 Entity를 추가하면 `EntityRegistry.java`에 등록해야 합니다.

```java
// EntityRegistry.java
public static List<Class<?>> getEntityClasses() {
    List<Class<?>> entities = new ArrayList<>();

    // 기존 Entity들...
    entities.add(User.class);
    entities.add(Market.class);

    // ✅ 새 Entity 추가
    entities.add(NewEntity.class);

    return entities;
}
```

### Reflections 라이브러리 사용 (자동 스캔)

수동 등록이 번거롭다면 `Reflections` 라이브러리로 자동 스캔할 수 있습니다:

```java
// DbmlGenerator.java 수정
private List<Class<?>> scanEntityClasses() {
    Reflections reflections = new Reflections("com.myshop");
    return new ArrayList<>(reflections.getTypesAnnotatedWith(Entity.class));
}
```

---

## 🔄 워크플로우

### 자동 동기화 (GitHub Actions)

Entity 파일(`**/entity/**/*.java`) 변경 후 push하면 자동 실행됩니다.

```bash
# Entity 수정
git add src/main/java/com/myshop/domain/user/entity/User.java
git commit -m "feat: User 엔티티에 프로필 이미지 필드 추가"
git push origin develop

# → GitHub Actions 자동 실행
# → DBML 생성 및 dbdocs 배포
```

### 수동 실행

GitHub → Actions → DBML Sync → Run workflow

### 로컬 실행

```bash
# DBML만 생성
./gradlew generateDbml

# DBML 생성 + dbdocs 배포
./gradlew deployDbml
```

---

## 📊 결과 확인

배포된 ERD는 다음 URL에서 확인할 수 있습니다:

**https://dbdocs.io/{your-username}/my-shop-front**

---

## 🛠️ 트러블슈팅

### 1. dbdocs 토큰 오류

```bash
# 토큰 재발급
dbdocs logout
dbdocs login

# 토큰 확인
cat ~/.dbdocs/token
```

### 2. Entity가 DBML에 누락됨

`EntityRegistry.java`에 해당 Entity가 등록되어 있는지 확인하세요.

### 3. FK 관계가 생성되지 않음

`@ManyToOne` + `@JoinColumn`이 함께 사용되었는지 확인하세요.

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "MARKET_SEQ", nullable = false)
private Market market;
```

### 4. 컬럼 설명이 누락됨

`@DbmlNote` 어노테이션을 추가하세요.

---

## 📁 파일 구조

```
backend/
├── src/main/java/com/myshop/
│   ├── common/dbml/
│   │   ├── DbmlGenerator.java   # DBML 생성 유틸리티
│   │   ├── DbmlNote.java        # 컬럼 설명 어노테이션
│   │   └── EntityRegistry.java  # Entity 등록소
│   └── domain/
│       ├── user/entity/User.java
│       ├── product/entity/Product.java
│       └── ...
├── database/
│   └── schema_generated.dbml    # 자동 생성된 DBML
├── .github/workflows/
│   └── dbml-sync.yml            # GitHub Actions 설정
└── build.gradle                  # Gradle Task 정의
```

---

## 🔗 관련 링크

- [DBML 문법 가이드](https://dbml.dbdiagram.io/docs/)
- [dbdocs CLI 문서](https://dbdocs.io/docs)
- [dbdiagram.io](https://dbdiagram.io) - DBML 시각화 도구
