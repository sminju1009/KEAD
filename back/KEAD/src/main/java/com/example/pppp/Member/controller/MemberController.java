package com.example.pppp.Member.controller;

import com.example.pppp.Member.auth.MemberDetailService;
import com.example.pppp.Member.auth.MemberDetails;
import com.example.pppp.Member.dto.request.MemberLoginRequestDto;
import com.example.pppp.Member.dto.request.MemberRegisterRequestDto;
import com.example.pppp.Member.dto.response.MemberLoginResponseDto;
import com.example.pppp.Member.entity.Member;
import com.example.pppp.Member.service.MemberService;
import com.example.pppp.Member.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Log4j2
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;
    private final MemberDetailService memberDetailService;
    @PostMapping
    public ResponseEntity<String> register(@RequestBody MemberRegisterRequestDto registerRequestDto) {
        log.info(registerRequestDto);
        memberService.register(registerRequestDto);

        return ResponseEntity.status(200).body("회원가입성공");
    }

    @PostMapping("users/login")
    public ResponseEntity<MemberLoginResponseDto> login(@RequestBody MemberLoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();
        log.info(loginRequestDto);

        Member member = memberService.getMemberByEmail(email);
        String memberId = String.valueOf(member.getMemberId());
        // 앞에랑 뒤에랑 같은지 비교
        if (member.getPassword().equals(password)) {
            MemberDetails memberDetails = (MemberDetails) memberDetailService.loadUserByUsername(memberId);
            String accessToken = jwtTokenUtil.generateToken(memberDetails);
            log.info("로그인 성공");

            MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto(accessToken, member.getNickname());
            return ResponseEntity.ok().body(MemberLoginResponseDto.of(200,"Success Login", accessToken, member.getNickname()));
        }

        return ResponseEntity.status(401).body(MemberLoginResponseDto.of(401, "Invalid Password", null, null));

    }
}
