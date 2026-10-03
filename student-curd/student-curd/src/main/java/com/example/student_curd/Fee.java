package com.example.student_curd;

import jakarta.persistence.*;

@Entity
public class Fee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long studentId;
    private int totalFee = 60000;
    private int paidAmount = 0;
    private int dueAmount = 60000;
    private String status = "DUE";
    
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getStudentId(){return studentId;} public void setStudentId(Long s){this.studentId=s;}
    public int getTotalFee(){return totalFee;} public void setTotalFee(int t){this.totalFee=t; this.dueAmount = t - this.paidAmount;}
    public int getPaidAmount(){return paidAmount;} public void setPaidAmount(int p){this.paidAmount=p; this.dueAmount = this.totalFee - p; this.status = p>=totalFee?"PAID":"DUE";}
    public int getDueAmount(){return dueAmount;}
    public String getStatus(){return status;}
}