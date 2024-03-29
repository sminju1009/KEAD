package com.example.pppp.Member.controller;

import com.example.pppp.Member.auth.MemberDetailService;
import com.example.pppp.Member.auth.MemberDetails;
import com.example.pppp.Member.common.MemberLoader;
import com.example.pppp.Member.dto.request.MemberLoginRequestDto;
import com.example.pppp.Member.dto.request.MemberModifyRequestDto;
import com.example.pppp.Member.dto.request.MemberRegisterRequestDto;
import com.example.pppp.Member.dto.response.MemberLoginResponseDto;
import com.example.pppp.Member.dto.response.MemberResponseDto;
import com.example.pppp.Member.entity.Member;
import com.example.pppp.Member.service.MemberService;
import com.example.pppp.Member.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pppp.Member.common.MemberLoader;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Log4j2
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;
    private final MemberDetailService memberDetailService;
    private final MemberLoader memberLoader;

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody MemberRegisterRequestDto registerRequestDto) {
        log.info(registerRequestDto);
        memberService.register(registerRequestDto);

        return ResponseEntity.status(200).body("회원가입성공");
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponseDto> login(@RequestBody MemberLoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();
        log.info(loginRequestDto);

        Member member = memberService.getMemberByEmail(email);

        String memberId = String.valueOf(member.getMemberId());
        // 앞에랑 뒤에랑 같은지 비교
        if (member.getPassword().equals(password)) {
            member.setLastLoginDate(LocalDate.now());
            memberService.save(member); // 변경된 회원 정보 저장
            MemberDetails memberDetails = (MemberDetails) memberDetailService.loadUserByUsername(memberId);
            String accessToken = jwtTokenUtil.generateToken(memberDetails);
            log.info("로그인 성공");

            MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto(accessToken, member.getNickname());
            return ResponseEntity.ok().body(MemberLoginResponseDto.of(200,"Success Login", accessToken, member.getNickname()));
        }

        return ResponseEntity.status(401).body(MemberLoginResponseDto.of(401, "Invalid Password", null, null));
    }

    //로그인한 회원 본인의 정보를 조회
    //마이페이지
    // 사용자 이메일을 통해 회원 정보를 조회하는 API
    @GetMapping("/email/{email}")
    public ResponseEntity<MemberResponseDto> getMemberByEmail(@PathVariable String email) {
        Member member = memberService.getMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        MemberResponseDto responseDto = MemberResponseDto.of(member);
        return ResponseEntity.ok(responseDto);
    }

    // Id 로 회원정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<MemberResponseDto> getMemberById(@PathVariable Integer id) {
        Member member = memberService.getMemberByMemberId(id);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        MemberResponseDto responseDto = MemberResponseDto.of(member);
        return ResponseEntity.ok(responseDto);
    }

    // 회원정보수정
    @PostMapping("/{userId}/reset")
    public ResponseEntity<MemberResponseDto> modifyMember(@RequestBody MemberModifyRequestDto requestDto) {
        // 서비스 계층에서 회원 정보 수정 로직 실행
        Member member = memberService.modifyMember(requestDto);
        // MemberResponseDto 생성
        MemberResponseDto responseDto = MemberResponseDto.of(member);
        // 응답 반환
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/email/{email}/check")
    public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(memberService.checkEmailDuplicate(email));
    }

    @GetMapping("/nickname/{nickname}/check")
    public ResponseEntity<Boolean> checkNicknameDuplicate(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.checkNicknameDuplicate(nickname));
    }


}