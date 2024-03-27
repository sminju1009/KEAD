package com.example.pppp.Member.respository;

import com.example.pppp.Member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findMemberByNickname(String nickname);

    Member findMemberByEmail(String email);

    Member findMemberByMemberId(int memberId);
}


