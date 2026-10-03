package com.example.student_curd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/fees")
public class FeeController {
    @Autowired
    FeeRepository repo;

    @GetMapping
    public List<Fee> getAll() { return repo.findAll(); }

    @PostMapping
    public Fee create(@RequestBody Fee f) { return repo.save(f); }

    @PutMapping("/{id}")
    public Fee update(@PathVariable Long id, @RequestBody Fee f) {
        f.setId(id);
        return repo.save(f);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}