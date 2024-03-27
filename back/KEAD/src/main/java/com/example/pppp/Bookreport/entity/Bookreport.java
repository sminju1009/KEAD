package com.example.pppp.Bookreport.entity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.awt.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bookreport {
    @Id // id 필드키를 기본키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키를 자동으로 1씩 증가
    @Column(name = "report_id", updatable = false)
    private int reportId;

    @Column(name="report_content", nullable = true)
    private String reportContent;

    @Column(name="report_time", nullable = true)
    private LocalDate reportTime;

    @Column(name = "isbn", columnDefinition = "varchar(14)", nullable = false)
    private String isbn;

    @Column(name="book_member_rate", nullable = true)
    private int bookMemberRate;

    @Builder // 빌더 패턴으로 객체 생성
    public Bookreport(String reportContent, LocalDate reportTime, String isbn, int bookMemberRate) {
        this.reportContent = reportContent;
        this.reportTime = reportTime;
        this.isbn = isbn;
        this.bookMemberRate = bookMemberRate;
    }}


