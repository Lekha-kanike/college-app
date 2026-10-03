package com.example.student_curd;

import com.example.student_curd.Marks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/marks")
public class MarksController {
    @Autowired
    private MarksRepository repo;

    @GetMapping
    public List<Marks> getAll() { return repo.findAll(); }

    @PostMapping
    public Marks create(@RequestBody Marks m) {
        
        List<Marks> existing = repo.findByStudentId(m.getStudentId());
        if(!existing.isEmpty()) return existing.get(0);
        return repo.save(m);
    }

    @PutMapping("/{id}")
    public Marks update(@PathVariable Long id, @RequestBody Marks m) {
        m.setId(id);
        return repo.save(m);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
