package com.example.pppp.Book.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    @Column(name="book_id")
    private int bookId;

    @Column(nullable = false) // not null 설정 - 기본값은 null로 설정되어 있습니다.
    private String isbn;

    @Column(nullable = false, name="book_Name")
    private String bookName;

    private String grade;

    @Column(nullable = false, name="school_book_grade")
    private int schoolBookGrade;

    @Column(nullable = false, name="book_category")
    private int bookCategory;

    private int series;

    @Column(name="number_of_pages")
    private int numberOfPages;

    private String author;

    private String publisher;

    @Column(name="publisher_date")
    private Date publisherDate;

    @Column(name="img_url")
    private String imgUrl;

    private String description;

    private BigDecimal score;
}
