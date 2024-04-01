package com.example.pppp.Member.dto.response;

import com.example.pppp.Member.entity.Member;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private int memberId;

    private String nickname;

    private String password;

    private String email;

    private int memberGrade;

    private int sex;

    private String school;

    public static MemberResponseDto of (Member member) {
        MemberResponseDto res = new MemberResponseDto();
        res.setMemberId(member.getMemberId());
        res.setNickname(member.getNickname());
        res.setPassword(member.getPassword());
        res.setEmail(member.getEmail());
        res.setMemberGrade(member.getMemberGrade());
        res.setSex(member.getSex());
        res.setSchool(member.getSchool());

        return res;
    }

}
