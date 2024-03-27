package com.example.pppp.book.dto.request;

import com.example.pppp.book.entity.Book;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequestDto {
    public int bookId;
}