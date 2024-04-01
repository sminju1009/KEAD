package com.example.pppp.Bookfolder.controller;

import com.example.pppp.Bookfolder.service.MyBookShelfService;
import com.example.pppp.Bookfolder.entity.MybookShelf;
import com.example.pppp.Bookfolder.entity.MyBookList;
import com.example.pppp.Bookfolder.entity.WordList;
import com.example.pppp.Bookfolder.respository.WordListRepository;
import com.example.pppp.Bookfolder.dto.request.MybookShelfRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import com.fasterxml.jackson.core.JsonProcessingException;


import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/users")
public class MyBookController {

    private final MyBookShelfService myBookShelfService;
    private final WordListRepository wordListRepository;

    private static final String FLASK_SERVER_URL = "http://localhost:5000"; // 플라스크 서버의 주소로 변경해주세요.
    private String savedValue; // 저장할 변수 선언

    @Autowired
    public MyBookController(MyBookShelfService myBookShelfService, WordListRepository wordListRepository) {
        this.myBookShelfService = myBookShelfService;
        this.wordListRepository = wordListRepository;
    }

    @GetMapping("/{memberId}/mybookshelf/{bookId}") // 요청 URL에 memberId와 bookId 파라미터 추가
    public ResponseEntity<List<Object>> getAllMybookShelvesByMemberIdAndBookId(
            @PathVariable("memberId") int memberId,
            @PathVariable("bookId") int bookId) {
        List<Object> mybookShelves = myBookShelfService.getAllMybookShelvesByMemberId(memberId, bookId);
        return ResponseEntity.ok(mybookShelves);
    }


    @GetMapping("/{memberId}/mybookshelf")
    public ResponseEntity<List<MyBookList>> findBooksByMemberId(@PathVariable("memberId") int memberId) {
        List<MyBookList> books = myBookShelfService.findBooksByMemberId(memberId);
        return ResponseEntity.ok(books);
    }


    private String sendPostRequestToFlaskAndGetResponse(int memberId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String requestBody = objectMapper.writeValueAsString(Collections.singletonMap("member_id", memberId));
            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.postForEntity(FLASK_SERVER_URL + "/recommend", request, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return responseEntity.getBody();
            } else {
                return null;
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/mybookshelf")
    public ResponseEntity<MybookShelf> addNewMybookShelf(@RequestBody MybookShelfRequestDto requestDto) {
        MybookShelf newMybookShelf = myBookShelfService.addNewMybookShelf(
                requestDto.getMemberId(),
                requestDto.getBookId(),
                requestDto.getReportContent(),
                requestDto.getReportTime(),
                requestDto.getIsbn(),
                requestDto.getBookMemberRate()
        );

        String flaskResponse = sendPostRequestToFlaskAndGetResponse(requestDto.getMemberId());

        if (flaskResponse != null) {
            savedValue = flaskResponse;
        }

        return new ResponseEntity<>(newMybookShelf, HttpStatus.CREATED);
    }

    @GetMapping("/{memberId}/recommends")
    public ResponseEntity<String> handleGetRequest(@PathVariable("memberId") int memberId) {
        if (savedValue != null) {
            return ResponseEntity.ok(savedValue);
        } else {
            String flaskResponse = sendPostRequestToFlaskAndGetResponse(memberId);

            if (flaskResponse != null) {
                savedValue = flaskResponse;
            }
            return ResponseEntity.ok(savedValue);
        }
    }

    @DeleteMapping("/{memberId}/mybookshelf/{bookId}")
    public ResponseEntity<Void> deleteMybookShelvesByMemberIdAndBookId(@PathVariable("memberId") int memberId, @PathVariable("bookId") int bookId) {
        myBookShelfService.deleteMybookShelvesByMemberIdAndBookId(memberId, bookId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/quiz/{bookIid}")
    public ResponseEntity<List<WordList>> getAllWordLists() {
        List<WordList> wordLists = wordListRepository.findAll();
        return ResponseEntity.ok(wordLists);
    }

}
