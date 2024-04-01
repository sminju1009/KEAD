package com.example.pppp.LikedBook.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // 엔티티로 지정
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="liked_book")
public class LikedBook {

    @Id //id 필드를 기본키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키를 자동으로 1씩 증가
    @Column(name = "read_book_id", updatable = false)
    private int bookLikeId;

    @Column(name = "book_id", nullable = false)
    private int bookId;

    @Column(name = "member_id", nullable = false)
    private int memberId;

    @Builder // 빌더 패턴으로 객체 생성
    public LikedBook(int bookId, int memberId) {
        this.bookId = bookId;
        this.memberId = memberId;
    }
}
