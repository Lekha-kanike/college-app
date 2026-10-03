package com.example.student_curd;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RegistrationRepository extends JpaRepository<Registration, Long>{}