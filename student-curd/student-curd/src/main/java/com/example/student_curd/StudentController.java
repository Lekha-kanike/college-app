package com.example.student_curd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/students")
public class StudentController {
    @Autowired
    StudentRepository repo;

    @GetMapping
    public List<Student> getAll() { return repo.findAll(); }

    @PostMapping
    public Student create(@RequestBody Student s) { return repo.save(s); }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student s) {
        s.setId(id);
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}