import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Loan, Book } from '../../models/library.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent implements OnInit {
  loans = signal<Loan[]>([]);
  books = signal<Book[]>([]);
  loanForm: FormGroup;
  showForm = signal(false);

  constructor(private libraryService: LibraryService, private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      book: [null, Validators.required],
      borrowerName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadBooks();
  }

  loadLoans(): void {
    this.libraryService.getLoans().subscribe(data => this.loans.set(data));
  }

  loadBooks(): void {
    this.libraryService.getBooks().subscribe(data => {
      // Only show books with stock
      this.books.set(data.filter(b => b.stock > 0));
    });
  }

  submitForm(): void {
    if (this.loanForm.valid) {
      this.libraryService.createLoan(this.loanForm.value).subscribe({
        next: () => {
          this.loadLoans();
          this.loadBooks();
          this.toggleForm();
        },
        error: (err) => alert('Erro: ' + (err.error?.message || 'Estoque insuficiente ou erro no servidor'))
      });
    }
  }

  returnBook(loanId: number): void {
    this.libraryService.returnBook(loanId).subscribe(() => {
      this.loadLoans();
      this.loadBooks();
    });
  }

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    if (!this.showForm()) this.loanForm.reset();
  }

  getStatusClass(loan: Loan): string {
    if (loan.returnDate) return 'badge-success';
    const dueDate = new Date(loan.dueDate!);
    if (new Date() > dueDate) return 'badge-danger';
    return 'badge-warning';
  }

  getStatusText(loan: Loan): string {
    if (loan.returnDate) return 'Devolvido';
    const dueDate = new Date(loan.dueDate!);
    if (new Date() > dueDate) return 'Atrasado';
    return 'Emprestado';
  }
}
