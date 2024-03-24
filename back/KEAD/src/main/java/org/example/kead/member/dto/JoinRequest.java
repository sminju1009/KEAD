package org.example.kead.member.dto;

import lombok.Data;

@Data
public class JoinRequest {

    private Integer member_id;
    private String email;
    private String password;
    private String nickname;
    private Integer member_grade;
    private Integer sex;
    private Integer authority;
    private String school;
    private Integer login_days;

    // 매개변수를 갖는 생성자 추가
    public JoinRequest(String email, String password, String nickname, Integer member_grade, Integer sex, String school) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.member_grade = member_grade;
        this.sex = sex;
        this.school = school;
    }
}
