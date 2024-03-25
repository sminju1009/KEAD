package com.example.pppp.Member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(columnDefinition = "varchar(10) default 'USER'")
    private String role;

    @Column(nullable = false)
    private int sex;

    @Column(nullable = false)
    private int memberGrade;

    @Column(nullable = false)
    private String school;

    private LocalDate lastLoginDate;

    @Column(nullable = false)
    private int loginDays; // 연속 로그인 일수
}
