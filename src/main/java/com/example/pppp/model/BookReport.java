package com.example.pppp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reportContent; // 독후감 내용
    private String reportTime; // 독후감 작성 날짜
    private int memberId; // 유저 ID

    // 기본 생성자
    public BookReport() {}

    // reportContent 필드에 대한 getter 메서드
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReportContent() {
        return reportContent;
    }

    public String getReportTime() {
        return reportTime;
    }

    public int getMemberId() {
        return memberId;
    }

    // Setter 메서드 생략
}
