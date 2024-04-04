package com.example.pppp.Member.common;


import com.example.pppp.Member.auth.MemberDetails;
import com.example.pppp.Member.entity.Member;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MemberLoader {

    public Member getMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof MemberDetails) {
            // MemberDetails에서 Member 정보에 접근
            MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
            // 여기서는 예시로 memberDetails에 직접 Member 객체에 대한 참조가 있다고 가정
            return memberDetails.getMember();
        } else {
            // 적절한 예외 처리 또는 다른 로직
            throw new IllegalStateException("Authenticated principal is not an instance of MemberDetails");
        }
    }

    public String getEmail() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getEmail();
    }
    public int getId() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getMemberId();
    }

    public String getNickname() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getNickname();
    }

}

