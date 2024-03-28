package com.example.pppp.LikedBook.repository;

import com.example.pppp.LikedBook.entity.LikedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedBookRepository extends JpaRepository<LikedBook, Integer> {
}
