package com.example.pppp.Member.service;

import com.example.pppp.Member.entity.Member;
import com.example.pppp.Member.dto.request.MemberModifyRequestDto;
import com.example.pppp.Member.dto.request.MemberRegisterRequestDto;
import com.example.pppp.Member.respository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    @Override
    public Member register(MemberRegisterRequestDto requestDto) {
        Member member = Member.builder()
                .email(requestDto.getEmail())
                .nickname(requestDto.getNickname())
                .password(requestDto.getPassword())
                .memberGrade(requestDto.getMemberGrade())
                .sex(requestDto.getSex())
                .school(requestDto.getSchool())
                .build();
        return memberRepository.save(member);
    }

    @Override
    public Member getMemberByNickname(String nickname) {
        Member member = memberRepository.findMemberByNickname(nickname);
        return member;
    }

    @Override
    public Member getMemberByMemberId(int memberId) {
        Optional<Member> member = memberRepository.findMemberByMemberId(memberId);
        return member.get();
    }

    @Override
    public Member getMemberByEmail(String email) {
        Member member = memberRepository.findMemberByEmail(email);
        return member;
    }

    @Override
    public Member modifyMember(MemberModifyRequestDto requestDto) {
        Optional<Member> result = memberRepository.findMemberByMemberId(requestDto.getMemberId());
        Member member = result.get();
        member.setNickname(requestDto.getNickname());
        member.setMemberGrade(requestDto.getMemberGrade());
        member.setPassword(requestDto.getPassword());
        memberRepository.save(member);
        return member;
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }
}
