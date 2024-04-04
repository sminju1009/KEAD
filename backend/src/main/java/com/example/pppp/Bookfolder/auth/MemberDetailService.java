//package com.example.pppp.Bookfolder.auth;
//
//
//import com.example.pppp.Bookfolder.entity.Member;
//import com.example.pppp.Bookfolder.respository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.Optional;
//
//
///**
// * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
// */
//@Component
//@RequiredArgsConstructor
//public class MemberDetailService implements UserDetailsService {
//    private final MemberRepository memberRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Member> result = memberRepository.findById(Integer.parseInt(username));
//
//        if (result.isPresent()) {
//            Member member = result.get();
//            MemberDetails userDetails = new MemberDetails(member);
//            userDetails.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(member.getRole())));
//            return userDetails;
//        }
//        return null;
//    }
//}
//
