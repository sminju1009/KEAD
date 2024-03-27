package com.example.pppp.Book.controller;

import com.example.pppp.Book.dto.response.BookResponseDto;
import com.example.pppp.Book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponseDto> getBookDetails(@PathVariable int bookId) {
        try {
            BookResponseDto bookResponseDto = bookService.getBookDetails(bookId);
            return ResponseEntity.ok(bookResponseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(new BookResponseDto());
        }
    }
}