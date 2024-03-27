package com.example.pppp.Bookreport.dto;

import com.example.pppp.Bookreport.entity.Bookreport;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookreportResponse {

    private final String reportContent;
    private final LocalDate reportTime;
    private final String isbn;
    private final int bookMemberRate;

    public BookreportResponse(Bookreport bookreport) {
        this.reportContent = bookreport.getReportContent();
        this.reportTime = bookreport.getReportTime();
        this.isbn = bookreport.getIsbn();
        this.bookMemberRate = bookreport.getBookMemberRate();
    }
}
