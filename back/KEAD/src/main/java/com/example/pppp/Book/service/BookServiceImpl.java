package com.example.pppp.Book.service;

import com.example.pppp.Book.dto.response.BookResponseDto;
import com.example.pppp.Book.entity.Book;
import com.example.pppp.Book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public BookResponseDto getBookDetails(int bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("책을 조회할 수 없습니다."));
        return new BookResponseDto(
                book.getBookId(),
                book.getBookName(),
                book.getImgUrl(),
                book.getAuthor(),
                book.getPublisher(),
                book.getBookCategory(), // 예제 코드에는 'genre' 속성에 해당하는 필드가 없으므로, 'bookCategory'를 genre로 간주하고 사용했습니다.
                book.getDescription(),
                book.getIsbn()
        );
    }

}