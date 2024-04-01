package com.example.pppp.Bookfolder.respository;

import com.example.pppp.Bookfolder.entity.MyBookList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MyBookListRepository extends JpaRepository<MyBookList, Integer> {
    MyBookList findByBookId(int bookId); // 기본적인 책 정보 가져오기


    // 필요한 추가 메서드 선언 가능
}
