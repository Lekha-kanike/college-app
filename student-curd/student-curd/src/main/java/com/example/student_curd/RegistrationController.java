package com.example.student_curd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/registrations")
public class RegistrationController {
    @Autowired
    RegistrationRepository repo;

    @GetMapping
    public List<Registration> getAll() { return repo.findAll(); }

    @PostMapping
    public Registration create(@RequestBody Registration r) { return repo.save(r); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}