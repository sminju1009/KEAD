package org.example.kead.member.controller;

import lombok.RequiredArgsConstructor;
import org.example.kead.member.dto.JoinRequest;
import org.example.kead.member.service.MemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    //테스트용
    @GetMapping("/hello")
    public String getHello() {
        return "hello Minju!";
    }

    // 회원가입
    @PostMapping("/users")
    public String Join(@RequestBody JoinRequest joinRequest) {

        Integer member_id = joinRequest.getMember_id();
        String email = joinRequest.getEmail();
        String password = joinRequest.getPassword();
        String nickname = joinRequest.getNickname();
        Integer member_grade = joinRequest.getMember_grade();
        Integer sex = joinRequest.getSex();
        Integer authority = joinRequest.getAuthority();
        String school = joinRequest.getSchool();
        Integer login_days = joinRequest.getLogin_days();

        String result = memberService.join(member_id, email, password, nickname, member_grade, sex, authority, school, login_days);

        if (result.equalsIgnoreCase("success")) {
            return "success";
        } else {
            return "fail";
        }

    }
}
