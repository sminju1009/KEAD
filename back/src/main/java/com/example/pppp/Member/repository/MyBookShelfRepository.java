package com.example.pppp.Member.repository;

import com.example.pppp.Member.entity.MybookShelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MybookShelfRepository extends JpaRepository<MybookShelf, Integer> {
    List<MybookShelf> findAllByMemberId(int memberId); //모두 가져오기?
    List<Object[]> findBookNameAndReportContentAndReportTimeByMemberIdAndBookId(int memberId, int bookId);

    MybookShelf findByMemberIdAndBookId(int memberId, int bookId); //삭제함수
    // 여기에 필요한 추가적인 메서드를 선언할 수 있습니다.
}

