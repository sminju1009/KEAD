package com.example.pppp.book.service;

import com.example.pppp.book.dto.response.BookResponseDto;

public interface BookService {
    BookResponseDto getBookDetails(int bookId);
}