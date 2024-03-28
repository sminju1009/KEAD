package com.example.pppp.LikedBook.controller;

import com.example.pppp.LikedBook.dto.AddLikedBookRequest;
import com.example.pppp.LikedBook.entity.LikedBook;
import com.example.pppp.LikedBook.service.LikedBookService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class LikedBookController {

    private final LikedBookService likedBookService;

    @PostMapping("/book/{bookId}/like")
    public ResponseEntity<LikedBook> addLikedBook(@PathVariable("bookId") int bookId, @RequestBody AddLikedBookRequest request) {
        request.setBookId(bookId);
        LikedBook savedLikedBook = likedBookService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedLikedBook);
    }


}
