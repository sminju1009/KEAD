package org.example.kead.member.service;

import lombok.RequiredArgsConstructor;
import org.example.kead.member.repository.MemberRepository;
import org.example.kead.member.entity.Member;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    @Override
    public String join(Integer member_id, String email, String password, String nickname, Integer member_grade, Integer sex, Integer authority, String school, Integer login_days) {
        Member member = Member.builder()
                            .email(email)
                                    .password(password)
                                            .nickname(nickname)
                                                    .member_grade(member_grade)
                                                            .sex(sex)
                                                                    .school(school)
                                                                            .build();
        memberRepository.save(member);

        return "success";
    }
}
