package com.example.pppp.Bookreport.controller;

import java.time.LocalDate;

import com.example.pppp.Bookreport.dto.AddBookreportRequest;
import com.example.pppp.Bookreport.dto.BookreportResponse;
import com.example.pppp.Bookreport.entity.Bookreport;
import com.example.pppp.Bookreport.service.BookreportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BookreportController {

    private final BookreportService bookreportService;

    // HTTP 메서드가 POST일 때 전달받은 URL과 동일하면 메서드로 매핑
    @PostMapping("/users/bookreport")
    // @RequestBody로 요청 본문 값 매핑, URL 경로에서 값 추출
    public ResponseEntity<Bookreport> addBookreport(@RequestBody AddBookreportRequest request) {
        if (request.getReportTime() == null) {
            request.setReportTime(LocalDate.now()); // 현재 날짜로 설정
        }
        Bookreport savedBookreport = bookreportService.save(request);
        // 요청한 자원이 성공적으로 생성되었으며 저장된 독후감 정보를 응답 객체에 담아 전송
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBookreport);
    }

    @GetMapping("/users/{bookreportId}/bookreport")
    // URL 경로에서 값 추출
    public ResponseEntity<BookreportResponse> findBookreport(@PathVariable int bookreportId) {
        Bookreport bookreport = bookreportService.findById(bookreportId);

        return ResponseEntity.ok()
                .body(new BookreportResponse(bookreport));
    }

    @DeleteMapping("/users/{bookreportId}/bookreport")
    public ResponseEntity<Void> deleteBookreport(@PathVariable int bookreportId) {
        bookreportService.delete(bookreportId);

        return ResponseEntity.ok()
                .build();
    }
}
