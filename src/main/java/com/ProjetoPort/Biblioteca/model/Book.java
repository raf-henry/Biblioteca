package com.ProjetoPort.Biblioteca.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String isbn;
    private Integer stock;
    private Integer publicationYear;
    private String genre;
    private String description;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
}
