---
description: 백엔드 문서를 프론트엔드 프로젝트와 동기화
---

# 백엔드 문서 동기화 Workflow

이 workflow는 백엔드 프로젝트(`MY_SHOP`)의 핵심 문서를 프론트엔드 프로젝트(`MY_SHOP_FRONT`)와 동기화합니다.

## 동기화 대상 문서

1. **PROJECT.md** - 프로젝트 지침서 (아키텍처, 기술 스택, 설계 원칙)
2. **REQUIREMENTS.md** - 기능 요구사항 정의서
3. **ENTITY_STRUCTURE.md** - JPA Entity 구조 문서
4. **TABLE_SCHEMA.dbml** - 데이터베이스 스키마 정의
5. **ERD_IMPROVEMENTS.md** - ERD 개선 사항 (선택)

## 동기화 절차

### 1. 백엔드 문서 디렉토리 확인
```bash
ls -la /Users/bh/project/MY_SHOP/.agent/
```

### 2. 프론트엔드 .agent 디렉토리가 없는 경우 생성
```bash
mkdir -p /Users/bh/project/MY_SHOP_FRONT/.agent
```

// turbo
### 3. 핵심 문서 복사
```bash
cp /Users/bh/project/MY_SHOP/.agent/PROJECT.md /Users/bh/project/MY_SHOP_FRONT/.agent/
cp /Users/bh/project/MY_SHOP/.agent/REQUIREMENTS.md /Users/bh/project/MY_SHOP_FRONT/.agent/
cp /Users/bh/project/MY_SHOP/.agent/ENTITY_STRUCTURE.md /Users/bh/project/MY_SHOP_FRONT/.agent/
cp /Users/bh/project/MY_SHOP/.agent/TABLE_SCHEMA.dbml /Users/bh/project/MY_SHOP_FRONT/.agent/
```

// turbo
### 4. ERD 개선 문서 복사 (선택)
```bash
cp /Users/bh/project/MY_SHOP/.agent/ERD_IMPROVEMENTS.md /Users/bh/project/MY_SHOP_FRONT/.agent/
```

// turbo
### 5. 복사 완료 확인
```bash
ls -la /Users/bh/project/MY_SHOP_FRONT/.agent/
```

### 6. 동기화 상태 README 생성
프론트엔드 `.agent` 디렉토리에 동기화 정보를 담은 README 파일을 생성합니다.

```bash
cat > /Users/bh/project/MY_SHOP_FRONT/.agent/README.md << 'EOF'
# MY_SHOP_FRONT 문서 디렉토리

이 디렉토리는 백엔드 프로젝트(`MY_SHOP`)의 핵심 문서를 참조합니다.

## 문서 동기화

다음 문서들은 백엔드 프로젝트에서 복사되었습니다:
- `PROJECT.md` - 프로젝트 전체 지침서
- `REQUIREMENTS.md` - 기능 요구사항
- `ENTITY_STRUCTURE.md` - Entity 구조
- `TABLE_SCHEMA.dbml` - DB 스키마

## 문서 업데이트

백엔드 문서가 변경된 경우, 다음 workflow를 실행하여 동기화하세요:
\`\`\`bash
# workflow 실행 방법
# Agent에게 "/sync-backend-docs" 명령 실행 요청
\`\`\`

## 주의사항

- 이 문서들은 백엔드 소스를 참조합니다
- 프론트엔드에서 임의로 수정하지 마세요
- 변경이 필요한 경우 백엔드 프로젝트에서 먼저 수정 후 동기화하세요
EOF
```

## 사용 방법

### 초기 동기화
```bash
# Agent에게 다음과 같이 요청
"/sync-backend-docs 명령어를 실행해줘"
```

### 정기 동기화
백엔드 문서가 업데이트될 때마다 이 workflow를 실행하여 최신 상태를 유지하세요.

## 참고

- 백엔드 프로젝트 경로: `/Users/bh/project/MY_SHOP`
- 프론트엔드 프로젝트 경로: `/Users/bh/project/MY_SHOP_FRONT`
- 이 workflow는 단방향 동기화(백엔드 → 프론트엔드)입니다
