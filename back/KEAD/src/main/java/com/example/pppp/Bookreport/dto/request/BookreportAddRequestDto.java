package com.example.pppp.Bookreport.dto.request;

import com.example.pppp.Bookreport.entity.Bookreport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
@Setter
public class BookreportAddRequestDto {

    private String reportContent;
    private LocalDate reportTime;
    private String isbn;
    private int bookMemberRate;

    public Bookreport toEntity() { // 생성자를 사용해 객체 생성
        return Bookreport.builder()
                .reportContent(reportContent)
                .reportTime(reportTime)
                .isbn(isbn)
                .bookMemberRate(bookMemberRate)
                .build();
    }
}
