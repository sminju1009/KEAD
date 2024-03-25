package com.example.pppp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class HomeController {

    @GetMapping("/hello")
    public String home() {
        return "Hello, Spring Boot!";
    }
}
