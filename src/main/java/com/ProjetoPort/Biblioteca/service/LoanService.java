package com.ProjetoPort.Biblioteca.service;

import com.ProjetoPort.Biblioteca.model.Loan;
import com.ProjetoPort.Biblioteca.model.Book;
import com.ProjetoPort.Biblioteca.repository.LoanRepository;
import com.ProjetoPort.Biblioteca.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    @Transactional
    public Loan createLoan(Loan loan) {
        Book book = bookRepository.findById(loan.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getStock() <= 0) {
            throw new RuntimeException("Book out of stock");
        }

        book.setStock(book.getStock() - 1);
        bookRepository.save(book);

        loan.setLoanDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(14)); // 2 weeks duration
        return loanRepository.save(loan);
    }

    @Transactional
    public Loan returnBook(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getReturnDate() != null) {
            throw new RuntimeException("Book already returned");
        }

        loan.setReturnDate(LocalDate.now());
        
        // Calculate fine
        if (loan.getReturnDate().isAfter(loan.getDueDate())) {
            long daysLate = ChronoUnit.DAYS.between(loan.getDueDate(), loan.getReturnDate());
            BigDecimal fineAmount = BigDecimal.valueOf(daysLate).multiply(new BigDecimal("2.00"));
            loan.setFine(fineAmount);
        } else {
            loan.setFine(BigDecimal.ZERO);
        }

        Book book = loan.getBook();
        book.setStock(book.getStock() + 1);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }
}
