package com.example.pppp;

import com.example.pppp.model.BookReport;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class BookReportController {

    @PostMapping("/users/{userId}/bookreport")
    public BookReport createBookReport(@PathVariable int userId, @RequestBody BookReport bookReport) {
        // 여기에서는 단순히 받은 데이터를 그대로 반환합니다.
        // 실제 애플리케이션에서는 데이터를 처리하는 로직을 추가할 것입니다.
        return bookReport;
    }
}
