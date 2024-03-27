package com.example.pppp.Bookreport.repository;

import com.example.pppp.Bookreport.entity.Bookreport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookreportRepository extends JpaRepository<Bookreport, Integer> {
}
