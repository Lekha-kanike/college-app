package com.example.student_curd;

import com.example.student_curd.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    
    
    List<Marks> findByStudentId(Long studentId);
    
    
    void deleteByStudentId(Long studentId);
}