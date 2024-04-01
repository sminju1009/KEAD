package com.example.pppp.LikedBook.service;

import com.example.pppp.LikedBook.dto.AddLikedBookRequest;
import com.example.pppp.LikedBook.entity.LikedBook;
import com.example.pppp.LikedBook.repository.LikedBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class LikedBookService {

    @Autowired
    private final LikedBookRepository likedBookRepository;
    // 좋아요 추가 메서드
    public LikedBook save(AddLikedBookRequest request) {

        return likedBookRepository.save(request.toEntity());
    }


    // BookId와 MemberId를 이용하여 좋아요를 삭제하는 메서드
    @Transactional
    public void deleteByBookIdAndMemberId(int bookId, int memberId) {
        likedBookRepository.deleteByBookIdAndMemberId(bookId, memberId);
    }

    public List<LikedBook> getLikedBooksByUserId(int userId) {
        return likedBookRepository.findByMemberId(userId);
    }
}
