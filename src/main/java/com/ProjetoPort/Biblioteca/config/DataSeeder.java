package com.ProjetoPort.Biblioteca.config;

import com.ProjetoPort.Biblioteca.model.Author;
import com.ProjetoPort.Biblioteca.model.Book;
import com.ProjetoPort.Biblioteca.model.Loan;
import com.ProjetoPort.Biblioteca.repository.AuthorRepository;
import com.ProjetoPort.Biblioteca.repository.BookRepository;
import com.ProjetoPort.Biblioteca.repository.LoanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.math.BigDecimal;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(AuthorRepository authorRepository, 
                                 BookRepository bookRepository,
                                 LoanRepository loanRepository) {
        return args -> {
            if (authorRepository.count() == 0) {
                Author author1 = authorRepository.save(new Author(null, "Machado de Assis", "Brasileiro"));
                Author author2 = authorRepository.save(new Author(null, "J.K. Rowling", "Britânica"));
                Author author3 = authorRepository.save(new Author(null, "George Orwell", "Britânico"));

                Book b1 = bookRepository.save(new Book(null, "Dom Casmurro", "978-85-01-01234-5", 5, 1899, "Realismo", "Um dos maiores clássicos brasileiros", author1));
                Book b2 = bookRepository.save(new Book(null, "Harry Potter e a Pedra Filosofal", "978-0747532699", 3, 1997, "Fantasia", "O início da saga do bruxo mais famoso", author2));
                Book b3 = bookRepository.save(new Book(null, "1984", "978-0451524935", 0, 1949, "Distopia", "Um olhar sombrio sobre o futuro do controle social", author3));
                Book b4 = bookRepository.save(new Book(null, "O Alienista", "978-85-01-01234-6", 10, 1882, "Realismo", "Uma sátira sobre a psiquiatria", author1));

                loanRepository.save(new Loan(null, b1, "João Silva", LocalDate.now().minusDays(5), LocalDate.now().plusDays(2), null, BigDecimal.ZERO));
                loanRepository.save(new Loan(null, b2, "Maria Oliveira", LocalDate.now().minusDays(10), LocalDate.now().minusDays(3), null, BigDecimal.ZERO));
            }
        };
    }
}
