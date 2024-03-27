package com.example.pppp.Book.dto.request;

import com.example.pppp.Book.entity.Book;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequestDto {
    public int bookId;
}