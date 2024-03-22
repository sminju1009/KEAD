package org.example.kead.member.repository;

import org.example.kead.member.repository.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}
