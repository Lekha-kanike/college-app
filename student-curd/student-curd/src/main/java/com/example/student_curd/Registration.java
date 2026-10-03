package com.example.student_curd;

import jakarta.persistence.*;

@Entity
public class Registration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private String eventName;
    private String date = "2026-10-02";
    
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getStudentName(){return studentName;} public void setStudentName(String s){this.studentName=s;}
    public String getEventName(){return eventName;} public void setEventName(String e){this.eventName=e;}
    public String getDate(){return date;} public void setDate(String d){this.date=d;}
}