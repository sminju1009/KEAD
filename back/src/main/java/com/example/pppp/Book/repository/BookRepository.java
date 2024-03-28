package com.example.pppp.Book.repository;

import com.example.pppp.Book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
