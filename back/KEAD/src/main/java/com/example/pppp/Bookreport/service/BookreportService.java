package com.example.pppp.Bookreport.service;

import com.example.pppp.Bookreport.dto.request.BookreportAddRequestDto;
import com.example.pppp.Bookreport.entity.Bookreport;
import com.example.pppp.Bookreport.repository.BookreportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BookreportService {

    private final BookreportRepository bookreportRepository;

    // 독후감 추가 메서드
    public Bookreport save(BookreportAddRequestDto request) {
        return bookreportRepository.save(request.toEntity());
    }

    public List<Bookreport> findALl() {
        return bookreportRepository.findAll();
    }
}
