//package com.example.pppp.Bookfolder.service;
//
//import com.example.pppp.Bookfolder.entity.Member;
//import com.example.pppp.Bookfolder.dto.request.MemberModifyRequestDto;
//import com.example.pppp.Bookfolder.dto.request.MemberRegisterRequestDto;
//import com.example.pppp.Bookfolder.respository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class MemberServiceImpl implements MemberService {
//    private final MemberRepository memberRepository;
//    @Override
//    public Member register(MemberRegisterRequestDto requestDto) {
//        Member member = Member.builder()
//                .email(requestDto.getEmail())
//                .nickname(requestDto.getNickname())
//                .password(requestDto.getPassword())
//                .memberGrade(requestDto.getMemberGrade())
//                .sex(requestDto.getSex())
//                .school(requestDto.getSchool())
//                .build();
//        return memberRepository.save(member);
//    }
//
//    @Override
//    public Member getMemberByNickname(String nickname) {
//        Member member = memberRepository.findMemberByNickname(nickname);
//        return member;
//    }
//
//    @Override
//    public Member getMemberByEmail(String email) {
//        Member member = memberRepository.findMemberByEmail(email);
//        return member;
//    }
//
//    @Override
//    public void modifyMember(MemberModifyRequestDto requestDto) {
//        Member member = memberRepository.findMemberByMemberId(requestDto.getMemberId());
//        member.setNickname(requestDto.getNickname());
//        member.setMemberGrade(requestDto.getMemberGrade());
//        member.setPassword(requestDto.getPassword());
//        memberRepository.save(member);
//    }
//}
