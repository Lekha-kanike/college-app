package com.example.student_curd;

import jakarta.persistence.*;

@Entity
@Table(name = "marks")
public class Marks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "overall_score")
    private int overallScore = 0;

    @Column(name = "total")
    private int total = 0;

    public Marks() {}
    public Marks(Long studentId, int overallScore) {
        this.studentId = studentId;
        this.overallScore = overallScore;
        this.total = overallScore;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }
    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }
}