package com.example.pppp.Member.service;

import com.example.pppp.Member.entity.Member;
import com.example.pppp.Member.dto.request.MemberModifyRequestDto;
import com.example.pppp.Member.dto.request.MemberRegisterRequestDto;

public interface MemberService {
    Member register(MemberRegisterRequestDto requestDto);

    Member getMemberByNickname(String nickname);

    Member getMemberByEmail(String email);

    void modifyMember(MemberModifyRequestDto requestDto);

}
