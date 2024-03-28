package com.example.pppp.LikedBook.service;

import com.example.pppp.LikedBook.dto.AddLikedBookRequest;
import com.example.pppp.LikedBook.entity.LikedBook;
import com.example.pppp.LikedBook.repository.LikedBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class LikedBookService {

    private final LikedBookRepository likedBookRepository;
    // 좋아요 추가 메서드
    public LikedBook save(AddLikedBookRequest request) {

        return likedBookRepository.save(request.toEntity());
    }
}
