package com.example.pppp.Book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDto {
    private Integer book_id;
    private String book_name;
    private String img_url;
    private String author;
    private String publisher;
    private Integer genre;
    private String description;
    private String isbn;
    private String message; // 실패 시 메시지 필드 추가

    // 생성자 오버로딩하여 성공 및 실패 시에 대한 생성자 추가
    public BookResponseDto(Integer book_id, String book_name, String img_url, String author, String publisher, Integer genre, String description, String isbn) {
        this.book_id = book_id;
        this.book_name = book_name;
        this.img_url = img_url;
        this.author = author;
        this.publisher = publisher;
        this.genre = genre;
        this.description = description;
        this.isbn = isbn;
    }

    public BookResponseDto(String message) {
        this.message = message;
    }
}