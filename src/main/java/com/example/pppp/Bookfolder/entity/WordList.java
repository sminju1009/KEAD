package com.example.pppp.Bookfolder.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;

@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Entity
@Table(name = "word_list")
public class WordList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookId;

    @Column(name = "word_list", columnDefinition = "json")
    private String wordList;

    // 생성자, getter, setter 등 필요한 코드 추가

    public WordList() {
    }

    public WordList(int bookId, String wordList) {
        this.bookId = bookId;
        this.wordList = wordList;
    }

    // Getter and Setter methods
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getWordList() {
        return wordList;
    }

    public void setWordList(String wordList) {
        this.wordList = wordList;
    }
}