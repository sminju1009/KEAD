package com.example.pppp.LikedBook.service;

import com.example.pppp.LikedBook.dto.AddLikedBookRequest;
import com.example.pppp.LikedBook.entity.LikedBook;
import com.example.pppp.LikedBook.repository.LikedBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class LikedBookService {

    @Autowired
    private final LikedBookRepository likedBookRepository;
    // 좋아요 추가 메서드
    public LikedBook save(AddLikedBookRequest request) {
        // 이미 해당 사용자가 해당 책을 좋아하는지 확인
        Optional<LikedBook> existingLikedBook = likedBookRepository.findByBookIdAndMemberId(request.getBookId(), request.getMemberId());

        // 이미 좋아하는 책이 있는 경우 좋아요 취소
        if (existingLikedBook.isPresent()) {
            likedBookRepository.delete(existingLikedBook.get());
            return null; // 좋아요 취소되었으므로 반환할 값이 없음
        }
        // 새로운 좋아하는 책 생성 및 저장
        LikedBook likedBook = new LikedBook(request.getBookId(), request.getMemberId());
        return likedBookRepository.save(likedBook);
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
