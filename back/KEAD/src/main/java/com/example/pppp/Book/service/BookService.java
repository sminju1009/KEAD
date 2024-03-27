package com.example.pppp.Book.service;

import com.example.pppp.Book.dto.response.BookResponseDto;

public interface BookService {
    BookResponseDto getBookDetails(int bookId);
}