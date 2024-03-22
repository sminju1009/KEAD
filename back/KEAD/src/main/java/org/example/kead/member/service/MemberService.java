package org.example.kead.member.service;

public interface MemberService {

    String join(Integer member_id, String email, String password, String nickname, Integer member_grade, Integer sex, Integer authority, String school, Integer login_days);

}
