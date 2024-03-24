package org.example.kead.member.repository;

import org.example.kead.member.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired MemberRepository memberRepository;

    @Test
    public void joinTest() {
        Member member = Member.builder()
                .member_id(1)
                .email("sminju1009@gmail.com")
                .password("123456")
                .nickname("만쥬")
                .member_grade(6)
                .sex(1)
                .authority(0)
                .school("광주동산초등학교")
                .login_days(0)
                .build();

        // create test
        memberRepository.save(member);

        // get test
        Member foundMember = memberRepository.findById(1).get();
    }
}
