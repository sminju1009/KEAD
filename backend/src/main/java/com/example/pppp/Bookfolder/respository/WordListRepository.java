package com.example.pppp.Bookfolder.respository;

import com.example.pppp.Bookfolder.entity.WordList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Integer> {
    // 추가적인 메서드가 필요한 경우 여기에 선언할 수 있습니다.
}