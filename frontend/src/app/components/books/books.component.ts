import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Book, Author } from '../../models/library.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  bookForm: FormGroup;
  showForm = signal(false);
  searchTerm = signal('');

  filteredBooks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.books().filter(b => 
      b.title.toLowerCase().includes(term) || 
      b.isbn.includes(term)
    );
  });

  constructor(private libraryService: LibraryService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(0)]],
      author: [null, Validators.required],
      publicationYear: [null],
      genre: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks(): void {
    this.libraryService.getBooks().subscribe(data => this.books.set(data));
  }

  loadAuthors(): void {
    this.libraryService.getAuthors().subscribe(data => this.authors.set(data));
  }

  submitForm(): void {
    if (this.bookForm.valid) {
      this.libraryService.saveBook(this.bookForm.value).subscribe(() => {
        this.loadBooks();
        this.toggleForm();
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.libraryService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }

  editBook(book: Book): void {
    this.bookForm.patchValue({
      ...book,
      author: this.authors().find(a => a.id === book.author.id)
    });
    this.showForm.set(true);
  }

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    if (!this.showForm()) this.bookForm.reset();
  }

  compareAuthors(a1: Author, a2: Author): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }
}
