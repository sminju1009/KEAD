package com.example.pppp.LikedBook.controller;

import com.example.pppp.LikedBook.dto.AddLikedBookRequest;
import com.example.pppp.LikedBook.entity.LikedBook;
import com.example.pppp.LikedBook.service.LikedBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class LikedBookController {

    private final LikedBookService likedBookService;

    @PostMapping("/book/{bookId}/like")
    public ResponseEntity<LikedBook> addLikedBook(@PathVariable("bookId") int bookId, @RequestBody AddLikedBookRequest request, HttpServletRequest httpRequest) {
        // 사용자의 아이디를 추출하여 memberId로 설정
        int memberId = extractMemberIdFromHeader(httpRequest);
        request.setBookId(bookId);
        request.setMemberId(memberId);

        LikedBook savedLikedBook = likedBookService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedLikedBook);
    }

    @DeleteMapping("/book/{bookId}/like")
    public ResponseEntity<Void> removeLikedBook(@PathVariable("bookId") int bookId, HttpServletRequest httpRequest) {
        // 사용자의 아이디를 추출하여 memberId로 설정
        int memberId = extractMemberIdFromHeader(httpRequest);

        likedBookService.deleteByBookIdAndMemberId(bookId, memberId);
        return ResponseEntity.noContent().build();
    }

    // 헤더에서 사용자 아이디를 추출하는 메서드
    private int extractMemberIdFromHeader(HttpServletRequest request) {
        // 여기에 실제 로직을 구현하녀 헤더에서 사용자 아이드를 추출하는 코드를 작성합니다.
        // 예시로 헤더의 "X-UserId"를 사용자 아이디로 가정합니다.
        String userIdHeader = request.getHeader("X-UserId");
        if (userIdHeader != null) {
            return Integer.parseInt(userIdHeader);
        } else {
            // 헤더에서 사용자 아이디를 찾을 수 없는 경우 예외처리 또는 기본값을 반환할 수 있습니다.
            // 여기서는 임시로 777을 반환합니다.
            return 777;
        }
    }


}
