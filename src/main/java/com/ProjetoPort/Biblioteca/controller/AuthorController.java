package com.ProjetoPort.Biblioteca.controller;

import com.ProjetoPort.Biblioteca.model.Author;
import com.ProjetoPort.Biblioteca.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "*")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping
    public List<Author> findAll() {
        return authorService.findAll();
    }

    @PostMapping
    public Author save(@RequestBody Author author) {
        return authorService.save(author);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        authorService.deleteById(id);
    }
}
