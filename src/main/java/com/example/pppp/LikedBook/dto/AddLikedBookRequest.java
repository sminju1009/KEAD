package com.example.pppp.LikedBook.dto;

import com.example.pppp.LikedBook.entity.LikedBook;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
@Setter
public class AddLikedBookRequest {

    private int bookId;
    private int memberId;

    public LikedBook toEntity() { // 생성자를 사용해 객체 생성
        return LikedBook.builder()
                .bookId(bookId)
                .memberId(memberId)
                .build();
    }
}
