package com.example.pppp.Member.respository;

import com.example.pppp.Member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findMemberByNickname(String nickname);

    Optional<Member> findMemberByEmail(String email);

    Optional<Member> findMemberByMemberId(int memberId);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}


