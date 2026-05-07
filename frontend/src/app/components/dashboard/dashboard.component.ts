import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { forkJoin } from 'rxjs';
import { Book, Author, Loan } from '../../models/library.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Signals for state management
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  loans = signal<Loan[]>([]);

  // Computed signals for stats
  stats = computed(() => {
    const b = this.books();
    const l = this.loans();
    const a = this.authors();
    const today = new Date();

    return {
      totalBooks: b.length,
      availableBooks: b.reduce((acc, book) => acc + (book.stock || 0), 0),
      totalAuthors: a.length,
      activeLoans: l.filter(loan => !loan.returnDate).length,
      overdueLoans: l.filter(loan => !loan.returnDate && loan.dueDate && new Date(loan.dueDate) < today).length
    };
  });

  recentLoans = computed(() => {
    return [...this.loans()]
      .sort((a, b) => {
        const dateA = a.loanDate ? new Date(a.loanDate).getTime() : 0;
        const dateB = b.loanDate ? new Date(b.loanDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  });

  topBooks = computed(() => {
    const l = this.loans();
    const b = this.books();
    
    const counts: { [key: number]: number } = {};
    l.forEach(loan => {
      if (loan.book && loan.book.id) {
        counts[loan.book.id] = (counts[loan.book.id] || 0) + 1;
      }
    });

    const topList = Object.keys(counts).map(id => {
      const book = b.find(book => book.id === Number(id));
      return {
        title: book?.title || 'Livro Desconhecido',
        count: counts[Number(id)]
      };
    });

    const sorted = topList.sort((a, b) => b.count - a.count).slice(0, 5);
    const max = sorted.length > 0 ? Math.max(...sorted.map(s => s.count)) : 1;

    return sorted.map(item => ({
      ...item,
      percentage: (item.count / max) * 100
    }));
  });

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      books: this.libraryService.getBooks(),
      authors: this.libraryService.getAuthors(),
      loans: this.libraryService.getLoans()
    }).subscribe(({ books, authors, loans }) => {
      this.books.set(books);
      this.authors.set(authors);
      this.loans.set(loans);
    });
  }
}
