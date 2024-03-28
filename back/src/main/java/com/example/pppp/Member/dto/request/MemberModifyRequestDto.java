package com.example.pppp.Member.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberModifyRequestDto {
    private int memberId;

    private String nickname;

    private int memberGrade;

    private String password;
}
