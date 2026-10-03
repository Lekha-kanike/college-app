package com.example.student_curd;

import jakarta.persistence.*;

@Entity
public class Attendance {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long studentId;
  private int totalClasses;
  private int attended;
  private int percentage;
  // Generate Getters and Setters
  
  public Long getId(){return id;}
  public void setId(Long id){this.id=id;}
  public Long getStudentId(){return studentId;} 
  public void setStudentId(Long s){this.studentId=s;}
  public int getTotalClasses(){return totalClasses;}
  public void setTotalClasses(int t) {this.totalClasses=t;}
  public int getAttended(){return attended;}
  public void setAttended(int a) {this.attended=a;}
  public int getPercentage(){return percentage;} 
  public void setPercentage(int p){this.percentage=p;}
  
}