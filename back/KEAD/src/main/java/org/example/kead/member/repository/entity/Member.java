package org.example.kead.member.repository.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int member_id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int member_grade;

    @Column(nullable = false)
    private int sex;

    @Column(nullable = false)
    private int authority = 0;

    @Column(nullable = false)
    private String school;

    @Column(nullable = false)
    private int login_days = 0;

    @Column(nullable = true)
    private int like_grade;

    @Column(nullable = true)
    private Date last_login_date;



}
