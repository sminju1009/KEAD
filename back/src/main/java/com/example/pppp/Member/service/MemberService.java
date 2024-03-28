package com.example.pppp.Member.service;

import com.example.pppp.Member.entity.Member;
import com.example.pppp.Member.dto.request.MemberModifyRequestDto;
import com.example.pppp.Member.dto.request.MemberRegisterRequestDto;

public interface MemberService {
    Member register(MemberRegisterRequestDto requestDto);

    Member getMemberByNickname(String nickname);

    Member getMemberByMemberId(int memberId);

    Member getMemberByEmail(String email);

    Member modifyMember(MemberModifyRequestDto requestDto);

    Boolean checkEmailDuplicate(String email);

    Boolean checkNicknameDuplicate(String nickname);

    Member save(Member member);

}
