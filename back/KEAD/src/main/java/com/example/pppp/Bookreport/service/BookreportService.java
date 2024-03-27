package com.example.pppp.Bookreport.service;

import com.example.pppp.Bookreport.dto.AddBookreportRequest;
import com.example.pppp.Bookreport.entity.Bookreport;
import com.example.pppp.Bookreport.repository.BookreportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookreportService {

    private final BookreportRepository bookreportRepository;

    // 독후감 추가 메서드
    public Bookreport save(AddBookreportRequest request) {
        return bookreportRepository.save(request.toEntity());
    }

// 전체 독후감 조회가 필요하면 사용할 코드
//    public List<Bookreport> findAll() {
//        return bookreportRepository.findAll();
//    }

    public Bookreport findById(int id) {
        return bookreportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    }

    public void delete(int id) {
        bookreportRepository.deleteById(id);
    }
}
