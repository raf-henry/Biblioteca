import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Book, Loan } from '../models/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Authors
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  saveAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/authors/${id}`);
  }

  // Books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // Loans
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/loans`);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loans`, loan);
  }

  returnBook(loanId: number): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loans/${loanId}/return`, {});
  }
}
