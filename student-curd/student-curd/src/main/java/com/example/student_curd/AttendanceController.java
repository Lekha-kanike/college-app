package com.example.student_curd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/attendance")
public class AttendanceController {
    @Autowired
    AttendanceRepository repo;

    @GetMapping
    public List<Attendance> getAll() { return repo.findAll(); }

    @PostMapping
    public Attendance create(@RequestBody Attendance a) { return repo.save(a); }

    @PutMapping("/{id}")
    public Attendance update(@PathVariable Long id, @RequestBody Attendance a) {
        a.setId(id);
        return repo.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}