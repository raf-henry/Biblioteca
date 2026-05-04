package com.ProjetoPort.Biblioteca.controller;

import com.ProjetoPort.Biblioteca.model.Loan;
import com.ProjetoPort.Biblioteca.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    public List<Loan> findAll() {
        return loanService.findAll();
    }

    @PostMapping
    public Loan createLoan(@RequestBody Loan loan) {
        return loanService.createLoan(loan);
    }

    @PostMapping("/{id}/return")
    public Loan returnBook(@PathVariable Long id) {
        return loanService.returnBook(id);
    }
}
