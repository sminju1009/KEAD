package com.example.pppp.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDto {
    private int bookId;
    private String bookName;
    private String imgUrl;
    private String author;
    private String publisher;
    private int genre;
    private String description;
    private String isbn;

}
