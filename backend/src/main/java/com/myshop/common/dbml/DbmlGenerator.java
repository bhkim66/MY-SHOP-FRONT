package com.myshop.common.dbml;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * JPA Entity 클래스들을 스캔하여 DBML 파일을 자동 생성하는 유틸리티
 *
 * 사용법:
 * 1. 직접 실행: DbmlGenerator.main() 실행
 * 2. Gradle Task: ./gradlew generateDbml
 * 3. 테스트에서 실행: @SpringBootTest + @Autowired DbmlGenerator
 */
@Component
public class DbmlGenerator {

    private static final String OUTPUT_PATH = "database/schema_generated.dbml";
    private static final String ENTITY_PACKAGE = "com.myshop";

    /**
     * DBML 생성 메인 메서드
     */
    public static void main(String[] args) {
        try {
            DbmlGenerator generator = new DbmlGenerator();
            String dbml = generator.generateDbml();
            generator.writeToFile(dbml);
            System.out.println("✅ DBML 파일 생성 완료: " + OUTPUT_PATH);
        } catch (Exception e) {
            System.err.println("❌ DBML 생성 실패: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 모든 JPA Entity를 스캔하여 DBML 문자열 생성
     */
    public String generateDbml() {
        StringBuilder dbml = new StringBuilder();

        // 헤더 추가
        dbml.append(generateHeader());

        // Entity 클래스들 스캔
        List<Class<?>> entityClasses = scanEntityClasses();

        // 테이블별 DBML 생성
        Map<String, List<String>> tableRelations = new LinkedHashMap<>();

        for (Class<?> entityClass : entityClasses) {
            dbml.append(generateTableDbml(entityClass, tableRelations));
            dbml.append("\n");
        }

        // 관계(Ref) 추가
        dbml.append("\n// ============================================\n");
        dbml.append("// 🔗 Relationships\n");
        dbml.append("// ============================================\n\n");

        for (Map.Entry<String, List<String>> entry : tableRelations.entrySet()) {
            for (String relation : entry.getValue()) {
                dbml.append(relation).append("\n");
            }
        }

        return dbml.toString();
    }

    /**
     * DBML 파일 헤더 생성
     */
    private String generateHeader() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return String.format("""
            // ============================================
            // MY-SHOP Database Schema
            // Auto-generated from JPA Entities
            // Generated at: %s
            // ============================================

            """, timestamp);
    }

    /**
     * Entity 클래스들을 스캔 (Reflections 라이브러리 대신 수동 등록 방식)
     * 실제 프로젝트에서는 Reflections 라이브러리 사용 권장
     */
    private List<Class<?>> scanEntityClasses() {
        // TODO: 실제 프로젝트에서는 Reflections 라이브러리로 자동 스캔
        // 여기서는 수동으로 Entity 클래스 목록 관리
        return EntityRegistry.getEntityClasses();
    }

    /**
     * 단일 Entity 클래스를 DBML Table 문법으로 변환
     */
    private String generateTableDbml(Class<?> entityClass, Map<String, List<String>> relations) {
        StringBuilder table = new StringBuilder();

        // @Table 어노테이션에서 테이블명 추출
        String tableName = extractTableName(entityClass);
        String alias = generateAlias(tableName);

        table.append(String.format("Table %s", tableName));
        if (alias != null) {
            table.append(String.format(" as %s", alias));
        }
        table.append(" {\n");

        // 필드 처리
        List<Field> allFields = getAllFields(entityClass);

        for (Field field : allFields) {
            if (shouldSkipField(field)) {
                continue;
            }

            String columnDbml = generateColumnDbml(field, tableName, relations);
            if (columnDbml != null) {
                table.append("  ").append(columnDbml).append("\n");
            }
        }

        // 인덱스 추가
        String indexes = generateIndexes(entityClass);
        if (!indexes.isEmpty()) {
            table.append("\n  indexes {\n");
            table.append(indexes);
            table.append("  }\n");
        }

        table.append("}\n");

        return table.toString();
    }

    /**
     * 필드를 DBML 컬럼 문법으로 변환
     */
    private String generateColumnDbml(Field field, String tableName, Map<String, List<String>> relations) {
        // @Transient 필드 스킵
        if (field.isAnnotationPresent(Transient.class)) {
            return null;
        }

        StringBuilder column = new StringBuilder();

        // 컬럼명 추출
        String columnName = extractColumnName(field);

        // 데이터 타입 추출
        String dbType = mapJavaTypeToDbType(field);

        column.append(columnName).append(" ").append(dbType);

        // 속성들 추가
        List<String> attributes = new ArrayList<>();

        // Primary Key
        if (field.isAnnotationPresent(Id.class)) {
            attributes.add("primary key");
            if (field.isAnnotationPresent(GeneratedValue.class)) {
                attributes.add("increment");
            }
        }

        // Not Null
        if (field.isAnnotationPresent(Column.class)) {
            Column col = field.getAnnotation(Column.class);
            if (!col.nullable()) {
                attributes.add("not null");
            }
            if (col.unique()) {
                attributes.add("unique");
            }
        }

        // @JoinColumn (Foreign Key)
        if (field.isAnnotationPresent(JoinColumn.class)) {
            JoinColumn jc = field.getAnnotation(JoinColumn.class);
            if (!jc.nullable()) {
                attributes.add("not null");
            }
        }

        // ManyToOne, OneToOne 관계 처리
        if (field.isAnnotationPresent(ManyToOne.class) || field.isAnnotationPresent(OneToOne.class)) {
            String refTable = extractTableName(field.getType());
            String refColumn = "SEQ"; // 기본 PK 컬럼명

            // 관계 추가
            relations.computeIfAbsent(tableName, k -> new ArrayList<>())
                    .add(String.format("Ref: %s.%s > %s.%s", tableName, columnName, refTable, refColumn));
        }

        // Note (컬럼 설명)
        String note = extractColumnNote(field);
        if (note != null) {
            attributes.add(String.format("note: \"%s\"", note));
        }

        if (!attributes.isEmpty()) {
            column.append(" [").append(String.join(", ", attributes)).append("]");
        }

        return column.toString();
    }

    /**
     * 테이블명 추출
     */
    private String extractTableName(Class<?> entityClass) {
        if (entityClass.isAnnotationPresent(Table.class)) {
            Table table = entityClass.getAnnotation(Table.class);
            if (!table.name().isEmpty()) {
                return table.name();
            }
        }
        // 기본: 클래스명을 UPPER_SNAKE_CASE로 변환
        return camelToSnake(entityClass.getSimpleName()).toUpperCase();
    }

    /**
     * 컬럼명 추출
     */
    private String extractColumnName(Field field) {
        if (field.isAnnotationPresent(Column.class)) {
            Column col = field.getAnnotation(Column.class);
            if (!col.name().isEmpty()) {
                return col.name();
            }
        }
        if (field.isAnnotationPresent(JoinColumn.class)) {
            JoinColumn jc = field.getAnnotation(JoinColumn.class);
            if (!jc.name().isEmpty()) {
                return jc.name();
            }
        }
        // 기본: 필드명을 UPPER_SNAKE_CASE로 변환
        return camelToSnake(field.getName()).toUpperCase();
    }

    /**
     * Java 타입을 DB 타입으로 매핑
     */
    private String mapJavaTypeToDbType(Field field) {
        Class<?> type = field.getType();

        // @ManyToOne, @OneToOne 관계는 FK이므로 integer
        if (field.isAnnotationPresent(ManyToOne.class) || field.isAnnotationPresent(OneToOne.class)) {
            return "integer";
        }

        // @Column의 length, precision 활용
        if (field.isAnnotationPresent(Column.class)) {
            Column col = field.getAnnotation(Column.class);
            if (type == String.class) {
                int length = col.length();
                return length > 0 ? String.format("varchar2(%d)", length) : "varchar2(255)";
            }
        }

        // 기본 타입 매핑
        if (type == Long.class || type == long.class) return "bigint";
        if (type == Integer.class || type == int.class) return "integer";
        if (type == String.class) return "varchar2(255)";
        if (type == Boolean.class || type == boolean.class) return "char(1)";
        if (type == java.time.LocalDateTime.class) return "timestamp";
        if (type == java.time.LocalDate.class) return "date";
        if (type == java.math.BigDecimal.class) return "decimal(19,2)";
        if (type == Double.class || type == double.class) return "decimal(19,4)";
        if (type == Float.class || type == float.class) return "decimal(10,2)";

        return "varchar2(255)";
    }

    /**
     * 컬럼 설명(Note) 추출 - @Comment 또는 커스텀 어노테이션 활용
     */
    private String extractColumnNote(Field field) {
        // @DbmlNote 커스텀 어노테이션이 있으면 사용
        if (field.isAnnotationPresent(DbmlNote.class)) {
            return field.getAnnotation(DbmlNote.class).value();
        }

        // @Column의 columnDefinition에서 COMMENT 추출 시도
        if (field.isAnnotationPresent(Column.class)) {
            Column col = field.getAnnotation(Column.class);
            String def = col.columnDefinition();
            if (def.contains("COMMENT")) {
                // COMMENT '설명' 형식에서 추출
                int start = def.indexOf("'") + 1;
                int end = def.lastIndexOf("'");
                if (start > 0 && end > start) {
                    return def.substring(start, end);
                }
            }
        }

        return null;
    }

    /**
     * 인덱스 DBML 생성
     */
    private String generateIndexes(Class<?> entityClass) {
        StringBuilder indexes = new StringBuilder();

        if (entityClass.isAnnotationPresent(Table.class)) {
            Table table = entityClass.getAnnotation(Table.class);

            // Unique Constraints
            for (UniqueConstraint uc : table.uniqueConstraints()) {
                String columns = String.join(", ", uc.columnNames());
                indexes.append(String.format("    (%s) [unique]\n", columns));
            }

            // Indexes
            for (Index idx : table.indexes()) {
                String columns = idx.columnList().replace(" ", "");
                if (idx.unique()) {
                    indexes.append(String.format("    (%s) [unique]\n", columns));
                } else {
                    indexes.append(String.format("    (%s)\n", columns));
                }
            }
        }

        return indexes.toString();
    }

    /**
     * 테이블 별칭 생성 (긴 테이블명용)
     */
    private String generateAlias(String tableName) {
        // 특정 테이블에만 별칭 부여
        Map<String, String> aliases = Map.of(
            "USER", "U",
            "MARKETS", "M",
            "PRODUCTS", "P",
            "ORDERS", "O",
            "PAYMENTS", "PAY",
            "SETTLEMENTS", "S",
            "CATEGORIES", "CAT"
        );
        return aliases.get(tableName);
    }

    /**
     * 상속받은 필드 포함 모든 필드 추출
     */
    private List<Field> getAllFields(Class<?> clazz) {
        List<Field> fields = new ArrayList<>();
        while (clazz != null && clazz != Object.class) {
            fields.addAll(Arrays.asList(clazz.getDeclaredFields()));
            clazz = clazz.getSuperclass();
        }
        return fields;
    }

    /**
     * 스킵할 필드인지 확인
     */
    private boolean shouldSkipField(Field field) {
        // static, final 필드 스킵
        int modifiers = field.getModifiers();
        if (java.lang.reflect.Modifier.isStatic(modifiers)) return true;

        // @OneToMany, @ManyToMany는 스킵 (별도 조인 테이블)
        if (field.isAnnotationPresent(OneToMany.class)) return true;
        if (field.isAnnotationPresent(ManyToMany.class)) return true;

        return false;
    }

    /**
     * camelCase를 snake_case로 변환
     */
    private String camelToSnake(String str) {
        return str.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }

    /**
     * DBML 파일 저장
     */
    public void writeToFile(String dbml) throws IOException {
        Path path = Paths.get(OUTPUT_PATH);
        Files.createDirectories(path.getParent());
        Files.writeString(path, dbml);
    }
}
