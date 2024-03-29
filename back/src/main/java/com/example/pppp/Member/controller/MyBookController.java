package com.example.pppp.Member.controller;

import com.example.pppp.Member.dto.request.MybookShelfRequestDto;
import com.example.pppp.Member.service.MyBookShelfService;
import com.example.pppp.Member.entity.MybookShelf;
import com.example.pppp.Member.entity.MyBookList;
import com.example.pppp.Member.entity.WordList;
import com.example.pppp.Member.repository.WordListRepository;
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

@RestController
@RequestMapping("/users")
public class MyBookController {

    private final MyBookShelfService myBookShelfService;
    private final WordListRepository wordListRepository;

    private static final String FLASK_SERVER_URL = "http://localhost:5000"; // 플라스크 서버의 주소로 변경해주세요.
    private String savedValue; // 저장할 변수 선언

    //    @Autowired
//    public MyBookController(MyBookShelfService myBookShelfService) {
//        this.myBookShelfService = myBookShelfService;
//    }
    @Autowired
    public MyBookController(MyBookShelfService myBookShelfService, WordListRepository wordListRepository) {
        this.myBookShelfService = myBookShelfService;
        this.wordListRepository = wordListRepository;
    }
    //추천 알고리즘 돌린결과반환  평점 추가 되면 이거 돌려야함
//    @GetMapping("/recommends/{memberId}")
//    public ResponseEntity<String> getRecommendations(@PathVariable int memberId) {
//        // 플라스크 서버에 POST 요청을 보내기 위해 RestTemplate을 사용합니다.
//        RestTemplate restTemplate = new RestTemplate();
//
//        // 요청 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // ObjectMapper 객체 생성
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        try {
//            // JSON 형식의 문자열 생성
//            String requestBody = objectMapper.writeValueAsString(Collections.singletonMap("member_id", memberId));
//
//            // 요청 본문 설정
//            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
//
//            // POST 요청 보내고 응답 받기
//            ResponseEntity<String> responseEntity = restTemplate.postForEntity(FLASK_SERVER_URL + "/recommend", request, String.class);
//
//            // 응답 반환
//            return responseEntity;
//        } catch (Exception e) {
//            // 예외 처리
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Error occurred while sending request to Flask server");
//        }
//    }


    //나만의 책장 독후감 조회
    @GetMapping("/{memberId}/mybookshelf/{bookId}") // 요청 URL에 memberId와 bookId 파라미터 추가
    public ResponseEntity<List<Object>> getAllMybookShelvesByMemberIdAndBookId(
            @PathVariable int memberId,
            @PathVariable int bookId) {
        List<Object> mybookShelves = myBookShelfService.getAllMybookShelvesByMemberId(memberId, bookId);
        return ResponseEntity.ok(mybookShelves);
    }


    //나만의 책장 책 조회
    @GetMapping("/{memberId}/mybookshelf")
    public ResponseEntity<List<MyBookList>> findBooksByMemberId(@PathVariable int memberId) {
        List<MyBookList> books = myBookShelfService.findBooksByMemberId(memberId);
        return ResponseEntity.ok(books);
    }



    // 플라스크 서버에 POST 요청을 보내는 메서드
    private String sendPostRequestToFlaskAndGetResponse(int memberId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // ObjectMapper를 사용하여 JSON 형식의 문자열을 생성합니다.
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String requestBody = objectMapper.writeValueAsString(Collections.singletonMap("member_id", memberId));
            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            // POST 요청 보내고 응답을 반환합니다.
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(FLASK_SERVER_URL + "/recommend", request, String.class);

            // 플라스크 서버의 응답 값을 변수에 저장합니다.
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return responseEntity.getBody();
            } else {
                // 실패한 경우에 대한 처리
                return null;
            }
        } catch (JsonProcessingException e) {
            // JSON 처리 중 예외가 발생한 경우, 오류 처리
            e.printStackTrace();
            return null;
        }
    }

    //독후감 등록 이거 하면 평점 입력되서 플라스크 실행되고 결과 저장됨 하지만 memberid같은 경우만 됨
    @PostMapping("/mybookshelf")
    public ResponseEntity<MybookShelf> addNewMybookShelf(@RequestBody MybookShelfRequestDto requestDto) {
        // MybookShelfService를 사용하여 새로운 MybookShelf를 추가합니다.
        MybookShelf newMybookShelf = myBookShelfService.addNewMybookShelf(
                requestDto.getMemberId(),
                requestDto.getBookId(),
                requestDto.getReportContent(),
                requestDto.getReportTime(),
                requestDto.getIsbn(),
                requestDto.getBookMemberRate()
        );
        //System.out.println("ㄴㅁㅁㅎㄷㅈ몾ㄱ"); // 콘솔에 메시지 출력

        // 플라스크 서버에 POST 요청을 보내고 응답을 변수에 저장합니다.
        String flaskResponse = sendPostRequestToFlaskAndGetResponse(requestDto.getMemberId());

        // 플라스크 서버의 응답이 null이 아닌 경우, 원하는 변수에 저장할 수 있습니다.
        if (flaskResponse != null) {
            // 예시: savedValue 변수에 플라스크 서버의 응답 저장
            savedValue = flaskResponse;
        }

        // 이후 필요한 처리를 진행하고, 적절한 ResponseEntity를 반환합니다.
        return new ResponseEntity<>(newMybookShelf, HttpStatus.CREATED);
    }




    //추천목록조회
    @GetMapping("/{memberId}/recommends")
    public ResponseEntity<String> handleGetRequest(@PathVariable int memberId) {
        // 저장된 값을 ResponseEntity로 반환
        if (savedValue != null) {
            return ResponseEntity.ok(savedValue);
        } else {
            String flaskResponse = sendPostRequestToFlaskAndGetResponse(memberId);

            // 플라스크 서버의 응답이 null이 아닌 경우, 원하는 변수에 저장할 수 있습니다.
            if (flaskResponse != null) {
                // 예시: savedValue 변수에 플라스크 서버의 응답 저장
                savedValue = flaskResponse;
            }
            return ResponseEntity.ok(savedValue);
        }
    }

    //독후감 삭제==========================================================
    @DeleteMapping("/{memberId}/mybookshelf/{bookId}")
    public ResponseEntity<Void> deleteMybookShelvesByMemberIdAndBookId(@PathVariable int memberId, @PathVariable int bookId) {
        myBookShelfService.deleteMybookShelvesByMemberIdAndBookId(memberId, bookId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/quiz/{bookIid}")
    public ResponseEntity<List<WordList>> getAllWordLists() {
        List<WordList> wordLists = wordListRepository.findAll();
        return ResponseEntity.ok(wordLists);
    }

}
