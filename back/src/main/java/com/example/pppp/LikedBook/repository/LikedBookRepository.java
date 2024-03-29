package com.example.pppp.LikedBook.repository;

import com.example.pppp.LikedBook.entity.LikedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedBookRepository extends JpaRepository<LikedBook, Integer> {
    // BookId와 MemberId를 이용하여 LikedBook을 삭제하는 메서드
    void deleteByBookIdAndMemberId(int bookId, int memberId);

}
